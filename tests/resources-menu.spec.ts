// The header's «Ressources» submenu: the pages that help a CTO decide, right after «Tes défis». It opens
// without JS and with the keyboard, marks the page the Visitor is on and moves into the phone menu.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { LANGUAGES, LINKEDIN, NAME, type Language } from './expected';

/** The submenu's name. English shows the French one until the English translation. */
const MENU: Record<Language, string> = { fr: 'Ressources', en: 'Ressources', pt: 'Recursos' };

/** The name of the «Tes défis» submenu. */
const CHALLENGES: Record<Language, string> = {
	fr: 'Tes défis',
	en: 'Your challenges',
	pt: 'Os teus desafios',
};

/** The submenu's entries, in order: the page's slug and the entry's name in each language. */
const ENTRIES: { slug: string; name: Record<Language, string> }[] = [
	{ slug: 'ecology/', name: { fr: 'Écologie', en: 'Ecology', pt: 'Ecologia' } },
	{
		slug: 'sovereignty/',
		name: {
			fr: 'Souveraineté des données',
			en: 'Souveraineté des données',
			pt: 'Soberania dos dados',
		},
	},
	{
		slug: 'availability/',
		name: {
			fr: 'Disponibilité & conditions',
			en: 'Disponibilité & conditions',
			pt: 'Disponibilidade e condições',
		},
	},
];

/** The submenu's button: the `<summary>` of its `<details>`. */
const menuButton = (page: Page, language: Language) =>
	page.getByRole('banner').locator('summary').filter({ hasText: MENU[language], visible: true });

/** The submenu's links, in the header bar on a computer or in the phone menu. */
const entries = (page: Page, language: Language) =>
	page.getByRole('banner').getByRole('navigation', { name: MENU[language] }).getByRole('link');

inEachBuild((build) => {
	for (const { path, language } of pagesOf(build)) {
		if (!language) continue;
		const { prefix } = LANGUAGES[language];

		test(`${path}: the "${MENU[language]}" submenu lists the pages and marks the current one`, async ({
			page,
		}) => {
			await page.setViewportSize({ width: 1280, height: 800 });
			await page.goto(path);
			await expect(entries(page, language)).toHaveCount(0);
			await menuButton(page, language).click();
			await expect(entries(page, language)).toHaveText(ENTRIES.map((e) => e.name[language]));
			for (const [i, { slug }] of ENTRIES.entries()) {
				const entry = entries(page, language).nth(i);
				await expect(entry).toHaveAttribute('href', prefix + slug);
				if (prefix + slug === path) await expect(entry).toHaveAttribute('aria-current', 'page');
				else await expect(entry).not.toHaveAttribute('aria-current');
			}
		});
	}

	for (const language of build.phase.publishedLanguages) {
		const { prefix, button } = LANGUAGES[language];

		test(`${prefix}: the header shows the logo, the challenges, "${MENU[language]}", LinkedIn and the button, in this order`, async ({
			page,
		}) => {
			await page.setViewportSize({ width: 1280, height: 800 });
			await page.goto(prefix);
			const header = page.getByRole('banner');
			const order = [
				header.getByRole('link', { name: NAME }),
				header.getByRole('navigation', { name: CHALLENGES[language] }),
				header.getByRole('navigation', { name: MENU[language] }),
				header.getByRole('link', { name: 'LinkedIn', exact: true }),
				header.getByRole('link', { name: button, exact: true }),
			];
			await expect(order[3]).toHaveAttribute('href', LINKEDIN);
			let previousEnd = 0;
			for (const item of order) {
				const box = (await item.boundingBox())!;
				expect(box.x).toBeGreaterThanOrEqual(previousEnd);
				previousEnd = box.x + box.width;
			}
		});

		test(`${prefix}: "${MENU[language]}" comes after the challenges with the keyboard, and opens and closes with it`, async ({
			page,
		}) => {
			await page.setViewportSize({ width: 1280, height: 800 });
			await page.goto(prefix);
			await page
				.getByRole('banner')
				.locator('summary')
				.filter({ hasText: CHALLENGES[language] })
				.focus();
			await page.keyboard.press('Tab');
			await expect(menuButton(page, language)).toBeFocused();
			await page.keyboard.press('Enter');
			await page.keyboard.press('Tab');
			await expect(entries(page, language).first()).toBeFocused();
			await page.keyboard.press('Escape');
			await expect(entries(page, language)).toHaveCount(0);
			await expect(menuButton(page, language)).toBeFocused();

			await page.keyboard.press('Enter');
			await page.keyboard.press('Tab');
			await page.keyboard.press('Enter');
			await expect(page).toHaveURL(prefix + ENTRIES[0].slug);
		});

		test.describe(`${prefix}: without JavaScript`, () => {
			test.use({ javaScriptEnabled: false });

			test(`"${MENU[language]}" opens and leads to its pages`, async ({ page }) => {
				await page.setViewportSize({ width: 1280, height: 800 });
				await page.goto(prefix);
				await menuButton(page, language).click();
				await entries(page, language).first().click();
				await expect(page).toHaveURL(prefix + ENTRIES[0].slug);
			});
		});

		for (const width of [375, 768]) {
			test(`${prefix}: at ${width} px, "${MENU[language]}" moves into the menu`, async ({
				page,
			}) => {
				await page.setViewportSize({ width, height: 700 });
				await page.goto(prefix);
				const menu = page.getByRole('banner').locator('summary').filter({ visible: true });
				await expect(menu).toHaveCount(1);
				await expect(entries(page, language)).toHaveCount(0);
				await menu.click();
				await expect(entries(page, language)).toHaveText(ENTRIES.map((e) => e.name[language]));
				for (const [i, { slug }] of ENTRIES.entries()) {
					await expect(entries(page, language).nth(i)).toHaveAttribute('href', prefix + slug);
				}
			});
		}

		test(`${prefix}: the header fits on one line from 320 to 1440 px`, async ({ page }) => {
			for (const width of [320, 359, 375, 768, 1023, 1024, 1280, 1440]) {
				await page.setViewportSize({ width, height: 700 });
				await page.goto(prefix);
				const layout = await page.getByRole('banner').evaluate(
					(header, { button, phone }) => {
						// On a phone, the booking button may take two lines.
						const items = [...header.querySelectorAll<HTMLElement>('a, summary')].filter(
							(e) => e.checkVisibility() && !(phone && e.textContent!.trim() === button),
						);
						const name = (e: HTMLElement) => e.textContent!.trim() || e.outerHTML.slice(0, 60);
						// A text broken over several lines has one rectangle per line.
						const wrapped = items.filter((e) =>
							[...e.childNodes].some((node) => {
								if (node.nodeType !== Node.TEXT_NODE || !node.textContent!.trim()) return false;
								const range = document.createRange();
								range.selectNodeContents(node);
								return range.getClientRects().length > 1;
							}),
						);
						// An item the bar made narrower than it needs grows when nothing may shrink.
						const widths = items.map((e) => e.getBoundingClientRect().width);
						const noShrinking = document.createElement('style');
						noShrinking.textContent = 'header * { flex-shrink: 0 !important; }';
						document.head.append(noShrinking);
						const squeezed = items.filter(
							(e, i) => e.getBoundingClientRect().width > widths[i] + 0.5,
						);
						noShrinking.remove();
						return {
							wrapped: wrapped.map(name),
							squeezed: squeezed.map(name),
							overflow: document.documentElement.scrollWidth - innerWidth,
						};
					},
					{ button, phone: width < 768 },
				);
				expect.soft(layout.wrapped, `wrapped at ${width} px`).toEqual([]);
				expect.soft(layout.squeezed, `squeezed at ${width} px`).toEqual([]);
				expect.soft(layout.overflow, `horizontal scroll at ${width} px`).toBeLessThanOrEqual(0);
			}
		});
	}
});
