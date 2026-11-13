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
}

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
};

// French is the reference; Portuguese is its translation, and English shows French until it is translated.
const EXPECTED: Record<Language, Texts> = {
	fr: FR,
	en: FR,
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
