// Translated from French, the Reference language: same meaning, no added promises.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
import type { Dictionary } from './fr';

const promise = 'Menos bugs. Um código mais limpo. Um SaaS pronto para crescer.';

const blocks: Dictionary['homePage']['services']['blocks'] = [
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

export const pt: Dictionary = {
	designation: 'Consultor DevOps',
	promise,
	bookButton: 'Marcar uma conversa',
	header: {
		logoTarget: 'página principal',
		languages: 'Língua',
		menu: 'Menu',
		/** The submenu of the pages that help a CTO decide. */
		resources: 'Recursos',
	},
	animation: {
		pause: 'Pausar animação',
		resume: 'Retomar animação',
	},
	ecology: {
		link: 'Ecologia',
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
			legend: {
				label: 'Como ler os dados desta página',
				published: 'valor de uma base de dados ou de um estudo públicos, com ano e fonte',
				assumption: 'pressuposto do cálculo, que podes mudar',
				calculated: 'resultado dos dois anteriores',
			},
		},
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
			hints: {
				utilisation: '50 % é o valor do CCF quando não se conhece a utilização',
				pue: '1,52 é a média do setor em 2026 (Uptime Institute); o fornecedor pode indicar o do centro que usas',
			},
			result: 'Resultado',
			calculation: 'O cálculo',
			comparison: 'A mesma carga em cada país',
			units: {
				vcpu: 'vCPU',
				wattsPerVcpu: 'W por vCPU',
				perDay: 'por dia',
				daysPerMonth: 'dias por mês',
				kwhPerMonth: 'kWh por mês',
				kgPerMonth: 'kg CO2e por mês',
			},
			wattsSource: 'Cloud Carbon Footprint, processador desconhecido',
			lifeCycle: 'ciclo de vida',
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
			],
		},
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
			],
		},
		sources: {
			title: 'Fontes e limites',
			names: {
				ember: 'Ember, produção de eletricidade anual por país (intensidade carbónica, 2025)',
				cloudCarbonFootprint: 'Cloud Carbon Footprint, metodologia',
				uptimeInstitute: 'Uptime Institute, PUE médio do setor (inquérito de 2026)',
				research: 'Pesquisa própria sobre os dados ambientais dos fornecedores cloud (16/10/2026)',
			},
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
		description: `${promise} Automatizo a qualidade do código, reduzo a dívida técnica e construo uma infraestrutura capaz de acompanhar o teu crescimento.`,
		hero: {
			support:
				'Automatizo a qualidade do código, reduzo a dívida técnica e construo uma infraestrutura capaz de acompanhar o teu crescimento. Os teus programadores passam menos tempo a corrigir problemas, e mais tempo a fazer evoluir o teu produto.',
			note: '45 min por Google Meet. Gratuita e sem compromisso.',
		},
		whoItsFor: {
			title: 'Para quem é?',
			intro:
				'Desenvolves um SaaS ou uma aplicação web, sozinho ou com uma equipa? Adapto-me à tua fase de desenvolvimento, à tua organização e às tuas restrições técnicas.',
			situations: [
				'Estás a preparar um lançamento e queres começar com bases sólidas.',
				'O teu produto já está online e os bugs ou a manutenção atrasam as novidades.',
				'Prevês um aumento de carga e queres evitar surpresas desagradáveis.',
			],
			button: 'Vamos falar do teu projeto',
		},
		todayAndAfter: {
			title: 'Hoje… e depois.',
			todayTitle: 'Hoje',
			today: [
				'Uma nova funcionalidade parte outra, e os clientes descobrem as regressões.',
				'Os teus programadores passam demasiado tempo com bugs, correções e suporte.',
				'O código obsoleto acumula-se, as dependências envelhecem e o desempenho degrada-se.',
				'Os testes e os deploys ainda dependem de verificações manuais.',
				'Falta-te visibilidade sobre o estado real da tua aplicação e sobre a sua capacidade de suportar mais carga.',
			],
			afterTitle: 'Depois',
			after: [
				'As regressões são detetadas mais cedo graças às verificações automáticas.',
				'As correções e as otimizações prioritárias tornam o teu código mais fácil de manter.',
				'Uma parte da manutenção repetitiva é automatizada, para libertar tempo de desenvolvimento.',
				'Os deploys são mais previsíveis e a infraestrutura adapta-se à carga prevista.',
				'Tens indicadores e alertas para detetar os incidentes o mais cedo possível.',
			],
		},
		services: {
			label: 'Serviços',
			title: 'Quatro camadas da tua infraestrutura.',
			note: 'Contratas os blocos que quiseres, em qualquer combinação. No máximo 30 dias, a contar do início da Implementação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
			blockLabel: 'Bloco',
			toolsLabel: 'Ferramentas',
			blocks,
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
			],
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
		cloudChart: {
			label: 'Fornecedores cloud',
			title: 'Que cloud para que empresa?',
			intro:
				'Escolhe um cenário. Cada barra mostra que critérios desse cenário o fornecedor cumpre. É uma orientação para a Conversa, não uma classificação: não há um fornecedor ideal para todas as empresas.',
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
			},
			criteria: {
				kubernetes: 'Kubernetes gerido',
				containers: 'Contentores com escala automática',
				paas: 'PaaS',
				europeanHeadquarters: 'Sede na Europa',
				secNumCloud: 'Oferta SecNumCloud',
				euRegions: 'Regiões na UE',
				costs: 'Visibilidade e controlo dos custos',
			},
			weight: 'peso',
			opinion: 'opinião do Julien',
			ratings: {
				consider: 'A considerar',
				possible: 'Possível',
				unsuitable: 'Pouco indicado',
			},
			values: { yes: 'Sim', partly: 'Em parte', no: 'Não' },
			hint: 'Clica numa barra para ver os factos.',
			colon: ':',
			read: 'lida a',
			source: 'Fonte',
			sources: 'Fontes',
			outboundTraffic: 'Tráfego de saída',
			footnote:
				'Os factos vêm das páginas oficiais dos fornecedores e da ANSSI. Os pesos de cada cenário e o critério «Visibilidade e controlo dos custos» são opinião do Julien.',
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
			},
			outbound: {
				aws: 'pago depois de 100 GB/mês.',
				googleCloud: 'pago desde o primeiro GB (Premium Tier).',
				infomaniak: 'incluído nas instâncias.',
				azure: 'pago depois de 100 GB/mês.',
				ovhcloud: 'incluído nas instâncias.',
				scaleway: 'incluído nas instâncias.',
			},
		},
		about: {
			title: 'Quem é o Julien',
			wayOfWorking:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
			linkedin: 'Ver o meu perfil no LinkedIn',
		},
		testimonials: {
			title: 'O que dizem os clientes',
			carousel: 'carrossel',
			slide: 'testemunho',
			of: 'de',
			previous: 'Testemunho anterior',
			next: 'Testemunho seguinte',
			strip: 'Testemunhos: desliza para ver os outros',
			translated: 'Traduzido do francês',
			malt: 'Ver no Malt',
		},
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
	questions: {
		menu: 'Os teus desafios',
		all: 'Ver todas as perguntas',
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
				],
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
				],
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
				],
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
				],
			},
		},
		page: {
			description:
				'Perguntas e respostas para CEO, CTO e programadores: o código, a infraestrutura, os custos e a nossa forma de trabalhar.',
			title: 'Respostas concretas, de acordo com a tua função.',
			intro:
				'És CEO, CTO, programador ou levas o projeto sozinho? Encontra as respostas às perguntas mais frequentes sobre o código, a infraestrutura, os custos e a nossa forma de trabalhar. E, se a tua pergunta não estiver aqui, vamos falar disso.',
			filter: 'Filtrar por perfil',
			everyone: 'Todas',
			search: 'Pesquisar nas perguntas',
			searchPlaceholder: 'Pesquisar: testes, custos, acessos…',
			noResults: 'Nenhuma pergunta com essas palavras.',
			index: 'Perfis',
			notFound: 'Não encontras a tua resposta?',
			notFoundText: 'Marca uma conversa gratuita e vamos falar do teu contexto.',
		},
	},
};
