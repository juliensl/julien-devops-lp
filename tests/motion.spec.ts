// The automatic animations and the pause button (WCAG 2.2.2): the button stops and resumes everything
// that moves by itself on the page, and does not appear with reduced motion, because then nothing moves.
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { LANGUAGES } from './expected';

// The pages with automatic animations: the home page and the ecology page.
const animatedPagesOf = (prefix: string) => [prefix, `${prefix}ecology/`];
const ANIMATED_PAGES = new Set<string>(
	Object.values(LANGUAGES).flatMap(({ prefix }) => animatedPagesOf(prefix)),
);

const WCAG_LEVELS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

const pauseButton = (page: Page, name: string) => page.getByRole('button', { name, exact: true });

/** Two screenshots, 1 s apart: different if anything moved. */
async function isMoving(page: Page) {
	const before = await page.screenshot();
	await page.waitForTimeout(1000);
	return !before.equals(await page.screenshot());
}

/** Each canvas of the page: whether it has drawn anything yet, and whether it is on screen. */
function canvasesOf(page: Page) {
	return page.evaluate(() =>
		[...document.querySelectorAll('canvas')].map((canvas) => {
			const blank = document.createElement('canvas');
			blank.width = canvas.width;
			blank.height = canvas.height;
			const { top, bottom, width } = canvas.getBoundingClientRect();
			return {
				drawn: canvas.toDataURL() !== blank.toDataURL(),
				onScreen: width > 0 && bottom > 0 && top < innerHeight,
			};
		}),
	);
}

type Box = { x: number; y: number; width: number; height: number };

function overlap(a: Box, b: Box) {
	return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, promise, button, pause, resume } = LANGUAGES[language];

		for (const path of animatedPagesOf(prefix))
			test.describe(path, () => {
				test('the pause button stops the automatic animations and resumes them', async ({
					page,
				}) => {
					await page.goto(path);
					expect(await isMoving(page), 'before the pause').toBe(true);

					await pauseButton(page, pause).click();
					await expect(pauseButton(page, resume)).toBeVisible();
					// In WebKit, the pause reaches the screen a few frames after the click: wait for it to settle.
					await expect
						.poll(() => isMoving(page), { message: 'paused', timeout: 10_000 })
						.toBe(false);
					const { violations } = await new AxeBuilder({ page }).withTags(WCAG_LEVELS).analyze();
					expect(violations.map((v) => v.id)).toEqual([]);

					// With the keyboard.
					await pauseButton(page, resume).press('Enter');
					await expect(pauseButton(page, pause)).toBeVisible();
					expect(await isMoving(page), 'after resuming').toBe(true);
				});

				test('the pause is not saved: on reload, everything moves again', async ({
					page,
					context,
				}) => {
					await page.goto(path);
					await pauseButton(page, pause).click();
					await expect(pauseButton(page, resume)).toBeVisible();
					expect(await context.storageState({ indexedDB: true })).toEqual({
						cookies: [],
						origins: [],
					});
					expect(await page.evaluate(() => sessionStorage.length)).toBe(0);

					await page.reload();
					await expect(pauseButton(page, pause)).toBeVisible();
					expect(await isMoving(page)).toBe(true);
				});

				test('nothing starts before the page finishes loading', async ({ page }) => {
					// Loading only ends when the fonts arrive: the test holds them back.
					let releaseFonts!: () => void;
					const fonts = new Promise<void>((release) => (releaseFonts = release));
					await page.route('**/*.woff2', async (route) => {
						await fonts;
						await route.continue();
					});
					await page.goto(path, { waitUntil: 'domcontentloaded' });
					// Without the fonts, Playwright takes no screenshots: ask the browser what is running,
					// and which canvases have drawn something.
					await page.waitForTimeout(500);
					const running = await page.evaluate(
						() => document.getAnimations().filter((a) => a.playState === 'running').length,
					);
					expect(running, 'animations running during loading').toBe(0);
					const drawn = (await canvasesOf(page)).filter((canvas) => canvas.drawn);
					expect(drawn, 'canvases drawn during loading').toEqual([]);
					await expect(pauseButton(page, pause)).toBeHidden();

					releaseFonts();
					await page.waitForLoadState('load');
					await expect(pauseButton(page, pause)).toBeVisible();
					expect(await isMoving(page), 'after loading').toBe(true);
				});

				test('with reduced motion, nothing moves and the button does not appear', async ({
					page,
				}) => {
					await page.emulateMedia({ reducedMotion: 'reduce' });
					await page.goto(path);
					// A canvas draws its still image once, a few frames after load: wait for those on screen.
					await expect
						.poll(
							async () => (await canvasesOf(page)).filter((c) => c.onScreen && !c.drawn).length,
							{
								message: 'canvases on screen still blank',
							},
						)
						.toBe(0);
					expect(await isMoving(page)).toBe(false);
					await expect(pauseButton(page, pause)).toBeHidden();
				});

				test.describe('without JavaScript', () => {
					test.use({ javaScriptEnabled: false });

					// Without JS, the button would not work: so nothing may move.
					test('nothing moves and the button does not appear', async ({ page }) => {
						await page.goto(path);
						expect(await isMoving(page)).toBe(false);
						await expect(pauseButton(page, pause)).toBeHidden();
					});
				});

				for (const { width, iconOnly } of [
					{ width: 375, iconOnly: true },
					{ width: 1280, iconOnly: false },
				]) {
					test(`at ${width} px, the button stays fixed in the bottom left corner, ${iconOnly ? 'icon only' : 'with its name visible'}`, async ({
						page,
					}) => {
						const height = 700;
						await page.setViewportSize({ width, height });
						await page.goto(path);
						await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
						await expect(pauseButton(page, pause)).toBeInViewport({ ratio: 1 });
						const box = (await pauseButton(page, pause).boundingBox())!;
						expect(box.x, 'on the left').toBeLessThanOrEqual(24);
						expect(height - box.y - box.height, 'at the bottom').toBeLessThanOrEqual(24);
						if (iconOnly) expect(box.width).toBeLessThanOrEqual(box.height);
						else expect(box.width).toBeGreaterThan(2 * box.height);
					});
				}

				for (const width of [320, 1280]) {
					test(`at ${width} px, at the end of the page, the button does not cover the footer`, async ({
						page,
					}) => {
						await page.setViewportSize({ width, height: 700 });
						await page.goto(path);
						await expect(pauseButton(page, pause)).toBeVisible();
						await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
						const buttonBox = (await pauseButton(page, pause).boundingBox())!;
						for (const part of await page.getByRole('contentinfo').locator('a, p').all()) {
							const box = (await part.boundingBox())!;
							expect(overlap(box, buttonBox), await part.innerText()).toBe(false);
						}
					});
				}

				test('the button never covers the focused element', async ({ page }) => {
					await page.setViewportSize({ width: 320, height: 400 });
					await page.goto(path);
					await expect(pauseButton(page, pause)).toBeVisible();
					const buttonBox = (await pauseButton(page, pause).boundingBox())!;
					let checked = 0;
					for (; checked < 40; checked++) {
						await page.keyboard.press('Tab');
						if (await pauseButton(page, pause).evaluate((b) => b === document.activeElement))
							continue;
						const focused = await page.evaluate(() => {
							const e = document.activeElement!;
							const { x, y, width, height } = e.getBoundingClientRect();
							return { x, y, width, height, atEnd: e === document.body, description: e.outerHTML };
						});
						if (focused.atEnd) break;
						expect(overlap(focused, buttonBox), focused.description.slice(0, 80)).toBe(false);
					}
					expect(checked, 'focused elements').toBeGreaterThan(2);
				});

				// The dots stay fixed at the top of the screen, so they still move far from the leaf.
				if (path !== prefix) {
					test('at the bottom of the page, the dots at the top still move, and stop with the pause', async ({
						page,
					}) => {
						await page.goto(path);
						await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
						expect(await isMoving(page), 'at the bottom').toBe(true);

						await pauseButton(page, pause).click();
						await expect
							.poll(() => isMoving(page), { message: 'paused', timeout: 10_000 })
							.toBe(false);
					});
				}

				// The room kept for the button comes with it, the same on both pages: the Hero's button checks it.
				if (path === prefix) {
					test('after a scroll, focus does not stay under the button', async ({ page }) => {
						await page.setViewportSize({ width: 320, height: 400 });
						await page.goto(path);
						await expect(pauseButton(page, pause)).toBeVisible();
						const buttonBox = (await pauseButton(page, pause).boundingBox())!;
						// The Hero button, next after the pause button with Tab, ends up under it after the scroll.
						const bookButton = page
							.getByRole('region', { name: promise })
							.getByRole('link', { name: button, exact: true });
						await bookButton.evaluate(
							(e, target) => scrollBy(0, e.getBoundingClientRect().top - target),
							buttonBox.y + 4,
						);
						expect(overlap((await bookButton.boundingBox())!, buttonBox), 'before Tab').toBe(true);

						await pauseButton(page, pause).focus();
						await page.keyboard.press('Tab');
						await expect(bookButton).toBeFocused();
						expect(overlap((await bookButton.boundingBox())!, buttonBox), 'focused').toBe(false);
					});
				}
			});
	}

	for (const { path } of pagesOf(build)) {
		if (ANIMATED_PAGES.has(path)) continue;

		test(`${path}: without automatic animations, nothing moves and there is no pause button`, async ({
			page,
		}) => {
			await page.goto(path);
			// The logo's pen traces its ∞ in under 5 s, which needs no pause button (WCAG 2.2.2).
			await expect(page.locator('[data-logo-infinity]')).toHaveAttribute('data-state', 'formed', {
				timeout: 10_000,
			});
			expect(await isMoving(page)).toBe(false);
			for (const { pause } of Object.values(LANGUAGES)) {
				await expect(pauseButton(page, pause)).toHaveCount(0);
			}
		});
	}
});
