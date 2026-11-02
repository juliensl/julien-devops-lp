// The frame shared by every page: the sticky header, with the logo, the language switcher
// and the booking button, and the footer.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { equivalent, LANGUAGES, LINKEDIN, NAME, BOOKING_PAGE, type Language } from './expected';

const PHONE_WIDTHS = [320, 375];

/** The button that opens the phone menu: the `<summary>` of the `<details>` menu. */
const menuButton = (page: Page) =>
	page.getByRole('banner').locator('summary').filter({ visible: true });

inEachBuild((build) => {
	const publishedLanguages: readonly Language[] = build.phase.publishedLanguages;
	const unpublishedLanguages = (Object.keys(LANGUAGES) as Language[]).filter(
		(l) => !publishedLanguages.includes(l),
	);

	for (const { path, language } of pagesOf(build)) {
		if (!language) continue;
		const { label, name, button, prefix } = LANGUAGES[language];
		const otherLanguages = publishedLanguages.filter((l) => l !== language);

		test.describe(path, () => {
			test('the switcher leads to the same page in another published language', async ({
				page,
			}) => {
				await page.goto(path);
				const header = page.getByRole('banner');
				for (const other of otherLanguages) {
					const link = header.getByRole('link', { name: LANGUAGES[other].name });
					await expect(link).toBeVisible();
					await expect(link).toHaveAccessibleName(new RegExp(`^${LANGUAGES[other].label}\\b`));
					await expect(link).toHaveAttribute('href', equivalent(path, language, other));
				}
			});

			test('the current language is marked and is not a link', async ({ page }) => {
				await page.goto(path);
				const header = page.getByRole('banner');
				await expect(header.getByRole('link', { name })).toHaveCount(0);
				await expect(
					header.locator('[aria-current]').filter({ hasText: label, visible: true }),
				).toHaveText(new RegExp(`^${label}\\b.*${name}`));
			});

			test('the switcher only shows published languages', async ({ page }) => {
				await page.goto(path);
				const header = page.getByRole('banner');
				await expect(header).toBeVisible();
				for (const other of unpublishedLanguages) {
					await expect(header.getByText(LANGUAGES[other].name)).toHaveCount(0);
				}
			});

			test('the logo, with its visible name in its accessible name, leads to the home page', async ({
				page,
			}) => {
				await page.goto(path);
				const logo = page.getByRole('banner').getByRole('link', { name: NAME });
				await expect(logo).toBeVisible();
				await expect(logo).toHaveAccessibleName(new RegExp(`^${NAME}`, 'i'));
				await expect(logo).toHaveAttribute('href', prefix);
			});

			test('the logo shows only the ∞ below 1024 px, and the ∞ with the name from 1024 px', async ({
				page,
			}) => {
				// The whole image is 1697×400; the ∞ is its left 9/4.
				for (const [width, ratio] of [
					[320, 9 / 4],
					[1023, 9 / 4],
					[1024, 1697 / 400],
				]) {
					await page.setViewportSize({ width, height: 700 });
					await page.goto(path);
					const image = page.getByRole('banner').getByRole('img', { name: NAME });
					await expect
						.poll(() => image.evaluate((i: HTMLImageElement) => i.naturalWidth))
						.toBeGreaterThan(0);
					const box = (await image.boundingBox())!;
					expect(box.width / box.height, `at ${width} px`).toBeCloseTo(ratio, 1);
				}
			});

			test('the header stays at the top, with the button, when scrolling', async ({ page }) => {
				await page.setViewportSize({ width: 1280, height: 400 });
				await page.goto(path);
				await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
				expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
				const header = page.getByRole('banner');
				expect((await header.boundingBox())?.y).toBe(0);
				await expect(header.getByRole('link', { name: button, exact: true })).toBeInViewport();
			});

			test('the header never covers the focused element', async ({ page }) => {
				// Going backwards, focus comes in from above, next to the header. Chromium centres the focused
				// element, so it only reaches the header on a short screen (high zoom, phone in landscape).
				await page.setViewportSize({ width: 375, height: 150 });
				await page.goto(path);
				await page.getByRole('contentinfo').getByRole('link').last().focus();
				const headerBottom = await page
					.getByRole('banner')
					.evaluate((e) => e.getBoundingClientRect().bottom);
				let checked = 0;
				for (; checked < 30; checked++) {
					const focused = await page.evaluate(async () => {
						// The browser scrolls to the focused element in the next frame. WebKit without a
						// screen only draws a frame when asked for one: measure two frames later.
						await new Promise((resolve) =>
							requestAnimationFrame(() => requestAnimationFrame(resolve)),
						);
						const e = document.activeElement!;
						return {
							inHeader: !!e.closest('header'),
							top: e.getBoundingClientRect().top,
							description: e.outerHTML.slice(0, 80),
						};
					});
					if (focused.inHeader) break;
					expect(focused.top, focused.description).toBeGreaterThanOrEqual(headerBottom);
					await page.keyboard.press('Shift+Tab');
				}
				expect(checked, 'focused elements outside the header').toBeGreaterThan(1);
			});

			test('the footer has the name and links to LinkedIn', async ({ page }) => {
				await page.goto(path);
				const footer = page.getByRole('contentinfo');
				await expect(footer.getByText(NAME, { exact: true })).toBeVisible();
				await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
					'href',
					LINKEDIN,
				);
			});

			test('the header links to LinkedIn, between the languages and the button', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 1280, height: 700 });
				await page.goto(path);
				const header = page.getByRole('banner');
				const linkedin = header.getByRole('link', { name: 'LinkedIn', exact: true });
				await expect(linkedin).toHaveAttribute('href', LINKEDIN);
				const box = (await linkedin.boundingBox())!;
				expect(box.width).toBeGreaterThanOrEqual(44);
				expect(box.height).toBeGreaterThanOrEqual(44);
				const current = (await header
					.locator('[aria-current]')
					.filter({ hasText: label, visible: true })
					.boundingBox())!;
				const bookButton = (await header
					.getByRole('link', { name: button, exact: true })
					.boundingBox())!;
				expect(box.x).toBeGreaterThanOrEqual(current.x + current.width);
				expect(box.x + box.width).toBeLessThanOrEqual(bookButton.x);
			});

			test('the header button has a 44×44 px touch target', async ({ page }) => {
				for (const width of [...PHONE_WIDTHS, 1280]) {
					await page.setViewportSize({ width, height: 700 });
					await page.goto(path);
					const bookButton = page
						.getByRole('banner')
						.getByRole('link', { name: button, exact: true });
					const box = (await bookButton.boundingBox())!;
					expect(box.width, `${width} px`).toBeGreaterThanOrEqual(44);
					expect(box.height, `${width} px`).toBeGreaterThanOrEqual(44);
				}
			});

			for (const width of PHONE_WIDTHS) {
				test.describe(`on a phone, at ${width} px`, () => {
					test.use({ viewport: { width, height: 700 } });

					test('the booking button stays visible in the header', async ({ page }) => {
						await page.goto(path);
						const bookButton = page
							.getByRole('banner')
							.getByRole('link', { name: button, exact: true });
						await expect(bookButton).toBeInViewport({ ratio: 1 });
						await expect(bookButton).toHaveAttribute('href', BOOKING_PAGE);
						await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
						await expect(bookButton).toBeInViewport({ ratio: 1 });
					});

					test('LinkedIn moves into the menu', async ({ page }) => {
						await page.goto(path);
						const linkedin = page
							.getByRole('banner')
							.getByRole('link', { name: 'LinkedIn', exact: true });
						await expect(linkedin).toBeHidden();
						await menuButton(page).click();
						await expect(linkedin).toBeVisible();
						await expect(linkedin).toHaveAttribute('href', LINKEDIN);
					});

					test('the languages move into the menu, which closes on an outside click and with Escape', async ({
						page,
					}) => {
						await page.goto(path);
						const current = page
							.getByRole('banner')
							.locator('[aria-current]')
							.filter({ hasText: label, visible: true });
						await expect(current).toHaveCount(0);

						await menuButton(page).click();
						await expect(current).toBeVisible();
						await page.getByRole('main').click({ position: { x: 5, y: 300 } });
						await expect(current).toHaveCount(0);

						await menuButton(page).click();
						await expect(current).toBeVisible();
						await page.keyboard.press('Escape');
						await expect(current).toHaveCount(0);
						await expect(menuButton(page)).toBeFocused();
					});

					if (otherLanguages.length > 0) {
						test('the menu closes after choosing a language', async ({ page }) => {
							const other = otherLanguages[0];
							await page.goto(path);
							await menuButton(page).click();
							// The test cancels the navigation after the page handles the click, to see the menu.
							await page.evaluate(() =>
								window.addEventListener('click', (event) => event.preventDefault()),
							);
							const link = page
								.getByRole('banner')
								.getByRole('link', { name: LANGUAGES[other].name });
							await link.click();
							await expect(link).toBeHidden();
						});
					}

					test.describe('without JavaScript', () => {
						test.use({ javaScriptEnabled: false });

						test('the menu opens and shows the published languages', async ({ page }) => {
							await page.goto(path);
							const header = page.getByRole('banner');
							const current = header
								.locator('[aria-current]')
								.filter({ hasText: label, visible: true });
							await expect(current).toHaveCount(0);
							await menuButton(page).click();
							await expect(current).toBeVisible();
							for (const other of otherLanguages) {
								await expect(
									header.getByRole('link', { name: LANGUAGES[other].name }),
								).toHaveAttribute('href', equivalent(path, language, other));
							}
						});
					});
				});
			}
		});
	}
});
