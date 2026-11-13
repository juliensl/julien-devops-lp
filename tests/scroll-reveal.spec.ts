// Titles and blocks fade in when the scroll brings them up to the branch's growth line, at 62 % of the
// screen. What is on screen when the page loads stays; without JS or with reduced motion, nothing waits.
import { expect, test, type Locator, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES } from './expected';
import { showEverything } from './reveal';

const LINE = 0.62;
const SCREEN = { width: 1280, height: 800 };

/** Opens the page and waits until the JS, which starts once loading ends, has run. */
async function openPage(page: Page, path: string, screen = SCREEN) {
	await page.setViewportSize(screen);
	await page.goto(path);
	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve)));
}

/** Each block's top, from the top of the screen, and whether it is waiting. */
const blocks = (page: Page) =>
	page.locator('[data-reveal]').evaluateAll((all) =>
		all.map((block) => ({
			top: block.getBoundingClientRect().top,
			pending: block.hasAttribute('data-pending'),
		})),
	);

/** Scrolls until the block's top is `y` px from the top of the screen, and lets the page react. */
async function placeTop(page: Page, block: Locator, y: number) {
	await block.evaluate((e, y) => scrollBy(0, e.getBoundingClientRect().top - y), y);
	await page.evaluate(
		() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
	);
}

inEachBuild((build) => {
	const { prefix } = LANGUAGES[build.phase.publishedLanguages[0]];
	const pages = {
		home: prefix,
		ecology: `${prefix}ecology/`,
		questions: `${prefix}questions/`,
		cloud: `${prefix}cloud/`,
	};

	for (const [name, path] of Object.entries(pages)) {
		test.describe(`${name} page`, () => {
			test('when the page loads, only the blocks below the screen wait', async ({ page }) => {
				await openPage(page, path);
				const all = await blocks(page);
				expect(all.some(({ pending }) => pending)).toBe(true);
				for (const { top, pending } of all) {
					expect(pending, `the block at ${Math.round(top)} px`).toBe(top >= SCREEN.height);
				}
			});

			test('a block fades in once its top passes the growth line', async ({ page }) => {
				await openPage(page, path);
				const first = (await blocks(page)).findIndex(({ pending }) => pending);
				const block = page.locator('[data-reveal]').nth(first);

				await placeTop(page, block, LINE * SCREEN.height + 20);
				await expect(block).toHaveAttribute('data-pending');
				await expect(block).toHaveCSS('opacity', '0');

				await placeTop(page, block, LINE * SCREEN.height - 20);
				await expect(block).not.toHaveAttribute('data-pending');
				await expect(block).toHaveCSS('opacity', '1');
			});

			test('at the bottom of the page, every block shows', async ({ page }) => {
				await openPage(page, path);
				await showEverything(page);
				expect((await blocks(page)).filter(({ pending }) => pending)).toEqual([]);
			});

			test('with reduced motion, nothing waits', async ({ page }) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await openPage(page, path);
				await expect(page.locator('[data-pending]')).toHaveCount(0);
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('every block shows', async ({ page }) => {
					await page.setViewportSize(SCREEN);
					await page.goto(path);
					const opacities = await page
						.locator('[data-reveal], [data-step]')
						.evaluateAll((all) => all.map((e) => getComputedStyle(e).opacity));
					expect(opacities.length).toBeGreaterThan(0);
					expect(opacities.filter((opacity) => opacity !== '1')).toEqual([]);
				});
			});
		});
	}

	test.describe('the Promise', () => {
		const promise = (page: Page) => page.getByRole('heading', { level: 1 });

		test('fades in as the home page opens', async ({ page }) => {
			await openPage(page, prefix);
			await expect(promise(page)).toHaveCSS('animation-name', 'fade-in');
			await expect(promise(page)).toHaveCSS('opacity', '1');
		});

		test('with reduced motion, shows at once', async ({ page }) => {
			await page.emulateMedia({ reducedMotion: 'reduce' });
			await openPage(page, prefix);
			await expect(promise(page)).toHaveCSS('animation-name', 'none');
		});

		test.describe('without JavaScript', () => {
			test.use({ javaScriptEnabled: false });

			test('shows at once', async ({ page }) => {
				await page.goto(prefix);
				await expect(promise(page)).toHaveCSS('animation-name', 'none');
			});
		});
	});

	test('a block reached with the keyboard shows at once, without waiting for the scroll', async ({
		page,
	}) => {
		await openPage(page, prefix);
		const link = page.locator('a[data-reveal]').first();
		await expect(link).toHaveAttribute('data-pending');
		await link.evaluate((a: HTMLElement) => a.focus({ preventScroll: true }));
		await expect(link).not.toHaveAttribute('data-pending');
		expect(await page.evaluate(() => scrollY)).toBe(0);
	});

	test('a block the questions filter brings up shows, without any scroll', async ({ page }) => {
		await openPage(page, pages.questions, { width: 375, height: 812 });
		const lastAudience = page.locator('[data-audience]').last().locator('[data-reveal]').first();
		await expect(lastAudience).toHaveAttribute('data-pending');
		await page.locator('input[name="audience"]').last().check();
		await expect(lastAudience).not.toHaveAttribute('data-pending');
		expect(await page.evaluate(() => scrollY)).toBe(0);
	});

	test('the legal pages have no blocks that wait for the scroll', async ({ page }) => {
		await page.goto(`${prefix}legal/`);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.locator('[data-reveal]')).toHaveCount(0);
	});
});
