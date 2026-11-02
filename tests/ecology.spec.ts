// The ecology page (#68): the CTO estimates the energy and emissions of a workload by country, sees the
// whole calculation with a badge on each value, compares every country and reads the method, the
// sources and the limits. The header, the footer and the home page lead to it.
import { expect, test, type Locator, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
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

// The section titles, the 4 cards of what infrastructure can change and the sources come from the
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
		// CONTEXT.md's Avoid list for Lower-impact hosting.
		forbidden: /green server|green hosting|responsible hosting/i,
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

type Badge = 'published' | 'assumption' | 'calculated';

// The fields, their ranges and first values, the formula and the intensities are #54's; the labels are
// prototype v3's. French and English are translations the intern reviews before the Commercial launch (#75).
const ESTIMATOR: Record<
	Language,
	{
		title: string;
		/** The decimal separator of the page's numbers. */
		decimal: string;
		fields: { country: string; vcpu: string; utilisation: string; hours: string; pue: string };
		/** What screen readers hear on the sliders at the first load. */
		sliderTexts: { utilisation: string; hours: string; pue: string };
		countries: { first: string; france: string; poland: string };
		result: string;
		kwh: string;
		kg: string;
		calculation: string;
		comparison: string;
		legend: string;
		badges: Record<Badge, string>;
	}
> = {
	pt: {
		title: 'A mesma aplicação, em sítios diferentes.',
		decimal: ',',
		fields: {
			country: 'País onde corre a infraestrutura',
			vcpu: 'Processadores virtuais (vCPU)',
			utilisation: 'Utilização média',
			hours: 'Horas por dia',
			pue: 'Eficiência do centro de dados (PUE)',
		},
		sliderTexts: { utilisation: '50 %', hours: '24 h', pue: '1,52' },
		countries: { first: 'Noruega', france: 'França', poland: 'Polónia' },
		result: 'Resultado',
		kwh: 'kWh por mês',
		kg: 'kg CO2e por mês',
		calculation: 'O cálculo',
		comparison: 'A mesma carga em cada país',
		legend: 'Como ler os dados desta página',
		badges: { published: 'Publicado', assumption: 'Hipótese', calculated: 'Calculado' },
	},
	fr: {
		title: 'La même application, à des endroits différents.',
		decimal: ',',
		fields: {
			country: "Pays où tourne l'infrastructure",
			vcpu: 'Processeurs virtuels (vCPU)',
			utilisation: 'Utilisation moyenne',
			hours: 'Heures par jour',
			pue: 'Efficacité du centre de données (PUE)',
		},
		sliderTexts: { utilisation: '50 %', hours: '24 h', pue: '1,52' },
		countries: { first: 'Norvège', france: 'France', poland: 'Pologne' },
		result: 'Résultat',
		kwh: 'kWh par mois',
		kg: 'kg CO2e par mois',
		calculation: 'Le calcul',
		comparison: 'La même charge dans chaque pays',
		legend: 'Comment lire les données de cette page',
		badges: { published: 'Publié', assumption: 'Hypothèse', calculated: 'Calculé' },
	},
	en: {
		title: 'The same application, in different places.',
		decimal: '.',
		fields: {
			country: 'Country where the infrastructure runs',
			vcpu: 'Virtual processors (vCPU)',
			utilisation: 'Average utilisation',
			hours: 'Hours per day',
			pue: 'Data centre efficiency (PUE)',
		},
		sliderTexts: { utilisation: '50%', hours: '24 h', pue: '1.52' },
		countries: { first: 'Norway', france: 'France', poland: 'Poland' },
		result: 'Result',
		kwh: 'kWh per month',
		kg: 'kg CO2e per month',
		calculation: 'The calculation',
		comparison: 'The same workload in each country',
		legend: 'How to read the data on this page',
		badges: { published: 'Published', assumption: 'Assumption', calculated: 'Calculated' },
	},
};

// Worked out by hand with #54's formula, for France, 8 vCPU, 50 %, 24 h and PUE 1.52:
// 0.74 + 50 % × (3.5 − 0.74) = 2.12 W; 8 × 2.12 × 24 × 30.4375 × 1.52 / 1000 = 18.83 kWh;
// × 41.2 g/kWh = 0.776 kg (#54: about 18.8 kWh and 0.78 kg CO2e a month). In Poland (590.8 g/kWh),
// 11.13 kg; in Norway (28.1 g/kWh), 0.529 kg. With 9 vCPU, 21.19 kWh and 0.873 kg; with PUE 1.30,
// 16.11 kWh and 0.664 kg.
/** Each value of the calculation, in order, with its badge. */
const CALCULATION: [value: string, badge: Badge][] = [
	['8 vCPU', 'assumption'],
	['2.12 W', 'assumption'],
	['24 h', 'assumption'],
	['30.4', 'calculated'],
	['PUE 1.52', 'published'],
	['18.8 kWh', 'calculated'],
	['41.2 g CO2e/kWh', 'published'],
	['0.78 kg CO2e', 'calculated'],
];
const PUE_ROW = 4;

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const t = ESTIMATOR[language];
		const path = `${LANGUAGES[language].prefix}${PATH}`;
		/** A number as the page writes it: "18.8" → "18,8" in Portuguese and French. */
		const n = (value: string) => value.replace('.', t.decimal);
		const estimator = (page: Page) => page.getByRole('region', { name: t.title });
		const slider = (page: Page, name: string) =>
			estimator(page).getByRole('slider', { name, exact: true });
		const result = (page: Page) => estimator(page).getByRole('group', { name: t.result });
		const calculation = (page: Page) =>
			estimator(page).getByRole('list', { name: t.calculation }).getByRole('listitem');
		const comparison = (page: Page) =>
			estimator(page).getByRole('list', { name: t.comparison }).getByRole('listitem');
		/** The badges a calculation row shows. */
		const badgesOf = async (row: Locator) => {
			const text = await row.innerText();
			return (Object.keys(t.badges) as Badge[]).filter((b) => text.includes(t.badges[b]));
		};

		test.describe(`${path} estimator`, () => {
			test('opens on France, 8 vCPU, 50 %, 24 h and PUE 1.52: about 18.8 kWh and 0.78 kg CO2e a month', async ({
				page,
			}) => {
				await page.goto(path);
				const country = estimator(page).getByRole('combobox', { name: t.fields.country });
				await expect(country.locator('option:checked')).toHaveText(t.countries.france);
				await expect(slider(page, t.fields.vcpu)).toHaveValue('8');
				await expect(slider(page, t.fields.utilisation)).toHaveValue('50');
				await expect(slider(page, t.fields.hours)).toHaveValue('24');
				await expect(slider(page, t.fields.pue)).toHaveValue('1.52');
				for (const field of ['utilisation', 'hours', 'pue'] as const) {
					const text = await slider(page, t.fields[field]).getAttribute('aria-valuetext');
					expect(text?.replace(/\u00a0/g, ' ')).toBe(t.sliderTexts[field]);
				}

				await expect(result(page)).toContainText(`${n('18.8')} ${t.kwh}`);
				await expect(result(page)).toContainText(`${n('0.78')} ${t.kg}`);
			});

			test('changing the country updates the result, the calculation and what screen readers hear', async ({
				page,
			}) => {
				await page.goto(path);
				await estimator(page)
					.getByRole('combobox', { name: t.fields.country })
					.selectOption({ label: t.countries.poland });

				await expect(result(page)).toContainText(`${n('11.1')} ${t.kg}`);
				await expect(result(page)).toContainText(`${n('18.8')} ${t.kwh}`);
				await expect(calculation(page).nth(6)).toContainText(`${n('590.8')} g CO2e/kWh`);
				await expect(calculation(page).nth(6)).toContainText(t.countries.poland);
				await expect(calculation(page).nth(7)).toContainText(`${n('11.1')} kg CO2e`);
				const status = estimator(page).getByRole('status');
				await expect(status).toContainText(`${n('11.1')} ${t.kg}`);
				await expect(status).toContainText(t.countries.poland);
			});

			test('a slider updates the result, the calculation and what screen readers hear', async ({
				page,
			}) => {
				await page.goto(path);
				await slider(page, t.fields.vcpu).focus();
				await page.keyboard.press('ArrowRight');

				await expect(slider(page, t.fields.vcpu)).toHaveValue('9');
				await expect(result(page)).toContainText(`${n('21.2')} ${t.kwh}`);
				await expect(result(page)).toContainText(`${n('0.87')} ${t.kg}`);
				await expect(calculation(page).first()).toContainText('9 vCPU');
				await expect(estimator(page).getByRole('status')).toContainText(`${n('21.2')} ${t.kwh}`);
			});

			test('shows the whole calculation, with one badge on each value', async ({ page }) => {
				await page.goto(path);
				await expect(calculation(page)).toHaveCount(CALCULATION.length);
				for (const [k, [value, badge]] of CALCULATION.entries()) {
					await expect(calculation(page).nth(k)).toContainText(n(value));
					expect(await badgesOf(calculation(page).nth(k)), value).toEqual([badge]);
				}

				// A PUE other than the published one is the Visitor's assumption.
				await slider(page, t.fields.pue).fill('1.3');
				await expect(calculation(page).nth(PUE_ROW)).toContainText(`PUE ${n('1.30')}`);
				expect(await badgesOf(calculation(page).nth(PUE_ROW))).toEqual(['assumption']);
				await expect(result(page)).toContainText(`${n('16.1')} ${t.kwh}`);
				await expect(result(page)).toContainText(`${n('0.66')} ${t.kg}`);
			});

			test('explains the three badges, and only those', async ({ page }) => {
				await page.goto(path);
				const legend = page.getByRole('list', { name: t.legend }).getByRole('listitem');
				await expect(legend).toHaveCount(3);
				for (const [k, badge] of (['published', 'assumption', 'calculated'] as const).entries()) {
					await expect(legend.nth(k)).toContainText(t.badges[badge]);
				}
			});

			test('compares the same load in the 16 countries, lowest intensity first', async ({
				page,
			}) => {
				await page.goto(path);
				await expect(comparison(page)).toHaveCount(16);
				await expect(comparison(page).first()).toContainText(t.countries.first);
				await expect(comparison(page).first()).toContainText(`${n('0.53')} kg`);
				await expect(comparison(page).last()).toContainText(t.countries.poland);
				await expect(comparison(page).last()).toContainText(`${n('11.1')} kg`);
				const chosen = estimator(page).locator('[aria-current="true"]');
				await expect(chosen).toHaveCount(1);
				await expect(chosen).toContainText(`${t.countries.france}`);
				await expect(chosen).toContainText(`${n('0.78')} kg`);
				// A badge on each value: the intensities are published, the results calculated.
				const region = page.getByRole('region', { name: t.comparison });
				await expect(region).toContainText(`g CO2e/kWh, Ember 2025 ${t.badges.published}`);
				await expect(region).toContainText(`${t.kg} ${t.badges.calculated}`);

				await estimator(page)
					.getByRole('combobox', { name: t.fields.country })
					.selectOption({ label: t.countries.poland });
				await expect(chosen).toContainText(t.countries.poland);
				await expect(chosen).toHaveCount(1);
			});
		});

		test.describe(`${path} flowing leaf`, () => {
			const boxes = async (page: Page) => ({
				title: (await page.getByRole('heading', { level: 1 }).boundingBox())!,
				leaf: (await page.getByRole('main').locator('canvas').boundingBox())!,
				legend: await Promise.all(
					(await page.getByRole('list', { name: t.legend }).getByRole('listitem').all()).map(
						async (item) => (await item.boundingBox())!,
					),
				),
			});

			test('on a computer, it stands to the right of the title, and the legend runs below, in a row', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 1280, height: 800 });
				await page.goto(path);
				const { title, leaf, legend } = await boxes(page);
				expect(leaf.width, '20rem').toBe(320);
				expect(leaf.x - (title.x + title.width), 'away from the title').toBeGreaterThanOrEqual(64);
				expect(leaf.y, 'level with the title').toBeLessThan(title.y + title.height);
				expect(leaf.y + leaf.height, 'level with the title').toBeGreaterThan(title.y);
				for (const item of legend) {
					expect(item.y, 'below the leaf').toBeGreaterThanOrEqual(leaf.y + leaf.height);
					expect(item.y, 'in a row').toBe(legend[0].y);
				}
			});

			test('on a phone, it comes after the text, before the legend, and covers no text', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 375, height: 800 });
				await page.goto(path);
				const { title, leaf, legend } = await boxes(page);
				expect(leaf.width, '12rem').toBe(192);
				expect(leaf.y, 'below the title').toBeGreaterThanOrEqual(title.y + title.height);
				expect(legend[0].y, 'above the legend').toBeGreaterThanOrEqual(leaf.y + leaf.height);
				for (const text of await page.getByRole('main').locator('p').all()) {
					const box = await text.boundingBox();
					if (!box) continue;
					const covers = box.y < leaf.y + leaf.height && leaf.y < box.y + box.height;
					expect(covers, await text.innerText()).toBe(false);
				}
			});
		});

		test.describe(`${path} estimator without JS`, () => {
			test.use({ javaScriptEnabled: false });

			test('shows the first load, its calculation and the comparison, without the fields', async ({
				page,
			}) => {
				await page.goto(path);
				await expect(estimator(page).getByRole('combobox', { includeHidden: true })).toBeHidden();
				await expect(estimator(page).getByRole('slider')).toHaveCount(0);
				await expect(result(page)).toContainText(`${n('18.8')} ${t.kwh}`);
				await expect(result(page)).toContainText(`${n('0.78')} ${t.kg}`);
				await expect(calculation(page)).toHaveCount(CALCULATION.length);
				await expect(comparison(page)).toHaveCount(16);
			});
		});
	}
});

/** The ecology link's name in the header and the footer, after the leaf (#54). */
const LINK: Record<Language, string> = { pt: 'Ecologia', fr: 'Écologie', en: 'Ecology' };

inEachBuild((build) => {
	for (const { path, language } of pagesOf(build)) {
		// The 404 has no language of its own: like its logo, its link leads to the first published language.
		const target = `${LANGUAGES[language ?? build.phase.publishedLanguages[0]].prefix}${PATH}`;
		const name = LINK[language ?? 'en'];
		const headerLink = (page: Page) =>
			page.getByRole('banner').getByRole('link', { name, exact: true });

		test.describe(`${path} ecology links`, () => {
			if (language) {
				test('on a computer, the header leads to the ecology page in the same language', async ({
					page,
				}) => {
					await page.setViewportSize({ width: 1280, height: 800 });
					await page.goto(path);
					await expect(headerLink(page)).toBeVisible();
					await expect(headerLink(page)).toHaveText(name);
					await expect(headerLink(page)).toHaveAttribute('href', target);
					if (path === target) {
						await expect(headerLink(page)).toHaveAttribute('aria-current', 'page');
					} else {
						await expect(headerLink(page)).not.toHaveAttribute('aria-current');
					}
				});

				test('on a phone, the header keeps the leaf; below 360 px, it is only in the menu', async ({
					page,
				}) => {
					await page.setViewportSize({ width: 375, height: 700 });
					await page.goto(path);
					await expect(headerLink(page)).toHaveCount(1);
					await expect(headerLink(page)).toBeVisible();
					await expect(headerLink(page)).toHaveAttribute('href', target);

					await page.setViewportSize({ width: 359, height: 700 });
					await expect(headerLink(page)).toHaveCount(0);
					await page.getByRole('banner').locator('summary').filter({ visible: true }).click();
					await expect(headerLink(page)).toBeVisible();
					await expect(headerLink(page)).toHaveAttribute('href', target);
				});
			}

			test('the footer leads to the ecology page', async ({ page }) => {
				await page.goto(path);
				const link = page.getByRole('contentinfo').getByRole('link', { name, exact: true });
				await expect(link).toBeVisible();
				await expect(link).toHaveAttribute('href', target);
			});
		});
	}
});

// The home page's Ecology section: a short text and the link (#54); the texts are prototype v3's.
const HOME: Record<Language, { title: string; text: string; link: string }> = {
	pt: {
		title: 'A infraestrutura também tem pegada.',
		text: 'Onde a aplicação corre, quanto corre e com que eficiência mudam o impacto ambiental. A página de ecologia deixa-te estimar uma carga conforme o país onde corre, separando dados publicados, hipóteses e cálculos.',
		link: 'Abrir a página de ecologia',
	},
	fr: {
		title: "L'infrastructure aussi a une empreinte.",
		text: "L'endroit où tourne l'application, combien de temps elle tourne et avec quelle efficacité changent son impact environnemental. La page écologie te permet d'estimer une charge selon le pays où elle tourne, en séparant données publiées, hypothèses et calculs.",
		link: 'Ouvrir la page écologie',
	},
	en: {
		title: 'Infrastructure has a footprint too.',
		text: 'Where the application runs, how long it runs and how efficiently all change its environmental impact. The ecology page lets you estimate a workload by the country it runs in, keeping published data, assumptions and calculations apart.',
		link: 'Open the ecology page',
	},
};

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];
		const { title, text, link } = HOME[language];

		test(`${prefix}: the Ecology section has a short text and leads to the ecology page`, async ({
			page,
		}) => {
			await page.goto(prefix);
			const section = page.getByRole('region', { name: title });
			await expect(section.getByText(LINK[language], { exact: true })).toBeVisible();
			await expect(section.getByText(text)).toBeVisible();
			await expect(section.getByRole('link', { name: link })).toHaveAttribute(
				'href',
				`${prefix}${PATH}`,
			);
		});
	}
});
