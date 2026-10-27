// O Lighthouse, em modo telemóvel, sobre as páginas de um build (#59).
// Diz que metas que bloqueiam cada página falha, e mede as que só avisam.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import lighthouse, { generateReport, type Result } from 'lighthouse';
import type { Pagina } from '../builds.ts';

/** 1 KB = 1024 bytes, como nos orçamentos do Lighthouse. */
const KB = 1024;
const PAGINA_MAXIMA = 400 * KB;
const JS_MAXIMO = 75 * KB;
const FONTES_MAXIMAS = 2;

/** Uma meta que varia de execução para execução: vê-se no resumo, com a mediana. */
export interface Meta {
	nome: string;
	alvo: string;
	/** Fora da meta, aparece também como aviso no job. */
	avisa: boolean;
	valor: (lhr: Result) => number | null;
	cumpre: (valor: number) => boolean;
	formato: (valor: number) => string;
}

const pontuacao = (categoria: string) => (lhr: Result) => {
	const pontos = lhr.categories[categoria]?.score;
	return pontos == null ? null : Math.round(pontos * 100);
};
const metrica = (auditoria: string) => (lhr: Result) => lhr.audits[auditoria]?.numericValue ?? null;

/** A pontuação de desempenho. Também escolhe a execução mediana, a do relatório. */
const DESEMPENHO: Meta = {
	nome: 'Desempenho',
	alvo: '≥ 90',
	avisa: true,
	valor: pontuacao('performance'),
	cumpre: (v) => v >= 90,
	formato: (v) => `${v}`,
};

export const METAS: Meta[] = [
	DESEMPENHO,
	{
		nome: 'LCP',
		alvo: '≤ 2,5 s',
		avisa: true,
		valor: metrica('largest-contentful-paint'),
		cumpre: (ms) => ms <= 2500,
		formato: (ms) => `${formatar(ms / 1000, 1)} s`,
	},
	{
		nome: 'TBT',
		alvo: '≤ 200 ms',
		avisa: true,
		valor: metrica('total-blocking-time'),
		cumpre: (ms) => ms <= 200,
		formato: (ms) => `${formatar(ms, 0)} ms`,
	},
	{
		nome: 'CLS',
		alvo: '≤ 0,1',
		avisa: false,
		valor: metrica('cumulative-layout-shift'),
		cumpre: (v) => v <= 0.1,
		formato: (v) => formatar(v, 2),
	},
	{
		nome: 'Acessibilidade',
		alvo: '100',
		avisa: false,
		valor: pontuacao('accessibility'),
		cumpre: (v) => v === 100,
		formato: (v) => `${v}`,
	},
	{
		nome: 'Boas práticas',
		alvo: '100',
		avisa: false,
		valor: pontuacao('best-practices'),
		cumpre: (v) => v === 100,
		formato: (v) => `${v}`,
	},
];

export interface Opcoes {
	/** A pasta do build, servida como no alojamento. */
	dist: string;
	paginas: Pagina[];
	/** A constante `noindex` da fase do build: o SEO exige-o, ou exige páginas indexáveis. */
	noindex: boolean;
	/** Quantas vezes o Lighthouse analisa cada página. As medianas vêm destas execuções. */
	execucoes: number;
	/** A pasta onde fica o relatório HTML da execução mediana de cada página. */
	relatorios?: string;
	/** Recebe uma linha por execução, para mostrar o progresso. */
	progresso?: (linha: string) => void;
}

export interface Analise {
	caminho: string;
	/** As metas que bloqueiam e que alguma execução falhou. */
	falhas: string[];
	/** A mediana de cada meta de METAS, pela mesma ordem, ou null se o Lighthouse não a mediu. */
	medianas: (number | null)[];
}

export async function verificarSite(opcoes: Opcoes): Promise<Analise[]> {
	const servidor = await preview({
		outDir: opcoes.dist,
		server: { port: 0 },
		logLevel: 'error',
	});
	const portaDoChromium = await portaLivre();
	// O Chromium do Playwright, o mesmo dos testes, em modo headless novo.
	const navegador = await chromium.launch({
		channel: 'chromium',
		args: [`--remote-debugging-port=${portaDoChromium}`],
	});
	if (opcoes.relatorios) mkdirSync(opcoes.relatorios, { recursive: true });

	const analises: Analise[] = [];
	try {
		for (const { caminho, lingua } of opcoes.paginas) {
			const url = `http://localhost:${servidor.port}${caminho}`;
			const execucoes: Result[] = [];
			for (let n = 1; n <= opcoes.execucoes; n++) {
				opcoes.progresso?.(`${opcoes.dist}${caminho}: execução ${n} de ${opcoes.execucoes}`);
				const resultado = await lighthouse(url, {
					port: portaDoChromium,
					logLevel: 'error',
					onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
				});
				if (!resultado) throw new Error(`O Lighthouse não devolveu resultado para ${caminho}.`);
				execucoes.push(resultado.lhr);
			}

			// As páginas de erro, sem língua, têm sempre noindex, como na suite Playwright.
			const deveTerNoindex = opcoes.noindex || !lingua;
			const falhas = new Set(execucoes.flatMap((lhr) => falhasDe(lhr, deveTerNoindex)));
			const medianas = METAS.map((meta) => mediana(execucoes.map(meta.valor)));
			analises.push({ caminho, falhas: [...falhas], medianas });

			if (opcoes.relatorios) {
				const desempenho = medianas[METAS.indexOf(DESEMPENHO)];
				const execucaoMediana =
					execucoes.find((lhr) => DESEMPENHO.valor(lhr) === desempenho) ?? execucoes[0];
				writeFileSync(
					join(opcoes.relatorios, `${nomeDoRelatorio(caminho)}.html`),
					generateReport(execucaoMediana, 'html'),
				);
			}
		}
	} finally {
		await navegador.close();
		await servidor.stop();
	}
	return analises;
}

/** As metas que bloqueiam e que esta execução falhou. */
function falhasDe(lhr: Result, deveTerNoindex: boolean): string[] {
	if (lhr.runtimeError) {
		return [`o Lighthouse não conseguiu analisar a página: ${lhr.runtimeError.message}`];
	}
	const falhas = falhasDeSeo(lhr, deveTerNoindex);
	const todosOsPedidos = pedidos(lhr);
	const peso = soma(todosOsPedidos);
	if (peso > PAGINA_MAXIMA) falhas.push(`página com ${kb(peso)}, máximo ${kb(PAGINA_MAXIMA)}`);
	// Só conta o JS dos ficheiros .js. O JS escrito dentro do HTML conta só para o peso da página.
	const js = soma(todosOsPedidos.filter((p) => p.resourceType === 'Script'));
	if (js > JS_MAXIMO) falhas.push(`JS com ${kb(js)}, máximo ${kb(JS_MAXIMO)}`);

	const fontes = todosOsPedidos.filter((p) => p.resourceType === 'Font');
	if (fontes.length > FONTES_MAXIMAS) {
		falhas.push(`${fontes.length} fontes, máximo ${FONTES_MAXIMAS}`);
	}
	for (const { url } of fontes) {
		const { pathname } = new URL(url);
		if (!pathname.endsWith('.woff2')) falhas.push(`fonte que não é woff2: ${pathname}`);
	}

	const origem = new URL(lhr.requestedUrl!).origin;
	for (const { url } of todosOsPedidos) {
		const { protocol, origin } = new URL(url);
		if (/^(http|ws)s?:$/.test(protocol) && origin !== origem) {
			falhas.push(`pedido a outro domínio: ${url}`);
		}
	}
	return falhas;
}

interface Pedido {
	url: string;
	resourceType?: string;
	transferSize?: number;
}

/** Os pedidos do primeiro carregamento, com o tamanho transferido (comprimido). */
function pedidos(lhr: Result): Pedido[] {
	const detalhes = lhr.audits['network-requests']?.details;
	return detalhes?.type === 'table' ? (detalhes.items as unknown as Pedido[]) : [];
}

function soma(lista: Pedido[]) {
	return lista.reduce((total, p) => total + (p.transferSize ?? 0), 0);
}

/**
 * O SEO a 100, menos a indexação enquanto a constante `noindex` estiver ligada:
 * aí exige o contrário, que o Lighthouse veja a página bloqueada.
 */
function falhasDeSeo(lhr: Result, deveTerNoindex: boolean): string[] {
	const falhadas = lhr.categories.seo.auditRefs
		.filter((ref) => ref.weight > 0)
		.map((ref) => lhr.audits[ref.id])
		.filter((auditoria) => auditoria.score !== null && auditoria.score < 1);
	const bloqueada = falhadas.some((auditoria) => auditoria.id === 'is-crawlable');
	const falhas = deveTerNoindex && !bloqueada ? ['SEO: falta o noindex'] : [];
	for (const auditoria of falhadas) {
		if (auditoria.id !== 'is-crawlable' || !deveTerNoindex) falhas.push(`SEO: ${auditoria.title}`);
	}
	return falhas;
}

/** A mediana dos valores medidos. Com um número par deles, a média dos dois do meio. */
function mediana(valores: (number | null)[]): number | null {
	const medidos = valores.filter((v) => v !== null).sort((a, b) => a - b);
	if (!medidos.length) return null;
	const meio = Math.floor(medidos.length / 2);
	return medidos.length % 2 ? medidos[meio] : (medidos[meio - 1] + medidos[meio]) / 2;
}

/** Um número à portuguesa, com `casas` casas decimais: `formatar(2.5, 1)` → `2,5`. */
function formatar(valor: number, casas: number) {
	return valor.toLocaleString('pt-PT', {
		minimumFractionDigits: casas,
		maximumFractionDigits: casas,
	});
}

function kb(bytes: number) {
	return `${formatar(bytes / KB, 1)} KB`;
}

/** O nome do relatório de uma página: `/pt/` → `pt`, `/` → `index`, `/404.html` → `404`. */
function nomeDoRelatorio(caminho: string) {
	return caminho.replace(/^\/|\/$|\.html$/g, '').replaceAll('/', '-') || 'index';
}

/** Uma porta livre, escolhida pelo sistema, para o Lighthouse falar com o Chromium. */
async function portaLivre(): Promise<number> {
	const servidor = createServer().listen(0);
	await new Promise((pronto) => servidor.once('listening', pronto));
	const { port } = servidor.address() as { port: number };
	await new Promise((fechado) => servidor.close(fechado));
	return port;
}
