// The scroll reveal (src/components/ScrollReveal.astro) and the Promise's fade-in, as other tests need them.
import type { Page } from '@playwright/test';

/** Waits a couple of frames for the page to react, then until no block is still fading in or out. */
export async function fadesDone(page: Page) {
	await page.evaluate(
		() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
	);
	await page.waitForFunction(() =>
		document
			.getAnimations()
			.every(
				(animation) =>
					animation.playState === 'finished' ||
					!(animation.effect as KeyframeEffect | null)?.target?.matches(
						'[data-reveal], [data-step], [data-fade-in]',
					),
			),
	);
}

/** Scrolls to the bottom of the page, where every block shows, and waits until none is still fading in. */
export async function showEverything(page: Page) {
	await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
	await page.waitForFunction(() => !document.querySelector('[data-reveal][data-pending]'));
	await fadesDone(page);
}
