// The 404 page: English only, with the look of the site and a way back (#54, "Página 404").
// It serves any address that does not exist, and also `/` while French is not published.
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
		test(`${path} answers 404 and shows the 404, in English`, async ({ page }) => {
			const response = await page.goto(path);
			expect(response?.status()).toBe(404);
			await expect(page.locator('html')).toHaveAttribute('lang', 'en');
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(TITLE);
		});
	}

	test('the 404 links to the home page of each published language', async ({ page }) => {
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

	test('the 404 header has the logo and no language switcher or menu', async ({ page }) => {
		await page.goto(missingPaths[0]);
		const header = page.getByRole('banner');
		// The first published language: French, the Default language, when it is published.
		await expect(header.getByRole('link', { name: NAME })).toHaveAttribute(
			'href',
			LANGUAGES[publishedLanguages[0]].prefix,
		);
		for (const { name } of Object.values(LANGUAGES)) {
			await expect(header.getByText(name)).toHaveCount(0);
		}
		// The phone menu would only hold the languages: the button that opens it (the `<summary>`) does not exist.
		await expect(header.locator('summary')).toHaveCount(0);
	});
});
