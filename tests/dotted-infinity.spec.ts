// The dotted ∞ beside the Hero, drawn on a canvas fixed over the whole screen.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';

type Box = { x: number; y: number; width: number; height: number };

/** What the canvas that covers the screen shows: where it drew (CSS px), and a fingerprint of its pixels. */
function drawing(page: Page) {
	return page.evaluate(() => {
		const { clientWidth, clientHeight } = document.documentElement;
		const canvas = [...document.querySelectorAll('canvas')].find((c) => {
			const { left, top, width, height } = c.getBoundingClientRect();
			return left <= 0 && top <= 0 && width >= clientWidth && height >= clientHeight;
		});
		if (!canvas || !canvas.width || !canvas.height) return null;
		const { data } = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height);
		const scale = canvas.width / canvas.getBoundingClientRect().width;
		let [left, top, right, bottom] = [Infinity, Infinity, -1, -1];
		let fingerprint = 0;
		for (let i = 0; i < data.length; i += 4) {
			fingerprint = (fingerprint * 31 + data[i] + data[i + 1] * 3 + data[i + 3] * 7) | 0;
			if (!data[i + 3]) continue;
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
		return { drawn, fingerprint };
	});
}

/** The text and controls of the page that have something drawn by the canvas behind them. The fixed
    elements, such as the pause button, float above the canvas on their own background. */
function textOverDrawing(page: Page) {
	return page.evaluate(() => {
		const { clientWidth, clientHeight } = document.documentElement;
		const canvas = [...document.querySelectorAll('canvas')].find((c) => {
			const { left, top, width, height } = c.getBoundingClientRect();
			return left <= 0 && top <= 0 && width >= clientWidth && height >= clientHeight;
		})!;
		const context = canvas.getContext('2d')!;
		const scale = canvas.width / canvas.getBoundingClientRect().width;
		const floats = (e: Element | null): boolean =>
			!!e && (getComputedStyle(e).position === 'fixed' || floats(e.parentElement));
		const drawnUnder = ({ left, top, right, bottom }: DOMRect) => {
			const x = Math.max(0, Math.floor(left * scale));
			const y = Math.max(0, Math.floor(top * scale));
			const width = Math.min(canvas.width, Math.ceil(right * scale)) - x;
			const height = Math.min(canvas.height, Math.ceil(bottom * scale)) - y;
			if (width <= 0 || height <= 0) return false;
			const { data } = context.getImageData(x, y, width, height);
			return data.some((value, i) => i % 4 === 3 && value > 0);
		};
		const main = document.querySelector('main')!;
		const texts = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
			acceptNode: (node) => (node.textContent!.trim() ? 1 : 2),
		});
		const covered: string[] = [];
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
		return covered;
	});
}

/** Two frames later: the canvas has drawn what the page shows now. */
const nextFrames = (page: Page) =>
	page.evaluate(
		() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))),
	);

/** Where the ∞ is drawn, once it is. */
async function drawnBox(page: Page): Promise<Box> {
	await expect
		.poll(async () => (await drawing(page))?.drawn, { message: 'the ∞ is drawn' })
		.toBeTruthy();
	return (await drawing(page))!.drawn!;
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, promise, button } = LANGUAGES[language];
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
					const lastText = (await hero(page).locator('p').last().boundingBox())!;
					// The ∞ is below the first screen: scroll it into view, then measure.
					await page.evaluate((y) => scrollTo(0, y - 100), lastText.y);
					await nextFrames(page);
					const infinity = await drawnBox(page);
					const note = (await hero(page).locator('p').last().boundingBox())!;
					expect(infinity.y, 'under the note').toBeGreaterThan(note.y + note.height);
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
						await page.evaluate((top) => scrollTo(0, top), scroll);
						// A few frames, for the canvas to follow the page.
						await page.waitForTimeout(150);
						if ((await drawing(page))?.drawn) seen++;
						expect(await textOverDrawing(page), `scrolled ${scroll} px`).toEqual([]);
					}
					expect(seen, 'positions where the ∞ is on screen').toBeGreaterThan(1);
				});
			}
		});
	}
});
