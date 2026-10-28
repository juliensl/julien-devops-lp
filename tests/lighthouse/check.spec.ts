// O verificador do Lighthouse (#59), sobre um site de teste com páginas que falham cada meta.
// Corre o Lighthouse a sério, numa execução por página: se uma atualização dele mudar o
// relatório e uma meta deixar de disparar, estes testes ficam vermelhos.
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { expect, test } from '@playwright/test';
import { pagesIn } from '../builds';
import { checkSite } from './check';

// Cada teste analisa as suas páginas com o Lighthouse, uma de cada vez.
test.describe.configure({ timeout: 120_000 });

interface TestPageOptions {
	noindex?: boolean;
	head?: string;
	body?: string;
}

/** Uma página que cumpre todas as metas, a não ser que `head` ou `body` a estraguem. */
function testPage({ noindex = true, head = '', body = '' }: TestPageOptions = {}) {
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
function createSite(files: Record<string, string>) {
	const folder = test.info().outputPath('site');
	for (const [path, content] of Object.entries(files)) {
		mkdirSync(dirname(join(folder, path)), { recursive: true });
		writeFileSync(join(folder, path), content);
	}
	return folder;
}

/**
 * Texto que a compressão quase não reduz: `kb` KB de bytes ao acaso, em base64.
 * Comprimido, fica com cerca de `kb` KB.
 */
function randomText(kb: number) {
	return randomBytes(kb * 1024).toString('base64');
}

/** Analisa todas as páginas do site, uma execução cada, e devolve as falhas de cada uma. */
async function failuresByPage(folder: string, { noindex = true } = {}) {
	const analyses = await checkSite({
		dist: folder,
		pages: pagesIn(folder),
		noindex,
		runs: 1,
	});
	return Object.fromEntries(analyses.map((a) => [a.path, a.failures]));
}

test('com o noindex ligado, o SEO exige o noindex em cada página', async () => {
	const folder = createSite({
		'com-noindex/index.html': testPage(),
		'sem-noindex/index.html': testPage({ noindex: false }),
	});
	expect(await failuresByPage(folder)).toEqual({
		'/com-noindex/': [],
		'/sem-noindex/': ['SEO: falta o noindex'],
	});
});

test('com o noindex desligado, o SEO exige páginas indexáveis, menos as de erro', async () => {
	const folder = createSite({
		'indexavel/index.html': testPage({ noindex: false }),
		'bloqueada/index.html': testPage(),
		'404.html': testPage({ noindex: false }),
	});
	expect(await failuresByPage(folder, { noindex: false })).toEqual({
		'/404.html': ['SEO: falta o noindex'],
		'/bloqueada/': ['SEO: Page is blocked from indexing'],
		'/indexavel/': [],
	});
});

test('o JS comprimido não passa de 75 KB', async () => {
	const folder = createSite({
		'js/index.html': testPage({ body: '<script src="/dados.js"></script>' }),
		'dados.js': `window.dados = '${randomText(100)}';`,
	});
	expect(await failuresByPage(folder)).toEqual({
		'/js/': [expect.stringMatching(/^JS com \d+,\d KB, máximo 75,0 KB$/)],
	});
});

test('a página comprimida não passa de 400 KB', async () => {
	const folder = createSite({
		'pesada/index.html': testPage({ head: '<link rel="stylesheet" href="/estilos.css" />' }),
		'estilos.css': `/* ${randomText(420)} */`,
	});
	expect(await failuresByPage(folder)).toEqual({
		'/pesada/': [expect.stringMatching(/^página com \d+,\d KB, máximo 400,0 KB$/)],
	});
});

test('carrega no máximo 2 fontes, todas woff2', async () => {
	// Cada fonte serve um texto visível, para o navegador a ir buscar.
	const styles = ['a.woff2', 'b.woff2', 'c.ttf']
		.map(
			(font, i) =>
				`@font-face { font-family: f${i}; src: url(/${font}); } .f${i} { font-family: f${i}; }`,
		)
		.join('\n');
	const folder = createSite({
		'fontes/index.html': testPage({
			head: `<style>${styles}</style>`,
			body: '<p class="f0">Um</p><p class="f1">Dois</p><p class="f2">Três</p>',
		}),
		'a.woff2': randomText(1),
		'b.woff2': randomText(1),
		'c.ttf': randomText(1),
	});
	expect(await failuresByPage(folder)).toEqual({
		'/fontes/': ['3 fontes, máximo 2', 'fonte que não é woff2: /c.ttf'],
	});
});

test('não faz pedidos a outros domínios', async () => {
	// O domínio .invalid nunca existe: o pedido falha logo, mas fica registado.
	const folder = createSite({
		'externa/index.html': testPage({
			body: '<img src="https://outro-dominio.invalid/imagem.png" alt="" width="10" height="10" />',
		}),
	});
	expect(await failuresByPage(folder)).toEqual({
		'/externa/': ['pedido a outro domínio: https://outro-dominio.invalid/imagem.png'],
	});
});
