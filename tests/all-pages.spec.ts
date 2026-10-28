// The checks that apply to every generated page, in each build.
// A new page is included automatically, because the list comes from the build folder.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { SITE } from './expected';

const WCAG_LEVELS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
const WIDTHS = [320, 375, 820, 1440];

inEachBuild((build) => {
	for (const { path, language } of pagesOf(build)) {
		test.describe(path, () => {
			test('the <head> has the phase noindex and the commit', async ({ page }) => {
				await page.goto(path);
				// Error pages, which have no language, always have noindex (#54).
				const robots = page.locator('meta[name="robots"]');
				if (build.phase.noindex || !language) {
					await expect(robots).toHaveAttribute('content', /\bnoindex\b/);
				} else {
					await expect(robots).toHaveCount(0);
				}
				await expect(page.locator('meta[name="commit"]')).toHaveAttribute(
					'content',
					/^[0-9a-f]{40}$/,
				);
			});

			if (language) {
				test('the canonical is the absolute URL of the page', async ({ page }) => {
					await page.goto(path);
					await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
						'href',
						`${SITE}${path}`,
					);
				});
			}

			test('axe finds no A or AA violations', async ({ page }) => {
				await page.goto(path);
				const { violations } = await new AxeBuilder({ page }).withTags(WCAG_LEVELS).analyze();
				const failures = violations.map(
					(v) => `${v.id}: ${v.nodes.map((node) => node.target.join(' ')).join(' | ')}`,
				);
				expect(failures).toEqual([]);
			});

			test('makes no requests to other domains', async ({ page, baseURL }) => {
				const origin = new URL(baseURL!).origin;
				const external: string[] = [];
				page.on('request', (request) => {
					const url = new URL(request.url());
					if (url.protocol.match(/^(http|ws)s?:$/) && url.origin !== origin)
						external.push(url.href);
				});
				await page.goto(path, { waitUntil: 'networkidle' });
				expect(external).toEqual([]);
			});

			test('sets no cookies and stores nothing in the browser', async ({ page, context }) => {
				await page.goto(path, { waitUntil: 'networkidle' });
				expect(await context.storageState({ indexedDB: true })).toEqual({
					cookies: [],
					origins: [],
				});
				expect(await page.evaluate(() => sessionStorage.length)).toBe(0);
			});

			test('has no JavaScript errors', async ({ page }) => {
				const errors: string[] = [];
				page.on('pageerror', (error) => errors.push(error.message));
				page.on('console', (message) => {
					if (message.type() === 'error') errors.push(message.text());
				});
				await page.goto(path, { waitUntil: 'networkidle' });
				expect(errors).toEqual([]);
			});

			for (const width of WIDTHS) {
				test(`has no horizontal scroll at ${width} px`, async ({ page }) => {
					await page.setViewportSize({ width, height: 900 });
					await page.goto(path);
					const overflow = await page.evaluate(
						() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
					);
					expect(overflow).toBeLessThanOrEqual(0);
				});
			}
		});
	}
});
