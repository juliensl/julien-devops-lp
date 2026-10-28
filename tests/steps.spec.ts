// A secção Etapas (#65): as 5 Etapas, da Conversa à Entrega e transferência. No computador, a
// secção fica presa e o número de cada Etapa acende quando chega a sua vez; no telemóvel e com
// movimento reduzido, não fica presa.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, type Language } from './expected';

// As Etapas, pela ordem, e o que cada frase diz vêm da spec (#54); em português, as frases são as
// do protótipo v3. O francês e o inglês são traduções que a estagiária valida antes do Lançamento
// comercial (#75).
const EXPECTED: Record<Language, { title: string; steps: [string, string][] }> = {
	pt: {
		title: 'Cinco etapas, sempre pela mesma ordem.',
		steps: [
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
		title: 'Cinq étapes, toujours dans le même ordre.',
		steps: [
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
		title: 'Five steps, always in the same order.',
		steps: [
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
const LIT_COLOR = 'rgb(60, 207, 142)';

/** Onde o Visitante abre a página. */
interface Viewport {
	label: string;
	width: number;
	height: number;
	reducedMotion?: boolean;
}

const DESKTOP: Viewport = { label: 'no computador', width: 1280, height: 800 };
const PHONE: Viewport = { label: 'no telemóvel', width: 375, height: 700 };
const REDUCED_MOTION: Viewport = {
	...DESKTOP,
	label: 'no computador, com movimento reduzido',
	reducedMotion: true,
};
// Presa, uma parte das Etapas ficaria escondida por baixo do ecrã.
const SHORT_SCREEN: Viewport = {
	...DESKTOP,
	label: 'num ecrã baixo, onde as Etapas não cabem',
	height: 360,
};

const section = (page: Page, language: Language) =>
	page.getByRole('region', { name: EXPECTED[language].title });

/** Abre a página nesse ecrã e espera que o JS, que arranca no fim do carregamento, tenha corrido. */
async function openPage(page: Page, path: string, viewport: Viewport) {
	if (viewport.reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.setViewportSize({ width: viewport.width, height: viewport.height });
	await page.goto(path);
	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve)));
}

/** As 5 Etapas estão à vista, pela ordem, cada uma com o nome e a frase. */
async function expectFiveStepsVisible(page: Page, language: Language) {
	const steps = section(page, language).getByRole('list').getByRole('listitem');
	await expect(steps).toHaveCount(5);
	for (const [k, [name, sentence]] of EXPECTED[language].steps.entries()) {
		await steps.nth(k).scrollIntoViewIfNeeded();
		await expect(steps.nth(k).getByText(name, { exact: true })).toBeVisible();
		await expect(steps.nth(k).getByText(sentence, { exact: true })).toBeVisible();
	}
}

/** Leva o início da secção até ao fundo do cabeçalho fixo, onde uma secção presa começa. */
async function scrollToSection(page: Page, language: Language) {
	const header = (await page.getByRole('banner').boundingBox())!;
	await section(page, language).evaluate(
		(s, headerBottom) => scrollBy(0, s.getBoundingClientRect().top - headerBottom),
		header.y + header.height,
	);
}

/**
 * Desce a página `distancia` px e diz quanto a página desceu de facto e quanto subiu o título da
 * secção. Solta, o título sobe tanto como a página desce; presa, fica no mesmo sítio.
 */
async function scrollDown(page: Page, language: Language, distance: number) {
	const heading = section(page, language).getByRole('heading', { level: 2 });
	const before = {
		scroll: await page.evaluate(() => scrollY),
		title: (await heading.boundingBox())!.y,
	};
	await page.evaluate((d) => scrollBy(0, d), distance);
	return {
		scroll: (await page.evaluate(() => scrollY)) - before.scroll,
		title: before.title - (await heading.boundingBox())!.y,
	};
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];

		test.describe(prefix, () => {
			test('no computador, a secção fica presa durante cerca de meio ecrã por Etapa', async ({
				page,
			}) => {
				const { height } = DESKTOP;
				await openPage(page, prefix, DESKTOP);
				await scrollToSection(page, language);
				// 5 Etapas, cerca de 2,5 ecrãs: presa até 2,25 (menos de 2 px, a borda do cabeçalho),
				// já solta aos 2,75.
				const stuck = await scrollDown(page, language, 2.25 * height);
				expect(stuck.scroll).toBeCloseTo(2.25 * height, 0);
				expect(Math.abs(stuck.title)).toBeLessThan(2);
				expect((await scrollDown(page, language, 0.5 * height)).title).toBeGreaterThan(
					0.2 * height,
				);
			});

			test('no computador, o número de cada Etapa acende quando chega a sua vez', async ({
				page,
			}) => {
				await openPage(page, prefix, DESKTOP);
				await scrollToSection(page, language);
				const steps = section(page, language).getByRole('listitem');
				const stepNumber = (k: number) => steps.nth(k).getByText(String(k + 1), { exact: true });

				// Cada meio ecrã de scroll acende mais um número, pela ordem.
				for (let lit = 0; lit <= 5; lit++) {
					for (let k = 0; k < 5; k++) {
						if (k < lit) await expect(stepNumber(k), `${lit} acesos`).toHaveCSS('color', LIT_COLOR);
						else await expect(stepNumber(k), `${lit} acesos`).not.toHaveCSS('color', LIT_COLOR);
					}
					await page.evaluate((d) => scrollBy(0, d), 0.5 * DESKTOP.height);
				}
			});

			for (const viewport of [PHONE, REDUCED_MOTION, SHORT_SCREEN]) {
				test(`${viewport.label}, a secção não fica presa`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await scrollToSection(page, language);
					const { scroll, title } = await scrollDown(page, language, 300);
					expect(scroll, 'a página desceu').toBeGreaterThan(0);
					expect(title).toBeCloseTo(scroll, 0);
				});
			}

			for (const viewport of [DESKTOP, PHONE, REDUCED_MOTION]) {
				test(`${viewport.label}, as 5 Etapas estão visíveis`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await expectFiveStepsVisible(page, language);
				});
			}

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('as 5 Etapas estão visíveis', async ({ page }) => {
					await page.setViewportSize({ width: DESKTOP.width, height: DESKTOP.height });
					await page.goto(prefix);
					await expectFiveStepsVisible(page, language);
				});
			});
		});
	}
});
