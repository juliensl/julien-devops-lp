// O que o Google e o LinkedIn leem das páginas (#54, «SEO»).
// O noindex de cada fase e o canonical verificam-se em todas as páginas, em all-pages.spec.ts.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { equivalent, LANGUAGES, NAME, SITE, type Language } from './expected';

/** Abre a página e devolve as etiquetas `hreflang` dela, como { código: URL }. Um código repetido falha. */
async function hreflang(page: Page, path: string): Promise<Record<string, string>> {
	await page.goto(path);
	const tags = await page
		.locator('link[rel="alternate"][hreflang]')
		.evaluateAll((links) =>
			links.map((l) => [l.getAttribute('hreflang')!, l.getAttribute('href')!] as const),
		);
	expect(new Set(tags.map(([code]) => code)).size, 'códigos repetidos').toBe(tags.length);
	return Object.fromEntries(tags);
}

inEachBuild((build) => {
	const publishedLanguages: readonly Language[] = build.phase.publishedLanguages;
	const languagePages = pagesOf(build).filter((p) => p.language);

	for (const { path, language } of languagePages) {
		test(`${path}: o hreflang tem a página em cada língua publicada e o x-default em inglês`, async ({
			page,
		}) => {
			// Os códigos do hreflang são fr, en e pt, sem região.
			const expected: Record<string, string> = {};
			for (const l of publishedLanguages) expected[l] = `${SITE}${equivalent(path, language!, l)}`;
			// Sem o inglês publicado, o x-default apontaria para uma página que não existe.
			if (publishedLanguages.includes('en')) {
				expected['x-default'] = `${SITE}${equivalent(path, language!, 'en')}`;
			}
			expect(await hreflang(page, path)).toEqual(expected);
		});
	}

	test('os hreflang são recíprocos', async ({ page }) => {
		let checked = 0;
		for (const { path, language } of languagePages) {
			for (const [code, url] of Object.entries(await hreflang(page, path))) {
				if (code === 'x-default') continue;
				const otherTags = await hreflang(page, new URL(url).pathname);
				expect(otherTags[language!], `${url} aponta de volta para ${path}`).toBe(`${SITE}${path}`);
				checked++;
			}
		}
		expect(checked).toBe(languagePages.length * publishedLanguages.length);
	});

	for (const { path } of languagePages) {
		test(`${path}: o Open Graph tem o título e a descrição da página e a imagem em inglês`, async ({
			page,
			request,
		}) => {
			await page.goto(path);
			const og = (property: string) => page.locator(`meta[property="og:${property}"]`);
			await expect(og('type')).toHaveAttribute('content', 'website');
			await expect(og('url')).toHaveAttribute('content', `${SITE}${path}`);
			await expect(og('title')).toHaveAttribute('content', await page.title());
			const description = await page.locator('meta[name="description"]').getAttribute('content');
			await expect(og('description')).toHaveAttribute('content', description!);

			// Uma só imagem, em inglês, para as três línguas: o logótipo e a Designação.
			await expect(og('image')).toHaveCount(1);
			const image = new URL((await og('image').getAttribute('content'))!);
			expect(image.origin).toBe(SITE);
			await expect(og('image:alt')).toHaveAttribute(
				'content',
				`${NAME}, ${LANGUAGES.en.designation}`,
			);
			await expect(og('image:width')).toHaveAttribute('content', '1200');
			await expect(og('image:height')).toHaveAttribute('content', '630');

			const response = await request.get(image.pathname);
			expect(response.status()).toBe(200);
			expect(response.headers()['content-type']).toBe('image/png');
			// A largura e a altura estão no cabeçalho IHDR do PNG, a seguir à assinatura.
			const png = await response.body();
			expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
		});
	}

	for (const { path } of pagesOf(build).filter((p) => !p.language)) {
		test(`${path}: uma página sem língua não tem canonical, hreflang nem Open Graph`, async ({
			page,
		}) => {
			await page.goto(path);
			await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
			await expect(page.locator('link[hreflang]')).toHaveCount(0);
			await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
		});
	}

	test('o sitemap.xml só lista as páginas indexáveis, sem a 404', async ({ page, request }) => {
		const response = await request.get('/sitemap.xml');
		expect(response.status()).toBe(200);
		// O astro preview diz text/xml, e o Apache application/xml: os dois valem para um sitemap.
		expect(response.headers()['content-type']).toMatch(/^(application|text)\/xml\b/);
		const xml = await response.text();
		const urls = await page.evaluate((xml) => {
			const parsed = new DOMParser().parseFromString(xml, 'application/xml');
			if (parsed.querySelector('parsererror')) throw new Error(`XML inválido:\n${xml}`);
			const root = parsed.documentElement;
			if (
				root.localName !== 'urlset' ||
				root.namespaceURI !== 'http://www.sitemaps.org/schemas/sitemap/0.9'
			) {
				throw new Error(`Não é um sitemap: ${root.outerHTML.slice(0, 120)}`);
			}
			return [...root.querySelectorAll('url > loc')].map((loc) => loc.textContent);
		}, xml);

		// Com o noindex da fase, nenhuma página é indexável: o sitemap fica vazio.
		const indexable = build.phase.noindex ? [] : languagePages.map((p) => `${SITE}${p.path}`);
		expect(urls.toSorted()).toEqual(indexable.toSorted());
		for (const url of urls) {
			await page.goto(new URL(url!).pathname);
			await expect(page.locator('meta[name="robots"][content*="noindex"]'), url!).toHaveCount(0);
		}
		expect(urls).not.toContain(`${SITE}/404.html`);
	});

	test('o robots.txt aponta para o sitemap e não bloqueia o rastreio', async ({ request }) => {
		const response = await request.get('/robots.txt');
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toMatch(/^text\/plain\b/);
		const lines = (await response.text()).split('\n').map((line) => line.trim());
		expect(lines).toContain(`Sitemap: ${SITE}/sitemap.xml`);
		expect(lines).toContain('User-agent: *');
		expect(lines.filter((line) => /^Disallow:\s*\S/i.test(line))).toEqual([]);
	});

	for (const { path } of pagesOf(build)) {
		test(`${path}: não tem dados estruturados schema.org`, async ({ page }) => {
			await page.goto(path);
			await expect(
				page.locator('script[type="application/ld+json"], [itemscope], [itemtype], [typeof]'),
			).toHaveCount(0);
		});
	}
});
