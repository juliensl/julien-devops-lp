// The ecology page (#68): the CTO estimates the energy and emissions of a workload by country, sees the
// whole calculation with a badge on each value, compares every country and reads the method, the
// sources and the limits. The header, the footer and the home page lead to it.
import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { BOOKING_PAGE, LANGUAGES, NAME, type Language } from './expected';

const PATH = 'ecology/';

/** The providers the page never names (#54: no provider environmental data, none as an example). */
const PROVIDERS = [
	'AWS',
	'Amazon',
	'Google',
	'Azure',
	'Microsoft',
	'OVH',
	'Scaleway',
	'Infomaniak',
];

// The section titles, the 4 cards of «O que a infraestrutura pode mudar» and the sources come from the
// spec (#54); the other Portuguese texts, from prototype v3, validated by the intern (#54). French and
// English are translations the intern reviews before the Commercial launch (#75).
const EXPECTED: Record<
	Language,
	{
		title: string;
		heading: string;
		method: string;
		levers: string;
		leversTitle: string;
		cards: [title: string, text: string][];
		sources: string;
		/** The three published sources, each with a link, then the research, without one. */
		sourceLinks: [text: RegExp, url: string][];
		research: RegExp;
		limits: string[];
		/** The only way the page speaks of hosting (#54). */
		lowerImpact: RegExp;
		forbidden: RegExp;
	}
> = {
	pt: {
		title: `Ecologia e infraestrutura · ${NAME}`,
		heading: 'As escolhas de infraestrutura também têm consequências ambientais.',
		method: 'Como se calcula',
		levers: 'O que a infraestrutura pode mudar',
		leversTitle: 'Mais eficiência, mais visibilidade.',
		cards: [
			[
				'Ajustar os recursos à carga',
				'Com a infraestrutura escalável (bloco 3), os recursos acompanham a carga da aplicação.',
			],
			[
				'Ver o que se consome',
				'A observabilidade (bloco 4) dá visibilidade sobre a utilização dos recursos e os custos.',
			],
			[
				'Escolher com informação',
				'A intensidade carbónica da eletricidade muda de país para país, e o estimador mostra quanto.',
			],
			[
				'Alojamento com menor impacto ambiental',
				'Quando as necessidades e o orçamento o permitem, é uma das opções que proponho.',
			],
		],
		sources: 'Fontes e limites',
		sourceLinks: [
			[/^Ember\b/, 'https://ember-energy.org/data/yearly-electricity-data/'],
			[/^Cloud Carbon Footprint\b/, 'https://www.cloudcarbonfootprint.org/docs/methodology/'],
			[
				/^Uptime Institute\b/,
				'https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers',
			],
		],
		research: /^Pesquisa própria .*16\/10\/2026/,
		limits: [
			'Estimativa ilustrativa, não uma medição da tua infraestrutura.',
			'Os watts por vCPU são os do Cloud Carbon Footprint para um processador desconhecido; o servidor real pode consumir mais ou menos.',
			'A intensidade é uma média anual do país; a hora do dia muda o valor real.',
			'O PUE de 1,52 é a média por centro de dados; ponderada pela capacidade, é 1,36. Os centros grandes, como os da cloud, costumam ter valores mais baixos.',
		],
		lowerImpact: /alojamento com menor impacto ambiental/i,
		forbidden: /servidor ecológico|alojamento verde|alojamento responsável/i,
	},
	fr: {
		title: `Écologie et infrastructure · ${NAME}`,
		heading: "Les choix d'infrastructure ont aussi des conséquences environnementales.",
		method: 'Comment on calcule',
		levers: "Ce que l'infrastructure peut changer",
		leversTitle: "Plus d'efficacité, plus de visibilité.",
		cards: [
			[
				'Ajuster les ressources à la charge',
				"Avec l'infrastructure scalable (bloc 3), les ressources suivent la charge de l'application.",
			],
			[
				'Voir ce qui est consommé',
				"L'observabilité (bloc 4) donne de la visibilité sur l'utilisation des ressources et les coûts.",
			],
			[
				'Choisir en connaissance de cause',
				"L'intensité carbone de l'électricité change d'un pays à l'autre, et l'estimateur montre de combien.",
			],
			[
				'Hébergement à moindre impact environnemental',
				"Quand les besoins et le budget le permettent, c'est l'une des options que je propose.",
			],
		],
		sources: 'Sources et limites',
		sourceLinks: [
			[/^Ember\b/, 'https://ember-energy.org/data/yearly-electricity-data/'],
			[/^Cloud Carbon Footprint\b/, 'https://www.cloudcarbonfootprint.org/docs/methodology/'],
			[
				/^Uptime Institute\b/,
				'https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers',
			],
		],
		research: /^Recherche interne .*16\/10\/2026/,
		limits: [
			'Estimation illustrative, pas une mesure de ton infrastructure.',
			'Les watts par vCPU sont ceux de Cloud Carbon Footprint pour un processeur inconnu ; le serveur réel peut consommer plus ou moins.',
			"L'intensité est une moyenne annuelle du pays ; l'heure de la journée change la valeur réelle.",
			'Le PUE de 1,52 est la moyenne par centre de données ; pondérée par la capacité, elle est de 1,36. Les grands centres, comme ceux du cloud, ont souvent des valeurs plus basses.',
		],
		lowerImpact: /hébergement à moindre impact environnemental/i,
		forbidden: /serveur écologique|hébergement vert|hébergement responsable/i,
	},
	en: {
		title: `Ecology and infrastructure · ${NAME}`,
		heading: 'Infrastructure choices have environmental consequences too.',
		method: 'How it is calculated',
		levers: 'What infrastructure can change',
		leversTitle: 'More efficiency, more visibility.',
		cards: [
			[
				'Matching resources to the load',
				"With scalable infrastructure (block 3), resources follow the application's load.",
			],
			[
				'Seeing what is used',
				'Observability (block 4) gives visibility into resource use and costs.',
			],
			[
				'Choosing with information',
				'The carbon intensity of electricity changes from country to country, and the estimator shows by how much.',
			],
			[
				'Lower-impact hosting',
				'When the needs and the budget allow it, it is one of the options I propose.',
			],
		],
		sources: 'Sources and limits',
		sourceLinks: [
			[/^Ember\b/, 'https://ember-energy.org/data/yearly-electricity-data/'],
			[/^Cloud Carbon Footprint\b/, 'https://www.cloudcarbonfootprint.org/docs/methodology/'],
			[
				/^Uptime Institute\b/,
				'https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers',
			],
		],
		research: /^Own research .*16\/10\/2026/,
		limits: [
			'An illustrative estimate, not a measurement of your infrastructure.',
			"The watts per vCPU are Cloud Carbon Footprint's for an unknown processor; the real server may use more or less.",
			"The intensity is the country's yearly average; the time of day changes the real figure.",
			'The PUE of 1.52 is the average per data centre; weighted by capacity, it is 1.36. Large data centres, like the cloud ones, tend to have lower values.',
		],
		lowerImpact: /lower-impact hosting/i,
		forbidden: /green hosting|eco-friendly server|responsible hosting/i,
	},
};

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, button } = LANGUAGES[language];
		const expected = EXPECTED[language];
		const path = `${prefix}${PATH}`;

		test.describe(path, () => {
			test('has its own title and description', async ({ page }) => {
				await page.goto(prefix);
				const homeDescription = await page
					.locator('meta[name="description"]')
					.getAttribute('content');

				await page.goto(path);
				await expect(page).toHaveTitle(expected.title);
				const description = page.locator('meta[name="description"]');
				await expect(description).toHaveAttribute('content', /\S/);
				await expect(description).not.toHaveAttribute('content', homeDescription!);
				await expect(page.getByRole('heading', { level: 1 })).toHaveText(expected.heading);
			});

			test('explains the method, what infrastructure can change, the sources and the limits', async ({
				page,
			}) => {
				await page.goto(path);
				const main = page.getByRole('main');
				await expect(main.getByText(expected.method, { exact: false }).first()).toBeVisible();
				await expect(main.getByText(expected.levers, { exact: false }).first()).toBeVisible();

				const levers = main.getByRole('region', { name: expected.leversTitle });
				const cards = levers.getByRole('listitem');
				await expect(cards).toHaveCount(4);
				for (const [k, [title, text]] of expected.cards.entries()) {
					await expect(cards.nth(k)).toHaveText(`${title} ${text}`, { useInnerText: true });
				}

				const sources = main.getByRole('region', { name: expected.sources });
				const sourceList = sources.getByRole('list').first().getByRole('listitem');
				await expect(sourceList).toHaveCount(4);
				for (const [k, [text, url]] of expected.sourceLinks.entries()) {
					const link = sourceList.nth(k).getByRole('link');
					await expect(link).toHaveText(text);
					await expect(link).toHaveAttribute('href', url);
				}
				await expect(sourceList.nth(3)).toHaveText(expected.research);
				await expect(sourceList.nth(3).getByRole('link')).toHaveCount(0);

				const limits = sources.getByRole('list').nth(1).getByRole('listitem');
				await expect(limits).toHaveText(expected.limits);
			});

			test('names no provider and speaks only of lower-impact hosting', async ({ page }) => {
				await page.goto(path);
				const text = await page.getByRole('main').innerText();
				for (const provider of PROVIDERS) expect(text).not.toContain(provider);
				expect(text).toMatch(expected.lowerImpact);
				expect(text).not.toMatch(expected.forbidden);
			});

			test('ends with the booking button', async ({ page }) => {
				await page.goto(path);
				const last = page.getByRole('main').getByRole('link').last();
				await expect(last).toHaveText(button);
				await expect(last).toHaveAttribute('href', BOOKING_PAGE);
				await expect(last).not.toHaveAttribute('target');
			});
		});
	}
});
