// As verificações que valem para todas as páginas geradas, em cada build.
// Uma página nova entra aqui sozinha, porque a lista vem da pasta do build.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { SITE } from './esperado';

const NIVEIS_WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
const LARGURAS = [320, 375, 820, 1440];

emCadaBuild((build) => {
	for (const { caminho, lingua } of paginas(build)) {
		test.describe(caminho, () => {
			test('o <head> tem o noindex da fase e o commit', async ({ page }) => {
				await page.goto(caminho);
				// As páginas de erro, sem língua, têm sempre noindex (#54).
				const robots = page.locator('meta[name="robots"]');
				if (build.fase.noindex || !lingua) {
					await expect(robots).toHaveAttribute('content', /\bnoindex\b/);
				} else {
					await expect(robots).toHaveCount(0);
				}
				await expect(page.locator('meta[name="commit"]')).toHaveAttribute(
					'content',
					/^[0-9a-f]{40}$/,
				);
			});

			if (lingua) {
				test('o canonical é o URL absoluto da página', async ({ page }) => {
					await page.goto(caminho);
					await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
						'href',
						`${SITE}${caminho}`,
					);
				});
			}

			test('o axe não encontra violações A e AA', async ({ page }) => {
				await page.goto(caminho);
				const { violations } = await new AxeBuilder({ page }).withTags(NIVEIS_WCAG).analyze();
				const violacoes = violations.map(
					(v) => `${v.id}: ${v.nodes.map((no) => no.target.join(' ')).join(' | ')}`,
				);
				expect(violacoes).toEqual([]);
			});

			test('não faz pedidos a outros domínios', async ({ page, baseURL }) => {
				const dominio = new URL(baseURL!).origin;
				const externos: string[] = [];
				page.on('request', (pedido) => {
					const url = new URL(pedido.url());
					if (url.protocol.match(/^(http|ws)s?:$/) && url.origin !== dominio)
						externos.push(url.href);
				});
				await page.goto(caminho, { waitUntil: 'networkidle' });
				expect(externos).toEqual([]);
			});

			test('não põe cookies nem guarda nada no navegador', async ({ page, context }) => {
				await page.goto(caminho, { waitUntil: 'networkidle' });
				expect(await context.storageState({ indexedDB: true })).toEqual({
					cookies: [],
					origins: [],
				});
				expect(await page.evaluate(() => sessionStorage.length)).toBe(0);
			});

			test('não tem erros de JavaScript', async ({ page }) => {
				const erros: string[] = [];
				page.on('pageerror', (erro) => erros.push(erro.message));
				page.on('console', (mensagem) => {
					if (mensagem.type() === 'error') erros.push(mensagem.text());
				});
				await page.goto(caminho, { waitUntil: 'networkidle' });
				expect(erros).toEqual([]);
			});

			for (const largura of LARGURAS) {
				test(`não tem scroll horizontal a ${largura} px`, async ({ page }) => {
					await page.setViewportSize({ width: largura, height: 900 });
					await page.goto(caminho);
					const excesso = await page.evaluate(
						() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
					);
					expect(excesso).toBeLessThanOrEqual(0);
				});
			}
		});
	}
});
