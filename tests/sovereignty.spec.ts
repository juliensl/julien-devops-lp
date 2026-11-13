// The data sovereignty page: Julien's texts, an educational table of cloud providers with an official
// source for each value, and the booking button. The «Ressources» submenu leads to it.
import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { BOOKING_PAGE, LANGUAGES, NAME, type Language } from './expected';

const PATH = 'sovereignty/';

interface Texts {
	title: string;
	description: string;
	heading: string;
	intro: string;
	/** The five sections: title, then text. */
	sections: [title: string, text: string][];
	cta: string;
	table: {
		caption: string;
		columns: string[];
		/** Each row's provider and the country of its headquarters (and of its group, if another). */
		headquarters: [provider: string, country: string][];
		/** The AWS row, cell by cell after the provider. */
		aws: string[];
		notDisclosed: string;
		/** Under each row's references: the day the sources were read. */
		read: string;
	};
	/** The notes on Switzerland (third section) and on the CLOUD Act (fourth): text, then sources. */
	notes: { switzerland: [string, string]; cloudAct: [string, string] };
}

/** Where the links of each note lead, in order. */
const NOTE_LINKS = {
	switzerland: [
		'https://european-union.europa.eu/easy-read_en',
		'https://www.europa.eda.admin.ch/fr/vue-densemble-des-accords-bilateraux',
		'https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en',
		'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32000D0518',
	],
	cloudAct: [
		'https://www.govinfo.gov/content/pkg/USCODE-2023-title18/html/USCODE-2023-title18-partI-chap121-sec2713.htm',
		'https://www.justice.gov/criminal/media/999601/dl?inline',
		'https://www.govinfo.gov/content/pkg/PLAW-107publ56/html/PLAW-107publ56.htm',
	],
};

/** The cells that say no official source states the value: the provider, then the column's number. */
const NOT_DISCLOSED: [provider: string, column: number][] = [
	['Hetzner', 4],
	['Infomaniak', 4],
	['Microsoft Azure', 3],
	['OUTSCALE', 4],
	['OVHcloud', 4],
];

/** The sites the references of each row may link to: the provider's own, or a public authority's. */
const OFFICIAL_SITES: Record<string, string[]> = {
	AWS: ['sec.gov', 'amazon.com'],
	Exoscale: ['exoscale.com'],
	'Google Cloud': ['google.com'],
	Hetzner: ['hetzner.com'],
	Infomaniak: ['infomaniak.com'],
	'Microsoft Azure': ['sec.gov', 'microsoft.com'],
	OUTSCALE: ['outscale.com'],
	OVHcloud: ['ovhcloud.com', 'ovh.net'],
	Scaleway: ['scaleway.com'],
};
const AUTHORITIES = ['cyber.gouv.fr', 'esante.gouv.fr'];

/** Julien's final French texts. */
const FR: Texts = {
	title: `Souveraineté des données · ${NAME}`,
	description:
		'Héberger une application en Europe ne suffit pas à comprendre où circulent les données. La souveraineté se construit par des choix techniques, contractuels et organisationnels.',
	heading: 'Tes données sont-elles vraiment sous ton contrôle ?',
	intro:
		'Héberger une application en Europe ne suffit pas, à lui seul, à comprendre où circulent les données ni quels prestataires peuvent y accéder. La souveraineté se construit par des choix techniques, contractuels et organisationnels.',
	sections: [
		[
			'Hébergement européen : une première étape, pas une réponse complète.',
			"La localisation des serveurs compte, mais il faut aussi regarder la société qui fournit le service, les sous-traitants, les sauvegardes, la supervision, les accès d'administration et les services externes utilisés par l'application.",
		],
		[
			'Les données ne restent pas forcément là où tourne ton serveur.',
			"Un outil d'analyse, un système de logs, un CDN, un service d'authentification, une solution d'e-mail ou une API d'intelligence artificielle peut traiter certaines données hors de ton hébergement principal. Cartographier ces flux permet de détecter les transferts et les dépendances que l'on oublie facilement.",
		],
		[
			'Fournisseur français, européen ou international : quelles différences ?',
			"Le bon choix dépend de tes obligations, des fonctionnalités nécessaires et des garanties contractuelles offertes. Un fournisseur européen n'offre pas automatiquement toutes les garanties attendues, et une région européenne d'un fournisseur international ne règle pas à elle seule toutes les questions juridiques.",
		],
		[
			'Réglementation, contrats et protections techniques.',
			"RGPD, transferts internationaux, règles de juridiction, chiffrement et contrôle des accès doivent être examinés ensemble. Le CLOUD Act américain peut compter dans l'analyse de certains fournisseurs, mais son existence ne signifie pas que toutes les données hébergées auprès de ces entreprises sont librement accessibles. Les exigences sectorielles, comme SecNumCloud lorsqu'elles s'appliquent, doivent être vérifiées dans les référentiels officiels.",
		],
		[
			'Une architecture adaptée à tes contraintes de souveraineté.',
			"Je t'aide à identifier les dépendances techniques, à comparer les options d'hébergement et à intégrer les contraintes de localisation, de sécurité et de réversibilité dans l'architecture. Pour les conclusions juridiques et réglementaires, l'analyse doit être validée par les spécialistes compétents.",
		],
	],
	cta: 'Parlons de la souveraineté de ton infrastructure',
	table: {
		caption:
			"Ce que disent les sources officielles sur le cloud public standard de quelques fournisseurs, par ordre alphabétique. Ce n'est pas un classement : vérifie chaque point pour ton offre et ton contrat.",
		columns: [
			'Fournisseur',
			'Pays du siège',
			"Zones d'hébergement",
			'Juridiction du contrat',
			'Sauvegardes et logs',
			"Certifications de l'offre",
			'Références officielles',
		],
		headquarters: [
			['AWS', 'États-Unis'],
			['Exoscale', 'Suisse Groupe : Autriche'],
			['Google Cloud', 'États-Unis'],
			['Hetzner', 'Allemagne'],
			['Infomaniak', 'Suisse'],
			['Microsoft Azure', 'États-Unis'],
			['OUTSCALE', 'France'],
			['OVHcloud', 'France'],
			['Scaleway', 'France'],
		],
		aws: [
			'États-Unis',
			"UE : Allemagne, Espagne, France, Irlande, Italie, Suède Hors UE : Royaume-Uni, Suisse Aussi hors d'Europe",
			'Amazon Web Services EMEA SARL Droit luxembourgeois',
			"Sauvegardes : dans la région choisie (ailleurs seulement si tu le configures) Logs : une partie peut être hors de l'emplacement choisi",
			'HDS ISO/IEC 27001',
		],
		notDisclosed: 'non communiqué',
		read: 'Consultées le 13 nov. 2026',
	},
	notes: {
		switzerland: [
			"La Suisse ne fait pas partie de l'Union européenne. La Commission européenne reconnaît toutefois qu'elle assure un niveau de protection adéquat des données personnelles : des données personnelles peuvent y être transférées depuis l'UE sans garantie supplémentaire. Cela ne remplace pas le reste de l'analyse : contrat, sous-traitants, accès.",
			"Sources : Union européenne, les 27 pays membres · Confédération suisse (DFAE), accords bilatéraux · Commission européenne, décisions d'adéquation · Décision 2000/518/CE. Consultées le 13 nov. 2026.",
		],
		cloudAct: [
			"Le CLOUD Act et le Patriot Act ne sont pas synonymes. Le Patriot Act est une loi antiterroriste américaine de 2001. Le CLOUD Act, adopté en 2018, prévoit qu'un fournisseur soumis au droit américain doit communiquer, sur demande légale des autorités américaines, les données qu'il a en sa possession ou sous son contrôle, qu'elles soient stockées aux États-Unis ou ailleurs. Une entreprise non américaine peut aussi y être soumise si elle a des liens suffisants avec les États-Unis : cela s'apprécie au cas par cas.",
			'Sources : 18 U.S.C. § 2713 (CLOUD Act) · Département de la Justice des États-Unis, livre blanc sur le CLOUD Act · Public Law 107-56 (USA PATRIOT Act). Consultées le 13 nov. 2026.',
		],
	},
};

// French is the reference; Portuguese is its translation, and English shows French until it is translated.
const EXPECTED: Record<Language, Texts> = {
	fr: FR,
	// The browser names the countries and writes the dates in English.
	en: {
		...FR,
		table: {
			...FR.table,
			headquarters: [
				['AWS', 'United States'],
				['Exoscale', 'Switzerland Groupe : Austria'],
				['Google Cloud', 'United States'],
				['Hetzner', 'Germany'],
				['Infomaniak', 'Switzerland'],
				['Microsoft Azure', 'United States'],
				['OUTSCALE', 'France'],
				['OVHcloud', 'France'],
				['Scaleway', 'France'],
			],
			aws: [
				'United States',
				"UE : France, Germany, Ireland, Italy, Spain, Sweden Hors UE : Switzerland, United Kingdom Aussi hors d'Europe",
				'Amazon Web Services EMEA SARL Droit luxembourgeois',
				FR.table.aws[3],
				FR.table.aws[4],
			],
			read: 'Consultées le Nov 13, 2026',
		},
		notes: {
			switzerland: [
				FR.notes.switzerland[0],
				FR.notes.switzerland[1].replace('13 nov. 2026', 'Nov 13, 2026'),
			],
			cloudAct: [
				FR.notes.cloudAct[0],
				FR.notes.cloudAct[1].replace('13 nov. 2026', 'Nov 13, 2026'),
			],
		},
	},
	pt: {
		title: `Soberania dos dados · ${NAME}`,
		description:
			'Alojar uma aplicação na Europa não basta para perceber por onde circulam os dados. A soberania constrói-se com escolhas técnicas, contratuais e organizacionais.',
		heading: 'Os teus dados estão mesmo sob o teu controlo?',
		intro:
			'Alojar uma aplicação na Europa não basta, por si só, para perceber por onde circulam os dados nem que prestadores lhes podem aceder. A soberania constrói-se com escolhas técnicas, contratuais e organizacionais.',
		sections: [
			[
				'Alojamento europeu: um primeiro passo, não uma resposta completa.',
				'A localização dos servidores conta, mas também é preciso olhar para a empresa que fornece o serviço, os subcontratantes, as cópias de segurança, a supervisão, os acessos de administração e os serviços externos usados pela aplicação.',
			],
			[
				'Os dados não ficam forçosamente onde corre o teu servidor.',
				'Uma ferramenta de análise, um sistema de logs, uma CDN, um serviço de autenticação, uma solução de e-mail ou uma API de inteligência artificial pode tratar alguns dados fora do teu alojamento principal. Mapear estes fluxos permite detetar as transferências e as dependências que facilmente se esquecem.',
			],
			[
				'Fornecedor francês, europeu ou internacional: que diferenças?',
				'A boa escolha depende das tuas obrigações, das funcionalidades necessárias e das garantias contratuais oferecidas. Um fornecedor europeu não oferece automaticamente todas as garantias esperadas, e uma região europeia de um fornecedor internacional não resolve, por si só, todas as questões jurídicas.',
			],
			[
				'Regulamentação, contratos e proteções técnicas.',
				'RGPD, transferências internacionais, regras de jurisdição, cifragem e controlo dos acessos devem ser analisados em conjunto. O CLOUD Act norte-americano pode contar na análise de alguns fornecedores, mas a sua existência não significa que todos os dados alojados nessas empresas sejam livremente acessíveis. As exigências setoriais, como o SecNumCloud quando se aplicam, devem ser verificadas nos referenciais oficiais.',
			],
			[
				'Uma arquitetura adaptada às tuas restrições de soberania.',
				'Ajudo-te a identificar as dependências técnicas, a comparar as opções de alojamento e a integrar na arquitetura as restrições de localização, de segurança e de reversibilidade. Para as conclusões jurídicas e regulamentares, a análise deve ser validada pelos especialistas competentes.',
			],
		],
		cta: 'Vamos falar da soberania da tua infraestrutura',
		table: {
			caption:
				'O que dizem as fontes oficiais sobre a cloud pública padrão de alguns fornecedores, por ordem alfabética. Não é uma classificação: verifica cada ponto para a tua oferta e o teu contrato.',
			columns: [
				'Fornecedor',
				'País da sede',
				'Zonas de alojamento',
				'Jurisdição do contrato',
				'Cópias de segurança e logs',
				'Certificações da oferta',
				'Referências oficiais',
			],
			headquarters: [
				['AWS', 'Estados Unidos'],
				['Exoscale', 'Suíça Grupo: Áustria'],
				['Google Cloud', 'Estados Unidos'],
				['Hetzner', 'Alemanha'],
				['Infomaniak', 'Suíça'],
				['Microsoft Azure', 'Estados Unidos'],
				['OUTSCALE', 'França'],
				['OVHcloud', 'França'],
				['Scaleway', 'França'],
			],
			aws: [
				'Estados Unidos',
				'UE: Alemanha, Espanha, França, Irlanda, Itália, Suécia Fora da UE: Reino Unido, Suíça Também fora da Europa',
				'Amazon Web Services EMEA SARL Direito luxemburguês',
				'Cópias de segurança: na região escolhida (noutro sítio só se o configurares) Logs: uma parte pode estar fora da localização escolhida',
				'HDS ISO/IEC 27001',
			],
			notDisclosed: 'não divulgado',
			read: 'Consultadas a 13/11/2026',
		},
		notes: {
			switzerland: [
				'A Suíça não pertence à União Europeia. A Comissão Europeia reconhece, no entanto, que assegura um nível de proteção adequado dos dados pessoais: podem ser transferidos dados pessoais da UE para lá sem garantias adicionais. Isto não substitui o resto da análise: contrato, subcontratantes, acessos.',
				'Fontes: União Europeia, os 27 países membros · Confederação Suíça (DFAE), acordos bilaterais · Comissão Europeia, decisões de adequação · Decisão 2000/518/CE. Consultadas a 13/11/2026.',
			],
			cloudAct: [
				'O CLOUD Act e o Patriot Act não são sinónimos. O Patriot Act é uma lei antiterrorista norte-americana de 2001. O CLOUD Act, adotado em 2018, prevê que um fornecedor sujeito ao direito norte-americano deve comunicar, mediante pedido legal das autoridades norte-americanas, os dados que tem em sua posse ou sob o seu controlo, estejam guardados nos Estados Unidos ou noutro país. Uma empresa não norte-americana também pode estar sujeita, se tiver ligações suficientes aos Estados Unidos: isso avalia-se caso a caso.',
				'Fontes: 18 U.S.C. § 2713 (CLOUD Act) · Departamento de Justiça dos Estados Unidos, livro branco sobre o CLOUD Act · Public Law 107-56 (USA PATRIOT Act). Consultadas a 13/11/2026.',
			],
		},
	},
};

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];
		const expected = EXPECTED[language];
		const path = `${prefix}${PATH}`;

		test.describe(path, () => {
			test('has its own title and description', async ({ page }) => {
				await page.goto(path);
				await expect(page).toHaveTitle(expected.title);
				await expect(page.locator('meta[name="description"]')).toHaveAttribute(
					'content',
					expected.description,
				);
			});

			test("shows Julien's title, introduction and five sections", async ({ page }) => {
				await page.goto(path);
				const main = page.getByRole('main');
				await expect(main.getByRole('heading', { level: 1 })).toHaveText(expected.heading);
				await expect(main.getByText(expected.intro)).toBeVisible();
				await expect(main.getByRole('heading', { level: 2 })).toHaveText(
					expected.sections.map(([title]) => title),
				);
				for (const [title, text] of expected.sections) {
					await expect(main.getByRole('region', { name: title }).getByText(text)).toBeVisible();
				}
			});

			test('the table shows each provider in alphabetical order, its headquarters and its values', async ({
				page,
			}) => {
				await page.goto(path);
				const section = page.getByRole('region', { name: expected.sections[2][0] });
				const table = section.getByRole('table', { name: expected.table.caption });
				await expect(table.getByRole('columnheader')).toHaveText(expected.table.columns);
				const rows = table.locator('tbody tr');
				await expect(rows.getByRole('rowheader')).toHaveText(
					expected.table.headquarters.map(([provider]) => provider),
				);
				for (const [k, [, country]] of expected.table.headquarters.entries()) {
					await expect(rows.nth(k).getByRole('cell').first()).toHaveText(country, {
						useInnerText: true,
					});
				}
				const aws = rows.filter({ has: page.getByRole('rowheader', { name: 'AWS' }) });
				for (const [k, text] of expected.table.aws.entries()) {
					await expect(aws.getByRole('cell').nth(k)).toHaveText(text, { useInnerText: true });
				}
			});

			test('says «non communiqué» only where no official source states the value', async ({
				page,
			}) => {
				await page.goto(path);
				const table = page.getByRole('table', { name: expected.table.caption });
				const found = await table.locator('tbody tr').evaluateAll(
					(rows, notDisclosed) =>
						rows.flatMap((row) => {
							const provider = row.querySelector('th')!.textContent!.trim();
							return [...row.querySelectorAll('td')].flatMap((cell, k) =>
								cell.textContent!.includes(notDisclosed) ? [[provider, k + 1]] : [],
							);
						}),
					expected.table.notDisclosed,
				);
				expect(found).toEqual(NOT_DISCLOSED);
			});

			test("each row's references link to official sites and say when they were read", async ({
				page,
			}) => {
				await page.goto(path);
				const table = page.getByRole('table', { name: expected.table.caption });
				for (const [provider, sites] of Object.entries(OFFICIAL_SITES)) {
					const references = table
						.locator('tbody tr')
						.filter({ has: page.getByRole('rowheader', { name: provider, exact: true }) })
						.getByRole('cell')
						.last();
					const links = references.getByRole('link');
					expect(await links.count()).toBeGreaterThan(0);
					for (const href of await links.evaluateAll((all) =>
						all.map((a) => (a as HTMLAnchorElement).href),
					)) {
						const { protocol, hostname } = new URL(href);
						expect(protocol, href).toBe('https:');
						expect(
							[...sites, ...AUTHORITIES].some((s) => hostname === s || hostname.endsWith(`.${s}`)),
							`${provider}: ${href}`,
						).toBe(true);
					}
					await expect(references).toContainText(expected.table.read);
				}
			});

			test('says that Switzerland is not in the EU, and that the CLOUD Act is not the Patriot Act, with official sources', async ({
				page,
			}) => {
				await page.goto(path);
				for (const [note, section] of [
					['switzerland', 2],
					['cloudAct', 3],
				] as const) {
					const region = page.getByRole('region', { name: expected.sections[section][0] });
					const [text, sources] = expected.notes[note];
					await expect(region.getByText(text)).toBeVisible();
					const line = region.getByText(sources);
					await expect(line).toBeVisible();
					await expect(line.getByRole('link')).toHaveCount(NOTE_LINKS[note].length);
					for (const [k, url] of NOTE_LINKS[note].entries()) {
						await expect(line.getByRole('link').nth(k)).toHaveAttribute('href', url);
					}
				}
			});

			test('at 320 px, only the table scrolls sideways, also with the keyboard', async ({
				page,
			}) => {
				await page.setViewportSize({ width: 320, height: 700 });
				await page.goto(path);
				const overflow = await page.evaluate(
					() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
				);
				expect(overflow).toBeLessThanOrEqual(0);

				const scroller = page.getByRole('region', { name: expected.table.caption });
				const sideways = () =>
					scroller.evaluate((e) => [e.scrollWidth, e.clientWidth, e.scrollLeft]);
				const [scrollWidth, clientWidth] = await sideways();
				expect(scrollWidth).toBeGreaterThan(clientWidth);
				await scroller.focus();
				await page.keyboard.press('ArrowRight');
				await expect.poll(async () => (await sideways())[2]).toBeGreaterThan(0);
			});

			test('ends with the booking button', async ({ page }) => {
				await page.goto(path);
				const last = page.getByRole('main').getByRole('link').last();
				await expect(last).toHaveText(expected.cta);
				await expect(last).toHaveAttribute('href', BOOKING_PAGE);
				await expect(last).not.toHaveAttribute('target');
			});
		});
	}
});
