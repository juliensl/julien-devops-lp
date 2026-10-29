// The texts in Portuguese, the Reference language.
// French and English are typed from this file: a missing text makes `astro check` fail.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.

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
		about: {
			title: 'Quem é o Julien',
			wayOfWorking:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
		},
		finalCta: {
			title: 'Nunca perdes a infraestrutura.',
			text: 'Mesmo que a tua equipa não avance logo com os testes, ficas com uma pipeline limpa, documentada e com os standards do mercado, pronta para quando decidires.',
			conversation: 'Conversa de 45 min por Google Meet, gratuita e sem compromisso.',
			bookingNotice:
				'A página de marcação está em francês, mas a Conversa pode ser em inglês ou em português.',
		},
	},
};

export type Dictionary = typeof pt;
