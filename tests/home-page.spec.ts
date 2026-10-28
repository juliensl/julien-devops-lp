import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, BOOKING_PAGE } from './expected';

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, designation, promise, button } = LANGUAGES[language];

		test(`${prefix}: the Hero shows the Designation and the Promise`, async ({ page }) => {
			await page.goto(prefix);
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(promise);
			// The Designation also appears in "Quem é o Julien" (#54).
			const hero = page.getByRole('region', { name: promise });
			await expect(hero.getByText(designation, { exact: true })).toBeVisible();
		});

		test(`${prefix}: the title has the Designation and the description starts with the Promise`, async ({
			page,
		}) => {
			await page.goto(prefix);
			await expect(page).toHaveTitle(`Julien Laffont · ${designation}`);
			const description = await page.locator('meta[name="description"]').getAttribute('content');
			expect(description).toMatch(new RegExp(`^${RegExp.escape(promise)} \\S`));
		});

		test(`${prefix}: "${button}" leads to the booking page, in the same tab`, async ({ page }) => {
			await page.goto(prefix);
			const buttons = page.getByRole('link', { name: button, exact: true });
			await expect(buttons.first()).toBeVisible();
			for (const button of await buttons.all()) {
				await expect(button).toHaveAttribute('href', BOOKING_PAGE);
				await expect(button).not.toHaveAttribute('target');
			}
		});
	}
});
