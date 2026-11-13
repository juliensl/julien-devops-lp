// The logo's dotted ∞: a pen traces it once on each page load, then it stays still.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';

const infinity = (page: Page) => page.getByRole('banner').locator('[data-logo-infinity]');

/** Whether the ∞ shows and is formed, and how many of its points are lit. */
function look(page: Page) {
	return infinity(page).evaluate((svg) => {
		const dots = [...svg.querySelectorAll('circle[data-along]')];
		return {
			shown: getComputedStyle(svg).visibility === 'visible',
			formed: svg.dataset.state === 'formed',
			lit: dots.filter((dot) => Number(getComputedStyle(dot).opacity) > 0).length,
			points: dots.length,
		};
	});
}

/** Opens the page with its clock stopped: the pen only moves when the test runs the clock. */
async function openWithClockStopped(page: Page, path: string) {
	await page.clock.install({ time: 0 });
	await page.clock.pauseAt(1000);
	await page.goto(path);
}

inEachBuild((build) => {
	const { prefix, pause } = LANGUAGES[build.phase.publishedLanguages[0]];

	test.describe(`${prefix} logo`, () => {
		test('after the page loads, a pen traces the ∞ once, then it stays still', async ({ page }) => {
			await openWithClockStopped(page, prefix);
			await expect(infinity(page)).toHaveAttribute('aria-hidden', 'true');
			expect(await look(page)).toMatchObject({ shown: true, formed: false, lit: 0 });

			await page.clock.runFor(900);
			const halfway = await look(page);
			expect(halfway.lit, 'points lit halfway').toBeGreaterThan(halfway.points * 0.2);
			expect(halfway.lit, 'points lit halfway').toBeLessThan(halfway.points * 0.8);

			await page.clock.runFor(1500);
			const formed = await look(page);
			expect(formed).toEqual({
				shown: true,
				formed: true,
				lit: formed.points,
				points: formed.points,
			});
			const drawing = await infinity(page).evaluate((svg) => svg.outerHTML);
			await page.clock.runFor(2000);
			expect(await infinity(page).evaluate((svg) => svg.outerHTML), 'still').toBe(drawing);

			// Every page load traces it again.
			await page.reload();
			expect(await look(page)).toMatchObject({ formed: false, lit: 0 });
		});

		test('the pause button forms it at once', async ({ page }) => {
			await openWithClockStopped(page, prefix);
			await page.clock.runFor(500);
			await page.getByRole('button', { name: pause, exact: true }).click();
			const { formed, lit, points } = await look(page);
			expect({ formed, lit }).toEqual({ formed: true, lit: points });
		});

		test('with reduced motion, it is formed from the start', async ({ page }) => {
			await page.emulateMedia({ reducedMotion: 'reduce' });
			await page.goto(prefix);
			const { shown, formed, lit, points } = await look(page);
			expect({ shown, formed, lit }).toEqual({ shown: true, formed: true, lit: points });
		});

		test.describe('without JavaScript', () => {
			test.use({ javaScriptEnabled: false });

			test('it is formed from the start', async ({ page }) => {
				await page.goto(prefix);
				const { shown, lit, points } = await look(page);
				expect({ shown, lit }).toEqual({ shown: true, lit: points });
			});
		});
	});
});
