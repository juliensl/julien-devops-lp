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

// The 23 questions and answers Julien approved, word for word, from #54's first comment.
const APPROVED: Record<AudienceId, [question: string, answer: string][]> = {
	general: [
		[
			'O que fazes, exatamente?',
			'Entrego a infraestrutura DevOps de que um SaaS precisa para crescer, em quatro blocos: pipeline de CI e auditoria de código, contentorização, infraestrutura escalável e observabilidade. Contratas os que quiseres, em qualquer combinação.',
		],
		[
			'Quanto tempo demora?',
			'No máximo 30 dias, para qualquer combinação de blocos, a contar do início da Implementação. O prazo exato vem na Proposta de intervenção.',
		],
		[
			'Quanto custa?',
			'Um preço fixo, que dou na Proposta de intervenção, depois do Diagnóstico gratuito.',
		],
		[
			'Como começa?',
			'Com uma Conversa de 45 min por Google Meet. Depois vêm o Diagnóstico gratuito, a Proposta de intervenção, a Implementação e a Entrega e transferência.',
		],
		[
			'Posso contratar só alguns blocos?',
			'Sim, em qualquer combinação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
		],
	],
	cto: [
		[
			'Quem escreve os testes?',
			'A tua equipa. Eu não escrevo testes: entrego o sistema que os corre, os mede e bloqueia o que está a vermelho.',
		],
		[
			'É preciso parar o desenvolvimento?',
			'Não. No bloco 1 não há migração nem risco para a produção. Nos blocos 2 e 3 o trabalho corre em paralelo (ramos, ambientes de teste, infraestrutura separada). Algumas alterações pedem coordenação com os devs, e no fim da migração pode ser preciso um curto período sem alterações ao código, combinado contigo.',
		],
		[
			'Com que stack e clouds trabalhas?',
			'CI: GitHub Actions, GitLab CI, Azure DevOps e Google Cloud Build. Cloud: AWS, Google Cloud, Microsoft Azure, OVHcloud, Scaleway e Infomaniak. A escolha depende das necessidades e do orçamento, e pode incluir um alojamento com menor impacto ambiental.',
		],
		[
			'De que acessos precisas?',
			'No Diagnóstico, acesso de leitura ao repositório. À cloud (métricas e logs) só se o problema for de infraestrutura, desempenho, custos ou disponibilidade. Nunca passwords, chaves privadas nem permissões de administrador. Na Implementação, preciso de acesso de escrita ao repositório e de uma conta na tua cloud com as permissões necessárias para criar a infraestrutura dos blocos contratados. Retiras esses acessos na Entrega e transferência.',
		],
		[
			'Como funciona a Garantia de disponibilidade?',
			'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá. Aplica-se com os blocos 3 e 4, e pede um teste escrito para cada bug corrigido, nenhum dev a passar à frente de um teste a vermelho, acesso de leitura ao repositório e uma pessoa técnica que responde em 48 h.',
		],
		[
			'Que ferramentas usas na observabilidade?',
			'Ferramentas standard, como Grafana e Prometheus, ou as da tua cloud.',
		],
		[
			'Como trabalhamos juntos?',
			'À distância, por Google Meet. Falo com o CTO e com os devs, sobretudo com o CTO.',
		],
	],
	ceo: [
		[
			'Quanto vai custar, e quando fico a saber?',
			'Um preço fixo, que dou na Proposta de intervenção. A Proposta vem depois do Diagnóstico gratuito, que demora 2 a 3 dias úteis a partir do momento em que tenho os acessos, ou 3 a 5 se incluir a cloud.',
		],
		[
			'E os custos da infraestrutura?',
			'Além do preço fixo, a infraestrutura e as ferramentas têm um custo mensal próprio, que pagas diretamente aos fornecedores, nas tuas contas. O serviço pressupõe um orçamento de 100 a 500 € por mês para estes custos.',
		],
		[
			'Ficamos dependentes de ti?',
			'Não. Uso só tecnologias standard e deixo tudo documentado. Mudas de prestador quando quiseres e nunca perdes a infraestrutura.',
		],
		[
			'Que riscos há para a produção?',
			'O bloco 1 não toca na produção. Nos blocos 2 e 3, o objetivo é evitar paragens; se a migração mexer em bases de dados ou serviços críticos, pode haver uma paragem curta, marcada antes. Há sempre um plano para voltar à versão anterior.',
		],
		[
			'Que retorno posso esperar?',
			'Menos tempo a corrigir problemas. Mais tempo a desenvolver o produto. Ajudo equipas SaaS a automatizar testes e entregas, detetar regressões mais cedo e melhorar a fiabilidade da infraestrutura, para que possam crescer com mais confiança.',
		],
		[
			'Em que línguas e países trabalhas?',
			'Com clientes de qualquer país, à distância, em português, francês ou inglês.',
		],
	],
	team: [
		[
			'O que muda no dia a dia da equipa?',
			'O objetivo é reduzir o tempo perdido em tarefas manuais e problemas recorrentes, facilitar a deteção de regressões e tornar as entregas mais fiáveis. A equipa ganha processos mais claros, maior visibilidade sobre a infraestrutura e mais tempo para se concentrar no desenvolvimento do produto. Os resultados dependem do contexto e do estado inicial de cada projeto.',
		],
		[
			'Quem mantém a pipeline depois?',
			'A tua equipa. A documentação técnica e a transferência no fim deixam-vos autónomos.',
		],
		[
			'Com quem falas no dia a dia?',
			'Com o CTO e com os devs, sobretudo com o CTO, por Google Meet. Não há ponto de situação regular.',
		],
		[
			'Continuamos a programar durante a migração?',
			'Sim. O trabalho corre em paralelo, em ramos, ambientes de teste e infraestrutura separada. No fim pode ser preciso um curto período sem alterações ao código, combinado convosco.',
		],
		[
			'Que ferramentas vamos usar?',
			'Bloco 1: SonarQube e Trivy. Bloco 2: Docker. Bloco 3: Kubernetes e Terraform. Bloco 4: Grafana e Prometheus, ou as ferramentas da vossa cloud.',
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

/** The approved answer to a question, in Portuguese. */
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

	if (build.phase.publishedLanguages.includes('pt')) {
		test('/pt/: the Questions section has the approved general questions, word for word', async ({
			page,
		}) => {
			await page.goto('/pt/');
			const questions = page
				.getByRole('region', { name: EXPECTED.pt.homeTitle })
				.locator('details');
			await expect(questions.locator('summary')).toHaveText(
				APPROVED.general.map(([question]) => question),
			);
			for (const [i, [, answer]] of APPROVED.general.entries()) {
				await questions.nth(i).locator('summary').click();
				await expect(questions.nth(i).getByText(answer, { exact: true })).toBeVisible();
			}
		});

		test('/pt/questions/: the approved questions and answers, word for word, with no badge', async ({
			page,
		}) => {
			await page.goto(questionsPath('pt'));
			const main = page.getByRole('main');
			for (const anchor of ANCHORS) {
				const audience = main.getByRole('region', { name: EXPECTED.pt.audiences[anchor] });
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
			// Prototype v3 marked each answer «Validado» or «A validar»: the page only has approved ones.
			await expect(main.getByText(/validad[oa]|a validar/i)).toHaveCount(0);
		});

		test('/pt/questions/: the search ignores case and accents, opens what it finds and says how many', async ({
			page,
		}) => {
			await page.goto(questionsPath('pt'));
			const search = page.getByRole('searchbox', { name: 'Pesquisar nas perguntas' });
			const count = page.getByRole('main').getByRole('status');
			// What each search finds, counted by hand in the approved texts: the word is often only in the
			// answer, so the answers open.
			const searches: [words: string, found: string[], count: string][] = [
				[
					'acessos',
					['De que acessos precisas?', 'Quanto vai custar, e quando fico a saber?'],
					'2 perguntas',
				],
				[
					'MIGRACAO',
					[
						'É preciso parar o desenvolvimento?',
						'Que riscos há para a produção?',
						'Continuamos a programar durante a migração?',
					],
					'3 perguntas',
				],
				['custos cloud', ['De que acessos precisas?'], '1 pergunta'],
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
			await expect(count).toHaveText('0 perguntas');
			await expect(page.getByText('Nenhuma pergunta com essas palavras.')).toBeVisible();

			// The search works within the chosen audience.
			await page.getByRole('radio', { name: 'CEO', exact: true }).check();
			await search.fill('acessos');
			await expect(shownQuestions(page)).toHaveText(['Quanto vai custar, e quando fico a saber?']);
			await expect(count).toHaveText('1 pergunta');

			// Cleared, it shows the audience again and closes the answers it opened.
			await search.fill('');
			await expect(shownQuestions(page)).toHaveCount(6);
			await expect(count).toHaveText('6 perguntas');
			await expect(
				page.getByText(answerTo('Quanto vai custar, e quando fico a saber?'), { exact: true }),
			).toBeHidden();
		});
	}
});
