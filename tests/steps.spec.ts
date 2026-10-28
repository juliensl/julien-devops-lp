// A secção Etapas (#65): as 5 Etapas, da Conversa à Entrega e transferência. No computador, a
// secção fica presa e o número de cada Etapa acende quando chega a sua vez; no telemóvel e com
// movimento reduzido, não fica presa.
import { expect, test, type Page } from '@playwright/test';
import { emCadaBuild } from './builds';
import { LINGUAS, type Lingua } from './expected';

// As Etapas, pela ordem, e o que cada frase diz vêm da spec (#54); em português, as frases são as
// do protótipo v3. O francês e o inglês são traduções que a estagiária valida antes do Lançamento
// comercial (#75).
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
			['Implementação', 'No máximo 30 dias de calendário.'],
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
			['Mise en œuvre', '30 jours calendaires au maximum.'],
			['Livraison et passation', "Documentation et passation, pour que l'équipe soit autonome."],
		],
	},
	en: {
		titulo: 'Five steps, always in the same order.',
		etapas: [
			['Conversation', '45 min on Google Meet, free of charge.'],
			[
				'Diagnosis',
				'Free. 2 to 3 business days once access is granted, or 3 to 5 if it includes the cloud.',
			],
			['Intervention proposal', 'Which blocks, in what timeframe and at what fixed price.'],
			['Implementation', 'At most 30 calendar days.'],
			['Delivery and handover', 'Documentation and handover, so the team can be self-sufficient.'],
		],
	},
};

/** Um número aceso tem o verde dos dados (#54, «Direção visual»). */
const ACESO = 'rgb(60, 207, 142)';

/** Onde o Visitante abre a página. */
interface Ecra {
	onde: string;
	largura: number;
	altura: number;
	movimentoReduzido?: boolean;
}

const COMPUTADOR: Ecra = { onde: 'no computador', largura: 1280, altura: 800 };
const TELEMOVEL: Ecra = { onde: 'no telemóvel', largura: 375, altura: 700 };
const COM_MOVIMENTO_REDUZIDO: Ecra = {
	...COMPUTADOR,
	onde: 'no computador, com movimento reduzido',
	movimentoReduzido: true,
};
// Presa, uma parte das Etapas ficaria escondida por baixo do ecrã.
const ECRA_BAIXO: Ecra = {
	...COMPUTADOR,
	onde: 'num ecrã baixo, onde as Etapas não cabem',
	altura: 360,
};

const seccao = (page: Page, lingua: Lingua) =>
	page.getByRole('region', { name: ESPERADO[lingua].titulo });

/** Abre a página nesse ecrã e espera que o JS, que arranca no fim do carregamento, tenha corrido. */
async function abre(page: Page, caminho: string, ecra: Ecra) {
	if (ecra.movimentoReduzido) await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.setViewportSize({ width: ecra.largura, height: ecra.altura });
	await page.goto(caminho);
	await page.evaluate(() => new Promise((corrido) => setTimeout(corrido)));
}

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
				const { altura } = COMPUTADOR;
				await abre(page, inicio, COMPUTADOR);
				await chegaASeccao(page, lingua);
				// 5 Etapas, cerca de 2,5 ecrãs: presa até 2,25 (menos de 2 px, a borda do cabeçalho),
				// já solta aos 2,75.
				const presa = await desce(page, lingua, 2.25 * altura);
				expect(presa.pagina).toBeCloseTo(2.25 * altura, 0);
				expect(Math.abs(presa.titulo)).toBeLessThan(2);
				expect((await desce(page, lingua, 0.5 * altura)).titulo).toBeGreaterThan(0.2 * altura);
			});

			test('no computador, o número de cada Etapa acende quando chega a sua vez', async ({
				page,
			}) => {
				await abre(page, inicio, COMPUTADOR);
				await chegaASeccao(page, lingua);
				const etapas = seccao(page, lingua).getByRole('listitem');
				const numero = (k: number) => etapas.nth(k).getByText(String(k + 1), { exact: true });

				// Cada meio ecrã de scroll acende mais um número, pela ordem.
				for (let acesos = 0; acesos <= 5; acesos++) {
					for (let k = 0; k < 5; k++) {
						if (k < acesos) await expect(numero(k), `${acesos} acesos`).toHaveCSS('color', ACESO);
						else await expect(numero(k), `${acesos} acesos`).not.toHaveCSS('color', ACESO);
					}
					await page.evaluate((d) => scrollBy(0, d), 0.5 * COMPUTADOR.altura);
				}
			});

			for (const ecra of [TELEMOVEL, COM_MOVIMENTO_REDUZIDO, ECRA_BAIXO]) {
				test(`${ecra.onde}, a secção não fica presa`, async ({ page }) => {
					await abre(page, inicio, ecra);
					await chegaASeccao(page, lingua);
					const { pagina, titulo } = await desce(page, lingua, 300);
					expect(pagina, 'a página desceu').toBeGreaterThan(0);
					expect(titulo).toBeCloseTo(pagina, 0);
				});
			}

			for (const ecra of [COMPUTADOR, TELEMOVEL, COM_MOVIMENTO_REDUZIDO]) {
				test(`${ecra.onde}, as 5 Etapas estão visíveis`, async ({ page }) => {
					await abre(page, inicio, ecra);
					await asCincoEtapasEstaoVisiveis(page, lingua);
				});
			}

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('as 5 Etapas estão visíveis', async ({ page }) => {
					await page.setViewportSize({ width: COMPUTADOR.largura, height: COMPUTADOR.altura });
					await page.goto(inicio);
					await asCincoEtapasEstaoVisiveis(page, lingua);
				});
			});
		});
	}
});
