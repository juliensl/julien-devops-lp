// The texts in Portuguese, the Reference language.
// French and English are typed from this file: a missing text makes `astro check` fail.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
import type { AudienceId } from '../config/audiences';
import type { CriterionId, ProviderId, Rating, ScenarioId } from '../config/cloud-providers';

const promise =
	'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.';

type Step = { name: string; sentence: string };

type Block = {
	name: string;
	summary: string;
	text: string;
	tools: string[];
	/** Said after the tools, when the client's cloud can provide its own. */
	toolsAlternative?: string;
};

/** The 4 Blocks, in the pitch's order. A language with fewer than 4 makes `astro check` fail. */
const blocks: [Block, Block, Block, Block] = [
	{
		name: 'Pipeline de CI e auditoria de código',
		summary: 'Os bugs ficam no pull request.',
		text: 'Cada alteração passa por testes, lint e análise antes de chegar à produção, com a segurança em destaque: dependências com falhas conhecidas, segredos esquecidos no código e análise do próprio código. O que está a vermelho não passa.',
		tools: ['SonarQube', 'Trivy'],
	},
	{
		name: 'Contentorização',
		summary: 'A aplicação corre igual em todo o lado.',
		text: 'A aplicação deixa de depender do ambiente onde corre. No portátil de um dev ou em produção, o mesmo comportamento.',
		tools: ['Docker'],
	},
	{
		name: 'Infraestrutura escalável',
		summary: 'A infraestrutura acompanha a carga.',
		text: 'Em dois níveis: serverless de contentores para volumes médios, Kubernetes quando a carga o justifica. Com Infrastructure as Code, a infraestrutura fica descrita em código e pode ser recriada.',
		tools: ['Kubernetes', 'Terraform'],
	},
	{
		name: 'Observabilidade',
		summary: 'Vês os problemas antes dos clientes.',
		text: 'Um painel de saúde em tempo real e um alerta imediato quando há um incidente.',
		tools: ['Grafana', 'Prometheus'],
		toolsAlternative: 'ou as ferramentas da tua cloud',
	},
];

type Question = { question: string; answer: string };

type Audience = {
	/** The audience's heading on the questions page, and its link in the header submenu. */
	name: string;
	/** In the filter. */
	short: string;
	description: string;
	questions: Question[];
};

export const pt = {
	designation: 'Consultor DevOps freelance para SaaS',
	promise,
	bookButton: 'Marcar uma conversa',
	header: {
		/** Appended to the name in the logo, which links to the home page. */
		logoTarget: 'página principal',
		/** The name of the language switcher, for screen readers. */
		languages: 'Língua',
		/** The button that opens the menu on mobile. */
		menu: 'Menu',
	},
	/** The fixed button that pauses the automatic animations: its name says what a click does. */
	animation: {
		pause: 'Pausar animação',
		resume: 'Retomar animação',
	},
	homePage: {
		description: `${promise} Para CTO de SaaS em crescimento.`,
		hero: {
			support:
				'Os bugs são apanhados no pull request, não pelo teu cliente. E os teus devs voltam a programar em vez de fazer suporte.',
			note: 'Conversa de 45 min por Google Meet, gratuita.',
		},
		whoItsFor: {
			title: 'Para quem é',
			profile: [
				'Um SaaS web ou mobile, já lançado.',
				'A passar de dezenas ou centenas para milhares de utilizadores recorrentes.',
				'Uma equipa de normalmente 5 a 20 pessoas, com pelo menos 3 devs.',
			],
			notLaunchedYet: 'O teu SaaS ainda não foi lançado? Podes marcar a Conversa na mesma.',
			exclusionsTitle: 'Não é para',
			exclusions: [
				'Quem já tem pipeline de CI, aplicação contentorizada e infraestrutura com auto-scaling.',
				'O que não é web nem mobile.',
				'Quem recusa 100 a 500 €/mês de serviços e infraestrutura.',
				'O setor militar.',
			],
		},
		todayAndAfter: {
			title: 'Hoje, e depois.',
			todayTitle: 'Hoje',
			today: [
				{
					title: 'Uma funcionalidade parte outra.',
					text: 'A regressão passou a ser normal, e é o cliente que a descobre.',
				},
				{ title: 'Os devs fazem suporte.', text: 'Respondem a tickets em vez de programar.' },
				{
					title: 'Os testes fazem-se à mão.',
					text: 'Dias inteiros, por quem não tem essa função.',
				},
				{
					title: 'Ninguém sabe se aguenta.',
					text: 'Funciona com os clientes de hoje. Com muitos mais, ninguém sabe dizer.',
				},
			],
			alreadyTriedTitle: 'O que já tentaste',
			alreadyTried: [
				'Um DevOps freelance que só executa, sem trazer experiência.',
				'Testar à mão, ou pôr um estagiário a testar.',
				'Ferramentas de teste que os devs têm de correr no portátil, e que nunca correm.',
				'Pôr um dev a aprender DevOps: semanas perdidas, e um resultado fraco.',
				'Freelancers que programam cada um à sua maneira: cada saída leva o conhecimento.',
			],
			afterTitle: 'Depois',
			after: [
				'Os bugs são apanhados no pull request, não pelo cliente.',
				'Os devs recuperam os dias que passavam em suporte.',
				'A equipa cresce sem medo de que um júnior parta a produção.',
				'Acrescentas funcionalidades sem partir outras.',
				'A infraestrutura acompanha a carga, e vês os problemas antes dos clientes.',
			],
		},
		/** The Services: the 4 Blocks, and the note on hiring them in any combination. */
		services: {
			label: 'Serviços',
			title: 'Quatro camadas da tua infraestrutura.',
			note: 'Contratas os blocos que quiseres, em qualquer combinação. No máximo 30 dias, a contar do início da Implementação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
			/** Before each Block's number: "Bloco 1". */
			blockLabel: 'Bloco',
			/** The name of each Block's list of tools, for screen readers. */
			toolsLabel: 'Ferramentas',
			blocks,
			/** The words drawn in the Blocks' mini-diagrams, and what each one shows, for screen readers. */
			diagrams: {
				pipeline: {
					description: 'Uma alteração com falha de segurança fica bloqueada antes da produção.',
					commit: 'commit',
					tests: 'testes',
					security: 'segurança',
					production: 'produção',
					blocked: 'bloqueado',
				},
				containers: {
					description: 'O mesmo contentor corre igual no portátil e em produção.',
					laptop: 'portátil',
					production: 'produção',
				},
				scaling: {
					description: 'As instâncias aumentam com a carga e voltam a diminuir.',
					load: 'carga',
					instances: 'instâncias',
				},
				monitoring: {
					description: 'Uma anomalia no sinal gera um alerta imediato.',
					dashboard: 'painel de saúde',
					alert: 'alerta',
				},
			},
		},
		/** The 5 Steps, in glossary order, each with one sentence. A language with fewer than 5
		 * makes `astro check` fail. */
		steps: {
			title: 'Cinco etapas, sempre pela mesma ordem.',
			steps: [
				{ name: 'Conversa', sentence: '45 min por Google Meet, gratuita.' },
				{
					name: 'Diagnóstico',
					sentence:
						'Gratuito. 2 a 3 dias úteis depois de receber os acessos, ou 3 a 5 se incluir a cloud.',
				},
				{
					name: 'Proposta de intervenção',
					sentence: 'Que blocos, em que prazo e por que preço fixo.',
				},
				{ name: 'Implementação', sentence: 'No máximo 30 dias de calendário.' },
				{
					name: 'Entrega e transferência',
					sentence: 'Documentação e transferência para a equipa ficar autónoma.',
				},
			] satisfies [Step, Step, Step, Step, Step],
		},
		guarantee: {
			label: 'A Garantia',
			title: 'Disponível pelo menos 99 % do tempo, em cada mês.',
			text: 'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá.',
			appliesWhen:
				'Aplica-se quando contratas os blocos 3 e 4 (e o 2, se a aplicação ainda não estiver contentorizada).',
			conditionsTitle: 'Condições',
			conditions: [
				'Um teste escrito para cada bug corrigido.',
				'Nenhum dev passa à frente de um teste a vermelho.',
				'Acesso de leitura ao repositório.',
				'Uma pessoa técnica que responde em 48 h.',
			],
			exclusionsTitle: 'Exclusões',
			exclusions: ['Falhas do fornecedor cloud.', 'Alterações que não passaram pela pipeline.'],
			number: '99 %',
			belowNumber: 'do tempo, em cada mês',
			inService: 'com serviço',
			outOfService: 'no máximo 1 % sem serviço',
			note: 'Nos 3 meses seguintes à entrega.',
		},
		/** The cloud provider chart. The names of the scenarios and criteria are #54's; the facts
		 * behind each note are in src/config/cloud-providers.ts, with their sources. */
		cloudChart: {
			label: 'Fornecedores cloud',
			title: 'Que cloud para que empresa?',
			intro:
				'Escolhe um cenário. Cada barra mostra que critérios desse cenário o fornecedor cumpre. É uma orientação para a Conversa, não uma classificação: não há um fornecedor ideal para todas as empresas.',
			/** The name of the group of scenarios, for screen readers. */
			scenariosLabel: 'Cenário de empresa',
			scenarios: {
				beforeLaunch: {
					name: 'Antes do lançamento',
					description: 'Equipa pequena, sem tempo para operar servidores.',
				},
				growth: {
					name: 'SaaS em crescimento',
					description: 'O produto já tem clientes e a equipa está a crescer.',
				},
				dataSovereignty: {
					name: 'Soberania dos dados',
					description:
						'Os dados têm de ficar na UE, com um fornecedor europeu, ou o setor exige SecNumCloud.',
				},
				variableLoad: {
					name: 'Carga muito variável',
					description: 'Picos fortes e períodos calmos.',
				},
				costControl: {
					name: 'Custos sob controlo',
					description: 'Ver e controlar os custos de infraestrutura à medida que o SaaS cresce.',
				},
			} satisfies Record<ScenarioId, { name: string; description: string }>,
			criteria: {
				kubernetes: 'Kubernetes gerido',
				containers: 'Contentores com escala automática',
				paas: 'PaaS',
				europeanHeadquarters: 'Sede na Europa',
				secNumCloud: 'Oferta SecNumCloud',
				euRegions: 'Regiões na UE',
				costs: 'Visibilidade e controlo dos custos',
			} satisfies Record<CriterionId, string>,
			/** Before a criterion's weight in the scenario: "peso 3". */
			weight: 'peso',
			/** Marks the criterion that is Julien's opinion, not a fact. */
			opinion: 'opinião do Julien',
			ratings: {
				consider: 'A considerar',
				possible: 'Possível',
				unsuitable: 'Pouco indicado',
			} satisfies Record<Rating, string>,
			/** A provider's value on a criterion: 1, ½ or 0. */
			values: { yes: 'Sim', partly: 'Em parte', no: 'Não' },
			hint: 'Clica numa barra para ver os factos.',
			/** After a label, before what it introduces: French puts a space before it. */
			colon: ':',
			/** Before the date each source was read. */
			read: 'lida a',
			source: 'Fonte',
			sources: 'Fontes',
			/** The note on outbound traffic, in the cost criterion. */
			outboundTraffic: 'Tráfego de saída',
			footnote:
				'Os factos vêm das páginas oficiais dos fornecedores e da ANSSI. Os pesos de cada cenário e o critério «Visibilidade e controlo dos custos» são opinião do Julien.',
			/** What each fact says, in words. No legal claims (#54). */
			notes: {
				aws: {
					paas: 'O App Runner fechou a novos clientes a 30/04/2026.',
					europeanHeadquarters:
						'Sede em Seattle, EUA. Na Europa, anuncia a AWS European Sovereign Cloud, com uma região na Alemanha.',
					secNumCloud: 'Não está no catálogo SecNumCloud da ANSSI.',
					euRegions: '6 regiões na UE.',
					costs:
						'Custos por conta e por etiqueta, com previsão. Orçamentos com alertas e ações automáticas.',
				},
				googleCloud: {
					paas: 'O Cloud Run publica a partir do código-fonte ou de um repositório Git.',
					europeanHeadquarters: 'Sede em Mountain View, EUA.',
					secNumCloud:
						'Oferta da Thales com tecnologia Google Cloud, qualificada desde 17/12/2025 em nome da Thales.',
					euRegions: '11 regiões na UE.',
					costs:
						'Custos por projeto e por etiqueta, com previsão. Orçamentos com alertas e tetos que param alguns serviços.',
				},
				infomaniak: {
					containers: 'Sem contentores serverless: o Jelastic Cloud escala contentores Docker.',
					paas: 'Publica a partir de Git.',
					europeanHeadquarters: 'Sede em Genebra, Suíça, fora da UE.',
					secNumCloud: 'Não está no catálogo SecNumCloud da ANSSI.',
					euRegions: 'Nenhuma região na UE: as 2 regiões estão na Suíça.',
					costs:
						'Sem painel de custos documentado, só uma API. Sem alertas de orçamento; há quotas de recursos por projeto.',
				},
				azure: {
					europeanHeadquarters:
						'Sede em Redmond, EUA. Na Europa, anuncia parceiros: a Bleu, em França, e a Delos Cloud, na Alemanha.',
					secNumCloud:
						'Não está no catálogo SecNumCloud da ANSSI. A Bleu, parceira da Microsoft, está em qualificação.',
					euRegions: '13 regiões na UE, 2 delas de acesso restrito.',
					costs:
						'Custos por subscrição, por recurso e por etiqueta, com previsão. Orçamentos só com alertas.',
				},
				ovhcloud: {
					containers: 'Contentores serverless anunciados como «Coming soon».',
					paas: 'O Web PaaS fechou a 31/01/2025.',
					europeanHeadquarters: 'Sede em Roubaix, França.',
					secNumCloud: '3 ofertas IaaS qualificadas.',
					euRegions: '7 regiões na UE.',
					costs:
						'Consumo por projeto e por recurso, com previsão. Etiquetas não encontradas. Alerta sobre a previsão, sem limite.',
				},
				scaleway: {
					paas: 'Não encontrado. O mais próximo são as Serverless Functions.',
					europeanHeadquarters: 'Sede em Paris, França.',
					secNumCloud: 'Em qualificação: ainda não está no catálogo SecNumCloud da ANSSI.',
					euRegions: '4 regiões na UE.',
					costs:
						'Custos por projeto e por produto. Etiquetas e previsão não encontradas. Os alertas só avisam.',
				},
			} satisfies Record<ProviderId, Partial<Record<CriterionId, string>>>,
			/** Outbound traffic to the internet, from Europe. */
			outbound: {
				aws: 'pago depois de 100 GB/mês.',
				googleCloud: 'pago desde o primeiro GB (Premium Tier).',
				infomaniak: 'incluído nas instâncias.',
				azure: 'pago depois de 100 GB/mês.',
				ovhcloud: 'incluído nas instâncias.',
				scaleway: 'incluído nas instâncias.',
			} satisfies Record<ProviderId, string>,
		},
		about: {
			title: 'Quem é o Julien',
			wayOfWorking:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
		},
		/** The Testimonials. Their texts, authors and approvals are in src/config/testimonials.ts. */
		testimonials: {
			title: 'O que dizem os clientes',
			/** What screen readers call the carousel and each Testimonial in it. */
			carousel: 'carrossel',
			slide: 'testemunho',
			/** Between the two numbers of «1 de 3». */
			of: 'de',
			previous: 'Testemunho anterior',
			next: 'Testemunho seguinte',
			/** The strip of Testimonials, which slides sideways. */
			strip: 'Testemunhos: desliza para ver os outros',
			translated: 'Traduzido do francês',
			malt: 'Ver no Malt',
		},
		/** The Questions section: its general questions and the Audiences come from `questions`. */
		questions: {
			label: 'Perguntas',
			title: 'O essencial, antes da Conversa.',
			byAudience: 'Perguntas para o teu perfil',
		},
		finalCta: {
			title: 'Nunca perdes a infraestrutura.',
			text: 'Mesmo que a tua equipa não avance logo com os testes, ficas com uma pipeline limpa, documentada e com os standards do mercado, pronta para quando decidires.',
			conversation: 'Conversa de 45 min por Google Meet, gratuita e sem compromisso.',
			bookingNotice:
				'A página de marcação está em francês, mas a Conversa pode ser em inglês ou em português.',
		},
	},
	/** «Os teus desafios»: the questions by audience, on their page, in the header submenu and in the home
	 * page's Questions section. The 23 answers are the ones Julien approved (#54), word for word; each
	 * audience is typed with its number of questions, so a language with one missing fails `astro check`. */
	questions: {
		/** The name of the page and of the header menu that leads to it. */
		menu: 'Os teus desafios',
		all: 'Ver todas as perguntas',
		/** After a number of questions: «7 perguntas». The language's plural rules pick the form. */
		count: { one: 'pergunta', other: 'perguntas' },
		audiences: {
			general: {
				name: 'Perguntas gerais',
				short: 'Gerais',
				description: 'Para quem está a avaliar o serviço.',
				questions: [
					{
						question: 'O que fazes, exatamente?',
						answer:
							'Entrego a infraestrutura DevOps de que um SaaS precisa para crescer, em quatro blocos: pipeline de CI e auditoria de código, contentorização, infraestrutura escalável e observabilidade. Contratas os que quiseres, em qualquer combinação.',
					},
					{
						question: 'Quanto tempo demora?',
						answer:
							'No máximo 30 dias, para qualquer combinação de blocos, a contar do início da Implementação. O prazo exato vem na Proposta de intervenção.',
					},
					{
						question: 'Quanto custa?',
						answer:
							'Um preço fixo, que dou na Proposta de intervenção, depois do Diagnóstico gratuito.',
					},
					{
						question: 'Como começa?',
						answer:
							'Com uma Conversa de 45 min por Google Meet. Depois vêm o Diagnóstico gratuito, a Proposta de intervenção, a Implementação e a Entrega e transferência.',
					},
					{
						question: 'Posso contratar só alguns blocos?',
						answer:
							'Sim, em qualquer combinação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
					},
				] satisfies [Question, Question, Question, Question, Question],
			},
			cto: {
				name: 'Para CTO',
				short: 'CTO',
				description:
					'Infraestrutura, CI/CD, testes, escala, fiabilidade, observabilidade e trabalho com a equipa.',
				questions: [
					{
						question: 'Quem escreve os testes?',
						answer:
							'A tua equipa. Eu não escrevo testes: entrego o sistema que os corre, os mede e bloqueia o que está a vermelho.',
					},
					{
						question: 'É preciso parar o desenvolvimento?',
						answer:
							'Não. No bloco 1 não há migração nem risco para a produção. Nos blocos 2 e 3 o trabalho corre em paralelo (ramos, ambientes de teste, infraestrutura separada). Algumas alterações pedem coordenação com os devs, e no fim da migração pode ser preciso um curto período sem alterações ao código, combinado contigo.',
					},
					{
						question: 'Com que stack e clouds trabalhas?',
						answer:
							'CI: GitHub Actions, GitLab CI, Azure DevOps e Google Cloud Build. Cloud: AWS, Google Cloud, Microsoft Azure, OVHcloud, Scaleway e Infomaniak. A escolha depende das necessidades e do orçamento, e pode incluir um alojamento com menor impacto ambiental.',
					},
					{
						question: 'De que acessos precisas?',
						answer:
							'No Diagnóstico, acesso de leitura ao repositório. À cloud (métricas e logs) só se o problema for de infraestrutura, desempenho, custos ou disponibilidade. Nunca passwords, chaves privadas nem permissões de administrador. Na Implementação, preciso de acesso de escrita ao repositório e de uma conta na tua cloud com as permissões necessárias para criar a infraestrutura dos blocos contratados. Retiras esses acessos na Entrega e transferência.',
					},
					{
						question: 'Como funciona a Garantia de disponibilidade?',
						answer:
							'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá. Aplica-se com os blocos 3 e 4, e pede um teste escrito para cada bug corrigido, nenhum dev a passar à frente de um teste a vermelho, acesso de leitura ao repositório e uma pessoa técnica que responde em 48 h.',
					},
					{
						question: 'Que ferramentas usas na observabilidade?',
						answer: 'Ferramentas standard, como Grafana e Prometheus, ou as da tua cloud.',
					},
					{
						question: 'Como trabalhamos juntos?',
						answer:
							'À distância, por Google Meet. Falo com o CTO e com os devs, sobretudo com o CTO.',
					},
				] satisfies [Question, Question, Question, Question, Question, Question, Question],
			},
			ceo: {
				name: 'Para CEO',
				short: 'CEO',
				description: 'Riscos, custos, continuidade, previsibilidade e impacto no negócio.',
				questions: [
					{
						question: 'Quanto vai custar, e quando fico a saber?',
						answer:
							'Um preço fixo, que dou na Proposta de intervenção. A Proposta vem depois do Diagnóstico gratuito, que demora 2 a 3 dias úteis a partir do momento em que tenho os acessos, ou 3 a 5 se incluir a cloud.',
					},
					{
						question: 'E os custos da infraestrutura?',
						answer:
							'Além do preço fixo, a infraestrutura e as ferramentas têm um custo mensal próprio, que pagas diretamente aos fornecedores, nas tuas contas. O serviço pressupõe um orçamento de 100 a 500 € por mês para estes custos.',
					},
					{
						question: 'Ficamos dependentes de ti?',
						answer:
							'Não. Uso só tecnologias standard e deixo tudo documentado. Mudas de prestador quando quiseres e nunca perdes a infraestrutura.',
					},
					{
						question: 'Que riscos há para a produção?',
						answer:
							'O bloco 1 não toca na produção. Nos blocos 2 e 3, o objetivo é evitar paragens; se a migração mexer em bases de dados ou serviços críticos, pode haver uma paragem curta, marcada antes. Há sempre um plano para voltar à versão anterior.',
					},
					{
						question: 'Que retorno posso esperar?',
						answer:
							'Menos tempo a corrigir problemas. Mais tempo a desenvolver o produto. Ajudo equipas SaaS a automatizar testes e entregas, detetar regressões mais cedo e melhorar a fiabilidade da infraestrutura, para que possam crescer com mais confiança.',
					},
					{
						question: 'Em que línguas e países trabalhas?',
						answer: 'Com clientes de qualquer país, à distância, em português, francês ou inglês.',
					},
				] satisfies [Question, Question, Question, Question, Question, Question],
			},
			team: {
				name: 'Para a equipa técnica',
				short: 'Equipa técnica',
				description: 'Devs e tech leads que vão trabalhar com a pipeline e a nova infraestrutura.',
				questions: [
					{
						question: 'O que muda no dia a dia da equipa?',
						answer:
							'O objetivo é reduzir o tempo perdido em tarefas manuais e problemas recorrentes, facilitar a deteção de regressões e tornar as entregas mais fiáveis. A equipa ganha processos mais claros, maior visibilidade sobre a infraestrutura e mais tempo para se concentrar no desenvolvimento do produto. Os resultados dependem do contexto e do estado inicial de cada projeto.',
					},
					{
						question: 'Quem mantém a pipeline depois?',
						answer:
							'A tua equipa. A documentação técnica e a transferência no fim deixam-vos autónomos.',
					},
					{
						question: 'Com quem falas no dia a dia?',
						answer:
							'Com o CTO e com os devs, sobretudo com o CTO, por Google Meet. Não há ponto de situação regular.',
					},
					{
						question: 'Continuamos a programar durante a migração?',
						answer:
							'Sim. O trabalho corre em paralelo, em ramos, ambientes de teste e infraestrutura separada. No fim pode ser preciso um curto período sem alterações ao código, combinado convosco.',
					},
					{
						question: 'Que ferramentas vamos usar?',
						answer:
							'Bloco 1: SonarQube e Trivy. Bloco 2: Docker. Bloco 3: Kubernetes e Terraform. Bloco 4: Grafana e Prometheus, ou as ferramentas da vossa cloud.',
					},
				] satisfies [Question, Question, Question, Question, Question],
			},
		} satisfies Record<AudienceId, Audience>,
		page: {
			description:
				'Perguntas e respostas para CTO, CEO e equipas técnicas de SaaS: prazos, custos, acessos, riscos e ferramentas.',
			title: 'Respostas para cada perfil.',
			intro:
				'Escolhe o teu perfil ou pesquisa uma palavra. Se a tua pergunta não estiver aqui, faz-ma na Conversa.',
			/** The name of the filter by audience, for screen readers. */
			filter: 'Filtrar por perfil',
			/** The filter's first choice: every audience. */
			everyone: 'Todas',
			/** The name of the search field, for screen readers. */
			search: 'Pesquisar nas perguntas',
			searchPlaceholder: 'Pesquisar: testes, custos, acessos…',
			noResults: 'Nenhuma pergunta com essas palavras.',
			/** The name of the index of audiences, for screen readers. */
			index: 'Perfis',
			notFound: 'Não encontras a tua pergunta?',
		},
	},
};

export type Dictionary = typeof pt;
