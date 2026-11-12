// The scroll reveal (src/components/ScrollReveal.astro) as other tests need it.
import type { Page } from '@playwright/test';

/** Scrolls to the bottom of the page, where every block shows, and waits until none is still fading in. */
export async function showEverything(page: Page) {
	await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
	await page.waitForFunction(
		() =>
			!document.querySelector('[data-reveal][data-pending]') &&
			document
				.getAnimations()
				.every(
					(animation) =>
						!(animation.effect as KeyframeEffect | null)?.target?.matches(
							'[data-reveal], [data-step]',
						),
				),
	);
}
