// Reads the home page's canvas fixed over the whole screen, where the dotted ∞ and its branch are drawn.
import type { Page } from '@playwright/test';

export type Box = { x: number; y: number; width: number; height: number };

/** What the full-screen canvas shows: where and how much it drew, also inside `regions`, and the text behind. */
export function look(page: Page, { checkText = false, regions = [] as Box[] } = {}) {
	return page.evaluate(
		({ checkText, regions }) => {
			const { clientWidth, clientHeight } = document.documentElement;
			const canvases = [...document.querySelectorAll('canvas')];
			const canvas = canvases.find((c) => {
				const { left, top, width, height } = c.getBoundingClientRect();
				return left <= 0 && top <= 0 && width >= clientWidth && height >= clientHeight;
			});
			if (!canvas) {
				const boxes = canvases.map((c) => c.getBoundingClientRect().toJSON());
				throw new Error(
					`No canvas covers ${clientWidth}×${clientHeight}: ${JSON.stringify(boxes)}`,
				);
			}
			const context = canvas.getContext('2d')!;
			const scale = canvas.width / canvas.getBoundingClientRect().width;
			const pixels = (x: number, y: number, width: number, height: number) =>
				width > 0 && height > 0 ? context.getImageData(x, y, width, height).data : [];

			let [left, top, right, bottom] = [Infinity, Infinity, -1, -1];
			let fingerprint = 0;
			let count = 0;
			const drawnIn = regions.map(() => 0);
			const all = pixels(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < all.length; i += 4) {
				fingerprint = (fingerprint * 31 + all[i] + all[i + 1] * 3 + all[i + 3] * 7) | 0;
				if (!all[i + 3]) continue;
				const x = (i / 4) % canvas.width;
				const y = Math.floor(i / 4 / canvas.width);
				count++;
				left = Math.min(left, x);
				right = Math.max(right, x);
				top = Math.min(top, y);
				bottom = Math.max(bottom, y);
				for (const [k, region] of regions.entries()) {
					const [cssX, cssY] = [x / scale, y / scale];
					if (
						cssX >= region.x &&
						cssX < region.x + region.width &&
						cssY >= region.y &&
						cssY < region.y + region.height
					)
						drawnIn[k]++;
				}
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
			if (!checkText) return { drawn, fingerprint, count, drawnIn, covered };

			// Fixed elements, such as the pause button, float above the canvas on their own background.
			const floats = (e: Element | null): boolean =>
				!!e && (getComputedStyle(e).position === 'fixed' || floats(e.parentElement));
			const onScreen = ({ left, top, right, bottom }: DOMRect) =>
				right > 0 && bottom > 0 && left < clientWidth && top < clientHeight;
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
				const range = document.createRange();
				range.selectNodeContents(node);
				const rects = [...range.getClientRects()].filter(onScreen);
				if (rects.length && !floats(node.parentElement) && rects.some(drawnUnder))
					covered.push(node.textContent!.trim());
			}
			for (const control of main.querySelectorAll('a, button, input, select, summary')) {
				const rect = control.getBoundingClientRect();
				if (onScreen(rect) && !floats(control) && drawnUnder(rect))
					covered.push(control.outerHTML.slice(0, 80));
			}
			return { drawn, fingerprint, count, drawnIn, covered };
		},
		{ checkText, regions },
	);
}

/** Scrolls the page, and waits a few frames for the canvas to follow it. */
export async function scrollPage(page: Page, top: number) {
	await page.evaluate(async (y) => {
		scrollTo(0, y);
		for (let i = 0; i < 3; i++) await new Promise(requestAnimationFrame);
	}, top);
}

/** Two fingerprints of the canvas, 1 s apart: different if it moved. */
export async function isMoving(page: Page) {
	const before = (await look(page)).fingerprint;
	await page.waitForTimeout(1000);
	return (await look(page)).fingerprint !== before;
}
