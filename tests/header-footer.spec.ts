// A moldura comum a todas as páginas: o cabeçalho fixo, com o logótipo, o seletor de língua
// e o botão de marcação, e o rodapé.
import { expect, test, type Page } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { LINGUAS, LINKEDIN, NOME, PAGINA_DE_MARCACAO, type Lingua } from './expected';

const TELEMOVEIS = [320, 375];

/** A mesma página noutra língua: os slugs são iguais nas três, só muda o início. */
function equivalente(caminho: string, de: Lingua, para: Lingua) {
	return LINGUAS[para].inicio + caminho.slice(LINGUAS[de].inicio.length);
}

/** O botão que abre o menu do telemóvel: o <summary> do menu <details>. */
const botaoDoMenu = (page: Page) =>
	page.getByRole('banner').locator('summary').filter({ visible: true });

emCadaBuild((build) => {
	const publicadas: readonly Lingua[] = build.fase.linguasPublicadas;
	const outras = (Object.keys(LINGUAS) as Lingua[]).filter((l) => !publicadas.includes(l));

	for (const { caminho, lingua } of paginas(build)) {
		if (!lingua) continue;
		const { rotulo, nome, botao, inicio } = LINGUAS[lingua];
		const outrasPublicadas = publicadas.filter((l) => l !== lingua);

		test.describe(caminho, () => {
			test('o seletor leva à página equivalente noutra língua publicada', async ({ page }) => {
				await page.goto(caminho);
				const cabecalho = page.getByRole('banner');
				for (const outra of outrasPublicadas) {
					const ligacao = cabecalho.getByRole('link', { name: LINGUAS[outra].nome });
					await expect(ligacao).toBeVisible();
					await expect(ligacao).toHaveAccessibleName(new RegExp(`^${LINGUAS[outra].rotulo}\\b`));
					await expect(ligacao).toHaveAttribute('href', equivalente(caminho, lingua, outra));
				}
			});

			test('a língua atual fica marcada e não é uma ligação', async ({ page }) => {
				await page.goto(caminho);
				const cabecalho = page.getByRole('banner');
				await expect(cabecalho.getByRole('link', { name: nome })).toHaveCount(0);
				await expect(
					cabecalho.locator('[aria-current]').filter({ hasText: rotulo, visible: true }),
				).toHaveText(new RegExp(`^${rotulo}\\b.*${nome}`));
			});

			test('o seletor só mostra as línguas publicadas', async ({ page }) => {
				await page.goto(caminho);
				const cabecalho = page.getByRole('banner');
				await expect(cabecalho).toBeVisible();
				for (const outra of outras) {
					await expect(cabecalho.getByText(LINGUAS[outra].nome)).toHaveCount(0);
				}
			});

			test('o logótipo, com o nome visível no nome acessível, leva à página principal', async ({
				page,
			}) => {
				await page.goto(caminho);
				const logotipo = page.getByRole('banner').getByRole('link', { name: NOME });
				await expect(logotipo).toBeVisible();
				await expect(logotipo).toHaveAccessibleName(new RegExp(`^${NOME}`, 'i'));
				await expect(logotipo).toHaveAttribute('href', inicio);
			});

			test('o cabeçalho fica fixo no topo, com o botão, ao fazer scroll', async ({ page }) => {
				await page.setViewportSize({ width: 1280, height: 400 });
				await page.goto(caminho);
				await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
				expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
				const cabecalho = page.getByRole('banner');
				expect((await cabecalho.boundingBox())?.y).toBe(0);
				await expect(cabecalho.getByRole('link', { name: botao, exact: true })).toBeInViewport();
			});

			test('o cabeçalho nunca tapa o elemento com foco', async ({ page }) => {
				// A andar para trás, o foco entra por cima, junto ao cabeçalho. O Chromium centra o elemento
				// com foco, por isso só num ecrã baixo (zoom grande, telemóvel deitado) chega ao cabeçalho.
				await page.setViewportSize({ width: 375, height: 150 });
				await page.goto(caminho);
				await page.getByRole('contentinfo').getByRole('link').last().focus();
				const fundoDoCabecalho = await page
					.getByRole('banner')
					.evaluate((e) => e.getBoundingClientRect().bottom);
				let verificados = 0;
				for (; verificados < 30; verificados++) {
					const foco = await page.evaluate(() => {
						const e = document.activeElement!;
						return {
							noCabecalho: !!e.closest('header'),
							topo: e.getBoundingClientRect().top,
							descricao: e.outerHTML.slice(0, 80),
						};
					});
					if (foco.noCabecalho) break;
					expect(foco.topo, foco.descricao).toBeGreaterThanOrEqual(fundoDoCabecalho);
					await page.keyboard.press('Shift+Tab');
				}
				expect(verificados, 'elementos com foco fora do cabeçalho').toBeGreaterThan(1);
			});

			test('o rodapé tem o nome e leva ao LinkedIn', async ({ page }) => {
				await page.goto(caminho);
				const rodape = page.getByRole('contentinfo');
				await expect(rodape.getByText(NOME, { exact: true })).toBeVisible();
				await expect(rodape.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
					'href',
					LINKEDIN,
				);
			});

			test('o botão do cabeçalho tem um alvo de toque de 44×44 px', async ({ page }) => {
				for (const largura of [...TELEMOVEIS, 1280]) {
					await page.setViewportSize({ width: largura, height: 700 });
					await page.goto(caminho);
					const marcar = page.getByRole('banner').getByRole('link', { name: botao, exact: true });
					const caixa = (await marcar.boundingBox())!;
					expect(caixa.width, `${largura} px`).toBeGreaterThanOrEqual(44);
					expect(caixa.height, `${largura} px`).toBeGreaterThanOrEqual(44);
				}
			});

			for (const largura of TELEMOVEIS) {
				test.describe(`no telemóvel, a ${largura} px`, () => {
					test.use({ viewport: { width: largura, height: 700 } });

					test('o botão de marcação fica visível no cabeçalho', async ({ page }) => {
						await page.goto(caminho);
						const marcar = page.getByRole('banner').getByRole('link', { name: botao, exact: true });
						await expect(marcar).toBeInViewport({ ratio: 1 });
						await expect(marcar).toHaveAttribute('href', PAGINA_DE_MARCACAO);
						await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
						await expect(marcar).toBeInViewport({ ratio: 1 });
					});

					test('as línguas passam para o menu, que fecha ao clicar fora e com Escape', async ({
						page,
					}) => {
						await page.goto(caminho);
						const atual = page
							.getByRole('banner')
							.locator('[aria-current]')
							.filter({ hasText: rotulo, visible: true });
						await expect(atual).toHaveCount(0);

						await botaoDoMenu(page).click();
						await expect(atual).toBeVisible();
						await page.getByRole('main').click({ position: { x: 5, y: 300 } });
						await expect(atual).toHaveCount(0);

						await botaoDoMenu(page).click();
						await expect(atual).toBeVisible();
						await page.keyboard.press('Escape');
						await expect(atual).toHaveCount(0);
						await expect(botaoDoMenu(page)).toBeFocused();
					});

					if (outrasPublicadas.length > 0) {
						test('o menu fecha depois de escolher uma língua', async ({ page }) => {
							const outra = outrasPublicadas[0];
							await page.goto(caminho);
							await botaoDoMenu(page).click();
							// O teste cancela a navegação depois de a página tratar o clique, para ver o menu.
							await page.evaluate(() =>
								window.addEventListener('click', (evento) => evento.preventDefault()),
							);
							const ligacao = page
								.getByRole('banner')
								.getByRole('link', { name: LINGUAS[outra].nome });
							await ligacao.click();
							await expect(ligacao).toBeHidden();
						});
					}

					test.describe('sem JavaScript', () => {
						test.use({ javaScriptEnabled: false });

						test('o menu abre e mostra as línguas publicadas', async ({ page }) => {
							await page.goto(caminho);
							const cabecalho = page.getByRole('banner');
							const atual = cabecalho
								.locator('[aria-current]')
								.filter({ hasText: rotulo, visible: true });
							await expect(atual).toHaveCount(0);
							await botaoDoMenu(page).click();
							await expect(atual).toBeVisible();
							for (const outra of outrasPublicadas) {
								await expect(
									cabecalho.getByRole('link', { name: LINGUAS[outra].nome }),
								).toHaveAttribute('href', equivalente(caminho, lingua, outra));
							}
						});
					});
				});
			}
		});
	}
});
