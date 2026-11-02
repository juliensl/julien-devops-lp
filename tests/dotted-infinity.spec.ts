// The dotted ∞ beside the Hero, drawn on a canvas fixed over the whole screen.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';

type Box = { x: number; y: number; width: number; height: number };

/** What the canvas covering the screen shows: where it drew, a pixel fingerprint, and the text drawn behind. */
function look(page: Page, { checkText = false } = {}) {
	return page.evaluate((checkText) => {
		const { clientWidth, clientHeight } = document.documentElement;
		const canvases = [...document.querySelectorAll('canvas')];
		const canvas = canvases.find((c) => {
			const { left, top, width, height } = c.getBoundingClientRect();
			return left <= 0 && top <= 0 && width >= clientWidth && height >= clientHeight;
		});
		if (!canvas) {
			const boxes = canvases.map((c) => c.getBoundingClientRect().toJSON());
			throw new Error(`No canvas covers ${clientWidth}×${clientHeight}: ${JSON.stringify(boxes)}`);
		}
		const context = canvas.getContext('2d')!;
		const scale = canvas.width / canvas.getBoundingClientRect().width;
		const pixels = (x: number, y: number, width: number, height: number) =>
			width > 0 && height > 0 ? context.getImageData(x, y, width, height).data : [];

		let [left, top, right, bottom] = [Infinity, Infinity, -1, -1];
		let fingerprint = 0;
		const all = pixels(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < all.length; i += 4) {
			fingerprint = (fingerprint * 31 + all[i] + all[i + 1] * 3 + all[i + 3] * 7) | 0;
			if (!all[i + 3]) continue;
			const x = (i / 4) % canvas.width;
			const y = Math.floor(i / 4 / canvas.width);
			left = Math.min(left, x);
			right = Math.max(right, x);
			top = Math.min(top, y);
			bottom = Math.max(bottom, y);
		}
		const drawn =
			right < 0
				? null
				: {
						x: left / scale,
						y: top / scale,
						width: (right - left + 1) / scale,
						height: (bottom - top + 1) / scale,
					};

		const covered: string[] = [];
		if (!checkText) return { drawn, fingerprint, covered };

		// Fixed elements, such as the pause button, float above the canvas on their own background.
		const floats = (e: Element | null): boolean =>
			!!e && (getComputedStyle(e).position === 'fixed' || floats(e.parentElement));
		const drawnUnder = ({ left, top, right, bottom }: DOMRect) => {
			const x = Math.max(0, Math.floor(left * scale));
			const y = Math.max(0, Math.floor(top * scale));
			const under = pixels(
				x,
				y,
				Math.min(canvas.width, Math.ceil(right * scale)) - x,
				Math.min(canvas.height, Math.ceil(bottom * scale)) - y,
			);
			return under.some((value, i) => i % 4 === 3 && value > 0);
		};
		const main = document.querySelector('main')!;
		const texts = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
			acceptNode: (node) =>
				node.textContent!.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
		});
		for (let node = texts.nextNode(); node; node = texts.nextNode()) {
			if (floats(node.parentElement)) continue;
			const range = document.createRange();
			range.selectNodeContents(node);
			if ([...range.getClientRects()].some(drawnUnder)) covered.push(node.textContent!.trim());
		}
		for (const control of main.querySelectorAll('a, button, input, select, summary')) {
			if (!floats(control) && drawnUnder(control.getBoundingClientRect()))
				covered.push(control.outerHTML.slice(0, 80));
		}
		return { drawn, fingerprint, covered };
	}, checkText);
}

/** Scrolls the page, and waits a few frames for the canvas to follow it. */
async function scrollPage(page: Page, top: number) {
	await page.evaluate(async (y) => {
		scrollTo(0, y);
		for (let i = 0; i < 3; i++) await new Promise(requestAnimationFrame);
	}, top);
}

/** Two fingerprints of the ∞'s canvas, 1 s apart: different if it moved. */
async function isMoving(page: Page) {
	const before = (await look(page)).fingerprint;
	await page.waitForTimeout(1000);
	return (await look(page)).fingerprint !== before;
}

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
