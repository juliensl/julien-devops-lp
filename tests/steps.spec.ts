// A secção Etapas (#65): as 5 Etapas, da Conversa à Entrega e transferência. No computador, a
// secção fica presa e o número de cada Etapa acende quando chega a sua vez; no telemóvel e com
// movimento reduzido, não fica presa.
import { expect, test, type Page } from '@playwright/test';
import { emCadaBuild } from './builds';
import { LINGUAS, type Lingua } from './expected';

// Os valores esperados, tirados da spec (#54). O francês e o inglês são traduções que a estagiária
// valida antes do Lançamento comercial (#75).
const ESPERADO: Record<Lingua, { titulo: string; etapas: [string, string][] }> = {
	pt: {
		titulo: 'Cinco etapas, sempre pela mesma ordem.',
		etapas: [
			['Conversa', '45 min por Google Meet, gratuita.'],
			[
				'Diagnóstico',
				'Gratuito. 2 a 3 dias úteis depois de receber os acessos, ou 3 a 5 se incluir a cloud.',
			],
			['Proposta de intervenção', 'Que blocos, em que prazo e por que preço fixo.'],
			['Implementação', 'No máximo 30 dias, a contar do início.'],
			['Entrega e transferência', 'Documentação e transferência para a equipa ficar autónoma.'],
		],
	},
	fr: {
		titulo: 'Cinq étapes, toujours dans le même ordre.',
		etapas: [
			['Échange', '45 min sur Google Meet, gratuit.'],
			[
				'Diagnostic',
				'Gratuit. 2 à 3 jours ouvrés après réception des accès, ou 3 à 5 si le cloud est inclus.',
			],
			["Proposition d'intervention", 'Quels blocs, en combien de temps et pour quel prix fixe.'],
			['Mise en œuvre', 'Au maximum 30 jours, à compter du début.'],
			['Livraison et passation', "Documentation et passation, pour que l'équipe soit autonome."],
		],
	},
	en: {
		titulo: 'Five steps, always in the same order.',
		etapas: [
			['Conversation', '45 min on Google Meet, free of charge.'],
			[
				'Diagnosis',
				'Free. 2 to 3 business days after I get access, or 3 to 5 if it includes the cloud.',
			],
			['Intervention proposal', 'Which blocks, in what timeframe and at what fixed price.'],
			['Implementation', 'At most 30 days, from the start.'],
			['Delivery and handover', 'Documentation and handover, so the team can be self-sufficient.'],
		],
	},
};

/** Um número aceso tem o verde dos dados (#54, «Direção visual»). */
const ACESO = 'rgb(60, 207, 142)';

const seccao = (page: Page, lingua: Lingua) =>
	page.getByRole('region', { name: ESPERADO[lingua].titulo });

/** As 5 Etapas estão à vista, pela ordem, cada uma com o nome e a frase. */
async function asCincoEtapasEstaoVisiveis(page: Page, lingua: Lingua) {
	const etapas = seccao(page, lingua).getByRole('list').getByRole('listitem');
	await expect(etapas).toHaveCount(5);
	for (const [k, [nome, frase]] of ESPERADO[lingua].etapas.entries()) {
		await etapas.nth(k).scrollIntoViewIfNeeded();
		await expect(etapas.nth(k).getByText(nome, { exact: true })).toBeVisible();
		await expect(etapas.nth(k).getByText(frase, { exact: true })).toBeVisible();
	}
}

/** Abre a página e espera que o JS, que arranca no fim do carregamento, tenha corrido. */
async function abre(page: Page, caminho: string) {
	await page.goto(caminho);
	await page.evaluate(() => new Promise((corrido) => setTimeout(corrido)));
}

/** Leva o início da secção até ao fundo do cabeçalho fixo, onde uma secção presa começa. */
async function chegaASeccao(page: Page, lingua: Lingua) {
	const cabecalho = (await page.getByRole('banner').boundingBox())!;
	await seccao(page, lingua).evaluate(
		(s, fundoDoCabecalho) => scrollBy(0, s.getBoundingClientRect().top - fundoDoCabecalho),
		cabecalho.y + cabecalho.height,
	);
}

/**
 * Desce a página `distancia` px e diz quanto a página desceu de facto e quanto subiu o título da
 * secção. Solta, o título sobe tanto como a página desce; presa, fica no mesmo sítio.
 */
async function desce(page: Page, lingua: Lingua, distancia: number) {
	const titulo = seccao(page, lingua).getByRole('heading', { level: 2 });
	const antes = {
		pagina: await page.evaluate(() => scrollY),
		titulo: (await titulo.boundingBox())!.y,
	};
	await page.evaluate((d) => scrollBy(0, d), distancia);
	return {
		pagina: (await page.evaluate(() => scrollY)) - antes.pagina,
		titulo: antes.titulo - (await titulo.boundingBox())!.y,
	};
}

emCadaBuild((build) => {
	for (const lingua of build.fase.linguasPublicadas) {
		const { inicio } = LINGUAS[lingua];

		test.describe(inicio, () => {
			test('no computador, a secção fica presa durante cerca de meio ecrã por Etapa', async ({
				page,
			}) => {
				const ecra = 800;
				await page.setViewportSize({ width: 1280, height: ecra });
				await abre(page, inicio);
				await chegaASeccao(page, lingua);
				// 5 Etapas, cerca de 2,5 ecrãs: presa até 2,25 (menos de 2 px, a borda do cabeçalho),
				// já solta aos 2,75.
				const presa = await desce(page, lingua, 2.25 * ecra);
				expect(presa.pagina).toBeCloseTo(2.25 * ecra, 0);
				expect(Math.abs(presa.titulo)).toBeLessThan(2);
				expect((await desce(page, lingua, 0.5 * ecra)).titulo).toBeGreaterThan(0.2 * ecra);
			});

			test('no computador, o número de cada Etapa acende quando chega a sua vez', async ({
				page,
			}) => {
				const ecra = 800;
				await page.setViewportSize({ width: 1280, height: ecra });
				await abre(page, inicio);
				await chegaASeccao(page, lingua);
				const etapas = seccao(page, lingua).getByRole('listitem');
				const numero = (k: number) => etapas.nth(k).getByText(String(k + 1), { exact: true });

				// Cada meio ecrã de scroll acende mais um número, pela ordem.
				for (let acesos = 0; acesos <= 5; acesos++) {
					for (let k = 0; k < 5; k++) {
						if (k < acesos) await expect(numero(k), `${acesos} acesos`).toHaveCSS('color', ACESO);
						else await expect(numero(k), `${acesos} acesos`).not.toHaveCSS('color', ACESO);
					}
					await page.evaluate((d) => scrollBy(0, d), 0.5 * ecra);
				}
			});

			for (const { onde, largura, altura, movimentoReduzido } of [
				{ onde: 'no telemóvel', largura: 375, altura: 700, movimentoReduzido: false },
				{
					onde: 'no computador, com movimento reduzido,',
					largura: 1280,
					altura: 800,
					movimentoReduzido: true,
				},
				// Presa, uma parte das Etapas ficaria escondida por baixo do ecrã.
				{
					onde: 'num ecrã baixo, onde as Etapas não cabem,',
					largura: 1280,
					altura: 360,
					movimentoReduzido: false,
				},
			]) {
				test(`${onde} a secção não fica presa`, async ({ page }) => {
					if (movimentoReduzido) await page.emulateMedia({ reducedMotion: 'reduce' });
					await page.setViewportSize({ width: largura, height: altura });
					await abre(page, inicio);
					await chegaASeccao(page, lingua);
					const { pagina, titulo } = await desce(page, lingua, 300);
					expect(pagina, 'a página desceu').toBeGreaterThan(0);
					expect(titulo).toBeCloseTo(pagina, 0);
				});
			}

			test('no telemóvel, as 5 Etapas estão visíveis', async ({ page }) => {
				await page.setViewportSize({ width: 375, height: 700 });
				await page.goto(inicio);
				await asCincoEtapasEstaoVisiveis(page, lingua);
			});

			test('no computador, com movimento reduzido, as 5 Etapas estão visíveis', async ({
				page,
			}) => {
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.setViewportSize({ width: 1280, height: 800 });
				await page.goto(inicio);
				await asCincoEtapasEstaoVisiveis(page, lingua);
			});

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('as 5 Etapas estão visíveis', async ({ page }) => {
					await page.setViewportSize({ width: 1280, height: 800 });
					await page.goto(inicio);
					await asCincoEtapasEstaoVisiveis(page, lingua);
				});
			});
		});
	}
});
