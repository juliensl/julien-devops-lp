// The branch that leaves the dotted ∞ and grows with the scroll down to the final call to action.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';
import { isMoving, look, type Box } from './screen-canvas';

/** Where the ∞ draws, plus `more` px: its box and some room, down to 92 % (its points stay above 85 %). */
async function infinityArea(page: Page, more = 0): Promise<Box> {
	const { x, y, width, height } = (await page.locator('[data-infinity]').boundingBox())!;
	const room = 48 + more;
	return { x: x - room, y: y - room, width: width + 2 * room, height: 0.92 * height + room + more };
}

/** How many pixels are drawn outside the ∞'s area, and how many of them just outside it. */
async function drawnOutsideInfinity(page: Page) {
	const regions = [await infinityArea(page), await infinityArea(page, 30)];
	const { count, drawnIn } = await look(page, { regions });
	return { outside: count - drawnIn[0], nextToIt: drawnIn[1] - drawnIn[0] };
}

/** Opens the page with its clock in the test's hands, so `draw` runs its frames as fast as the browser can. */
async function openWithClock(page: Page, path: string) {
	await page.clock.install();
	await page.goto(path);
	// The canvas takes the screen's size, and draws the ∞, a few of the browser's frames after loading.
	await expect
		.poll(async () => (await look(page)).count, { message: 'started' })
		.toBeGreaterThan(0);
}

/** Runs `seconds` of the page's frames. */
async function draw(page: Page, seconds = 1) {
	for (let t = 0; t < seconds; t += 0.25) await page.clock.fastForward(250);
}

/** Scrolls the page, then runs the frames that follow. */
async function scrollAndDraw(page: Page, top: number) {
	await page.evaluate((y) => {
		scrollTo(0, y);
		// The browser's own scroll event comes on its next frame: the page hears one now.
		dispatchEvent(new Event('scroll'));
	}, top);
	await draw(page);
}

const pageHeight = (page: Page) => page.evaluate(() => document.documentElement.scrollHeight);

/** At the bottom of the page, the branch is drawn beside the final call to action's button. */
async function expectEndBesideFinalButton(page: Page) {
	const button = page.locator('main > section').last().getByRole('link');
	// After a resize, the page lays the branch out again a few of the browser's frames later.
	await expect
		.poll(
			async () => {
				await scrollAndDraw(page, await pageHeight(page));
				const { x, y, height } = (await button.boundingBox())!;
				const beside = { x: 0, y: y - 40, width: x, height: height + 80 };
				return (await look(page, { regions: [beside] })).drawnIn[0];
			},
			{ message: 'drawn beside the final button' },
		)
		.toBeGreaterThan(0);
}

/** Walks down the page `step` px at a time: at each place, nothing is drawn behind text or controls. */
async function expectNothingBehindText(page: Page, step: number) {
	const end = await pageHeight(page);
	for (let scroll = 0; scroll < end; scroll += step) {
		await scrollAndDraw(page, scroll);
		const { covered } = await look(page, { checkText: true });
		expect(covered, `scrolled ${Math.round(scroll)} px`).toEqual([]);
	}
}

function collectErrors(page: Page) {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') errors.push(message.text());
	});
	return errors;
}

const DESKTOP = { width: 1280, height: 800 };
/** A lit Step number has the data green (#54, "Direção visual"). */
const LIT_COLOR = 'rgb(60, 207, 142)';

const pauseButton = (page: Page, name: string) => page.getByRole('button', { name, exact: true });

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, pause, resume } = LANGUAGES[language];

		test.describe(`${prefix} branch`, () => {
			// On a tall screen, the ∞'s exit is above the growth line from the start.
			for (const [width, height] of [
				[375, 800],
				[1280, 800],
				[1920, 1080],
			]) {
				test(`at ${width}×${height}, the top of the page shows the ∞ alone`, async ({ page }) => {
					await page.setViewportSize({ width, height });
					await openWithClock(page, prefix);
					await draw(page, 2);
					expect((await look(page)).count, 'drawn').toBeGreaterThan(0);
					expect((await drawnOutsideInfinity(page)).outside).toBe(0);
				});
			}

			for (const width of [375, 1280]) {
				test(`at ${width} px, the branch grows out of the ∞ with the scroll and shrinks back at the top`, async ({
					page,
				}) => {
					await page.setViewportSize({ width, height: 800 });
					await openWithClock(page, prefix);
					const { y, height } = (await page.locator('[data-infinity]').boundingBox())!;
					// From where the ∞ fills the screen best, a little further down, then further still.
					const start = Math.max(0, y + height / 2 - 400);
					await scrollAndDraw(page, start + 150);
					const grown = await drawnOutsideInfinity(page);
					expect(grown.outside, 'grown').toBeGreaterThan(0);
					expect(grown.nextToIt, 'out of the ∞').toBeGreaterThan(0);

					await scrollAndDraw(page, start + 400);
					expect((await drawnOutsideInfinity(page)).outside, 'grown further').toBeGreaterThan(
						grown.outside,
					);

					await scrollAndDraw(page, 0);
					expect((await drawnOutsideInfinity(page)).outside, 'shrunk').toBe(0);
				});
			}

			for (const width of [375, 1440]) {
				test(`at ${width} px, at the bottom of the page the branch ends beside the final button`, async ({
					page,
				}) => {
					await page.setViewportSize({ width, height: 800 });
					await openWithClock(page, prefix);
					await expectEndBesideFinalButton(page);
				});
			}

			test('after a resize to 640 px, as with a 200 % zoom, it still ends beside the final button', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 1280, height: 800 });
				await openWithClock(page, prefix);
				await expectEndBesideFinalButton(page);
				await page.setViewportSize({ width: 640, height: 800 });
				await expectEndBesideFinalButton(page);
			});

			test('when the questions open, it still ends beside the final button, further down', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 1280, height: 800 });
				await openWithClock(page, prefix);
				const questions = page.locator('main details');
				for (let k = 0; k < (await questions.count()); k++) {
					await questions.nth(k).locator('summary').click();
				}
				await expect(questions.last()).toHaveAttribute('open');
				await expectEndBesideFinalButton(page);
			});

			test('on desktop, it reaches each Step when its number lights up', async ({ page }) => {
				const { height } = DESKTOP;
				await page.setViewportSize(DESKTOP);
				await openWithClock(page, prefix);
				const steps = page.locator('[data-section="steps"]').getByRole('listitem');
				const stepNumber = (k: number) => steps.nth(k).getByText(String(k + 1), { exact: true });
				// Over the number, where the branch passes along the stairs.
				const overNumber = async (k: number) => {
					const { x, y } = (await stepNumber(k).boundingBox())!;
					return { x: x - 4, y: y - 30, width: 28, height: 26 };
				};
				const header = (await page.getByRole('banner').boundingBox())!;
				const top = await page
					.locator('[data-section="steps"]')
					.evaluate((s) => s.getBoundingClientRect().top + scrollY);

				// Pinned, each half screen of scroll lights up one more number, at the middle of its half.
				for (let k = 0; k < 5; k++) {
					await scrollAndDraw(page, top - header.height + (k + 0.6) * 0.5 * height);
					await expect(stepNumber(k), `number ${k + 1} lit`).toHaveCSS('color', LIT_COLOR);
					const regions = [await overNumber(k)];
					if (k < 4) regions.push(await overNumber(k + 1));
					const { drawnIn } = await look(page, { regions });
					expect(
						drawnIn.map((n) => n > 0),
						`the branch over number ${k + 1}, not further`,
					).toEqual(k < 4 ? [true, false] : [true]);
				}
			});

			// Paused, so each place holds still; steps shorter than the growth line see every part once grown.
			for (const width of [375, 1024, 1440]) {
				test(`at ${width} px, as it grows down the whole page, it never shows behind text or controls, and no JS error`, async ({
					page,
				}) => {
					// Some 30 places down the page, each read whole.
					test.slow();
					const errors = collectErrors(page);
					await page.setViewportSize({ width, height: 800 });
					await openWithClock(page, prefix);
					await pauseButton(page, pause).click();
					await expectNothingBehindText(page, 0.55 * 800);
					expect(errors).toEqual([]);
				});
			}

			test('at 768 px, with reduced motion, the whole branch never shows behind text or controls, and no JS error', async ({
				page,
			}) => {
				const errors = collectErrors(page);
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.setViewportSize({ width: 768, height: 800 });
				await openWithClock(page, prefix);
				await expectNothingBehindText(page, 0.9 * 800);
				expect(errors).toEqual([]);
			});

			for (const width of [1024, 1440]) {
				test(`at ${width} px, while the Services are pinned, it never shows behind text or controls`, async ({
					page,
				}) => {
					await page.setViewportSize({ width, height: 800 });
					await openWithClock(page, prefix);
					await pauseButton(page, pause).click();
					const services = page.locator('[data-section="services"]');
					const header = (await page.getByRole('banner').boundingBox())!;
					const { top, travel } = await services.evaluate((s, headerBottom) => {
						const { top, height } = s.getBoundingClientRect();
						return {
							top: top + scrollY - headerBottom,
							travel: height - (innerHeight - headerBottom),
						};
					}, header.y + header.height);
					// From the first card to the last, then once the section has let go.
					for (const share of [0, 0.25, 0.5, 0.75, 1, 1.5]) {
						await scrollAndDraw(page, top + share * travel);
						if (share === 0) await expect(services.getByText('1 / 4'), 'pinned').toBeVisible();
						const { covered } = await look(page, { checkText: true });
						expect(covered, `${share * 100} % through the cards`).toEqual([]);
					}
				});
			}

			test('the pause button stops it in the middle of the page, and it flows again on resuming', async ({
				page,
			}) => {
				await page.goto(prefix);
				// The Guarantee, far from the ∞: only the branch is on screen.
				await page.locator('[data-section="guarantee"]').scrollIntoViewIfNeeded();
				await expect.poll(() => isMoving(page), { message: 'before the pause' }).toBe(true);
				await pauseButton(page, pause).click();
				await expect.poll(() => isMoving(page), { message: 'paused', timeout: 10_000 }).toBe(false);
				await pauseButton(page, resume).click();
				await expect.poll(() => isMoving(page), { message: 'after resuming' }).toBe(true);
			});

			test('with reduced motion, the whole branch is a still image from the start', async ({
				page,
			}) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.setViewportSize({ width: 1440, height: 800 });
				await page.goto(prefix);
				await expect
					.poll(async () => (await drawnOutsideInfinity(page)).outside, {
						message: 'joined to the ∞ at the top',
					})
					.toBeGreaterThan(0);
				expect(await isMoving(page)).toBe(false);
				await expect(pauseButton(page, pause)).toBeHidden();
				await page.locator('[data-section="guarantee"]').scrollIntoViewIfNeeded();
				await expect
					.poll(async () => (await look(page)).count, { message: 'already down the page' })
					.toBeGreaterThan(0);
				expect(await isMoving(page)).toBe(false);
			});
		});
	}
});
