// The texts in Portuguese, the Reference language.
// French and English are typed from this file: a missing text makes `astro check` fail.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
import type { AudienceId } from '../config/audiences';
import type { CriterionId, ProviderId, Rating, ScenarioId } from '../config/cloud-providers';
import type { SourceId } from '../config/ecology';

const promise =
	'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.';

type Step = { name: string; sentence: string };

type Card = { title: string; text: string };

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
	/** The ecology page, and the links that lead to it. The texts of #54 are as validated there; the
	 * others come from prototype v3. */
	ecology: {
		/** The links to the page, with the leaf, in the header and the footer. */
		link: 'Ecologia',
		/** The home page's Ecology section. */
		home: {
			title: 'A infraestrutura também tem pegada.',
			text: 'Onde a aplicação corre, quanto corre e com que eficiência mudam o impacto ambiental. A página de ecologia deixa-te estimar uma carga conforme o país onde corre, separando dados publicados, hipóteses e cálculos.',
			link: 'Abrir a página de ecologia',
		},
		page: {
			title: 'Ecologia e infraestrutura',
			description:
				'Estima a energia e as emissões de uma carga conforme o país onde corre, com o cálculo completo, o método, as fontes e os limites.',
			heading: 'As escolhas de infraestrutura também têm consequências ambientais.',
			intro:
				'Onde a aplicação corre, quanto tempo corre e com que eficiência mudam a energia que consome e as emissões da eletricidade que usa. Aqui estimas uma carga, conforme o país onde corre, com o método e as fontes à vista.',
			/** The badge on each value: what each of the three means. */
			legend: {
				label: 'Como ler os dados desta página',
				published: 'valor de uma base de dados ou de um estudo públicos, com ano e fonte',
				assumption: 'pressuposto do cálculo, que podes mudar',
				calculated: 'resultado dos dois anteriores',
			},
		},
		/** The only three badges (#54). */
		badges: { published: 'Publicado', assumption: 'Hipótese', calculated: 'Calculado' },
		estimator: {
			label: 'Estimar uma carga',
			title: 'A mesma aplicação, em sítios diferentes.',
			intro:
				'Escolhe o país, a carga e a eficiência do centro de dados. O cálculo segue o método aberto do Cloud Carbon Footprint: energia dos processadores × eficiência do centro de dados × intensidade carbónica da eletricidade.',
			fields: {
				country: 'País onde corre a infraestrutura',
				vcpu: 'Processadores virtuais (vCPU)',
				utilisation: 'Utilização média',
				hoursPerDay: 'Horas por dia',
				pue: 'Eficiência do centro de dados (PUE)',
			},
			/** Below the two fields whose first value comes from a source. */
			hints: {
				utilisation: '50 % é o valor do CCF quando não se conhece a utilização',
				pue: '1,52 é a média do setor em 2026 (Uptime Institute); o fornecedor pode indicar o do centro que usas',
			},
			/** The name of the two results, for screen readers. */
			result: 'Resultado',
			calculation: 'O cálculo',
			comparison: 'A mesma carga em cada país',
			/** After each number of the calculation. */
			units: {
				vcpu: 'vCPU',
				wattsPerVcpu: 'W por vCPU',
				perDay: 'por dia',
				daysPerMonth: 'dias por mês',
				kwhPerMonth: 'kWh por mês',
				kgPerMonth: 'kg CO2e por mês',
			},
			/** Where the watts per vCPU come from. */
			wattsSource: 'Cloud Carbon Footprint, processador desconhecido',
			/** The kind of intensity, after the country and Ember's year. */
			lifeCycle: 'ciclo de vida',
			/** After the emissions result: the method's name, in English in every language (#54). */
			locationBased: 'location-based',
		},
		method: {
			label: 'Como se calcula',
			title: 'Um só método, explicado.',
			cards: [
				{
					title: 'Location-based',
					text: 'Usa a média anual da eletricidade produzida no país. Não conta contratos de energia renovável: isso seria o método market-based, que aqui não aparece porque precisa de dados contratuais que não temos.',
				},
				{
					title: 'Ciclo de vida',
					text: 'A intensidade da Ember inclui as emissões a montante (construção das centrais, extração e transporte do combustível). Por isso é mais alta do que contar só as emissões diretas da queima. Os dois tipos nunca se misturam nesta página.',
				},
				{
					title: 'Só os processadores',
					text: 'O estimador conta a energia dos vCPU e a eficiência do centro de dados. Memória, armazenamento, rede e fabrico dos servidores ficam de fora, por isso o valor real é maior.',
				},
			] satisfies [Card, Card, Card],
		},
		/** What infrastructure can change: the title and the 4 cards validated in #54. */
		levers: {
			label: 'O que a infraestrutura pode mudar',
			title: 'Mais eficiência, mais visibilidade.',
			cards: [
				{
					title: 'Ajustar os recursos à carga',
					text: 'Com a infraestrutura escalável (bloco 3), os recursos acompanham a carga da aplicação.',
				},
				{
					title: 'Ver o que se consome',
					text: 'A observabilidade (bloco 4) dá visibilidade sobre a utilização dos recursos e os custos.',
				},
				{
					title: 'Escolher com informação',
					text: 'A intensidade carbónica da eletricidade muda de país para país, e o estimador mostra quanto.',
				},
				{
					title: 'Alojamento com menor impacto ambiental',
					text: 'Quando as necessidades e o orçamento o permitem, é uma das opções que proponho.',
				},
			] satisfies [Card, Card, Card, Card],
		},
		sources: {
			title: 'Fontes e limites',
			names: {
				ember: 'Ember, produção de eletricidade anual por país (intensidade carbónica, 2025)',
				cloudCarbonFootprint: 'Cloud Carbon Footprint, metodologia',
				uptimeInstitute: 'Uptime Institute, PUE médio do setor (inquérito de 2026)',
				research: 'Pesquisa própria sobre os dados ambientais dos fornecedores cloud (16/10/2026)',
			} satisfies Record<SourceId, string>,
			limits: [
				'Estimativa ilustrativa, não uma medição da tua infraestrutura.',
				'Os watts por vCPU são os do Cloud Carbon Footprint para um processador desconhecido; o servidor real pode consumir mais ou menos.',
				'A intensidade é uma média anual do país; a hora do dia muda o valor real.',
				'O PUE de 1,52 é a média por centro de dados; ponderada pela capacidade, é 1,36. Os centros grandes, como os da cloud, costumam ter valores mais baixos.',
			],
		},
		back: 'Voltar à página principal',
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
			/** Below the first statement: `link` is the part of `text` that leads to the booking page. */
			notLaunchedYet: {
				text: 'O teu SaaS ainda não foi lançado? Podes marcar a Conversa na mesma.',
				link: 'marcar a Conversa',
			},
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
				'Aplica-se quando contratas a Infraestrutura escalável e a Observabilidade (e a Contentorização, se a aplicação ainda não estiver contentorizada).',
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
			linkedin: 'Ver o meu perfil no LinkedIn',
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
	 * page's Questions section. The 23 answers are Julien's, word for word in French; each
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
							'Intervenho em quatro áreas: auditoria e CI/CD, limpeza e otimização do código, infraestrutura escalável e observabilidade. O objetivo é reduzir os problemas recorrentes e permitir que a aplicação cresça sobre bases mais sólidas. O âmbito de cada missão é definido depois do diagnóstico.',
					},
					{
						question: 'Quanto tempo demora?',
						answer:
							'Depende do estado do código, dos serviços existentes e dos trabalhos prioritários. Depois do diagnóstico, proponho um calendário realista, com etapas e entregáveis precisos. Não há promessa artificial de fazer tudo em 30 dias.',
					},
					{
						question: 'Quanto custa?',
						answer:
							'O preço é definido a partir do âmbito acordado depois de um primeiro diagnóstico gratuito. A proposta distingue os meus honorários dos eventuais custos recorrentes de cloud e de ferramentas.',
					},
					{
						question: 'Como começa?',
						answer:
							'Começamos com uma conversa gratuita de 45 minutos. Seguem-se o diagnóstico, a proposta de intervenção, a implementação com pontos de situação regulares e, depois, a entrega e a transferência para a tua equipa.',
					},
					{
						question: 'Posso escolher só alguns blocos?',
						answer:
							'Sim, posso intervir numa necessidade específica. A ordem e as dependências técnicas são definidas depois do diagnóstico. A garantia de conformidade técnica de três meses apresentada neste site diz respeito apenas às prestações completas que cobrem os quatro blocos.',
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
							'Implemento e melhoro a automatização das verificações. Quando são precisos testes ou correções de código, decidimos juntos quem os faz e em que âmbito. No bloco de otimização, posso escrever ou adaptar os testes ligados às alterações de que me encarrego.',
					},
					{
						question: 'É preciso parar o desenvolvimento durante a intervenção?',
						answer:
							'Em princípio, não. O trabalho é organizado com ramos, ambientes adequados e validações progressivas. Algumas migrações ou alterações críticas podem exigir uma janela de alterações planeada com a equipa.',
					},
					{
						question: 'Com que stacks e que clouds trabalhas?',
						answer:
							'Uso nomeadamente GitHub Actions, GitLab CI, Terraform, Docker, Kubernetes, Grafana e os serviços nativos das clouds. Trabalho com AWS, Google Cloud, Azure, Scaleway, OVHcloud e outros fornecedores, consoante o projeto. As ferramentas são escolhidas em função do contexto, não impostas à partida.',
					},
					{
						question: 'De que acessos precisas?',
						answer:
							'Para o diagnóstico, acessos de leitura ao código e, se necessário, às métricas e à configuração da cloud. Para a implementação, permissões adequadas às operações acordadas. Privilegio acessos nominativos, limitados ao estritamente necessário e revogáveis no fim da missão. Não é preciso partilhar palavras-passe nem chaves privadas.',
					},
					{
						question: 'O que cobre a garantia de três meses?',
						answer:
							'Numa prestação completa que cubra os quatro blocos, diz respeito aos defeitos de conceção ou de configuração da infraestrutura que me sejam imputáveis, de acordo com as condições contratuais. O objetivo de disponibilidade é definido com o cliente. Não se trata de uma garantia de zero bugs na aplicação, nem de um serviço de piquete 24 h/24.',
					},
					{
						question: 'Que ferramentas usas para a observabilidade?',
						answer:
							'Consoante o contexto, Grafana, Prometheus, soluções de logs e de tracing, ou as ferramentas de monitorização nativas do fornecedor de cloud. O objetivo é dispor de indicadores úteis e de alertas acionáveis, em vez de multiplicar os dashboards.',
					},
					{
						question: 'Como trabalhamos juntos?',
						answer:
							'Falo diretamente com as pessoas envolvidas: CTO, tech lead, programadores e responsável pelo projeto. Organizamos pontos de situação regulares, geralmente todas as semanas, e documentamos as decisões importantes.',
					},
				] satisfies [Question, Question, Question, Question, Question, Question, Question],
			},
			ceo: {
				name: 'Para CEO',
				short: 'CEO',
				description: 'Riscos, custos, continuidade, previsibilidade e impacto no negócio.',
				questions: [
					{
						question: 'Quando fico a saber o orçamento da intervenção?',
						answer:
							'Depois do diagnóstico gratuito, recebes uma proposta que especifica os trabalhos, o calendário e o preço da minha intervenção. Os eventuais custos mensais dos fornecedores são apresentados à parte.',
					},
					{
						question: 'Quanto vai custar a cloud depois?',
						answer:
							'O custo depende da arquitetura, do tráfego, dos dados, da região e do nível de disponibilidade pretendido. Apresento uma estimativa fundamentada antes das decisões estruturantes, com os pressupostos e as principais rubricas de despesa.',
					},
					{
						question: 'A minha empresa vai ficar dependente de ti?',
						answer:
							'O meu objetivo é o contrário: privilegio tecnologias documentadas, uma infraestrutura descrita como código e uma transferência clara. As dependências próprias do fornecedor escolhido são explicadas desde a conceção.',
					},
					{
						question: 'Há algum risco para a produção?',
						answer:
							'Qualquer intervenção apresenta riscos, mas são avaliados antes da execução. Preparamos os testes, as cópias de segurança e, quando é pertinente, um plano para voltar atrás. As alterações sensíveis são coordenadas com a tua equipa.',
					},
					{
						question: 'Que retorno do investimento posso esperar?',
						answer:
							'Menos tempo perdido com incidentes e tarefas repetitivas, um código mais fácil de manter e deploys mais fiáveis. Os ganhos exatos dependem da situação de partida; o diagnóstico serve também para identificar as melhorias de maior valor.',
					},
					{
						question: 'Em que línguas trabalhas?',
						answer:
							'Posso intervir em francês, em inglês e em português, consoante as necessidades da equipa e do projeto.',
					},
				] satisfies [Question, Question, Question, Question, Question, Question],
			},
			team: {
				name: 'Para a equipa técnica',
				short: 'Equipa técnica',
				description: 'Devs e tech leads que vão trabalhar com a pipeline e a nova infraestrutura.',
				questions: [
					{
						question: 'O que muda no dia a dia?',
						answer:
							'Verificações automáticas mais úteis, menos tarefas manuais, melhor visibilidade sobre os problemas e um código progressivamente mais simples de manter. As alterações ao workflow são preparadas com a equipa, não impostas sem discussão.',
					},
					{
						question: 'Quem mantém as pipelines depois de saíres?',
						answer:
							'A tua equipa fica com as ferramentas, as configurações e a documentação. Prevejo uma transferência para que o seu funcionamento seja compreendido e as evoluções possam ser feitas com autonomia.',
					},
					{
						question: 'Com quem comunicas durante a missão?',
						answer:
							'Com os interlocutores técnicos e de negócio úteis ao projeto. Prevemos um ponto de acompanhamento regular, normalmente semanal, e contactos complementares quando são precisas decisões ou validações.',
					},
					{
						question: 'Podemos continuar a desenvolver durante as alterações?',
						answer:
							'Sim, o objetivo é preservar o ritmo de desenvolvimento. As alterações são preparadas e testadas em paralelo, sempre que possível. Pode ser acordada uma janela de estabilização ou de migração para as alterações sensíveis.',
					},
					{
						question: 'Que ferramentas vamos usar?',
						answer:
							'Não há uma stack imposta. Consoante o projeto: pipelines de CI/CD, análise de código, ferramentas de refactoring e de desempenho, Docker, serviços de contentores geridos, Kubernetes, Terraform, Grafana, Prometheus ou equivalentes. Privilegio as ferramentas relevantes para a equipa e para o que já existe.',
					},
				] satisfies [Question, Question, Question, Question, Question],
			},
		} satisfies Record<AudienceId, Audience>,
		page: {
			description:
				'Perguntas e respostas para CEO, CTO e programadores: o código, a infraestrutura, os custos e a nossa forma de trabalhar.',
			title: 'Respostas concretas, de acordo com a tua função.',
			intro:
				'És CEO, CTO, programador ou levas o projeto sozinho? Encontra as respostas às perguntas mais frequentes sobre o código, a infraestrutura, os custos e a nossa forma de trabalhar. E, se a tua pergunta não estiver aqui, vamos falar disso.',
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
			notFound: 'Não encontras a tua resposta?',
			/** Under «notFound», before the button. */
			notFoundText: 'Marca uma conversa gratuita e vamos falar do teu contexto.',
		},
	},
};

export type Dictionary = typeof pt;
