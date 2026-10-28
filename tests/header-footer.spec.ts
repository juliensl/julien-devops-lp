// A moldura comum a todas as páginas: o cabeçalho fixo, com o logótipo, o seletor de língua
// e o botão de marcação, e o rodapé.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { equivalent, LANGUAGES, LINKEDIN, NAME, BOOKING_PAGE, type Language } from './expected';

const PHONE_WIDTHS = [320, 375];

/** O botão que abre o menu do telemóvel: o <summary> do menu <details>. */
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
			test('o seletor leva à página equivalente noutra língua publicada', async ({ page }) => {
				await page.goto(path);
				const header = page.getByRole('banner');
				for (const other of otherLanguages) {
					const link = header.getByRole('link', { name: LANGUAGES[other].name });
					await expect(link).toBeVisible();
					await expect(link).toHaveAccessibleName(new RegExp(`^${LANGUAGES[other].label}\\b`));
					await expect(link).toHaveAttribute('href', equivalent(path, language, other));
				}
			});

			test('a língua atual fica marcada e não é uma ligação', async ({ page }) => {
				await page.goto(path);
				const header = page.getByRole('banner');
				await expect(header.getByRole('link', { name })).toHaveCount(0);
				await expect(
					header.locator('[aria-current]').filter({ hasText: label, visible: true }),
				).toHaveText(new RegExp(`^${label}\\b.*${name}`));
			});

			test('o seletor só mostra as línguas publicadas', async ({ page }) => {
				await page.goto(path);
				const header = page.getByRole('banner');
				await expect(header).toBeVisible();
				for (const other of unpublishedLanguages) {
					await expect(header.getByText(LANGUAGES[other].name)).toHaveCount(0);
				}
			});

			test('o logótipo, com o nome visível no nome acessível, leva à página principal', async ({
				page,
			}) => {
				await page.goto(path);
				const logo = page.getByRole('banner').getByRole('link', { name: NAME });
				await expect(logo).toBeVisible();
				await expect(logo).toHaveAccessibleName(new RegExp(`^${NAME}`, 'i'));
				await expect(logo).toHaveAttribute('href', prefix);
			});

			test('o cabeçalho fica fixo no topo, com o botão, ao fazer scroll', async ({ page }) => {
				await page.setViewportSize({ width: 1280, height: 400 });
				await page.goto(path);
				await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
				expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
				const header = page.getByRole('banner');
				expect((await header.boundingBox())?.y).toBe(0);
				await expect(header.getByRole('link', { name: button, exact: true })).toBeInViewport();
			});

			test('o cabeçalho nunca tapa o elemento com foco', async ({ page }) => {
				// A andar para trás, o foco entra por cima, junto ao cabeçalho. O Chromium centra o elemento
				// com foco, por isso só num ecrã baixo (zoom grande, telemóvel deitado) chega ao cabeçalho.
				await page.setViewportSize({ width: 375, height: 150 });
				await page.goto(path);
				await page.getByRole('contentinfo').getByRole('link').last().focus();
				const headerBottom = await page
					.getByRole('banner')
					.evaluate((e) => e.getBoundingClientRect().bottom);
				let checked = 0;
				for (; checked < 30; checked++) {
					const focused = await page.evaluate(() => {
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
				expect(checked, 'elementos com foco fora do cabeçalho').toBeGreaterThan(1);
			});

			test('o rodapé tem o nome e leva ao LinkedIn', async ({ page }) => {
				await page.goto(path);
				const footer = page.getByRole('contentinfo');
				await expect(footer.getByText(NAME, { exact: true })).toBeVisible();
				await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
					'href',
					LINKEDIN,
				);
			});

			test('o botão do cabeçalho tem um alvo de toque de 44×44 px', async ({ page }) => {
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
				test.describe(`no telemóvel, a ${width} px`, () => {
					test.use({ viewport: { width, height: 700 } });

					test('o botão de marcação fica visível no cabeçalho', async ({ page }) => {
						await page.goto(path);
						const bookButton = page
							.getByRole('banner')
							.getByRole('link', { name: button, exact: true });
						await expect(bookButton).toBeInViewport({ ratio: 1 });
						await expect(bookButton).toHaveAttribute('href', BOOKING_PAGE);
						await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
						await expect(bookButton).toBeInViewport({ ratio: 1 });
					});

					test('as línguas passam para o menu, que fecha ao clicar fora e com Escape', async ({
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
						test('o menu fecha depois de escolher uma língua', async ({ page }) => {
							const other = otherLanguages[0];
							await page.goto(path);
							await menuButton(page).click();
							// O teste cancela a navegação depois de a página tratar o clique, para ver o menu.
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

					test.describe('sem JavaScript', () => {
						test.use({ javaScriptEnabled: false });

						test('o menu abre e mostra as línguas publicadas', async ({ page }) => {
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
