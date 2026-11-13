// The «Disponibilité & conditions» page: the four availability levels, the calculator of the longest
// downtime each one allows, what it means for the architecture, and the guarantee and its conditions.
import { expect, test, type Page } from '@playwright/test';
import { maxDowntime } from '../src/config/availability.ts';
import { inEachBuild } from './builds';
import { LANGUAGES, NAME, type Language } from './expected';

const PATH = 'availability/';

/** A text with plain spaces, to compare with what the spec writes. */
const plain = (text: string) => text.replace(/\u00a0/g, ' ');

// The French texts are Julien's (§2); the description is made of his sentences. Portuguese is their
// translation. English shows the French until its translation.
const FRENCH = {
	title: 'Disponibilité & conditions',
	description:
		"Compare les niveaux de disponibilité, calcule ton temps d'indisponibilité théorique et consulte les conditions de la garantie de conformité.",
	heading: 'Quel niveau de disponibilité pour ton SaaS ?',
	intro:
		"Un objectif de disponibilité se choisit selon l'impact réel d'une interruption sur ton activité. Plus l'objectif est élevé, plus l'architecture, la redondance et l'exploitation peuvent devenir exigeantes et coûteuses. Compare les niveaux avant de décider.",
	calculator: {
		title: "Calcule ton temps d'indisponibilité théorique",
		text: "Choisis un objectif de disponibilité et découvre ce qu'il représente en minutes par mois et en heures par an. Ces valeurs sont indicatives : un objectif d'architecture ne garantit pas, à lui seul, la disponibilité de toute l'application.",
		objective: 'Objectif de disponibilité',
		month: 'Durée du mois',
		days: 'jours',
		result: 'Indisponibilité maximale théorique',
		perMonth: 'Par mois',
		perYear: 'Équivalent annuel',
		about: 'environ',
		formula:
			'Formule, pour une mesure 24 h/24 : (1 − objectif / 100) × durée de la période en secondes, sur le mois choisi ou sur une année de 365 jours.',
	},
};
type Texts = typeof FRENCH;
const EXPECTED: Record<Language, Texts> = {
	fr: FRENCH,
	en: FRENCH,
	pt: {
		title: 'Disponibilidade e condições',
		description:
			'Compara os níveis de disponibilidade, calcula o teu tempo de indisponibilidade teórico e consulta as condições da garantia de conformidade.',
		heading: 'Que nível de disponibilidade para o teu SaaS?',
		intro:
			'Um objetivo de disponibilidade escolhe-se de acordo com o impacto real de uma interrupção no teu negócio. Quanto mais alto for o objetivo, mais exigentes e dispendiosas se podem tornar a arquitetura, a redundância e a operação. Compara os níveis antes de decidir.',
		calculator: {
			title: 'Calcula o teu tempo de indisponibilidade teórico',
			text: 'Escolhe um objetivo de disponibilidade e descobre o que representa em minutos por mês e em horas por ano. Estes valores são indicativos: um objetivo de arquitetura não garante, por si só, a disponibilidade de toda a aplicação.',
			objective: 'Objetivo de disponibilidade',
			month: 'Duração do mês',
			days: 'dias',
			result: 'Indisponibilidade máxima teórica',
			perMonth: 'Por mês',
			perYear: 'Equivalente anual',
			about: 'cerca de',
			formula:
				'Fórmula, para uma medição 24 h/24: (1 − objetivo / 100) × duração do período em segundos, no mês escolhido ou num ano de 365 dias.',
		},
	},
};

/** The four levels, as the spec writes them, with the longest downtime over 30 days and 365 days. */
const LEVELS = [
	{ objective: '99.5', month: '3 h 36 min', year: '43 h 48 min' },
	{ objective: '99.9', month: '43 min 12 s', year: '8 h 45 min 36 s' },
	{ objective: '99.95', month: '21 min 36 s', year: '4 h 22 min 48 s' },
	{ objective: '99.99', month: '≈ 4 min 19 s', year: '≈ 52 min 34 s' },
];

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const t = EXPECTED[language];
		const path = `${LANGUAGES[language].prefix}${PATH}`;
		const c = t.calculator;
		/** An objective as the page writes it: "99,9 %" in French and Portuguese, "99.9%" in English. */
		const percent = (objective: string) =>
			language === 'en' ? `${objective}%` : `${objective.replace('.', ',')} %`;
		/** A downtime as the page writes it: the font has no "≈", so the page says it in words. */
		const downtime = (text: string) => text.replace('≈', c.about);
		const calculator = (page: Page) => page.getByRole('region', { name: c.title });
		const result = (page: Page) => calculator(page).getByRole('group', { name: c.result });
		const radio = (page: Page, name: string) =>
			calculator(page).getByRole('radio', { name, exact: true });
		const month = (days: number) => `${days} ${c.days}`;
		const perMonth = (days: number, text: string) =>
			`${c.perMonth} (${month(days)}) ${downtime(text)}`;
		const perYear = (text: string) => `${c.perYear} (${month(365)}) ${downtime(text)}`;

		test.describe(`${path} calculator`, () => {
			test('opens on 99.9 % over a 30-day month, with the formula and the values said to be indicative', async ({
				page,
			}) => {
				await page.goto(path);
				await expect(radio(page, percent('99.9'))).toBeChecked();
				await expect(radio(page, month(30))).toBeChecked();
				await expect(result(page)).toContainText(`${c.objective} ${percent('99.9')}`);
				await expect(result(page)).toContainText(perMonth(30, '43 min 12 s'));
				await expect(result(page)).toContainText(perYear('8 h 45 min 36 s'));
				await expect(calculator(page)).toContainText(c.text);
				await expect(calculator(page)).toContainText(c.formula);
			});

			test('each level gives the longest downtime over 30 days and over a year of 365 days', async ({
				page,
			}) => {
				await page.goto(path);
				for (const level of LEVELS) {
					await radio(page, percent(level.objective)).check();
					await expect(result(page)).toContainText(`${c.objective} ${percent(level.objective)}`);
					await expect(result(page)).toContainText(perMonth(30, level.month));
					await expect(result(page)).toContainText(perYear(level.year));
				}
			});

			// 99.9 % over 28 days: 2,419.2 s; over 31 days: 2,678.4 s.
			test("changing the month updates the month's result, not the year's, and screen readers hear it", async ({
				page,
			}) => {
				await page.goto(path);
				const status = calculator(page).getByRole('status');
				await radio(page, month(28)).check();
				await expect(result(page)).toContainText(perMonth(28, '≈ 40 min 19 s'));
				await expect(result(page)).toContainText(perYear('8 h 45 min 36 s'));
				await expect(status).toHaveText(
					`${c.objective}, ${percent('99.9')}. ${c.perMonth} (${month(28)}), ${downtime('≈ 40 min 19 s')}. ${c.perYear} (${month(365)}), 8 h 45 min 36 s.`,
				);

				await radio(page, month(31)).check();
				await expect(result(page)).toContainText(perMonth(31, '≈ 44 min 38 s'));
				await expect(status).toContainText(downtime('≈ 44 min 38 s'));
			});

			// 99.95 % over 31 days: 1,339.2 s.
			test('works with the keyboard, and screen readers hear the new level', async ({ page }) => {
				await page.goto(path);
				await radio(page, percent('99.9')).focus();
				await page.keyboard.press('ArrowRight');
				await expect(radio(page, percent('99.95'))).toBeChecked();
				await expect(result(page)).toContainText(perMonth(30, '21 min 36 s'));
				await expect(calculator(page).getByRole('status')).toContainText(
					`${c.objective}, ${percent('99.95')}`,
				);

				await page.keyboard.press('Tab');
				await expect(radio(page, month(30))).toBeFocused();
				await page.keyboard.press('ArrowRight');
				await expect(radio(page, month(31))).toBeChecked();
				await expect(result(page)).toContainText(perMonth(31, '≈ 22 min 19 s'));
				await expect(result(page)).toContainText(perYear('4 h 22 min 48 s'));
			});
		});

		test.describe(`${path} calculator without JS`, () => {
			test.use({ javaScriptEnabled: false });

			test('shows the values of a 30-day month, without the choices', async ({ page }) => {
				await page.goto(path);
				await expect(calculator(page).getByRole('radio')).toHaveCount(0);
				await expect(result(page)).toContainText(`${c.objective} ${percent('99.9')}`);
				await expect(result(page)).toContainText(perMonth(30, '43 min 12 s'));
				await expect(result(page)).toContainText(perYear('8 h 45 min 36 s'));
				await expect(calculator(page)).toContainText(c.formula);
			});
		});

		test(`${path}: has its title, its description, its heading and the introduction`, async ({
			page,
		}) => {
			await page.goto(path);
			await expect(page).toHaveTitle(`${t.title} · ${NAME}`);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute(
				'content',
				t.description,
			);
			const main = page.getByRole('main');
			await expect(main.getByRole('heading', { level: 1 })).toHaveText(t.heading);
			await expect(main).toContainText(t.intro);
		});
	}
});

test.describe('the longest downtime of an objective', () => {
	// The spec's control values for a 30-day month (#129, «Decisões de teste»).
	for (const [objective, expected] of [
		[99.5, '3 h 36 min'],
		[99.9, '43 min 12 s'],
		[99.95, '21 min 36 s'],
		[99.99, 'about 4 min 19 s'],
	] as const) {
		test(`${objective} % over a 30-day month: ${expected}`, () => {
			expect(plain(maxDowntime(objective, 30, 'about'))).toBe(expected);
		});
	}

	// Worked out by hand over 365 days (31,536,000 s): 0.5 % = 157,680 s; 0.1 % = 31,536 s;
	// 0.05 % = 15,768 s; 0.01 % = 3,153.6 s.
	for (const [objective, expected] of [
		[99.5, '43 h 48 min'],
		[99.9, '8 h 45 min 36 s'],
		[99.95, '4 h 22 min 48 s'],
		[99.99, 'about 52 min 34 s'],
	] as const) {
		test(`${objective} % over a year of 365 days: ${expected}`, () => {
			expect(plain(maxDowntime(objective, 365, 'about'))).toBe(expected);
		});
	}

	test('a number never ends a line away from its unit', () => {
		expect(maxDowntime(99.9, 365, 'about')).toBe('8\u00a0h 45\u00a0min 36\u00a0s');
		expect(maxDowntime(99.99, 30, 'about')).toBe('about\u00a04\u00a0min 19\u00a0s');
	});
});
