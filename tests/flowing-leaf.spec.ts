// The flowing leaf of points (#69, #54 «Direção visual › Folha»): green points flow along the outline
// and purple ones along the midrib and the veins, swaying in 3D. It is in the home page's Ecology section
// and, on the ecology page, where the ∞ is in the Hero of prototype v3 (decided with the intern).
import { expect, test, type Locator, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';

/** The home page's Ecology section: the region that leads to the ecology page. */
const homeEcology = (page: Page, prefix: string) =>
	page
		.getByRole('main')
		.getByRole('region')
		.filter({ has: page.locator(`a[href="${prefix}ecology/"]`) });

/** True while nothing has been drawn on the canvas. */
const isBlank = (canvas: Locator) =>
	canvas.evaluate((c: HTMLCanvasElement) => {
		const blank = document.createElement('canvas');
		blank.width = c.width;
		blank.height = c.height;
		return c.toDataURL() === blank.toDataURL();
	});

/** Two screenshots of the leaf, 1 s apart: different if it moved. */
async function isMoving(leaf: Locator) {
	const before = await leaf.screenshot();
	await leaf.page().waitForTimeout(1000);
	return !before.equals(await leaf.screenshot());
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];

		test.describe(`${prefix} flowing leaf`, () => {
			test('on the home page, the leaf only starts when it comes near the screen', async ({
				page,
			}) => {
				await page.goto(prefix);
				const leaf = homeEcology(page, prefix).locator('canvas');
				await expect(leaf).toHaveCount(1);
				// Long enough after loading for a leaf that started on its own to have drawn.
				await page.waitForTimeout(1000);
				expect(await isBlank(leaf), 'far below the screen').toBe(true);

				await leaf.scrollIntoViewIfNeeded();
				await expect.poll(() => isBlank(leaf), { message: 'on the screen' }).toBe(false);
			});

			test('the pause button stops the leaf', async ({ page }) => {
				const { pause, resume } = LANGUAGES[language];
				await page.goto(prefix);
				const leaf = homeEcology(page, prefix).locator('canvas');
				await leaf.scrollIntoViewIfNeeded();
				expect(await isMoving(leaf), 'before the pause').toBe(true);

				await page.getByRole('button', { name: pause, exact: true }).click();
				await expect(page.getByRole('button', { name: resume, exact: true })).toBeVisible();
				await expect.poll(() => isMoving(leaf), { message: 'paused', timeout: 10_000 }).toBe(false);
			});

			test('with reduced motion, the leaf shows but stays still', async ({ page }) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.goto(prefix);
				const leaf = homeEcology(page, prefix).locator('canvas');
				await leaf.scrollIntoViewIfNeeded();
				await expect.poll(() => isBlank(leaf)).toBe(false);
				expect(await isMoving(leaf)).toBe(false);
			});

			test('the leaf is decorative: screen readers skip it', async ({ page }) => {
				await page.goto(prefix);
				const leaf = homeEcology(page, prefix).locator('canvas');
				expect(await leaf.evaluate((c) => c.closest('[aria-hidden="true"]') !== null)).toBe(true);
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the leaf, which only JS draws, leaves no empty space', async ({ page }) => {
					await page.goto(prefix);
					await expect(homeEcology(page, prefix).locator('canvas')).toBeHidden();
				});
			});
		});
	}
});
