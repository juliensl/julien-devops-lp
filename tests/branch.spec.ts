// The branch that leaves the dotted ∞ and grows with the scroll down to the final call to action.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';
import { look, scrollPage, type Box } from './screen-canvas';

/** The ∞'s box, on screen, with room for its points that spill out of it. */
async function infinityArea(page: Page): Promise<Box> {
	const { x, y, width, height } = (await page.locator('[data-infinity]').boundingBox())!;
	return { x: x - 48, y: y - 48, width: width + 96, height: height + 96 };
}

/** How many pixels are drawn outside the ∞'s area: the branch's. */
async function drawnOutsideInfinity(page: Page) {
	const { count, drawnIn } = await look(page, { regions: [await infinityArea(page)] });
	return count - drawnIn[0];
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];

		test.describe(`${prefix} branch`, () => {
			for (const width of [375, 1280, 1440]) {
				test(`at ${width} px, the top of the page shows the ∞ alone`, async ({ page }) => {
					await page.setViewportSize({ width, height: 800 });
					await page.goto(prefix);
					await expect
						.poll(async () => (await look(page)).count, { message: 'drawn' })
						.toBeGreaterThan(0);
					await page.waitForTimeout(1500);
					expect(await drawnOutsideInfinity(page)).toBe(0);
				});
			}

			for (const width of [375, 1280]) {
				test(`at ${width} px, the branch grows out of the ∞ with the scroll and shrinks back at the top`, async ({
					page,
				}) => {
					await page.setViewportSize({ width, height: 800 });
					await page.goto(prefix);
					await expect
						.poll(async () => (await look(page)).count, { message: 'drawn' })
						.toBeGreaterThan(0);
					const { y, height } = (await page.locator('[data-infinity]').boundingBox())!;
					// From where the ∞ fills the screen best, a little further down, then further still.
					const start = Math.max(0, y + height / 2 - 400);
					await scrollPage(page, start + 150);
					await expect
						.poll(() => drawnOutsideInfinity(page), { message: 'grown' })
						.toBeGreaterThan(0);
					const area = await infinityArea(page);
					const underIt = { x: 0, y: area.y + area.height, width: area.x + area.width, height: 60 };
					await expect
						.poll(async () => (await look(page, { regions: [underIt] })).drawnIn[0], {
							message: 'it leaves the ∞ from below',
						})
						.toBeGreaterThan(0);
					const grown = await drawnOutsideInfinity(page);

					await scrollPage(page, start + 400);
					await expect
						.poll(() => drawnOutsideInfinity(page), { message: 'grown further' })
						.toBeGreaterThan(grown);

					await scrollPage(page, 0);
					await expect.poll(() => drawnOutsideInfinity(page), { message: 'shrunk' }).toBe(0);
				});
			}
		});
	}
});
