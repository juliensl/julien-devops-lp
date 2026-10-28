// The Lighthouse checker (#59), on a test site with pages that fail each target.
// Runs the real Lighthouse, one run per page: if a Lighthouse update changes the
// report and a target stops firing, these tests turn red.
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { expect, test } from '@playwright/test';
import { pagesIn } from '../builds';
import { checkSite } from './check';

// Each test analyzes its pages with Lighthouse, one at a time.
test.describe.configure({ timeout: 120_000 });

interface TestPageOptions {
	noindex?: boolean;
	head?: string;
	body?: string;
}

/** A page that meets every target, unless `head` or `body` break it. */
function testPage({ noindex = true, head = '', body = '' }: TestPageOptions = {}) {
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Test page</title>
		<meta name="description" content="A test page for the Lighthouse checker." />
		${noindex ? '<meta name="robots" content="noindex" />' : ''}
		${head}
	</head>
	<body>
		<main>
			<h1>Test page</h1>
			${body}
		</main>
	</body>
</html>`;
}

/** Writes the test site into the test's output folder and returns the folder. */
function createSite(files: Record<string, string>) {
	const folder = test.info().outputPath('site');
	for (const [path, content] of Object.entries(files)) {
		mkdirSync(dirname(join(folder, path)), { recursive: true });
		writeFileSync(join(folder, path), content);
	}
	return folder;
}

/**
 * Text that compression barely shrinks: `kb` KB of random bytes, in base64.
 * Compressed, it stays at about `kb` KB.
 */
function randomText(kb: number) {
	return randomBytes(kb * 1024).toString('base64');
}

/** Analyzes every page of the site, one run each, and returns the failures of each page. */
async function failuresByPage(folder: string, { noindex = true } = {}) {
	const analyses = await checkSite({
		dist: folder,
		pages: pagesIn(folder),
		noindex,
		runs: 1,
	});
	return Object.fromEntries(analyses.map((a) => [a.path, a.failures]));
}

test('with noindex on, SEO requires noindex on every page', async () => {
	const folder = createSite({
		'with-noindex/index.html': testPage(),
		'without-noindex/index.html': testPage({ noindex: false }),
	});
	expect(await failuresByPage(folder)).toEqual({
		'/with-noindex/': [],
		'/without-noindex/': ['SEO: missing noindex'],
	});
});

test('with noindex off, SEO requires indexable pages, except error pages', async () => {
	const folder = createSite({
		'indexable/index.html': testPage({ noindex: false }),
		'blocked/index.html': testPage(),
		'404.html': testPage({ noindex: false }),
	});
	expect(await failuresByPage(folder, { noindex: false })).toEqual({
		'/404.html': ['SEO: missing noindex'],
		'/blocked/': ['SEO: Page is blocked from indexing'],
		'/indexable/': [],
	});
});

test('compressed JS stays within 75 KB', async () => {
	const folder = createSite({
		'js/index.html': testPage({ body: '<script src="/data.js"></script>' }),
		'data.js': `window.data = '${randomText(100)}';`,
	});
	expect(await failuresByPage(folder)).toEqual({
		'/js/': [expect.stringMatching(/^JS weighs \d+\.\d KB, max 75\.0 KB$/)],
	});
});

test('compressed page stays within 400 KB', async () => {
	const folder = createSite({
		'heavy/index.html': testPage({ head: '<link rel="stylesheet" href="/styles.css" />' }),
		'styles.css': `/* ${randomText(420)} */`,
	});
	expect(await failuresByPage(folder)).toEqual({
		'/heavy/': [expect.stringMatching(/^page weighs \d+\.\d KB, max 400\.0 KB$/)],
	});
});

test('loads at most 2 fonts, all woff2', async () => {
	// Each font styles visible text, so that the browser fetches it.
	const styles = ['a.woff2', 'b.woff2', 'c.ttf']
		.map(
			(font, i) =>
				`@font-face { font-family: f${i}; src: url(/${font}); } .f${i} { font-family: f${i}; }`,
		)
		.join('\n');
	const folder = createSite({
		'fonts/index.html': testPage({
			head: `<style>${styles}</style>`,
			body: '<p class="f0">One</p><p class="f1">Two</p><p class="f2">Three</p>',
		}),
		'a.woff2': randomText(1),
		'b.woff2': randomText(1),
		'c.ttf': randomText(1),
	});
	expect(await failuresByPage(folder)).toEqual({
		'/fonts/': ['3 fonts, max 2', 'font not in woff2: /c.ttf'],
	});
});

test('makes no requests to other domains', async () => {
	// The .invalid domain never exists: the request fails at once, but is still recorded.
	const folder = createSite({
		'external/index.html': testPage({
			body: '<img src="https://outro-dominio.invalid/imagem.png" alt="" width="10" height="10" />',
		}),
	});
	expect(await failuresByPage(folder)).toEqual({
		'/external/': ['request to another domain: https://outro-dominio.invalid/imagem.png'],
	});
});
