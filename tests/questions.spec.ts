// «Os teus desafios» (#70): the page with the 23 questions by audience, with its filter, search and
// index, the header submenu that leads to each audience, and the 5 general questions on the home page.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { BOOKING_PAGE, LANGUAGES, NAME, type Language } from './expected';

/** Each Audience's id, which is its anchor on the questions page, the same in the three languages. */
type AudienceId = 'general' | 'cto' | 'ceo' | 'team';

// The four audiences and how many questions each has (#54).
const COUNTS: Record<AudienceId, number> = { general: 5, cto: 7, ceo: 6, team: 5 };
const ANCHORS = Object.keys(COUNTS) as AudienceId[];

// Julien's 23 questions and answers, word for word, in French, the Reference language.
const APPROVED: Record<AudienceId, [question: string, answer: string][]> = {
	general: [
		[
			'Que fais-tu, exactement ?',
			"J'interviens sur quatre domaines : audit et CI/CD, nettoyage et optimisation du code, infrastructure scalable et observabilité. L'objectif est de réduire les problèmes récurrents et de permettre à l'application de grandir sur des bases plus solides. Le périmètre de chaque mission est défini après diagnostic.",
		],
		[
			'Combien de temps ça prend ?',
			"Cela dépend de l'état du code, des services existants et des travaux prioritaires. Après le diagnostic, je propose un calendrier réaliste, avec des étapes et des livrables précis. Il n'y a pas de promesse artificielle de tout réaliser en 30 jours.",
		],
		[
			'Combien ça coûte ?',
			"Le prix est défini à partir du périmètre convenu après un premier diagnostic gratuit. La proposition distingue mes honoraires des éventuels coûts récurrents de cloud et d'outils.",
		],
		[
			'Comment ça commence ?',
			"Nous commençons par un échange gratuit de 45 minutes. Viennent ensuite le diagnostic, la proposition d'intervention, la mise en œuvre avec des points d'avancement réguliers, puis la livraison et la passation à ton équipe.",
		],
		[
			'Puis-je choisir seulement certains blocs ?',
			"Oui, je peux intervenir sur un besoin ciblé. L'ordre et les dépendances techniques sont déterminés après diagnostic. La garantie de conformité technique de trois mois présentée sur ce site concerne uniquement les prestations complètes couvrant les quatre blocs.",
		],
	],
	cto: [
		[
			'Qui écrit les tests ?',
			"Je mets en place et j'améliore l'automatisation des contrôles. Lorsque des tests ou des corrections de code sont nécessaires, nous décidons ensemble qui les réalise et dans quel périmètre. Dans le bloc d'optimisation, je peux écrire ou adapter les tests liés aux modifications que je prends en charge.",
		],
		[
			"Faut-il arrêter le développement pendant l'intervention ?",
			"En principe non. Le travail est organisé avec des branches, des environnements adaptés et des validations progressives. Certaines migrations ou modifications critiques peuvent exiger une fenêtre de changement planifiée avec l'équipe.",
		],
		[
			'Avec quelles stacks et quels clouds travailles-tu ?',
			"J'utilise notamment GitHub Actions, GitLab CI, Terraform, Docker, Kubernetes, Grafana et les services natifs des clouds. Je travaille avec AWS, Google Cloud, Azure, Scaleway, OVHcloud et d'autres fournisseurs selon le projet. Les outils sont choisis en fonction du contexte, pas imposés à l'avance.",
		],
		[
			'De quels accès as-tu besoin ?',
			"Pour le diagnostic, des accès en lecture au code et, si nécessaire, aux métriques et à la configuration cloud. Pour l'implémentation, des droits adaptés aux opérations convenues. Je privilégie des accès nominatifs, limités au strict nécessaire et révocables à la fin de la mission. Il n'est pas nécessaire de partager des mots de passe ou des clés privées.",
		],
		[
			'Que couvre la garantie de trois mois ?',
			"Pour une prestation complète couvrant les quatre blocs, elle concerne les défauts de conception ou de configuration de l'infrastructure qui me sont imputables, selon les conditions contractuelles. L'objectif de disponibilité est défini avec le client. Il ne s'agit ni d'une garantie de zéro bug applicatif, ni d'une astreinte 24 h/24.",
		],
		[
			"Quels outils utilises-tu pour l'observabilité ?",
			"Selon le contexte, Grafana, Prometheus, des solutions de logs et de tracing, ou les outils de supervision natifs du fournisseur cloud. Le but est de disposer d'indicateurs utiles et d'alertes exploitables, plutôt que de multiplier les dashboards.",
		],
		[
			'Comment travaillons-nous ensemble ?',
			"J'échange directement avec les personnes concernées : CTO, tech lead, développeurs et responsable du projet. Nous organisons des points d'avancement réguliers, généralement chaque semaine, et nous documentons les décisions importantes.",
		],
	],
	ceo: [
		[
			"Quand connaîtrai-je le budget de l'intervention ?",
			'Après le diagnostic gratuit, tu reçois une proposition précisant les travaux, le calendrier et le prix de mon intervention. Les éventuels coûts mensuels des fournisseurs sont présentés séparément.',
		],
		[
			'Combien coûtera le cloud ensuite ?',
			"Le coût dépend de l'architecture, du trafic, des données, de la région et du niveau de disponibilité recherché. Je présente une estimation argumentée avant les décisions structurantes, avec les hypothèses et les principaux postes de dépenses.",
		],
		[
			'Mon entreprise va-t-elle dépendre de toi ?',
			"Mon objectif est l'inverse : je privilégie des technologies documentées, une infrastructure décrite comme du code et une passation claire. Les dépendances propres au fournisseur choisi sont expliquées dès la conception.",
		],
		[
			'Y a-t-il un risque pour la production ?',
			"Toute intervention présente des risques, mais ils sont évalués avant l'exécution. Nous préparons les tests, les sauvegardes et, lorsque c'est pertinent, un plan de retour arrière. Les changements sensibles sont coordonnés avec ton équipe.",
		],
		[
			'Quel retour sur investissement puis-je attendre ?',
			'Moins de temps perdu sur les incidents et les tâches répétitives, un code plus maintenable et des déploiements plus fiables. Les gains exacts dépendent de la situation de départ ; le diagnostic sert aussi à identifier les améliorations à plus forte valeur.',
		],
		[
			'Dans quelles langues travailles-tu ?',
			"Je peux intervenir en français, en anglais et en portugais, selon les besoins de l'équipe et du projet.",
		],
	],
	team: [
		[
			"Qu'est-ce qui change au quotidien ?",
			"Des contrôles automatisés plus utiles, moins de tâches manuelles, une meilleure visibilité sur les problèmes et un code progressivement plus simple à maintenir. Les modifications de workflow sont préparées avec l'équipe, pas imposées sans discussion.",
		],
		[
			'Qui maintient les pipelines après ton départ ?',
			'Ton équipe conserve les outils, les configurations et la documentation. Je prévois une passation pour que leur fonctionnement soit compris et que les évolutions puissent être réalisées en autonomie.',
		],
		[
			'Avec qui communiques-tu pendant la mission ?',
			'Avec les interlocuteurs techniques et métier utiles au projet. Nous prévoyons un point de suivi régulier, normalement hebdomadaire, et des échanges complémentaires lorsque des décisions ou des validations sont nécessaires.',
		],
		[
			'Peut-on continuer à développer pendant les changements ?',
			"Oui, l'objectif est de préserver le rythme de développement. Les modifications sont préparées et testées en parallèle lorsque c'est possible. Une fenêtre de stabilisation ou de migration peut être convenue pour les changements sensibles.",
		],
		[
			'Quels outils allons-nous utiliser ?',
			"Il n'y a pas de stack imposée. Selon le projet : pipelines CI/CD, analyse de code, outils de refactoring et de performance, Docker, services de conteneurs managés, Kubernetes, Terraform, Grafana, Prometheus ou équivalents. Je privilégie les outils pertinents pour l'équipe et l'existant.",
		],
	],
};

// The page's title, introduction, description and closing lines are Julien's French, translated into
// Portuguese; English shows the French until it is translated.
const EXPECTED: Record<
	Language,
	{
		menu: string;
		/** The page's h1. */
		title: string;
		intro: string;
		/** For search engines. */
		description: string;
		audiences: Record<AudienceId, string>;
		/** The filter's choices: every audience, then each one. */
		filter: Record<'all' | AudienceId, string>;
		/** After the number in the count, for more than one question. */
		questions: string;
		/** The name of the index of audiences. */
		index: string;
		/** The last link of the header submenu. */
		all: string;
		notFound: string;
		/** The line under «notFound», before the button. */
		notFoundText: string;
		/** The title of the home page's Questions section. */
		homeTitle: string;
	}
> = {
	pt: {
		menu: 'Os teus desafios',
		title: 'Respostas concretas, de acordo com a tua função.',
		intro:
			'És CEO, CTO, programador ou levas o projeto sozinho? Encontra as respostas às perguntas mais frequentes sobre o código, a infraestrutura, os custos e a nossa forma de trabalhar. E, se a tua pergunta não estiver aqui, vamos falar disso.',
		description:
			'Perguntas e respostas para CEO, CTO e programadores: o código, a infraestrutura, os custos e a nossa forma de trabalhar.',
		audiences: {
			general: 'Perguntas gerais',
			cto: 'Para CTO',
			ceo: 'Para CEO',
			team: 'Para a equipa técnica',
		},
		filter: { all: 'Todas', general: 'Gerais', cto: 'CTO', ceo: 'CEO', team: 'Equipa técnica' },
		questions: 'perguntas',
		index: 'Perfis',
		all: 'Ver todas as perguntas',
		notFound: 'Não encontras a tua resposta?',
		notFoundText: 'Marca uma conversa gratuita e vamos falar do teu contexto.',
		homeTitle: 'O essencial, antes da Conversa.',
	},
	fr: {
		menu: 'Tes défis',
		title: 'Des réponses concrètes, selon ton rôle.',
		intro:
			"Tu es CEO, CTO, développeur ou tu portes le projet seul ? Retrouve les réponses aux questions les plus fréquentes sur le code, l'infrastructure, les coûts et notre façon de travailler. Et si ta question n'est pas ici, parlons-en.",
		description:
			"Questions et réponses pour les CEO, les CTO et les développeurs : le code, l'infrastructure, les coûts et notre façon de travailler.",
		audiences: {
			general: 'Questions générales',
			cto: 'Pour les CTO',
			ceo: 'Pour les CEO',
			team: "Pour l'équipe technique",
		},
		filter: {
			all: 'Toutes',
			general: 'Générales',
			cto: 'CTO',
			ceo: 'CEO',
			team: 'Équipe technique',
		},
		questions: 'questions',
		index: 'Profils',
		all: 'Voir toutes les questions',
		notFound: 'Tu ne trouves pas ta réponse ?',
		notFoundText: 'Réserve un échange gratuit et parlons de ton contexte.',
		homeTitle: "L'essentiel, avant l'Échange.",
	},
	en: {
		menu: 'Your challenges',
		title: 'Des réponses concrètes, selon ton rôle.',
		intro:
			"Tu es CEO, CTO, développeur ou tu portes le projet seul ? Retrouve les réponses aux questions les plus fréquentes sur le code, l'infrastructure, les coûts et notre façon de travailler. Et si ta question n'est pas ici, parlons-en.",
		description:
			"Questions et réponses pour les CEO, les CTO et les développeurs : le code, l'infrastructure, les coûts et notre façon de travailler.",
		audiences: {
			general: 'General questions',
			cto: 'For CTOs',
			ceo: 'For CEOs',
			team: 'For the tech team',
		},
		filter: { all: 'All', general: 'General', cto: 'CTO', ceo: 'CEO', team: 'Tech team' },
		questions: 'questions',
		index: 'Roles',
		all: 'See all questions',
		notFound: 'Tu ne trouves pas ta réponse ?',
		notFoundText: 'Réserve un échange gratuit et parlons de ton contexte.',
		homeTitle: 'The essentials, before the Conversation.',
	},
};

/** The page's path: the slug is the same in the three languages. */
const questionsPath = (language: Language) => `${LANGUAGES[language].prefix}questions/`;

/** The questions the Visitor sees on the page. */
const shownQuestions = (page: Page) =>
	page.getByRole('main').locator('details > summary').filter({ visible: true });

/** Julien's answer to a question, in French. */
const answerTo = (question: string) =>
	Object.values(APPROVED)
		.flat()
		.find(([q]) => q === question)![1];

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const path = questionsPath(language);
		const {
			menu,
			title,
			intro,
			audiences,
			filter,
			questions,
			index,
			all,
			notFound,
			notFoundText,
			homeTitle,
		} = EXPECTED[language];
		const home = LANGUAGES[language].prefix;

		test.describe(path, () => {
			test('has its own title and description', async ({ page }) => {
				await page.goto(home);
				const homeDescription = await page
					.locator('meta[name="description"]')
					.getAttribute('content');

				await page.goto(path);
				await expect(page).toHaveTitle(`${menu} · ${NAME}`);
				const description = page.locator('meta[name="description"]');
				await expect(description).toHaveAttribute('content', EXPECTED[language].description);
				await expect(description).not.toHaveAttribute('content', homeDescription!);
			});

			test('opens with its title and introduction', async ({ page }) => {
				await page.goto(path);
				const main = page.getByRole('main');
				await expect(main.getByRole('heading', { level: 1 })).toHaveText(title);
				await expect(main.getByText(intro, { exact: true })).toBeVisible();
			});

			test('has the four audiences, each with its anchor and its questions in <details>', async ({
				page,
			}) => {
				await page.goto(path);
				const main = page.getByRole('main');
				for (const anchor of ANCHORS) {
					const audience = main.getByRole('region', { name: audiences[anchor], exact: true });
					await expect(audience).toHaveAttribute('id', anchor);
					await expect(audience.locator('details > summary')).toHaveCount(COUNTS[anchor]);
				}
				await expect(main.locator('details')).toHaveCount(23);
			});

			test(`ends with "${notFound}" and the booking button`, async ({ page }) => {
				await page.goto(path);
				const main = page.getByRole('main');
				await expect(main.getByRole('heading').last()).toHaveText(notFound);
				await expect(
					main.getByRole('region', { name: notFound }).getByText(notFoundText, { exact: true }),
				).toBeVisible();
				const last = main.getByRole('link').last();
				await expect(last).toHaveAccessibleName(LANGUAGES[language].button);
				await expect(last).toHaveAttribute('href', BOOKING_PAGE);
			});

			test('the filter shows only the chosen audience, says how many, and keeps it in the URL', async ({
				page,
			}) => {
				await page.goto(path);
				// A live region: screen readers hear the new count.
				const count = page.getByRole('main').getByRole('status');
				await expect(count).toHaveText(`23 ${questions}`);
				for (const anchor of ANCHORS) {
					await page.getByRole('radio', { name: filter[anchor], exact: true }).check();
					await expect(shownQuestions(page)).toHaveCount(COUNTS[anchor]);
					await expect(count).toHaveText(`${COUNTS[anchor]} ${questions}`);
					for (const other of ANCHORS) {
						const audience = page.getByRole('region', { name: audiences[other], exact: true });
						await (other === anchor
							? expect(audience).toBeVisible()
							: expect(audience).toBeHidden());
					}
					expect(new URL(page.url()).hash).toBe(`#${anchor}`);
				}
				await page.getByRole('radio', { name: filter.all, exact: true }).check();
				await expect(shownQuestions(page)).toHaveCount(23);
				await expect(count).toHaveText(`23 ${questions}`);
				expect(new URL(page.url()).hash).toBe('');
			});

			test("a link to an audience's anchor chooses that audience", async ({ page }) => {
				for (const anchor of ANCHORS) {
					await page.goto(`${path}#${anchor}`);
					await page.reload();
					await expect(
						page.getByRole('radio', { name: filter[anchor], exact: true }),
					).toBeChecked();
					await expect(shownQuestions(page)).toHaveCount(COUNTS[anchor]);
					await expect(
						page.getByRole('heading', { name: audiences[anchor], exact: true }),
					).toBeInViewport();
				}
			});

			test('the index leads to each audience and chooses it', async ({ page }) => {
				await page.goto(path);
				const indexLinks = page.getByRole('navigation', { name: index }).getByRole('link');
				for (const anchor of ANCHORS.toReversed()) {
					await indexLinks.filter({ hasText: audiences[anchor] }).click();
					await expect(
						page.getByRole('radio', { name: filter[anchor], exact: true }),
					).toBeChecked();
					await expect(shownQuestions(page)).toHaveCount(COUNTS[anchor]);
					await expect(
						page.getByRole('heading', { name: audiences[anchor], exact: true }),
					).toBeInViewport();
				}
			});

			// Below 1024 px the index is a row of links right under the filter, which does the same:
			// with JS, only the filter remains. Without JS, the index is the way to each audience.
			for (const width of [375, 820]) {
				test(`at ${width} px, the index gives way to the filter, unless JS is off`, async ({
					browser,
				}) => {
					for (const javaScriptEnabled of [true, false]) {
						const context = await browser.newContext({
							viewport: { width, height: 800 },
							javaScriptEnabled,
						});
						const page = await context.newPage();
						await page.goto(path);
						const indexNav = page.getByRole('navigation', { name: index });
						await (javaScriptEnabled
							? expect(indexNav).toBeHidden()
							: expect(indexNav).toBeVisible());
						await context.close();
					}
				});
			}

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('every question is visible, the filter and search are hidden, and the index leads to each audience', async ({
					page,
				}) => {
					await page.goto(path);
					await expect(shownQuestions(page)).toHaveCount(23);
					await expect(page.getByRole('radio', { name: filter.all, exact: true })).toBeHidden();
					await expect(page.getByRole('searchbox')).toBeHidden();
					await expect(page.getByRole('main').getByRole('status')).toBeHidden();
					const indexLinks = page.getByRole('navigation', { name: index }).getByRole('link');
					for (const anchor of ANCHORS.toReversed()) {
						await indexLinks.filter({ hasText: audiences[anchor] }).click();
						await expect(
							page.getByRole('heading', { name: audiences[anchor], exact: true }),
						).toBeInViewport();
					}
					await expect(shownQuestions(page)).toHaveCount(23);
				});
			});
		});

		test.describe(`${home}: the header's "${menu}" submenu`, () => {
			/** The submenu's button: the `<summary>` of its `<details>`. */
			const menuButton = (page: Page) =>
				page.getByRole('banner').locator('summary').filter({ hasText: menu, visible: true });
			const submenuLink = (page: Page, name: string) =>
				page.getByRole('banner').getByRole('link', { name }).filter({ visible: true });

			test('opens with the four audiences and all the questions', async ({ page }) => {
				await page.goto(home);
				for (const anchor of ANCHORS)
					await expect(submenuLink(page, audiences[anchor])).toBeHidden();
				await menuButton(page).click();
				for (const anchor of ANCHORS) {
					await expect(submenuLink(page, audiences[anchor])).toHaveAttribute(
						'href',
						`${path}#${anchor}`,
					);
				}
				await expect(submenuLink(page, all)).toHaveAttribute('href', path);
				await expect(submenuLink(page, all)).not.toHaveAttribute('aria-current');
			});

			test('each link leads to its audience, from any page', async ({ page }) => {
				await page.goto(home);
				await menuButton(page).click();
				await submenuLink(page, audiences.ceo).click();
				await expect(page).toHaveURL(`${path}#ceo`);
				await expect(page.getByRole('radio', { name: filter.ceo, exact: true })).toBeChecked();
				await expect(shownQuestions(page)).toHaveCount(COUNTS.ceo);
				await expect(
					page.getByRole('heading', { name: audiences.ceo, exact: true }),
				).toBeInViewport();

				// On the questions page, the submenu changes the audience, and then closes.
				await menuButton(page).click();
				await submenuLink(page, audiences.team).click();
				await expect(page.getByRole('radio', { name: filter.team, exact: true })).toBeChecked();
				await expect(shownQuestions(page)).toHaveCount(COUNTS.team);
				await expect(
					page.getByRole('heading', { name: audiences.team, exact: true }),
				).toBeInViewport();
				await expect(submenuLink(page, audiences.cto)).toBeHidden();

				await menuButton(page).click();
				await expect(submenuLink(page, all)).toHaveAttribute('aria-current', 'page');
				await submenuLink(page, all).click();
				await expect(page).toHaveURL(path);
				await expect(page.getByRole('radio', { name: filter.all, exact: true })).toBeChecked();
				await expect(shownQuestions(page)).toHaveCount(23);
			});

			test.describe('on a phone', () => {
				test.use({ viewport: { width: 375, height: 700 } });

				test('the audiences are in the menu', async ({ page }) => {
					await page.goto(home);
					await expect(menuButton(page)).toHaveCount(0);
					await page.getByRole('banner').locator('summary').filter({ visible: true }).click();
					for (const anchor of ANCHORS) {
						await expect(submenuLink(page, audiences[anchor])).toHaveAttribute(
							'href',
							`${path}#${anchor}`,
						);
					}
					await submenuLink(page, all).click();
					await expect(page).toHaveURL(path);
				});
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the submenu opens and its links lead to each audience', async ({ page }) => {
					await page.goto(home);
					await menuButton(page).click();
					await submenuLink(page, audiences.cto).click();
					await expect(page).toHaveURL(`${path}#cto`);
					await expect(
						page.getByRole('heading', { name: audiences.cto, exact: true }),
					).toBeInViewport();
				});
			});
		});

		test.describe(`${home}: the Questions section`, () => {
			test.use({ javaScriptEnabled: false });

			test('has the 5 general questions in <details>, which open without JS', async ({ page }) => {
				await page.goto(home);
				const section = page.getByRole('region', { name: homeTitle });
				const summaries = section.locator('details > summary');
				await expect(summaries).toHaveCount(COUNTS.general);
				for (const summary of await summaries.all()) {
					const answer = summary.locator('xpath=following-sibling::*').first();
					await expect(answer).toBeHidden();
					await summary.click();
					await expect(answer).toBeVisible();
				}
			});

			test("has shortcuts to the other audiences' questions and to all of them", async ({
				page,
			}) => {
				await page.goto(home);
				const links = page.getByRole('region', { name: homeTitle }).getByRole('link');
				const hrefs = await links.evaluateAll((elements) =>
					elements.map((a) => a.getAttribute('href')),
				);
				expect(hrefs).toEqual([`${path}#cto`, `${path}#ceo`, `${path}#team`, path]);
				await expect(links.last()).toHaveAccessibleName(all);
				await links.nth(1).click();
				await expect(page).toHaveURL(`${path}#ceo`);
				await expect(
					page.getByRole('heading', { name: audiences.ceo, exact: true }),
				).toBeInViewport();
			});
		});
	}

	if (build.phase.publishedLanguages.includes('fr')) {
		test("/: the Questions section has Julien's general questions, word for word", async ({
			page,
		}) => {
			await page.goto('/');
			const questions = page
				.getByRole('region', { name: EXPECTED.fr.homeTitle })
				.locator('details');
			await expect(questions.locator('summary')).toHaveText(
				APPROVED.general.map(([question]) => question),
			);
			for (const [i, [, answer]] of APPROVED.general.entries()) {
				await questions.nth(i).locator('summary').click();
				await expect(questions.nth(i).getByText(answer, { exact: true })).toBeVisible();
			}
		});

		test("/questions/: Julien's questions and answers, word for word", async ({ page }) => {
			await page.goto(questionsPath('fr'));
			const main = page.getByRole('main');
			for (const anchor of ANCHORS) {
				const audience = main.getByRole('region', { name: EXPECTED.fr.audiences[anchor] });
				const questions = audience.locator('details');
				await expect(questions.locator('summary')).toHaveText(
					APPROVED[anchor].map(([question]) => question),
				);
				for (const [i, [, answer]] of APPROVED[anchor].entries()) {
					const question = questions.nth(i);
					await expect(question.getByText(answer, { exact: true })).toBeHidden();
					await question.locator('summary').click();
					await expect(question.getByText(answer, { exact: true })).toBeVisible();
				}
			}
		});

		test('/questions/: the search ignores case and accents, opens what it finds and says how many', async ({
			page,
		}) => {
			await page.goto(questionsPath('fr'));
			const search = page.getByRole('searchbox', { name: 'Chercher dans les questions' });
			const count = page.getByRole('main').getByRole('status');
			// What each search finds, counted by hand in Julien's texts: the words are often only in the
			// answer, so the answers open.
			const searches: [words: string, found: string[], count: string][] = [
				['acces', ['De quels accès as-tu besoin ?'], '1 question'],
				[
					'PERIMETRE',
					['Que fais-tu, exactement ?', 'Combien ça coûte ?', 'Qui écrit les tests ?'],
					'3 questions',
				],
				[
					'gratuit diagnostic',
					[
						'Combien ça coûte ?',
						'Comment ça commence ?',
						"Quand connaîtrai-je le budget de l'intervention ?",
					],
					'3 questions',
				],
			];
			for (const [words, found, text] of searches) {
				await search.fill(words);
				await expect(shownQuestions(page)).toHaveText(found);
				await expect(count).toHaveText(text);
				for (const question of found) {
					await expect(page.getByText(answerTo(question), { exact: true })).toBeVisible();
				}
			}

			await search.fill('kubernetes cobol');
			await expect(shownQuestions(page)).toHaveCount(0);
			// French puts 0 in the singular.
			await expect(count).toHaveText('0 question');
			await expect(page.getByText('Aucune question avec ces mots.')).toBeVisible();

			// The search works within the chosen audience.
			await page.getByRole('radio', { name: 'CEO', exact: true }).check();
			await search.fill('couts');
			await expect(shownQuestions(page)).toHaveText([
				"Quand connaîtrai-je le budget de l'intervention ?",
			]);
			await expect(count).toHaveText('1 question');

			// Cleared, it shows the audience again and closes the answers it opened.
			await search.fill('');
			await expect(shownQuestions(page)).toHaveCount(6);
			await expect(count).toHaveText('6 questions');
			await expect(
				page.getByText(answerTo("Quand connaîtrai-je le budget de l'intervention ?"), {
					exact: true,
				}),
			).toBeHidden();
		});
	}
});
