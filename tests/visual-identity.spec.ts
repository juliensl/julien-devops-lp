// The visual identity: the 2 fonts hosted on the site and where each one renders text.
// The ≥ and the narrow no-break space (U+202F) are tested with the real content, in the tickets that add them.
import { expect, test, type Locator } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { NAME } from './expected';

/**
 * The fonts the browser used to render the text of an element, by the name inside the file.
 * Only Chromium reports this (DevTools protocol).
 */
async function renderedFonts(element: Locator) {
	await element.evaluate((e) => e.setAttribute('data-fonts', ''));
	const cdp = await element.page().context().newCDPSession(element.page());
	await cdp.send('DOM.enable');
	await cdp.send('CSS.enable');
	const { root } = await cdp.send('DOM.getDocument');
	const { nodeId } = await cdp.send('DOM.querySelector', {
		nodeId: root.nodeId,
		selector: '[data-fonts]',
	});
	const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
	await element.evaluate((e) => e.removeAttribute('data-fonts'));
	return fonts.map((f) => (f.isCustomFont ? f.familyName : `${f.familyName} (system)`));
}

inEachBuild((build) => {
	for (const { path } of pagesOf(build)) {
		test.describe(path, () => {
			test('loads the 2 site fonts and preloads only one, with crossorigin', async ({
				page,
				baseURL,
				browserName,
			}) => {
				const requests: string[] = [];
				page.on('request', (request) => {
					if (request.resourceType() === 'font') requests.push(request.url());
				});
				await page.goto(path, { waitUntil: 'networkidle' });
				const fonts = [...new Set(requests)];
				expect(fonts).toHaveLength(2);
				// WebKit sometimes requests the preloaded font twice: astro preview serves it with
				// `Cache-Control: no-cache`, and WebKit requests it again if the CSS only asks for it after the preload
				// has finished. Chromium always uses the preload: there, a second request would be a wasted preload.
				if (browserName === 'chromium') expect(requests).toHaveLength(2);
				for (const font of fonts) {
					expect(font.startsWith(`${baseURL}/`), font).toBe(true);
					expect(font).toMatch(/\.woff2$/);
				}
				const preload = page.locator('link[rel="preload"][as="font"]');
				await expect(preload).toHaveCount(1);
				await expect(preload).toHaveAttribute('crossorigin');
			});
		});
	}

	test.describe('in Chromium', () => {
		test.skip(
			({ browserName }) => browserName !== 'chromium',
			'only Chromium reports which font it rendered',
		);
		const { path } = pagesOf(build).find((p) => p.language)!;

		test('headings and the logo render in Bona Nova, and body text in Geist', async ({ page }) => {
			await page.goto(path, { waitUntil: 'networkidle' });
			const logo = page.getByRole('banner').getByRole('link', { name: NAME });
			expect(await renderedFonts(page.getByRole('heading', { level: 1 }))).toEqual(['Bona Nova']);
			expect(await renderedFonts(logo.getByText('Laffont'))).toEqual(['Bona Nova']);
			expect(await renderedFonts(page.getByRole('main').getByRole('paragraph').first())).toEqual([
				'Geist',
			]);
		});
	});
});
