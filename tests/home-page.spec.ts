import { expect, test } from '@playwright/test';
import { emCadaBuild } from './builds';
import { LINGUAS, PAGINA_DE_MARCACAO } from './expected';

emCadaBuild((build) => {
	for (const lingua of build.fase.linguasPublicadas) {
		const { inicio, designacao, promessa, botao } = LINGUAS[lingua];

		test(`${inicio}: o Hero mostra a Designação e a Promessa`, async ({ page }) => {
			await page.goto(inicio);
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(promessa);
			// A Designação aparece também em «Quem é o Julien» (#54).
			const hero = page.getByRole('region', { name: promessa });
			await expect(hero.getByText(designacao, { exact: true })).toBeVisible();
		});

		test(`${inicio}: o título tem a Designação e a descrição parte da Promessa`, async ({
			page,
		}) => {
			await page.goto(inicio);
			await expect(page).toHaveTitle(`Julien Laffont · ${designacao}`);
			const descricao = await page.locator('meta[name="description"]').getAttribute('content');
			expect(descricao).toMatch(new RegExp(`^${RegExp.escape(promessa)} \\S`));
		});

		test(`${inicio}: «${botao}» leva à página de marcação, no mesmo separador`, async ({
			page,
		}) => {
			await page.goto(inicio);
			const botoes = page.getByRole('link', { name: botao, exact: true });
			await expect(botoes.first()).toBeVisible();
			for (const botao of await botoes.all()) {
				await expect(botao).toHaveAttribute('href', PAGINA_DE_MARCACAO);
				await expect(botao).not.toHaveAttribute('target');
			}
		});
	}
});
