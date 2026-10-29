// The cloud provider chart (#66): the CTO picks a scenario and sees, for each of the 6 providers, a
// bar stacked by criterion and a rating; a click on a bar shows the facts, with their date and source.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, type Language } from './expected';

/** In alphabetical order (#54). */
const PROVIDERS = ['AWS', 'Google Cloud', 'Infomaniak', 'Microsoft Azure', 'OVHcloud', 'Scaleway'];

type Rating = 'consider' | 'possible' | 'unsuitable';

// #54's table «Resultado com os factos de hoje», provider by provider, in alphabetical order.
const RESULTS: { scenario: number; ratings: Rating[] }[] = [
	// Antes do lançamento
	{
		scenario: 0,
		ratings: ['consider', 'consider', 'consider', 'consider', 'unsuitable', 'possible'],
	},
	// SaaS em crescimento
	{
		scenario: 1,
		ratings: ['consider', 'consider', 'possible', 'consider', 'possible', 'consider'],
	},
	// Soberania dos dados
	{
		scenario: 2,
		ratings: ['possible', 'possible', 'unsuitable', 'possible', 'consider', 'consider'],
	},
	// Carga muito variável
	{
		scenario: 3,
		ratings: ['consider', 'consider', 'consider', 'consider', 'possible', 'consider'],
	},
	// Custos sob controlo
	{
		scenario: 4,
		ratings: ['consider', 'consider', 'possible', 'consider', 'unsuitable', 'possible'],
	},
];

// The names come from the spec (#54) and the French «Souveraineté des données» from #46. The other
// French and English texts are translations the intern reviews before the Commercial launch (#75).
const EXPECTED: Record<
	Language,
	{
		title: string;
		scenarios: string[];
		ratings: Record<Rating, string>;
		hint: string;
	}
> = {
	pt: {
		title: 'Que cloud para que empresa?',
		scenarios: [
			'Antes do lançamento',
			'SaaS em crescimento',
			'Soberania dos dados',
			'Carga muito variável',
			'Custos sob controlo',
		],
		ratings: { consider: 'A considerar', possible: 'Possível', unsuitable: 'Pouco indicado' },
		hint: 'Clica numa barra para ver os factos.',
	},
	fr: {
		title: 'Quel cloud pour quelle entreprise ?',
		scenarios: [
			'Avant le lancement',
			'SaaS en croissance',
			'Souveraineté des données',
			'Charge très variable',
			'Coûts maîtrisés',
		],
		ratings: { consider: 'À considérer', possible: 'Possible', unsuitable: 'Peu indiqué' },
		hint: 'Clique sur une barre pour voir les faits.',
	},
	en: {
		title: 'Which cloud for which company?',
		scenarios: [
			'Before launch',
			'Growing SaaS',
			'Data sovereignty',
			'Highly variable load',
			'Costs under control',
		],
		ratings: { consider: 'Worth considering', possible: 'Possible', unsuitable: 'Less suited' },
		hint: 'Click a bar to see the facts.',
	},
};

const section = (page: Page, language: Language) =>
	page.getByRole('region', { name: EXPECTED[language].title });

/** The bars of the scenario on screen: those of the other scenarios are hidden. */
const bars = (page: Page, language: Language) => section(page, language).getByRole('button');

/** «Clica numa barra para ver os factos», in the scenario on screen. */
const hint = (page: Page, language: Language) =>
	section(page, language)
		.getByText(EXPECTED[language].hint, { exact: true })
		.filter({ visible: true });

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];
		const expected = EXPECTED[language];

		test.describe(prefix, () => {
			test('the 6 providers are in alphabetical order', async ({ page }) => {
				await page.goto(prefix);
				await expect(bars(page, language)).toHaveCount(PROVIDERS.length);
				for (const [k, provider] of PROVIDERS.entries()) {
					const bar = bars(page, language).nth(k);
					await expect(bar).toHaveAccessibleName(new RegExp(`^${provider},`));
					await expect(bar).toContainText(provider);
				}
			});

			test("in each scenario, each provider's rating is the one in #54", async ({ page }) => {
				await page.goto(prefix);
				for (const { scenario, ratings } of RESULTS) {
					await section(page, language)
						.getByRole('radio', { name: expected.scenarios[scenario], exact: true })
						.check();
					for (const [k, provider] of PROVIDERS.entries()) {
						const rating = expected.ratings[ratings[k]!];
						const bar = bars(page, language).nth(k);
						await expect(bar, `${expected.scenarios[scenario]}, ${provider}`).toHaveAccessibleName(
							`${provider}, ${rating}`,
						);
						await expect(bar).toContainText(rating);
					}
				}
			});

			test('the detail opens with no provider chosen', async ({ page }) => {
				await page.goto(prefix);
				await expect(hint(page, language)).toBeVisible();
				for (const bar of await bars(page, language).all()) {
					await expect(bar).toHaveAttribute('aria-pressed', 'false');
				}
			});
		});
	}
});
