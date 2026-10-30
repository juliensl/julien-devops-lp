// «Os teus desafios» (#70): the page with the 23 questions by audience, with its filter, search and
// index, the header submenu that leads to each audience, and the 5 general questions on the home page.
import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { BOOKING_PAGE, LANGUAGES, NAME, type Language } from './expected';

/** Each audience's anchor, the same in the three languages. */
type Anchor = 'general' | 'cto' | 'ceo' | 'team';

// The four audiences and how many questions each has (#54).
const COUNTS: Record<Anchor, number> = { general: 5, cto: 7, ceo: 6, team: 5 };
const ANCHORS = Object.keys(COUNTS) as Anchor[];

// The 23 questions and answers Julien approved, word for word, from #54's first comment.
const APPROVED: Record<Anchor, [question: string, answer: string][]> = {
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

// «Os teus desafios», «Não encontras a tua pergunta?» and the audiences come from the spec (#54); the
// audience names, from prototype v3. French and English are translations the intern reviews before the
// Commercial launch (#75).
const EXPECTED: Record<
	Language,
	{ menu: string; audiences: Record<Anchor, string>; notFound: string }
> = {
	pt: {
		menu: 'Os teus desafios',
		audiences: {
			general: 'Perguntas gerais',
			cto: 'Para CTO',
			ceo: 'Para CEO',
			team: 'Para a equipa técnica',
		},
		notFound: 'Não encontras a tua pergunta?',
	},
	fr: {
		menu: 'Tes défis',
		audiences: {
			general: 'Questions générales',
			cto: 'Pour les CTO',
			ceo: 'Pour les CEO',
			team: "Pour l'équipe technique",
		},
		notFound: 'Tu ne trouves pas ta question ?',
	},
	en: {
		menu: 'Your challenges',
		audiences: {
			general: 'General questions',
			cto: 'For CTOs',
			ceo: 'For CEOs',
			team: 'For the tech team',
		},
		notFound: "Can't find your question?",
	},
};

/** The page's path: the slug is the same in the three languages. */
const questionsPath = (language: Language) => `${LANGUAGES[language].prefix}questions/`;

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const path = questionsPath(language);
		const { menu, audiences, notFound } = EXPECTED[language];

		test.describe(path, () => {
			test('has its own title and description', async ({ page }) => {
				await page.goto(LANGUAGES[language].prefix);
				const homeDescription = await page
					.locator('meta[name="description"]')
					.getAttribute('content');

				await page.goto(path);
				await expect(page).toHaveTitle(`${menu} · ${NAME}`);
				const description = page.locator('meta[name="description"]');
				await expect(description).toHaveAttribute('content', /\S/);
				await expect(description).not.toHaveAttribute('content', homeDescription!);
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
				const last = main.getByRole('link').last();
				await expect(last).toHaveAccessibleName(LANGUAGES[language].button);
				await expect(last).toHaveAttribute('href', BOOKING_PAGE);
			});
		});
	}

	if (build.phase.publishedLanguages.includes('pt')) {
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
		});
	}
});
