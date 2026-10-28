// O Lighthouse, em modo telemóvel, sobre as páginas de um build (#59).
// Diz que metas que bloqueiam cada página falha, e mede as que só avisam.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import lighthouse, { generateReport, type Result } from 'lighthouse';
import type { SitePage } from '../builds.ts';

/** 1 KB = 1024 bytes, como nos orçamentos do Lighthouse. */
const KB = 1024;
const MAX_PAGE_SIZE = 400 * KB;
const MAX_JS_SIZE = 75 * KB;
const MAX_FONTS = 2;

/** Uma meta que varia de execução para execução: vê-se no resumo, com a mediana. */
export interface Target {
	name: string;
	threshold: string;
	/** Fora da meta, aparece também como aviso no job. */
	warns: boolean;
	value: (lhr: Result) => number | null;
	passes: (value: number) => boolean;
	format: (value: number) => string;
}

const categoryScore = (category: string) => (lhr: Result) => {
	const score = lhr.categories[category]?.score;
	return score == null ? null : Math.round(score * 100);
};
const metric = (audit: string) => (lhr: Result) => lhr.audits[audit]?.numericValue ?? null;

/** A pontuação de desempenho. Também escolhe a execução mediana, a do relatório. */
const PERFORMANCE: Target = {
	name: 'Desempenho',
	threshold: '≥ 90',
	warns: true,
	value: categoryScore('performance'),
	passes: (v) => v >= 90,
	format: (v) => `${v}`,
};

export const TARGETS: Target[] = [
	PERFORMANCE,
	{
		name: 'LCP',
		threshold: '≤ 2,5 s',
		warns: true,
		value: metric('largest-contentful-paint'),
		passes: (ms) => ms <= 2500,
		format: (ms) => `${formatNumber(ms / 1000, 1)} s`,
	},
	{
		name: 'TBT',
		threshold: '≤ 200 ms',
		warns: true,
		value: metric('total-blocking-time'),
		passes: (ms) => ms <= 200,
		format: (ms) => `${formatNumber(ms, 0)} ms`,
	},
	{
		name: 'CLS',
		threshold: '≤ 0,1',
		warns: false,
		value: metric('cumulative-layout-shift'),
		passes: (v) => v <= 0.1,
		format: (v) => formatNumber(v, 2),
	},
	{
		name: 'Acessibilidade',
		threshold: '100',
		warns: false,
		value: categoryScore('accessibility'),
		passes: (v) => v === 100,
		format: (v) => `${v}`,
	},
	{
		name: 'Boas práticas',
		threshold: '100',
		warns: false,
		value: categoryScore('best-practices'),
		passes: (v) => v === 100,
		format: (v) => `${v}`,
	},
];

export interface Options {
	/** A pasta do build, servida como no alojamento. */
	dist: string;
	pages: SitePage[];
	/** A constante `noindex` da fase do build: o SEO exige-o, ou exige páginas indexáveis. */
	noindex: boolean;
	/** Quantas vezes o Lighthouse analisa cada página. As medianas vêm destas execuções. */
	runs: number;
	/** A pasta onde fica o relatório HTML da execução mediana de cada página. */
	reportsDir?: string;
	/** Recebe uma linha por execução, para mostrar o progresso. */
	progress?: (line: string) => void;
}

export interface Analysis {
	path: string;
	/** As metas que bloqueiam e que alguma execução falhou. */
	failures: string[];
	/** A mediana de cada meta de METAS, pela mesma ordem, ou null se o Lighthouse não a mediu. */
	medians: (number | null)[];
}

export async function checkSite(options: Options): Promise<Analysis[]> {
	const server = await preview({
		outDir: options.dist,
		server: { port: 0 },
		logLevel: 'error',
	});
	const chromiumPort = await freePort();
	// O Chromium do Playwright, o mesmo dos testes, em modo headless novo.
	const browser = await chromium.launch({
		channel: 'chromium',
		args: [`--remote-debugging-port=${chromiumPort}`],
	});
	if (options.reportsDir) mkdirSync(options.reportsDir, { recursive: true });

	const analyses: Analysis[] = [];
	try {
		for (const { path, language } of options.pages) {
			const url = `http://localhost:${server.port}${path}`;
			const runs: Result[] = [];
			for (let n = 1; n <= options.runs; n++) {
				options.progress?.(`${options.dist}${path}: execução ${n} de ${options.runs}`);
				const result = await lighthouse(url, {
					port: chromiumPort,
					logLevel: 'error',
					onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
				});
				if (!result) throw new Error(`O Lighthouse não devolveu resultado para ${path}.`);
				runs.push(result.lhr);
			}

			// As páginas de erro, sem língua, têm sempre noindex, como na suite Playwright.
			const needsNoindex = options.noindex || !language;
			const failures = new Set(runs.flatMap((lhr) => failuresOf(lhr, needsNoindex)));
			const medians = TARGETS.map((target) => median(runs.map(target.value)));
			analyses.push({ path, failures: [...failures], medians });

			if (options.reportsDir) {
				const medianPerformance = medians[TARGETS.indexOf(PERFORMANCE)];
				const medianRun =
					runs.find((lhr) => PERFORMANCE.value(lhr) === medianPerformance) ?? runs[0];
				writeFileSync(
					join(options.reportsDir, `${reportName(path)}.html`),
					generateReport(medianRun, 'html'),
				);
			}
		}
	} finally {
		await browser.close();
		await server.stop();
	}
	return analyses;
}

/** As metas que bloqueiam e que esta execução falhou. */
function failuresOf(lhr: Result, needsNoindex: boolean): string[] {
	if (lhr.runtimeError) {
		return [`o Lighthouse não conseguiu analisar a página: ${lhr.runtimeError.message}`];
	}
	const failures = seoFailures(lhr, needsNoindex);
	const allRequests = networkRequests(lhr);
	const pageSize = totalSize(allRequests);
	if (pageSize > MAX_PAGE_SIZE) {
		failures.push(`página com ${kb(pageSize)}, máximo ${kb(MAX_PAGE_SIZE)}`);
	}
	// Só conta o JS dos ficheiros .js. O JS escrito dentro do HTML conta só para o peso da página.
	const js = totalSize(allRequests.filter((r) => r.resourceType === 'Script'));
	if (js > MAX_JS_SIZE) failures.push(`JS com ${kb(js)}, máximo ${kb(MAX_JS_SIZE)}`);

	const fonts = allRequests.filter((r) => r.resourceType === 'Font');
	if (fonts.length > MAX_FONTS) {
		failures.push(`${fonts.length} fontes, máximo ${MAX_FONTS}`);
	}
	for (const { url } of fonts) {
		const { pathname } = new URL(url);
		if (!pathname.endsWith('.woff2')) failures.push(`fonte que não é woff2: ${pathname}`);
	}

	const pageOrigin = new URL(lhr.requestedUrl!).origin;
	for (const { url } of allRequests) {
		const { protocol, origin } = new URL(url);
		if (/^(http|ws)s?:$/.test(protocol) && origin !== pageOrigin) {
			failures.push(`pedido a outro domínio: ${url}`);
		}
	}
	return failures;
}

interface NetworkRequest {
	url: string;
	resourceType?: string;
	transferSize?: number;
}

/** Os pedidos do primeiro carregamento, com o tamanho transferido (comprimido). */
function networkRequests(lhr: Result): NetworkRequest[] {
	const details = lhr.audits['network-requests']?.details;
	return details?.type === 'table' ? (details.items as unknown as NetworkRequest[]) : [];
}

function totalSize(requests: NetworkRequest[]) {
	return requests.reduce((total, r) => total + (r.transferSize ?? 0), 0);
}

/**
 * O SEO a 100, menos a indexação enquanto a constante `noindex` estiver ligada:
 * aí exige o contrário, que o Lighthouse veja a página bloqueada.
 */
function seoFailures(lhr: Result, needsNoindex: boolean): string[] {
	const failedAudits = lhr.categories.seo.auditRefs
		.filter((ref) => ref.weight > 0)
		.map((ref) => lhr.audits[ref.id])
		.filter((audit) => audit.score !== null && audit.score < 1);
	const blocked = failedAudits.some((audit) => audit.id === 'is-crawlable');
	const failures = needsNoindex && !blocked ? ['SEO: falta o noindex'] : [];
	for (const audit of failedAudits) {
		if (audit.id !== 'is-crawlable' || !needsNoindex) failures.push(`SEO: ${audit.title}`);
	}
	return failures;
}

/** A mediana dos valores medidos. Com um número par deles, a média dos dois do meio. */
function median(values: (number | null)[]): number | null {
	const measured = values.filter((v) => v !== null).sort((a, b) => a - b);
	if (!measured.length) return null;
	const middle = Math.floor(measured.length / 2);
	return measured.length % 2 ? measured[middle] : (measured[middle - 1] + measured[middle]) / 2;
}

/** Um número à portuguesa, com `casas` casas decimais: `formatar(2.5, 1)` → `2,5`. */
function formatNumber(value: number, decimals: number) {
	return value.toLocaleString('pt-PT', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

function kb(bytes: number) {
	return `${formatNumber(bytes / KB, 1)} KB`;
}

/** O nome do relatório de uma página: `/pt/` → `pt`, `/` → `index`, `/404.html` → `404`. */
function reportName(path: string) {
	return path.replace(/^\/|\/$|\.html$/g, '').replaceAll('/', '-') || 'index';
}

/** Uma porta livre, escolhida pelo sistema, para o Lighthouse falar com o Chromium. */
async function freePort(): Promise<number> {
	const server = createServer().listen(0);
	await new Promise((ready) => server.once('listening', ready));
	const { port } = server.address() as { port: number };
	await new Promise((closed) => server.close(closed));
	return port;
}
