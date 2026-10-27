// A identidade visual: as 2 fontes alojadas no site e os caracteres que elas desenham.
import { expect, test, type Locator } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { NOME } from './expected';

/**
 * As fontes com que o navegador desenhou o texto de um elemento, pelo nome dentro do ficheiro.
 * Só o Chromium o diz (protocolo DevTools).
 */
async function fontesDesenhadas(elemento: Locator) {
	await elemento.evaluate((e) => e.setAttribute('data-fontes', ''));
	const cdp = await elemento.page().context().newCDPSession(elemento.page());
	await cdp.send('DOM.enable');
	await cdp.send('CSS.enable');
	const { root } = await cdp.send('DOM.getDocument');
	const { nodeId } = await cdp.send('DOM.querySelector', {
		nodeId: root.nodeId,
		selector: '[data-fontes]',
	});
	const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
	await elemento.evaluate((e) => e.removeAttribute('data-fontes'));
	return fonts.map((f) => (f.isCustomFont ? f.familyName : `${f.familyName} (do sistema)`));
}

emCadaBuild((build) => {
	for (const { caminho } of paginas(build)) {
		test.describe(caminho, () => {
			test('carrega as 2 fontes do site e pré-carrega uma só, com crossorigin', async ({
				page,
				baseURL,
				browserName,
			}) => {
				const pedidos: string[] = [];
				page.on('request', (pedido) => {
					if (pedido.resourceType() === 'font') pedidos.push(pedido.url());
				});
				await page.goto(caminho, { waitUntil: 'networkidle' });
				const fontes = [...new Set(pedidos)];
				expect(fontes).toHaveLength(2);
				// O WebKit às vezes pede duas vezes a fonte pré-carregada: o astro preview serve-a com
				// `Cache-Control: no-cache`, e o WebKit volta a pedi-la se o CSS só a pede depois de o preload
				// acabar. O Chromium usa sempre o preload: nele, um segundo pedido seria um preload perdido.
				if (browserName === 'chromium') expect(pedidos).toHaveLength(2);
				for (const fonte of fontes) {
					expect(fonte.startsWith(`${baseURL}/`), fonte).toBe(true);
					expect(fonte).toMatch(/\.woff2$/);
				}
				const preload = page.locator('link[rel="preload"][as="font"]');
				await expect(preload).toHaveCount(1);
				await expect(preload).toHaveAttribute('crossorigin');
			});

			test('cada fonte tem uma fonte de recurso com size-adjust', async ({ page }) => {
				await page.goto(caminho);
				const pilhas = await page.evaluate(() =>
					[document.querySelector('h1') ?? document.body, document.body].map(
						(e) => getComputedStyle(e).fontFamily,
					),
				);
				const ajustes = await page.evaluate(() =>
					[...document.styleSheets]
						.flatMap((folha) => [...folha.cssRules])
						.filter((regra) => regra instanceof CSSFontFaceRule)
						.map((regra) => ({
							familia: regra.style.getPropertyValue('font-family').replace(/["']/g, ''),
							ajuste: regra.style.getPropertyValue('size-adjust'),
						})),
				);
				for (const pilha of pilhas) {
					// A primeira é a fonte do site; a segunda, a de recurso, que o Astro gera.
					const recurso = pilha.split(',')[1]?.trim().replace(/["']/g, '');
					const regra = ajustes.find((a) => a.familia === recurso);
					expect(regra?.ajuste, pilha).toMatch(/%$/);
				}
			});
		});
	}

	test.describe('no Chromium', () => {
		test.skip(
			({ browserName }) => browserName !== 'chromium',
			'só o Chromium diz que fonte desenhou',
		);
		const { caminho } = paginas(build).find((p) => p.lingua)!;

		test('os títulos e o logótipo ficam em Bona Nova, e o texto em Geist', async ({ page }) => {
			await page.goto(caminho, { waitUntil: 'networkidle' });
			const logotipo = page.getByRole('banner').getByRole('link', { name: NOME });
			expect(await fontesDesenhadas(page.getByRole('heading', { level: 1 }))).toEqual([
				'Bona Nova',
			]);
			expect(await fontesDesenhadas(logotipo.getByText('Laffont'))).toEqual(['Bona Nova']);
			expect(await fontesDesenhadas(page.getByRole('main').getByRole('paragraph').first())).toEqual(
				['Geist'],
			);
		});

		// Estes caracteres ainda não estão na página: chegam com o gráfico cloud (≥), os Testemunhos
		// (← →) e o texto em francês (U+202F). A Geist não tem o U+202F nem na fonte completa:
		// no texto em Geist, esse espaço vem da fonte de recurso.
		test('o ≥, o ≤ e as setas ficam nas fontes do site, e o espaço fino inseparável nos títulos', async ({
			page,
		}) => {
			await page.goto(caminho, { waitUntil: 'networkidle' });
			await page.locator('main').evaluate((main) => {
				main.insertAdjacentHTML(
					'beforeend',
					'<h2 id="t">≥ 0,7 ≤ ← → 99 %</h2><p id="p">≥ 0,7 ≤ ← →</p>',
				);
			});
			await page.evaluate(() => document.fonts.ready);
			expect(await fontesDesenhadas(page.locator('#t'))).toEqual(['Bona Nova']);
			expect(await fontesDesenhadas(page.locator('#p'))).toEqual(['Geist']);
		});
	});
});
