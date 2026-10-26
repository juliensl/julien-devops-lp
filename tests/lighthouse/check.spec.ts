// O verificador do Lighthouse (#59), sobre um site de teste com páginas que falham cada meta.
// Corre o Lighthouse a sério, numa execução por página: se uma atualização dele mudar o
// relatório e uma meta deixar de disparar, estes testes ficam vermelhos.
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { expect, test } from '@playwright/test';
import { paginasDe } from '../builds';
import { verificarSite } from './check';

// Cada teste analisa as suas páginas com o Lighthouse, uma de cada vez.
test.describe.configure({ timeout: 120_000 });

interface Pagina {
	noindex?: boolean;
	head?: string;
	body?: string;
}

/** Uma página que cumpre todas as metas, a não ser que `head` ou `body` a estraguem. */
function pagina({ noindex = true, head = '', body = '' }: Pagina = {}) {
	return `<!doctype html>
<html lang="pt-PT">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Página de teste</title>
		<meta name="description" content="Uma página de teste do verificador do Lighthouse." />
		${noindex ? '<meta name="robots" content="noindex" />' : ''}
		${head}
	</head>
	<body>
		<main>
			<h1>Página de teste</h1>
			${body}
		</main>
	</body>
</html>`;
}

/** Escreve o site de teste na pasta de resultados do teste e devolve a pasta. */
function criarSite(ficheiros: Record<string, string>) {
	const pasta = test.info().outputPath('site');
	for (const [caminho, conteudo] of Object.entries(ficheiros)) {
		mkdirSync(dirname(join(pasta, caminho)), { recursive: true });
		writeFileSync(join(pasta, caminho), conteudo);
	}
	return pasta;
}

/**
 * Texto que a compressão quase não reduz: `kb` KB de bytes ao acaso, em base64.
 * Comprimido, fica com cerca de `kb` KB.
 */
function aleatorio(kb: number) {
	return randomBytes(kb * 1024).toString('base64');
}

/** Analisa todas as páginas do site, uma execução cada, e devolve as falhas de cada uma. */
async function falhasPorPagina(pasta: string, { noindex = true } = {}) {
	const analises = await verificarSite({
		dist: pasta,
		paginas: paginasDe(pasta),
		noindex,
		execucoes: 1,
	});
	return Object.fromEntries(analises.map((a) => [a.caminho, a.falhas]));
}

test('com o noindex ligado, o SEO exige o noindex em cada página', async () => {
	const pasta = criarSite({
		'com-noindex/index.html': pagina(),
		'sem-noindex/index.html': pagina({ noindex: false }),
	});
	expect(await falhasPorPagina(pasta)).toEqual({
		'/com-noindex/': [],
		'/sem-noindex/': ['SEO: falta o noindex'],
	});
});

test('com o noindex desligado, o SEO exige páginas indexáveis, menos as de erro', async () => {
	const pasta = criarSite({
		'indexavel/index.html': pagina({ noindex: false }),
		'bloqueada/index.html': pagina(),
		'404.html': pagina({ noindex: false }),
	});
	expect(await falhasPorPagina(pasta, { noindex: false })).toEqual({
		'/404.html': ['SEO: falta o noindex'],
		'/bloqueada/': ['SEO: Page is blocked from indexing'],
		'/indexavel/': [],
	});
});

test('o JS comprimido não passa de 75 KB', async () => {
	const pasta = criarSite({
		'js/index.html': pagina({ body: '<script src="/dados.js"></script>' }),
		'dados.js': `window.dados = '${aleatorio(100)}';`,
	});
	expect(await falhasPorPagina(pasta)).toEqual({
		'/js/': [expect.stringMatching(/^JS com \d+,\d KB, máximo 75,0 KB$/)],
	});
});

test('a página comprimida não passa de 400 KB', async () => {
	const pasta = criarSite({
		'pesada/index.html': pagina({ head: '<link rel="stylesheet" href="/estilos.css" />' }),
		'estilos.css': `/* ${aleatorio(420)} */`,
	});
	expect(await falhasPorPagina(pasta)).toEqual({
		'/pesada/': [expect.stringMatching(/^página com \d+,\d KB, máximo 400,0 KB$/)],
	});
});

test('carrega no máximo 2 fontes, todas woff2', async () => {
	// Cada fonte serve um texto visível, para o navegador a ir buscar.
	const estilos = ['a.woff2', 'b.woff2', 'c.ttf']
		.map(
			(fonte, i) =>
				`@font-face { font-family: f${i}; src: url(/${fonte}); } .f${i} { font-family: f${i}; }`,
		)
		.join('\n');
	const pasta = criarSite({
		'fontes/index.html': pagina({
			head: `<style>${estilos}</style>`,
			body: '<p class="f0">Um</p><p class="f1">Dois</p><p class="f2">Três</p>',
		}),
		'a.woff2': aleatorio(1),
		'b.woff2': aleatorio(1),
		'c.ttf': aleatorio(1),
	});
	expect(await falhasPorPagina(pasta)).toEqual({
		'/fontes/': ['3 fontes, máximo 2', 'fonte que não é woff2: /c.ttf'],
	});
});

test('não faz pedidos a outros domínios', async () => {
	// O domínio .invalid nunca existe: o pedido falha logo, mas fica registado.
	const pasta = criarSite({
		'externa/index.html': pagina({
			body: '<img src="https://outro-dominio.invalid/imagem.png" alt="" width="10" height="10" />',
		}),
	});
	expect(await falhasPorPagina(pasta)).toEqual({
		'/externa/': ['pedido a outro domínio: https://outro-dominio.invalid/imagem.png'],
	});
});
