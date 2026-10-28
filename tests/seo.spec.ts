// What Google and LinkedIn read from the pages (#54, "SEO").
// The noindex of each phase and the canonical are checked on every page, in all-pages.spec.ts.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { equivalent, LANGUAGES, NAME, SITE, type Language } from './expected';

/** Opens the page and returns its `hreflang` tags, as { code: URL }. A repeated code fails. */
async function hreflang(page: Page, path: string): Promise<Record<string, string>> {
	await page.goto(path);
	const tags = await page
		.locator('link[rel="alternate"][hreflang]')
		.evaluateAll((links) =>
			links.map((l) => [l.getAttribute('hreflang')!, l.getAttribute('href')!] as const),
		);
	expect(new Set(tags.map(([code]) => code)).size, 'repeated codes').toBe(tags.length);
	return Object.fromEntries(tags);
}

inEachBuild((build) => {
	const publishedLanguages: readonly Language[] = build.phase.publishedLanguages;
	const languagePages = pagesOf(build).filter((p) => p.language);

	for (const { path, language } of languagePages) {
		test(`${path}: the hreflang has the page in each published language and the x-default in English`, async ({
			page,
		}) => {
			// The hreflang codes are fr, en and pt, with no region.
			const expected: Record<string, string> = {};
			for (const l of publishedLanguages) expected[l] = `${SITE}${equivalent(path, language!, l)}`;
			// Without English published, the x-default would point to a page that does not exist.
			if (publishedLanguages.includes('en')) {
				expected['x-default'] = `${SITE}${equivalent(path, language!, 'en')}`;
			}
			expect(await hreflang(page, path)).toEqual(expected);
		});
	}

	test('the hreflang tags are reciprocal', async ({ page }) => {
		let checked = 0;
		for (const { path, language } of languagePages) {
			for (const [code, url] of Object.entries(await hreflang(page, path))) {
				if (code === 'x-default') continue;
				const otherTags = await hreflang(page, new URL(url).pathname);
				expect(otherTags[language!], `${url} points back to ${path}`).toBe(`${SITE}${path}`);
				checked++;
			}
		}
		expect(checked).toBe(languagePages.length * publishedLanguages.length);
	});

	for (const { path } of languagePages) {
		test(`${path}: the Open Graph has the page title and description and the image in English`, async ({
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

			// A single image, in English, for all three languages: the logo and the Designation.
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
			// The width and height are in the IHDR header of the PNG, right after the signature.
			const png = await response.body();
			expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
		});
	}

	for (const { path } of pagesOf(build).filter((p) => !p.language)) {
		test(`${path}: a page with no language has no canonical, hreflang or Open Graph`, async ({
			page,
		}) => {
			await page.goto(path);
			await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
			await expect(page.locator('link[hreflang]')).toHaveCount(0);
			await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
		});
	}

	test('the sitemap.xml only lists indexable pages, without the 404', async ({ page, request }) => {
		const response = await request.get('/sitemap.xml');
		expect(response.status()).toBe(200);
		// astro preview says text/xml, and Apache says application/xml: both are valid for a sitemap.
		expect(response.headers()['content-type']).toMatch(/^(application|text)\/xml\b/);
		const xml = await response.text();
		const urls = await page.evaluate((xml) => {
			const parsed = new DOMParser().parseFromString(xml, 'application/xml');
			if (parsed.querySelector('parsererror')) throw new Error(`Invalid XML:\n${xml}`);
			const root = parsed.documentElement;
			if (
				root.localName !== 'urlset' ||
				root.namespaceURI !== 'http://www.sitemaps.org/schemas/sitemap/0.9'
			) {
				throw new Error(`Not a sitemap: ${root.outerHTML.slice(0, 120)}`);
			}
			return [...root.querySelectorAll('url > loc')].map((loc) => loc.textContent);
		}, xml);

		// With the noindex of the phase, no page is indexable: the sitemap stays empty.
		const indexable = build.phase.noindex ? [] : languagePages.map((p) => `${SITE}${p.path}`);
		expect(urls.toSorted()).toEqual(indexable.toSorted());
		for (const url of urls) {
			await page.goto(new URL(url!).pathname);
			await expect(page.locator('meta[name="robots"][content*="noindex"]'), url!).toHaveCount(0);
		}
		expect(urls).not.toContain(`${SITE}/404.html`);
	});

	test('the robots.txt points to the sitemap and does not block crawling', async ({ request }) => {
		const response = await request.get('/robots.txt');
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toMatch(/^text\/plain\b/);
		const lines = (await response.text()).split('\n').map((line) => line.trim());
		expect(lines).toContain(`Sitemap: ${SITE}/sitemap.xml`);
		expect(lines).toContain('User-agent: *');
		expect(lines.filter((line) => /^Disallow:\s*\S/i.test(line))).toEqual([]);
	});

	for (const { path } of pagesOf(build)) {
		test(`${path}: has no schema.org structured data`, async ({ page }) => {
			await page.goto(path);
			await expect(
				page.locator('script[type="application/ld+json"], [itemscope], [itemtype], [typeof]'),
			).toHaveCount(0);
		});
	}
});
