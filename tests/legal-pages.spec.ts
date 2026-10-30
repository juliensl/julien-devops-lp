// The legal pages (#71, #54 «Páginas legais»): the Legal information and the Privacy policy, in each
// published language, which the footer of every page leads to, next to the email on the domain.
import { expect, test } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { EMAIL, LANGUAGES, NAME, type Language } from './expected';

/** The titles of the two pages in each language (#54). */
const TITLES: Record<Language, { legal: string; privacy: string }> = {
	fr: { legal: 'Mentions légales', privacy: 'Politique de confidentialité' },
	en: { legal: 'Legal notice', privacy: 'Privacy policy' },
	pt: { legal: 'Informação legal', privacy: 'Política de privacidade' },
};

const PAGES = ['legal', 'privacy'] as const;

inEachBuild((build) => {
	for (const { path, language } of pagesOf(build)) {
		// The 404 has no language of its own: its texts are in English and, like its logo, its links lead
		// to the first published language.
		const target = language ?? build.phase.publishedLanguages[0];
		const titles = TITLES[language ?? 'en'];

		test.describe(`${path} footer`, () => {
			test('shows the email on the domain', async ({ page }) => {
				await page.goto(path);
				const link = page.getByRole('contentinfo').getByRole('link', { name: EMAIL, exact: true });
				await expect(link).toBeVisible();
				await expect(link).toHaveAttribute('href', `mailto:${EMAIL}`);
			});

			for (const legalPage of PAGES) {
				test(`leads to the ${legalPage} page in the same language`, async ({ page }) => {
					await page.goto(path);
					const link = page
						.getByRole('contentinfo')
						.getByRole('link', { name: titles[legalPage], exact: true });
					await expect(link).toBeVisible();
					const href = `${LANGUAGES[target].prefix}${legalPage}/`;
					await expect(link).toHaveAttribute('href', href);
					if (path === href) {
						await expect(link).toHaveAttribute('aria-current', 'page');
					} else {
						await expect(link).not.toHaveAttribute('aria-current');
					}
				});
			}
		});
	}

	for (const language of build.phase.publishedLanguages) {
		for (const legalPage of PAGES) {
			const path = `${LANGUAGES[language].prefix}${legalPage}/`;
			const title = TITLES[language][legalPage];

			test(`${path} has the title «${title}»`, async ({ page }) => {
				const response = await page.goto(path);
				expect(response?.status()).toBe(200);
				await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
				await expect(page).toHaveTitle(`${title} · ${NAME}`);
			});
		}
	}
});
