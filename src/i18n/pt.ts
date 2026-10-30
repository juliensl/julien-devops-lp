// The texts in Portuguese, the Reference language.
// French and English are typed from this file: a missing text makes `astro check` fail.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
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
			/** The kind of intensity, after the country and «Ember 2025». */
			lifeCycle: 'ciclo de vida',
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
		/** «O que a infraestrutura pode mudar»: the title and the 4 cards validated in #54. */
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
			sources: {
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
