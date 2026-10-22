// O Lighthouse, em modo telemóvel, sobre todas as páginas do build (#59).
// Uma página nova entra aqui sozinha, porque a lista vem da pasta do build, como na suite Playwright.
//
// Bloqueiam (o comando sai com erro): o SEO a 100, a página ≤ 400 KB e o JS ≤ 75 KB comprimidos,
// no máximo 2 fontes woff2 e 0 pedidos a outros domínios, no primeiro carregamento.
// Só avisam, no resumo do job, com a mediana de 3 execuções: o desempenho, o LCP e o TBT.
// O CLS, a acessibilidade e as boas práticas também aparecem no resumo.
//
//   npm run lighthouse                          o build publicado (dist), como nos PR
//   npm run lighthouse -- --sem-desempenho      só o que bloqueia, numa execução (Publicação, #58)
//   LANCAMENTO_COMERCIAL=1 npm run lighthouse   o build do Lançamento comercial (dist-lancamento)
//
// O relatório HTML da execução mediana de cada página fica em relatorio-lighthouse/.
import { appendFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import lighthouse, { generateReport, type Result } from 'lighthouse';
import { FASE } from '../src/config/site.ts';
import { BUILDS, paginas } from './builds.ts';

/** 1 KB = 1024 bytes, como nos orçamentos do Lighthouse. */
const KB = 1024;
const PAGINA_MAXIMA = 400 * KB;
const JS_MAXIMO = 75 * KB;
const FONTES_MAXIMAS = 2;

const SEM_DESEMPENHO = process.argv.includes('--sem-desempenho');
const EXECUCOES = SEM_DESEMPENHO ? 1 : 3;
const RELATORIOS = 'relatorio-lighthouse';
const NO_GITHUB = process.env.GITHUB_ACTIONS === 'true';

// As metas que variam de execução para execução: veem-se no resumo, com a mediana.
interface Meta {
	nome: string;
	alvo: string;
	/** Aparece como aviso no job, além do resumo. */
	avisa: boolean;
	valor: (lhr: Result) => number | null;
	cumpre: (valor: number) => boolean;
	formato: (valor: number) => string;
}

const pontuacao = (categoria: string) => (lhr: Result) => {
	const score = lhr.categories[categoria]?.score;
	return score == null ? null : Math.round(score * 100);
};
const metrica = (auditoria: string) => (lhr: Result) => lhr.audits[auditoria]?.numericValue ?? null;

const METAS: Meta[] = [
	{
		nome: 'Desempenho',
		alvo: '≥ 90',
		avisa: true,
		valor: pontuacao('performance'),
		cumpre: (v) => v >= 90,
		formato: (v) => `${v}`,
	},
	{
		nome: 'LCP',
		alvo: '≤ 2,5 s',
		avisa: true,
		valor: metrica('largest-contentful-paint'),
		cumpre: (ms) => ms <= 2500,
		formato: (ms) => `${numero(ms / 1000, 1)} s`,
	},
	{
		nome: 'TBT',
		alvo: '≤ 200 ms',
		avisa: true,
		valor: metrica('total-blocking-time'),
		cumpre: (ms) => ms <= 200,
		formato: (ms) => `${numero(ms, 0)} ms`,
	},
	{
		nome: 'CLS',
		alvo: '≤ 0,1',
		avisa: false,
		valor: metrica('cumulative-layout-shift'),
		cumpre: (v) => v <= 0.1,
		formato: (v) => numero(v, 2),
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

/**
 * O SEO a 100, menos a indexação enquanto a constante `noindex` estiver ligada:
 * aí exige o contrário, que o Lighthouse veja a página bloqueada.
 */
function falhasDeSeo(lhr: Result, deveTerNoindex: boolean): string[] {
	const erros: string[] = [];
	const falhadas = lhr.categories.seo.auditRefs
		.filter((ref) => ref.weight > 0)
		.map((ref) => lhr.audits[ref.id])
		.filter((auditoria) => auditoria.score !== null && auditoria.score < 1);
	const bloqueada = falhadas.some((auditoria) => auditoria.id === 'is-crawlable');
	if (deveTerNoindex && !bloqueada) erros.push('SEO: falta o noindex');
	for (const auditoria of falhadas) {
		if (auditoria.id !== 'is-crawlable' || !deveTerNoindex) {
			erros.push(`SEO: ${auditoria.title}`);
		}
	}
	return erros;
}

/** As metas que bloqueiam e que esta execução falhou. */
function falhas(lhr: Result, origem: string, deveTerNoindex: boolean): string[] {
	if (lhr.runtimeError) {
		return [`o Lighthouse não conseguiu analisar a página: ${lhr.runtimeError.message}`];
	}
	const erros = falhasDeSeo(lhr, deveTerNoindex);
	const todos = pedidos(lhr);
	const peso = soma(todos);
	if (peso > PAGINA_MAXIMA) erros.push(`página com ${kb(peso)}, máximo ${kb(PAGINA_MAXIMA)}`);
	const js = soma(todos.filter((p) => p.resourceType === 'Script'));
	if (js > JS_MAXIMO) erros.push(`JS com ${kb(js)}, máximo ${kb(JS_MAXIMO)}`);

	const fontes = todos.filter((p) => p.resourceType === 'Font');
	if (fontes.length > FONTES_MAXIMAS) {
		erros.push(`${fontes.length} fontes, máximo ${FONTES_MAXIMAS}`);
	}
	for (const { url } of fontes) {
		if (!new URL(url).pathname.endsWith('.woff2')) erros.push(`fonte que não é woff2: ${url}`);
	}
	for (const { url } of todos) {
		const { protocol, origin } = new URL(url);
		if (/^(http|ws)s?:$/.test(protocol) && origin !== origem) {
			erros.push(`pedido a outro domínio: ${url}`);
		}
	}
	return erros;
}

function soma(lista: Pedido[]) {
	return lista.reduce((total, p) => total + (p.transferSize ?? 0), 0);
}

function numero(valor: number, casas: number) {
	return valor.toLocaleString('pt-PT', {
		minimumFractionDigits: casas,
		maximumFractionDigits: casas,
	});
}

function kb(bytes: number) {
	return `${numero(bytes / KB, 1)} KB`;
}

function mediana(valores: number[]): number {
	const ordenados = [...valores].sort((a, b) => a - b);
	return ordenados[Math.floor(ordenados.length / 2)];
}

/** No GitHub, uma anotação no job, além do resumo. Fora dele, basta o resumo no terminal. */
function anotar(tipo: 'error' | 'warning', texto: string) {
	if (NO_GITHUB) console.log(`::${tipo}::${texto}`);
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

interface Analise {
	caminho: string;
	falhas: string[];
	/** A mediana de cada meta do resumo, ou null se o Lighthouse não a mediu. */
	medianas: (number | null)[];
}

// O build da fase que o <head> lê: o publicado, ou o do Lançamento comercial com LANCAMENTO_COMERCIAL=1.
const build = BUILDS.find((b) => b.fase === FASE)!;
const lista = paginas(build);
rmSync(RELATORIOS, { recursive: true, force: true });
mkdirSync(RELATORIOS);

const servidor = await preview({ outDir: build.dist, server: { port: 0 }, logLevel: 'error' });
const portaDoChromium = await portaLivre();
// O Chromium do Playwright, o mesmo dos testes, em modo headless novo.
const navegador = await chromium.launch({
	channel: 'chromium',
	args: [`--remote-debugging-port=${portaDoChromium}`],
});

const analises: Analise[] = [];
try {
	for (const { caminho, lingua } of lista) {
		const url = `http://localhost:${servidor.port}${caminho}`;
		const execucoes: Result[] = [];
		for (let n = 1; n <= EXECUCOES; n++) {
			console.log(`${caminho}: execução ${n} de ${EXECUCOES}`);
			const resultado = await lighthouse(url, {
				port: portaDoChromium,
				logLevel: 'error',
				onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
			});
			if (!resultado) throw new Error(`O Lighthouse não devolveu resultado para ${caminho}.`);
			execucoes.push(resultado.lhr);
		}

		// A mesma constante que o <head> lê. As páginas de erro, sem língua, têm sempre noindex.
		const deveTerNoindex = FASE.noindex || !lingua;
		const origem = new URL(url).origin;
		const erros = new Set(execucoes.flatMap((lhr) => falhas(lhr, origem, deveTerNoindex)));
		const medianas = METAS.map((meta) => {
			const valores = execucoes.map(meta.valor).filter((v) => v !== null);
			return valores.length ? mediana(valores) : null;
		});
		analises.push({ caminho, falhas: [...erros], medianas });

		const desempenho = METAS[0].valor;
		const execucaoMediana =
			execucoes.find((lhr) => desempenho(lhr) === medianas[0]) ?? execucoes[0];
		writeFileSync(
			`${RELATORIOS}/${nomeDoRelatorio(caminho)}.html`,
			generateReport(execucaoMediana, 'html'),
		);
	}
} finally {
	await navegador.close();
	await servidor.stop();
}

const linhas = [`## Lighthouse em modo telemóvel: ${build.dist}`, ''];

const comFalhas = analises.filter((a) => a.falhas.length);
linhas.push('### Metas que bloqueiam', '');
if (comFalhas.length) {
	for (const { caminho, falhas } of comFalhas) {
		for (const falha of falhas) {
			linhas.push(`- \`${caminho}\`: ${falha}`);
			anotar('error', `Lighthouse ${caminho}: ${falha}`);
		}
	}
} else {
	const quantas =
		analises.length === 1 ? 'A página cumpre' : `As ${analises.length} páginas cumprem`;
	linhas.push(`${quantas} o SEO, os pesos, as fontes e os pedidos.`);
}

if (!SEM_DESEMPENHO) {
	linhas.push(
		'',
		`### Desempenho (só avisa)`,
		'',
		`Mediana de ${EXECUCOES} execuções. A negrito, o que está fora da meta.`,
		'',
		`| Página | ${METAS.map((m) => `${m.nome} (${m.alvo})`).join(' | ')} |`,
		`| --- | ${METAS.map(() => '---:').join(' | ')} |`,
	);
	for (const { caminho, medianas } of analises) {
		const celulas = METAS.map((meta, i) => {
			const valor = medianas[i];
			if (valor === null) return '—';
			if (meta.cumpre(valor)) return meta.formato(valor);
			if (meta.avisa) {
				anotar(
					'warning',
					`Lighthouse ${caminho}: ${meta.nome} ${meta.formato(valor)}, meta ${meta.alvo}`,
				);
			}
			return `**${meta.formato(valor)}**`;
		});
		linhas.push(`| \`${caminho}\` | ${celulas.join(' | ')} |`);
	}
}

const resumo = `${linhas.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumo);
else console.log(`\n${resumo}`);

process.exitCode = comFalhas.length ? 1 : 0;
