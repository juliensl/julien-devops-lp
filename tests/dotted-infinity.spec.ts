// The dotted ∞ beside the Hero, drawn on a canvas fixed over the whole screen.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';
import { isMoving, look, scrollPage, type Box } from './screen-canvas';

/** Where the ∞ is drawn, once it is. */
async function drawnBox(page: Page): Promise<Box> {
	await expect
		.poll(async () => (await look(page)).drawn, { message: 'the ∞ is drawn' })
		.toBeTruthy();
	return (await look(page)).drawn!;
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, promise, button, pause, resume } = LANGUAGES[language];
		const pauseButton = (page: Page, name: string) =>
			page.getByRole('button', { name, exact: true });
		const hero = (page: Page) => page.getByRole('region', { name: promise });

		test.describe(`${prefix} dotted ∞`, () => {
			test('on a computer, the ∞ is beside the Hero text', async ({ page }) => {
				await page.setViewportSize({ width: 1280, height: 800 });
				await page.goto(prefix);
				const infinity = await drawnBox(page);
				const heading = (await hero(page).getByRole('heading', { level: 1 }).boundingBox())!;
				const booking = (await hero(page).getByRole('link', { name: button }).boundingBox())!;
				expect(infinity.x, 'right of the heading').toBeGreaterThan(heading.x + heading.width);
				expect(infinity.y, 'level with the text').toBeLessThan(booking.y + booking.height);
				expect(infinity.y + infinity.height, 'level with the text').toBeGreaterThan(heading.y);
			});

			for (const width of [320, 375]) {
				test(`at ${width} px, the ∞ is under the Hero text`, async ({ page }) => {
					await page.setViewportSize({ width, height: 800 });
					await page.goto(prefix);
					const note = hero(page).locator('p').last();
					// The ∞ is below the first screen: scroll it into view, then measure.
					await scrollPage(page, (await note.boundingBox())!.y - 100);
					const infinity = await drawnBox(page);
					const { y, height } = (await note.boundingBox())!;
					expect(infinity.y, 'under the note').toBeGreaterThan(y + height);
				});
			}

			for (const width of [320, 375, 768, 1024, 1280, 1440]) {
				test(`at ${width} px, the ∞ never shows behind text or controls`, async ({ page }) => {
					await page.setViewportSize({ width, height: 800 });
					await page.goto(prefix);
					// From the top until the Hero has left the screen, as the next section comes up.
					const { y, height } = (await hero(page).boundingBox())!;
					let seen = 0;
					for (let scroll = 0; scroll < y + height; scroll += 250) {
						await scrollPage(page, scroll);
						const { drawn, covered } = await look(page, { checkText: true });
						if (drawn) seen++;
						expect(covered, `scrolled ${scroll} px`).toEqual([]);
					}
					expect(seen, 'positions where the ∞ is on screen').toBeGreaterThan(1);
				});
			}

			test('the ∞ is decorative: screen readers skip it and clicks go through it', async ({
				page,
			}) => {
				await page.goto(prefix);
				const { x, y, width, height } = await drawnBox(page);
				const { exposed, underThePointer } = await page.evaluate(
					([x, y]) => ({
						exposed: [...document.querySelectorAll('canvas')].filter(
							(c) => c.closest('[aria-hidden="true"]') === null,
						).length,
						underThePointer: document
							.elementsFromPoint(x, y)
							.filter((e) => e instanceof HTMLCanvasElement).length,
					}),
					[x + width / 2, y + height / 2],
				);
				expect(exposed, 'canvases screen readers would find').toBe(0);
				expect(underThePointer, 'canvases a click would reach').toBe(0);
			});

			test('the pause button stops the ∞, and it flows again on resuming', async ({ page }) => {
				await page.goto(prefix);
				await drawnBox(page);
				expect(await isMoving(page), 'before the pause').toBe(true);

				await pauseButton(page, pause).click();
				await expect.poll(() => isMoving(page), { message: 'paused', timeout: 10_000 }).toBe(false);

				await pauseButton(page, resume).click();
				expect(await isMoving(page), 'after resuming').toBe(true);
			});

			test('with reduced motion, the ∞ is a still image and the pause button does not appear', async ({
				page,
			}) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.goto(prefix);
				await drawnBox(page);
				expect(await isMoving(page)).toBe(false);
				await expect(pauseButton(page, pause)).toBeHidden();
			});

			test('no JavaScript error while scrolling, resizing and pausing', async ({ page }) => {
				const errors: string[] = [];
				page.on('pageerror', (error) => errors.push(error.message));
				page.on('console', (message) => {
					if (message.type() === 'error') errors.push(message.text());
				});
				await page.goto(prefix);
				await drawnBox(page);
				const end = await page.evaluate(() => document.documentElement.scrollHeight);
				for (const top of [400, 1500, end, 0]) await scrollPage(page, top);
				await pauseButton(page, pause).click();
				await scrollPage(page, 300);
				await pauseButton(page, resume).click();
				await page.setViewportSize({ width: 375, height: 700 });
				await scrollPage(page, 500);
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await scrollPage(page, 0);
				expect(errors).toEqual([]);
			});
		});
	}
});
