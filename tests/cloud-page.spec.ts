// The «Choisir son cloud» page and its cloud provider chart: the CTO picks a scenario and sees, for each
// of the 6 providers, a bar stacked by criterion and a rating; a click on a bar shows the facts, with
// their date and source.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { BOOKING_PAGE, LANGUAGES, NAME, type Language } from './expected';

/** The page's texts, from Julien's document; English keeps the French ones until it is translated. */
const FRENCH_PAGE = {
	name: 'Choisir son cloud',
	title: 'Quel cloud choisir pour ton entreprise ?',
	intro:
		'Le meilleur cloud dépend de ton produit, de ton équipe, de ta croissance, de ton budget et de tes contraintes réglementaires. Compare les options selon ton contexte, plutôt que de choisir un fournisseur uniquement sur sa notoriété.',
	description:
		'Le meilleur cloud dépend de ton produit, de ton équipe, de ta croissance, de ton budget et de tes contraintes réglementaires. Compare les fournisseurs selon tes priorités.',
	end: 'Tu hésites entre plusieurs architectures ?',
	endText: 'Parlons de ton projet et comparons les options adaptées à tes contraintes.',
};
const PAGE: Record<Language, typeof FRENCH_PAGE> = {
	fr: FRENCH_PAGE,
	en: FRENCH_PAGE,
	pt: {
		name: 'Escolher a cloud',
		title: 'Que cloud escolher para a tua empresa?',
		intro:
			'A melhor cloud depende do teu produto, da tua equipa, do teu crescimento, do teu orçamento e das tuas restrições regulamentares. Compara as opções de acordo com o teu contexto, em vez de escolheres um fornecedor só pela notoriedade.',
		description:
			'A melhor cloud depende do teu produto, da tua equipa, do teu crescimento, do teu orçamento e das tuas restrições regulamentares. Compara os fornecedores de acordo com as tuas prioridades.',
		end: 'Hesitas entre várias arquiteturas?',
		endText: 'Vamos falar do teu projeto e comparar as opções adequadas às tuas restrições.',
	},
};

const pathOf = (language: Language) => `${LANGUAGES[language].prefix}cloud/`;

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const path = pathOf(language);
		const { name, title, intro, description, end, endText } = PAGE[language];

		test(`${path}: the title, the description, the heading and the introduction`, async ({
			page,
		}) => {
			await page.goto(path);
			await expect(page).toHaveTitle(`${name} · ${NAME}`);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute(
				'content',
				description,
			);
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
			await expect(page.getByText(intro, { exact: true })).toBeVisible();
		});

		test(`${path}: ends with "${end}" and the button to the booking page`, async ({ page }) => {
			await page.goto(path);
			const section = page.getByRole('main').getByRole('region').last();
			await expect(section.getByRole('heading', { level: 2 })).toHaveText(end);
			await expect(section.getByText(endText, { exact: true })).toBeVisible();
			const button = section.getByRole('link', { name: LANGUAGES[language].button, exact: true });
			await expect(button).toHaveAttribute('href', BOOKING_PAGE);
		});
	}
});

/** In alphabetical order (#54). */
const PROVIDERS = ['AWS', 'Google Cloud', 'Infomaniak', 'Microsoft Azure', 'OVHcloud', 'Scaleway'];

type Rating = 'consider' | 'possible' | 'unsuitable';

// Each scenario's ratings with the facts checked on 16/10/2026, provider by provider, in alphabetical
// order. The scenarios are in the order of Julien's document.
const RESULTS: { ratings: Rating[] }[] = [
	// Before launch
	{ ratings: ['consider', 'consider', 'consider', 'consider', 'unsuitable', 'possible'] },
	// Growing SaaS
	{ ratings: ['consider', 'consider', 'possible', 'consider', 'possible', 'consider'] },
	// Highly variable load
	{ ratings: ['consider', 'consider', 'consider', 'consider', 'possible', 'consider'] },
	// Cost control
	{ ratings: ['consider', 'consider', 'possible', 'consider', 'unsuitable', 'possible'] },
	// Data sovereignty
	{ ratings: ['possible', 'possible', 'unsuitable', 'possible', 'consider', 'consider'] },
];

const FRENCH_LEGEND =
	'Les résultats sont des repères pour préparer une décision, pas un classement universel. Les critères et leur importance peuvent varier selon le projet. Les données sont datées et les évaluations de pertinence sont indicatives.';

// The chart's texts. English shows the French ones of Julien's document until it is translated.
const EXPECTED: Record<
	Language,
	{
		title: string;
		instruction: string;
		legend: string;
		/** The day the facts were checked, as the page writes it. */
		verified: string;
		scenarios: string[];
		ratings: Record<Rating, string>;
		hint: string;
		/** French puts a space before the colon. */
		colon: string;
		/** Microsoft Azure's facts in the growing SaaS scenario, heaviest criterion first: the criterion,
		 * the value and what else the line says (the product, a note). */
		azure: [string, string, string][];
		opinion: string;
		/** The date the Azure sources were read, as the page writes it. */
		read: string;
	}
> = {
	pt: {
		title: 'Compara os fornecedores de acordo com as tuas prioridades',
		instruction:
			'Escolhe um cenário para ver os pontos fortes, os limites e as fontes oficiais de cada fornecedor.',
		legend:
			'Os resultados são pontos de referência para preparar uma decisão, não uma classificação universal. Os critérios e a sua importância podem variar conforme o projeto. Os dados têm data e as avaliações de adequação são indicativas.',
		verified: 'Factos verificados a 16/10/2026.',
		scenarios: [
			'Antes do lançamento',
			'SaaS em crescimento',
			'Carga muito variável',
			'Controlo dos custos',
			'Soberania dos dados',
		],
		ratings: { consider: 'A considerar', possible: 'Possível', unsuitable: 'Pouco indicado' },
		hint: 'Clica numa barra para ver os factos.',
		colon: ':',
		azure: [
			['Kubernetes gerido', 'Sim', 'Azure Kubernetes Service (AKS)'],
			['Contentores com escala automática', 'Sim', 'Azure Container Apps'],
			['Regiões na UE', 'Sim', '13 regiões na UE, 2 delas de acesso restrito.'],
			[
				'Visibilidade e controlo dos custos',
				'Em parte',
				'Tráfego de saída: pago depois de 100 GB/mês.',
			],
		],
		opinion: 'opinião do Julien',
		read: '16/10/2026',
	},
	fr: {
		title: 'Compare les fournisseurs selon tes priorités',
		instruction:
			'Choisis un scénario pour voir les points forts, les limites et les sources officielles de chaque fournisseur.',
		legend: FRENCH_LEGEND,
		verified: 'Faits vérifiés le 16 oct. 2026.',
		scenarios: [
			'Avant le lancement',
			'SaaS en croissance',
			'Charge très variable',
			'Maîtrise des coûts',
			'Souveraineté des données',
		],
		ratings: { consider: 'À considérer', possible: 'Possible', unsuitable: 'Peu indiqué' },
		hint: 'Clique sur une barre pour voir les faits.',
		colon: ' :',
		azure: [
			['Kubernetes managé', 'Oui', 'Azure Kubernetes Service (AKS)'],
			["Conteneurs avec mise à l'échelle automatique", 'Oui', 'Azure Container Apps'],
			["Régions dans l'UE", 'Oui', "13 régions dans l'UE, dont 2 à accès restreint."],
			[
				'Visibilité et maîtrise des coûts',
				'En partie',
				'Trafic sortant : payant au-delà de 100 Go/mois.',
			],
		],
		opinion: 'avis de Julien',
		read: '16 oct. 2026',
	},
	en: {
		title: 'Compare les fournisseurs selon tes priorités',
		instruction:
			'Choisis un scénario pour voir les points forts, les limites et les sources officielles de chaque fournisseur.',
		legend: FRENCH_LEGEND,
		verified: 'Faits vérifiés le Oct 16, 2026.',
		scenarios: [
			'Before launch',
			'Growing SaaS',
			'Highly variable load',
			'Maîtrise des coûts',
			'Data sovereignty',
		],
		ratings: { consider: 'Worth considering', possible: 'Possible', unsuitable: 'Less suited' },
		hint: 'Click a bar to see the facts.',
		colon: ':',
		azure: [
			['Managed Kubernetes', 'Yes', 'Azure Kubernetes Service (AKS)'],
			['Autoscaling containers', 'Yes', 'Azure Container Apps'],
			['EU regions', 'Yes', '13 regions in the EU, 2 of them with restricted access.'],
			['Cost visibility and control', 'Partly', 'Outbound traffic: paid beyond 100 GB/month.'],
		],
		opinion: "Julien's opinion",
		read: 'Oct 16, 2026',
	},
};

const section = (page: Page, language: Language) =>
	page.getByRole('region', { name: EXPECTED[language].title });

/** The bars of the scenario on screen: those of the other scenarios are hidden. */
const bars = (page: Page, language: Language) => section(page, language).getByRole('button');

/** The hint to click a bar, in the scenario on screen. */
const hint = (page: Page, language: Language) =>
	section(page, language)
		.getByText(EXPECTED[language].hint, { exact: true })
		.filter({ visible: true });

/** The facts of the chosen provider, in the scenario on screen. */
const detail = (page: Page, language: Language, provider: string) =>
	section(page, language)
		.getByRole('list', { name: new RegExp(`^${provider}`) })
		.filter({ visible: true });

const scenario = (page: Page, language: Language, k: number) =>
	section(page, language).getByRole('radio', {
		name: EXPECTED[language].scenarios[k],
		exact: true,
	});

/** What screen readers hear in a scenario: who has each rating, in alphabetical order. */
function summary(language: Language, k: number) {
	const { scenarios, ratings, colon } = EXPECTED[language];
	const groups = (['consider', 'possible', 'unsuitable'] as Rating[]).flatMap((rating) => {
		const names = PROVIDERS.filter((_, p) => RESULTS[k]!.ratings[p] === rating);
		return names.length ? [`${ratings[rating]}${colon} ${names.join(', ')}.`] : [];
	});
	return [`${scenarios[k]}.`, ...groups].join(' ');
}

const COST_CONTROL = 3;
const SOVEREIGNTY = 4;

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const path = pathOf(language);
		const expected = EXPECTED[language];

		test.describe(path, () => {
			test('the chart has its title, its instruction, the legend and the day the facts were checked', async ({
				page,
			}) => {
				await page.goto(path);
				await expect(section(page, language).getByRole('heading', { level: 2 })).toHaveText(
					expected.title,
				);
				await expect(
					section(page, language).getByText(expected.instruction, { exact: true }),
				).toBeVisible();
				await expect(
					section(page, language).getByText(expected.legend, { exact: true }),
				).toBeVisible();
				await expect(section(page, language)).toContainText(expected.verified);
			});

			test('the 6 providers are in alphabetical order', async ({ page }) => {
				await page.goto(path);
				await expect(bars(page, language)).toHaveCount(PROVIDERS.length);
				for (const [k, provider] of PROVIDERS.entries()) {
					const bar = bars(page, language).nth(k);
					await expect(bar).toHaveAccessibleName(new RegExp(`^${provider},`));
					await expect(bar).toContainText(provider);
				}
			});

			test("in each scenario, each provider's rating is the expected one", async ({ page }) => {
				await page.goto(path);
				for (const [k, { ratings }] of RESULTS.entries()) {
					await scenario(page, language, k).check();
					for (const [p, provider] of PROVIDERS.entries()) {
						const rating = expected.ratings[ratings[p]!];
						const bar = bars(page, language).nth(p);
						await expect(bar, `${expected.scenarios[k]}, ${provider}`).toHaveAccessibleName(
							`${provider}, ${rating}`,
						);
						await expect(bar).toContainText(rating);
					}
				}
			});

			test('the detail opens with no provider chosen', async ({ page }) => {
				await page.goto(path);
				await expect(hint(page, language)).toBeVisible();
				for (const bar of await bars(page, language).all()) {
					await expect(bar).toHaveAttribute('aria-pressed', 'false');
				}
			});

			test("a click on a bar shows the scenario's criteria, each with its value, product or note, source and date", async ({
				page,
			}) => {
				await page.goto(path);
				const bar = bars(page, language).nth(PROVIDERS.indexOf('Microsoft Azure'));
				await bar.click();
				await expect(bar).toHaveAttribute('aria-pressed', 'true');
				await expect(hint(page, language)).toBeHidden();

				const facts = detail(page, language, 'Microsoft Azure').getByRole('listitem');
				await expect(facts).toHaveCount(expected.azure.length);
				for (const [k, [criterion, value, text]] of expected.azure.entries()) {
					const fact = facts.nth(k);
					await expect(fact).toContainText(criterion);
					await expect(fact).toContainText(value);
					await expect(fact).toContainText(text);
					const source = fact.getByRole('link').first();
					await expect(source).toHaveAttribute('href', /^https:\/\/[a-z.]*microsoft\.com\//);
					await expect(source).toHaveAccessibleName(/microsoft\.com$/);
				}
				await expect(facts.first()).toContainText(expected.read);
			});

			test("the cost criterion is marked as Julien's opinion, the facts are not", async ({
				page,
			}) => {
				await page.goto(path);
				await bars(page, language).nth(PROVIDERS.indexOf('Microsoft Azure')).click();
				const facts = detail(page, language, 'Microsoft Azure').getByRole('listitem');
				for (const k of [0, 1, 2]) await expect(facts.nth(k)).not.toContainText(expected.opinion);
				await expect(facts.nth(3)).toContainText(expected.opinion);
			});

			test('the chosen provider stays chosen in another scenario, and a second click unchooses it', async ({
				page,
			}) => {
				await page.goto(path);
				const azure = PROVIDERS.indexOf('Microsoft Azure');
				await bars(page, language).nth(azure).click();
				await scenario(page, language, SOVEREIGNTY).check();
				await expect(bars(page, language).nth(azure)).toHaveAttribute('aria-pressed', 'true');
				// Data sovereignty weighs 3 criteria.
				await expect(detail(page, language, 'Microsoft Azure').getByRole('listitem')).toHaveCount(
					3,
				);

				await bars(page, language).nth(azure).click();
				await expect(bars(page, language).nth(azure)).toHaveAttribute('aria-pressed', 'false');
				await expect(hint(page, language)).toBeVisible();
			});

			test('with the keyboard: the arrows change the scenario, Enter and Space press a bar', async ({
				page,
			}) => {
				await page.goto(path);
				await scenario(page, language, COST_CONTROL).focus();
				await page.keyboard.press('ArrowRight');
				await expect(scenario(page, language, SOVEREIGNTY)).toBeChecked();
				await expect(bars(page, language).first()).toHaveAccessibleName(
					`AWS, ${expected.ratings.possible}`,
				);

				const bar = bars(page, language).first();
				await bar.focus();
				await page.keyboard.press('Enter');
				await expect(bar).toHaveAttribute('aria-pressed', 'true');
				await page.keyboard.press('Space');
				await expect(bar).toHaveAttribute('aria-pressed', 'false');
			});

			test('screen readers hear the new result when the scenario changes', async ({ page }) => {
				await page.goto(path);
				for (const k of [SOVEREIGNTY, 0]) {
					await scenario(page, language, k).check();
					await expect(section(page, language).getByRole('status')).toHaveText(
						summary(language, k),
					);
				}
			});

			test('on a 320 px phone, with a provider chosen, the page does not scroll sideways', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 320, height: 640 });
				await page.goto(path);
				await bars(page, language).nth(PROVIDERS.indexOf('Google Cloud')).click();
				await expect(detail(page, language, 'Google Cloud')).toBeVisible();
				const overflow = await page.evaluate(
					() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
				);
				expect(overflow).toBe(0);
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the scenarios still change the ratings', async ({ page }) => {
					await page.goto(path);
					await scenario(page, language, SOVEREIGNTY).check();
					for (const [p, provider] of PROVIDERS.entries()) {
						const rating = expected.ratings[RESULTS[SOVEREIGNTY]!.ratings[p]!];
						await expect(bars(page, language).nth(p)).toHaveAccessibleName(
							`${provider}, ${rating}`,
						);
					}
					await expect(hint(page, language)).toHaveCount(0);
				});
			});
		});
	}
});
