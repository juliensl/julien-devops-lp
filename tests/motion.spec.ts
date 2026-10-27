// As animações automáticas e o botão de pausa (WCAG 2.2.2): o botão para e retoma tudo o que se mexe
// sozinho na página, e não aparece com movimento reduzido, porque aí nada se mexe.
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { LINGUAS, type Lingua } from './expected';

// O nome do botão: o português é o do protótipo validado; o francês e o inglês são traduções
// que a estagiária valida antes do Lançamento comercial (#75).
const ROTULOS = {
	fr: { pausar: "Mettre l'animation en pause", retomar: "Reprendre l'animation" },
	en: { pausar: 'Pause animation', retomar: 'Resume animation' },
	pt: { pausar: 'Pausar animação', retomar: 'Retomar animação' },
} satisfies Record<Lingua, { pausar: string; retomar: string }>;

// As páginas com animações automáticas: por agora, só a principal. A de ecologia junta-se com #69.
const COM_ANIMACOES = new Set<string>(Object.values(LINGUAS).map(({ inicio }) => inicio));

const NIVEIS_WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

const botao = (page: Page, nome: string) => page.getByRole('button', { name: nome, exact: true });

/** Duas fotografias do ecrã, com 1 s de intervalo: diferentes se alguma coisa se mexeu. */
async function mexeSe(page: Page) {
	const antes = await page.screenshot();
	await page.waitForTimeout(1000);
	return !antes.equals(await page.screenshot());
}

type Caixa = { x: number; y: number; width: number; height: number };

function sobrepoem(a: Caixa, b: Caixa) {
	return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

emCadaBuild((build) => {
	for (const lingua of build.fase.linguasPublicadas) {
		const { inicio, promessa, botao: botaoMarcar } = LINGUAS[lingua];
		const { pausar, retomar } = ROTULOS[lingua];

		test.describe(inicio, () => {
			test('o botão de pausa para as animações automáticas e retoma-as', async ({ page }) => {
				await page.goto(inicio);
				expect(await mexeSe(page), 'antes da pausa').toBe(true);

				await botao(page, pausar).click();
				await expect(botao(page, retomar)).toBeVisible();
				// No WebKit, a pausa chega ao ecrã uns frames depois do clique: espera-se que assente.
				await expect.poll(() => mexeSe(page), { message: 'em pausa', timeout: 10_000 }).toBe(false);
				const { violations } = await new AxeBuilder({ page }).withTags(NIVEIS_WCAG).analyze();
				expect(violations.map((v) => v.id)).toEqual([]);

				// Com o teclado.
				await botao(page, retomar).press('Enter');
				await expect(botao(page, pausar)).toBeVisible();
				expect(await mexeSe(page), 'depois de retomar').toBe(true);
			});

			test('a pausa não fica guardada: ao recarregar, tudo volta a andar', async ({
				page,
				context,
			}) => {
				await page.goto(inicio);
				await botao(page, pausar).click();
				await expect(botao(page, retomar)).toBeVisible();
				expect(await context.storageState({ indexedDB: true })).toEqual({
					cookies: [],
					origins: [],
				});
				expect(await page.evaluate(() => sessionStorage.length)).toBe(0);

				await page.reload();
				await expect(botao(page, pausar)).toBeVisible();
				expect(await mexeSe(page)).toBe(true);
			});

			test('nada arranca antes de a página acabar de carregar', async ({ page }) => {
				// O carregamento só acaba quando chegam as fontes: o teste segura-as.
				let soltarAsFontes!: () => void;
				const fontes = new Promise<void>((soltar) => (soltarAsFontes = soltar));
				await page.route('**/*.woff2', async (pedido) => {
					await fontes;
					await pedido.continue();
				});
				await page.goto(inicio, { waitUntil: 'domcontentloaded' });
				// Sem as fontes, o Playwright não tira fotografias: pergunta-se ao navegador o que anda.
				await page.waitForTimeout(500);
				const aAndar = await page.evaluate(
					() => document.getAnimations().filter((a) => a.playState === 'running').length,
				);
				expect(aAndar, 'animações a andar durante o carregamento').toBe(0);
				await expect(botao(page, pausar)).toBeHidden();

				soltarAsFontes();
				await page.waitForLoadState('load');
				await expect(botao(page, pausar)).toBeVisible();
				expect(await mexeSe(page), 'depois do carregamento').toBe(true);
			});

			test('com movimento reduzido, nada se mexe e o botão não aparece', async ({ page }) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.goto(inicio);
				expect(await mexeSe(page)).toBe(false);
				await expect(botao(page, pausar)).toBeHidden();
			});

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				// Sem JS, o botão não funcionaria: então nada se pode mexer.
				test('nada se mexe e o botão não aparece', async ({ page }) => {
					await page.goto(inicio);
					expect(await mexeSe(page)).toBe(false);
					await expect(botao(page, pausar)).toBeHidden();
				});
			});

			for (const { largura, soIcone } of [
				{ largura: 375, soIcone: true },
				{ largura: 1280, soIcone: false },
			]) {
				test(`a ${largura} px, o botão fica fixo no canto inferior esquerdo, ${soIcone ? 'só com o ícone' : 'com o nome à vista'}`, async ({
					page,
				}) => {
					const altura = 700;
					await page.setViewportSize({ width: largura, height: altura });
					await page.goto(inicio);
					await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
					await expect(botao(page, pausar)).toBeInViewport({ ratio: 1 });
					const caixa = (await botao(page, pausar).boundingBox())!;
					expect(caixa.x, 'à esquerda').toBeLessThanOrEqual(24);
					expect(altura - caixa.y - caixa.height, 'em baixo').toBeLessThanOrEqual(24);
					if (soIcone) expect(caixa.width).toBeLessThanOrEqual(caixa.height);
					else expect(caixa.width).toBeGreaterThan(2 * caixa.height);
				});
			}

			for (const largura of [320, 1280]) {
				test(`a ${largura} px, no fim da página, o botão não tapa o rodapé`, async ({ page }) => {
					await page.setViewportSize({ width: largura, height: 700 });
					await page.goto(inicio);
					await expect(botao(page, pausar)).toBeVisible();
					await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
					const caixaDoBotao = (await botao(page, pausar).boundingBox())!;
					for (const parte of await page.getByRole('contentinfo').locator('a, p').all()) {
						const caixa = (await parte.boundingBox())!;
						expect(sobrepoem(caixa, caixaDoBotao), await parte.innerText()).toBe(false);
					}
				});
			}

			test('o botão nunca tapa o elemento com foco', async ({ page }) => {
				await page.setViewportSize({ width: 320, height: 400 });
				await page.goto(inicio);
				await expect(botao(page, pausar)).toBeVisible();
				const caixaDoBotao = (await botao(page, pausar).boundingBox())!;
				let verificados = 0;
				for (; verificados < 40; verificados++) {
					await page.keyboard.press('Tab');
					if (await botao(page, pausar).evaluate((b) => b === document.activeElement)) continue;
					const foco = await page.evaluate(() => {
						const e = document.activeElement!;
						const { x, y, width, height } = e.getBoundingClientRect();
						return { x, y, width, height, fim: e === document.body, descricao: e.outerHTML };
					});
					if (foco.fim) break;
					expect(sobrepoem(foco, caixaDoBotao), foco.descricao.slice(0, 80)).toBe(false);
				}
				expect(verificados, 'elementos com foco').toBeGreaterThan(2);
			});

			test('depois de um scroll, o foco não fica por baixo do botão', async ({ page }) => {
				await page.setViewportSize({ width: 320, height: 400 });
				await page.goto(inicio);
				await expect(botao(page, pausar)).toBeVisible();
				const caixaDoBotao = (await botao(page, pausar).boundingBox())!;
				// O botão da Hero, a seguir ao de pausa com Tab, fica por baixo dele depois do scroll.
				const marcar = page
					.getByRole('region', { name: promessa })
					.getByRole('link', { name: botaoMarcar, exact: true });
				await marcar.evaluate(
					(e, alvo) => scrollBy(0, e.getBoundingClientRect().top - alvo),
					caixaDoBotao.y + 4,
				);
				expect(sobrepoem((await marcar.boundingBox())!, caixaDoBotao), 'antes do Tab').toBe(true);

				await botao(page, pausar).focus();
				await page.keyboard.press('Tab');
				await expect(marcar).toBeFocused();
				expect(sobrepoem((await marcar.boundingBox())!, caixaDoBotao), 'com foco').toBe(false);
			});
		});
	}

	for (const { caminho } of paginas(build)) {
		if (COM_ANIMACOES.has(caminho)) continue;

		test(`${caminho}: sem animações automáticas, nada se mexe e não há botão de pausa`, async ({
			page,
		}) => {
			await page.goto(caminho);
			expect(await mexeSe(page)).toBe(false);
			for (const { pausar } of Object.values(ROTULOS)) {
				await expect(botao(page, pausar)).toHaveCount(0);
			}
		});
	}
});
