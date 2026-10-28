// A página 404: só em inglês, com o aspeto do site e um caminho de volta (#54, «Página 404»).
// Serve qualquer endereço inexistente, e também `/` enquanto o francês não estiver publicado.
import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, NAME, type Language } from './expected';

const TITLE = "This page doesn't exist";

inEachBuild((build) => {
	const publishedLanguages: readonly Language[] = build.phase.publishedLanguages;
	const unpublishedLanguages = (Object.keys(LANGUAGES) as Language[]).filter(
		(l) => !publishedLanguages.includes(l),
	);
	const missingPaths = ['/does-not-exist/', '/pt/does-not-exist/'];
	if (!publishedLanguages.includes('fr')) missingPaths.push('/');

	for (const path of missingPaths) {
		test(`${path} responde 404 e mostra a 404, em inglês`, async ({ page }) => {
			const response = await page.goto(path);
			expect(response?.status()).toBe(404);
			await expect(page.locator('html')).toHaveAttribute('lang', 'en');
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(TITLE);
		});
	}

	test('a 404 leva à página principal de cada língua publicada', async ({ page }) => {
		await page.goto(missingPaths[0]);
		const main = page.getByRole('main');
		for (const language of publishedLanguages) {
			const { name, prefix, htmlCode } = LANGUAGES[language];
			const link = main.getByRole('link', { name, exact: true });
			await expect(link).toHaveAttribute('href', prefix);
			await expect(link).toHaveAttribute('lang', htmlCode);
		}
		for (const language of unpublishedLanguages) {
			await expect(page.getByText(LANGUAGES[language].name)).toHaveCount(0);
		}
	});

	test('o cabeçalho da 404 tem o logótipo e não tem seletor de língua nem menu', async ({
		page,
	}) => {
		await page.goto(missingPaths[0]);
		const header = page.getByRole('banner');
		// A primeira língua publicada: o francês, Língua por defeito, quando está publicado.
		await expect(header.getByRole('link', { name: NAME })).toHaveAttribute(
			'href',
			LANGUAGES[publishedLanguages[0]].prefix,
		);
		for (const { name } of Object.values(LANGUAGES)) {
			await expect(header.getByText(name)).toHaveCount(0);
		}
		// O menu do telemóvel só teria as línguas: o botão que o abre (o <summary>) não existe.
		await expect(header.locator('summary')).toHaveCount(0);
	});
});
