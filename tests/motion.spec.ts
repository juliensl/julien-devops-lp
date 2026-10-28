// As animações automáticas e o botão de pausa (WCAG 2.2.2): o botão para e retoma tudo o que se mexe
// sozinho na página, e não aparece com movimento reduzido, porque aí nada se mexe.
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { LANGUAGES } from './expected';

// As páginas com animações automáticas: por agora, só a principal. A de ecologia junta-se com #69.
const ANIMATED_PAGES = new Set<string>(Object.values(LANGUAGES).map(({ prefix }) => prefix));

const WCAG_LEVELS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

const pauseButton = (page: Page, name: string) => page.getByRole('button', { name, exact: true });

/** Duas fotografias do ecrã, com 1 s de intervalo: diferentes se alguma coisa se mexeu. */
async function isMoving(page: Page) {
	const before = await page.screenshot();
	await page.waitForTimeout(1000);
	return !before.equals(await page.screenshot());
}

type Box = { x: number; y: number; width: number; height: number };

function overlap(a: Box, b: Box) {
	return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, promise, button, pause, resume } = LANGUAGES[language];

		test.describe(prefix, () => {
			test('o botão de pausa para as animações automáticas e retoma-as', async ({ page }) => {
				await page.goto(prefix);
				expect(await isMoving(page), 'antes da pausa').toBe(true);

				await pauseButton(page, pause).click();
				await expect(pauseButton(page, resume)).toBeVisible();
				// No WebKit, a pausa chega ao ecrã uns frames depois do clique: espera-se que assente.
				await expect
					.poll(() => isMoving(page), { message: 'em pausa', timeout: 10_000 })
					.toBe(false);
				const { violations } = await new AxeBuilder({ page }).withTags(WCAG_LEVELS).analyze();
				expect(violations.map((v) => v.id)).toEqual([]);

				// Com o teclado.
				await pauseButton(page, resume).press('Enter');
				await expect(pauseButton(page, pause)).toBeVisible();
				expect(await isMoving(page), 'depois de retomar').toBe(true);
			});

			test('a pausa não fica guardada: ao recarregar, tudo volta a andar', async ({
				page,
				context,
			}) => {
				await page.goto(prefix);
				await pauseButton(page, pause).click();
				await expect(pauseButton(page, resume)).toBeVisible();
				expect(await context.storageState({ indexedDB: true })).toEqual({
					cookies: [],
					origins: [],
				});
				expect(await page.evaluate(() => sessionStorage.length)).toBe(0);

				await page.reload();
				await expect(pauseButton(page, pause)).toBeVisible();
				expect(await isMoving(page)).toBe(true);
			});

			test('nada arranca antes de a página acabar de carregar', async ({ page }) => {
				// O carregamento só acaba quando chegam as fontes: o teste segura-as.
				let releaseFonts!: () => void;
				const fonts = new Promise<void>((release) => (releaseFonts = release));
				await page.route('**/*.woff2', async (route) => {
					await fonts;
					await route.continue();
				});
				await page.goto(prefix, { waitUntil: 'domcontentloaded' });
				// Sem as fontes, o Playwright não tira fotografias: pergunta-se ao navegador o que anda.
				await page.waitForTimeout(500);
				const running = await page.evaluate(
					() => document.getAnimations().filter((a) => a.playState === 'running').length,
				);
				expect(running, 'animações a andar durante o carregamento').toBe(0);
				await expect(pauseButton(page, pause)).toBeHidden();

				releaseFonts();
				await page.waitForLoadState('load');
				await expect(pauseButton(page, pause)).toBeVisible();
				expect(await isMoving(page), 'depois do carregamento').toBe(true);
			});

			test('com movimento reduzido, nada se mexe e o botão não aparece', async ({ page }) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.goto(prefix);
				expect(await isMoving(page)).toBe(false);
				await expect(pauseButton(page, pause)).toBeHidden();
			});

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				// Sem JS, o botão não funcionaria: então nada se pode mexer.
				test('nada se mexe e o botão não aparece', async ({ page }) => {
					await page.goto(prefix);
					expect(await isMoving(page)).toBe(false);
					await expect(pauseButton(page, pause)).toBeHidden();
				});
			});

			for (const { width, iconOnly } of [
				{ width: 375, iconOnly: true },
				{ width: 1280, iconOnly: false },
			]) {
				test(`a ${width} px, o botão fica fixo no canto inferior esquerdo, ${iconOnly ? 'só com o ícone' : 'com o nome à vista'}`, async ({
					page,
				}) => {
					const height = 700;
					await page.setViewportSize({ width, height });
					await page.goto(prefix);
					await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
					await expect(pauseButton(page, pause)).toBeInViewport({ ratio: 1 });
					const box = (await pauseButton(page, pause).boundingBox())!;
					expect(box.x, 'à esquerda').toBeLessThanOrEqual(24);
					expect(height - box.y - box.height, 'em baixo').toBeLessThanOrEqual(24);
					if (iconOnly) expect(box.width).toBeLessThanOrEqual(box.height);
					else expect(box.width).toBeGreaterThan(2 * box.height);
				});
			}

			for (const width of [320, 1280]) {
				test(`a ${width} px, no fim da página, o botão não tapa o rodapé`, async ({ page }) => {
					await page.setViewportSize({ width, height: 700 });
					await page.goto(prefix);
					await expect(pauseButton(page, pause)).toBeVisible();
					await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
					const buttonBox = (await pauseButton(page, pause).boundingBox())!;
					for (const part of await page.getByRole('contentinfo').locator('a, p').all()) {
						const box = (await part.boundingBox())!;
						expect(overlap(box, buttonBox), await part.innerText()).toBe(false);
					}
				});
			}

			test('o botão nunca tapa o elemento com foco', async ({ page }) => {
				await page.setViewportSize({ width: 320, height: 400 });
				await page.goto(prefix);
				await expect(pauseButton(page, pause)).toBeVisible();
				const buttonBox = (await pauseButton(page, pause).boundingBox())!;
				let checked = 0;
				for (; checked < 40; checked++) {
					await page.keyboard.press('Tab');
					if (await pauseButton(page, pause).evaluate((b) => b === document.activeElement))
						continue;
					const focused = await page.evaluate(() => {
						const e = document.activeElement!;
						const { x, y, width, height } = e.getBoundingClientRect();
						return { x, y, width, height, atEnd: e === document.body, description: e.outerHTML };
					});
					if (focused.atEnd) break;
					expect(overlap(focused, buttonBox), focused.description.slice(0, 80)).toBe(false);
				}
				expect(checked, 'elementos com foco').toBeGreaterThan(2);
			});

			test('depois de um scroll, o foco não fica por baixo do botão', async ({ page }) => {
				await page.setViewportSize({ width: 320, height: 400 });
				await page.goto(prefix);
				await expect(pauseButton(page, pause)).toBeVisible();
				const buttonBox = (await pauseButton(page, pause).boundingBox())!;
				// O botão da Hero, a seguir ao de pausa com Tab, fica por baixo dele depois do scroll.
				const bookButton = page
					.getByRole('region', { name: promise })
					.getByRole('link', { name: button, exact: true });
				await bookButton.evaluate(
					(e, target) => scrollBy(0, e.getBoundingClientRect().top - target),
					buttonBox.y + 4,
				);
				expect(overlap((await bookButton.boundingBox())!, buttonBox), 'antes do Tab').toBe(true);

				await pauseButton(page, pause).focus();
				await page.keyboard.press('Tab');
				await expect(bookButton).toBeFocused();
				expect(overlap((await bookButton.boundingBox())!, buttonBox), 'com foco').toBe(false);
			});
		});
	}

	for (const { path } of pagesOf(build)) {
		if (ANIMATED_PAGES.has(path)) continue;

		test(`${path}: sem animações automáticas, nada se mexe e não há botão de pausa`, async ({
			page,
		}) => {
			await page.goto(path);
			expect(await isMoving(page)).toBe(false);
			for (const { pause } of Object.values(LANGUAGES)) {
				await expect(pauseButton(page, pause)).toHaveCount(0);
			}
		});
	}
});
