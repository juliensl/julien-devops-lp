import { expect, test } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { LANGUAGES } from './expected';

inEachBuild((build) => {
	const publishedLanguages: readonly string[] = build.phase.publishedLanguages;

	test('only published languages have a home page', async ({ request }) => {
		for (const [language, { prefix }] of Object.entries(LANGUAGES)) {
			const response = await request.get(prefix);
			const expected = publishedLanguages.includes(language) ? 200 : 404;
			expect(response.status(), `${prefix} (${language})`).toBe(expected);
		}
	});

	for (const { path, language } of pagesOf(build)) {
		if (!language) continue;
		test(`${path} is in a published language, with its <html lang>`, async ({ page }) => {
			expect(publishedLanguages).toContain(language);
			await page.goto(path);
			await expect(page.locator('html')).toHaveAttribute('lang', LANGUAGES[language].htmlCode);
		});
	}
});
