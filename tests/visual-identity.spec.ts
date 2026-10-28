// A identidade visual: as 2 fontes alojadas no site e onde cada uma desenha o texto.
// O ≥ e o espaço fino inseparável (U+202F) testam-se com o conteúdo real, nos tickets que os trazem.
import { expect, test, type Locator } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { NAME } from './expected';

/**
 * As fontes com que o navegador desenhou o texto de um elemento, pelo nome dentro do ficheiro.
 * Só o Chromium o diz (protocolo DevTools).
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
	return fonts.map((f) => (f.isCustomFont ? f.familyName : `${f.familyName} (do sistema)`));
}

inEachBuild((build) => {
	for (const { path } of pagesOf(build)) {
		test.describe(path, () => {
			test('carrega as 2 fontes do site e pré-carrega uma só, com crossorigin', async ({
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
				// O WebKit às vezes pede duas vezes a fonte pré-carregada: o astro preview serve-a com
				// `Cache-Control: no-cache`, e o WebKit volta a pedi-la se o CSS só a pede depois de o preload
				// acabar. O Chromium usa sempre o preload: nele, um segundo pedido seria um preload perdido.
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

	test.describe('no Chromium', () => {
		test.skip(
			({ browserName }) => browserName !== 'chromium',
			'só o Chromium diz que fonte desenhou',
		);
		const { path } = pagesOf(build).find((p) => p.language)!;

		test('os títulos e o logótipo ficam em Bona Nova, e o texto em Geist', async ({ page }) => {
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
