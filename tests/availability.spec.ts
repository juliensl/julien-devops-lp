// The «Disponibilité & conditions» page: the four availability levels, the calculator of the longest
// downtime each one allows, what it means for the architecture, and the guarantee and its conditions.
import { expect, test } from '@playwright/test';
import { maxDowntime } from '../src/config/availability.ts';
import { inEachBuild } from './builds';
import { LANGUAGES, NAME, type Language } from './expected';

const PATH = 'availability/';

/** A text with plain spaces, to compare with what the spec writes. */
const plain = (text: string) => text.replace(/ /g, ' ');

// The French texts are Julien's (§2); the description is made of his sentences. Portuguese is their
// translation. English shows the French until its translation.
const FRENCH = {
	title: 'Disponibilité & conditions',
	description:
		"Compare les niveaux de disponibilité, calcule ton temps d'indisponibilité théorique et consulte les conditions de la garantie de conformité.",
	heading: 'Quel niveau de disponibilité pour ton SaaS ?',
	intro:
		"Un objectif de disponibilité se choisit selon l'impact réel d'une interruption sur ton activité. Plus l'objectif est élevé, plus l'architecture, la redondance et l'exploitation peuvent devenir exigeantes et coûteuses. Compare les niveaux avant de décider.",
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
	},
};

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const t = EXPECTED[language];
		const path = `${LANGUAGES[language].prefix}${PATH}`;

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
		expect(maxDowntime(99.9, 365, 'about')).toBe('8 h 45 min 36 s');
		expect(maxDowntime(99.99, 30, 'about')).toBe('about 4 min 19 s');
	});
});
