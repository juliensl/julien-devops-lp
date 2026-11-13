// Translated from French, the Reference language: same meaning, no added promises.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
import type { Dictionary } from './fr';

const promise = 'Menos bugs. Um código mais limpo. Um SaaS pronto para crescer.';

const blocks: Dictionary['homePage']['services']['blocks'] = [
	{
		name: 'Auditoria do código e CI/CD',
		summary: 'Deteta os problemas antes de chegarem à produção.',
		text: 'Analiso o repositório e os processos de entrega e, depois, monto uma pipeline adaptada ao teu projeto: qualidade do código, lint, testes automatizados, análise de segurança e controlo das dependências. Os erros são assinalados logo no pull request, antes de se tornarem incidentes nos teus clientes.',
		tools: [
			'GitHub Actions',
			'GitLab CI',
			'Lint',
			'Testes unitários',
			'Testes de integração',
			'Testes E2E',
			'SonarQube',
			'Trivy',
			'Gitleaks',
		],
		toolsAlternative: 'E mais, conforme a stack',
	},
	{
		name: 'Limpeza e otimização do código',
		summary: 'Menos dívida técnica, mais tempo para desenvolver.',
		text: 'Encarrego-me diretamente das correções na aplicação, do refactoring do código e das otimizações de desempenho identificados como prioritários. Também automatizo uma parte da manutenção repetitiva. O objetivo: tornar a aplicação mais limpa, mais rápida e mais simples de fazer evoluir. O volume da intervenção é definido depois da auditoria: não se trata de uma reformulação ilimitada de todo o código.',
		tools: [
			'Refactoring',
			'Dívida técnica',
			'Desempenho',
			'API e consultas',
			'Dependências',
			'Manutenção automatizada',
		],
		toolsAlternative: 'Conforme a stack',
	},
	{
		name: 'Infraestrutura escalável',
		summary: 'A arquitetura certa para o teu uso, sem complexidade desnecessária.',
		text: 'Contentorizo a aplicação quando é necessário e escolho o alojamento adequado à sua carga: contentores geridos, serviços serverless ou Kubernetes. A Infrastructure as Code permite descrever, versionar e reproduzir os ambientes. O objetivo é poder evoluir sem sobredimensionar a infraestrutura logo de início.',
		tools: [
			'Docker',
			'Containers as a Service',
			'Kubernetes',
			'Terraform',
			'GCP',
			'AWS',
			'Azure',
			'Scaleway',
			'OVHcloud',
			'Infomaniak',
		],
		toolsAlternative: 'E outros fornecedores',
	},
	{
		name: 'Observabilidade',
		summary: 'Deixa de descobrir os incidentes pelos teus clientes.',
		text: 'Implemento as métricas, registos, painéis e alertas necessários para acompanhar a saúde da aplicação e da sua infraestrutura. Em vez de verificar manualmente se tudo funciona, a tua equipa é avisada assim que surge um problema detetável e tem a informação necessária para intervir.',
		tools: ['Grafana', 'Prometheus', 'Logs', 'Alertas', 'Monitorização', 'Tracing'],
		toolsAlternative: 'Ferramentas nativas da cloud',
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
	availability: {
		title: 'Disponibilidade e condições',
		description:
			'Compara os níveis de disponibilidade, calcula o teu tempo de indisponibilidade teórico e consulta as condições da garantia de conformidade.',
		heading: 'Que nível de disponibilidade para o teu SaaS?',
		intro:
			'Um objetivo de disponibilidade escolhe-se de acordo com o impacto real de uma interrupção no teu negócio. Quanto mais alto for o objetivo, mais exigentes e dispendiosas se podem tornar a arquitetura, a redundância e a operação. Compara os níveis antes de decidir.',
		calculator: {
			title: 'Calcula o teu tempo de indisponibilidade teórico',
			text: 'Escolhe um objetivo de disponibilidade e descobre o que representa em minutos por mês e em horas por ano. Estes valores são indicativos: um objetivo de arquitetura não garante, por si só, a disponibilidade de toda a aplicação.',
			objective: 'Objetivo de disponibilidade',
			month: 'Duração do mês',
			days: 'dias',
			result: 'Indisponibilidade máxima teórica',
			perMonth: 'Por mês',
			perYear: 'Equivalente anual',
			about: 'cerca de',
			formula:
				'Fórmula, para uma medição 24 h/24: (1 − objetivo / 100) × duração do período em segundos, no mês escolhido ou num ano de 365 dias.',
		},
		levels: {
			essential: {
				title: 'Disponibilidade essencial',
				text: 'Para uma aplicação que pode tolerar interrupções ocasionais. Uma infraestrutura simples pode bastar, consoante as dependências e os riscos aceites.',
			},
			reinforced: {
				title: 'Disponibilidade reforçada',
				text: 'Para reduzir as interrupções e proteger melhor os serviços críticos. A monitorização e a limitação dos pontos únicos de falha passam a ser prioritárias.',
			},
			high: {
				title: 'Alta disponibilidade',
				text: 'Para serviços em que uma interrupção prolongada tem um impacto importante. Uma redundância adequada, mecanismos de comutação e testes de recuperação podem ser necessários.',
			},
			veryHigh: {
				title: 'Disponibilidade muito elevada',
				text: 'Para utilizações particularmente sensíveis a interrupções. A arquitetura e os procedimentos de operação devem ser estudados caso a caso.',
			},
		},
		architecture: {
			title: 'O que o objetivo exige da arquitetura',
			intro:
				'Quanto mais alto for o objetivo, mais a arquitetura tem de limitar os pontos únicos de falha e recuperar depressa de uma avaria. As escolhas abaixo podem contribuir para isso, consoante o nível escolhido, mas nenhuma topologia garante, por si só, uma percentagem de disponibilidade.',
			cards: [
				{
					title: 'Redundância',
					text: 'Várias instâncias da aplicação, para que uma instância avariada não pare todo o serviço. Nos níveis menos exigentes, uma infraestrutura simples pode bastar.',
				},
				{
					title: 'Backups',
					text: 'Backups regulares, com restauros testados, seja qual for o nível. Permitem recomeçar depois de um incidente, sem impedir a interrupção.',
				},
				{
					title: 'Base de dados',
					text: 'Muitas vezes, o ponto único de falha mais delicado. Quando o objetivo sobe, uma réplica pronta a assumir o lugar pode tornar-se necessária.',
				},
				{
					title: 'Multi-AZ',
					text: 'Distribuir os recursos por várias zonas de disponibilidade da mesma região, para que a avaria de uma zona não pare todo o serviço.',
				},
				{
					title: 'Comutação (failover)',
					text: 'Mecanismos que redirecionam o tráfego para um recurso saudável, e testes de recuperação para verificar que funcionam.',
				},
				{
					title: 'Monitorização',
					text: 'Alertas para detetar uma interrupção e reagir depressa. Passa a ser prioritária a partir de 99,9 %.',
				},
			],
		},
		commitment: {
			title: 'Um objetivo de disponibilidade não é um serviço de piquete.',
			text: 'Concebo, configuro e verifico a infraestrutura para responder ao nível de disponibilidade escolhido na proposta de intervenção. O fornecedor cloud continua responsável pelos seus próprios compromissos de serviço. Depois da entrega, a monitorização diária e a resposta a incidentes cabem à organização prevista com a tua equipa ou com o teu prestador de operação. Não está incluída uma intervenção humana 24 h/24.',
		},
		guarantee: {
			title: 'Três meses de garantia de conformidade técnica.',
			text: 'Quando os quatro blocos são realizados no âmbito de uma prestação completa, os defeitos de conceção ou de configuração da infraestrutura que me sejam diretamente imputáveis podem ser comunicados durante os três meses seguintes à entrega. A sua análise e correção são asseguradas de acordo com o âmbito e as modalidades definidos no contrato. Esta garantia não cobre automaticamente os bugs da aplicação, as avarias externas nem as alterações não validadas.',
		},
		conditions: {
			title: 'Condições e limites da garantia de conformidade',
			intro:
				'As condições contratuais da proposta de intervenção fazem fé. Os princípios abaixo explicam o funcionamento da garantia e não substituem o contrato assinado.',
			items: [
				{
					title: 'O que está coberto',
					text: 'Os defeitos de conceção, de parametrização ou de implementação da infraestrutura diretamente ligados aos trabalhos entregues e incluídos no âmbito contratual, comunicados nos três meses seguintes à entrega da prestação completa que cobre os quatro blocos.',
				},
				{
					title: 'O que não está coberto',
					text: 'As indisponibilidades próprias dos fornecedores cloud ou de serviços de terceiros, exceto quando revelam uma falha de conceção ou de configuração que caiba na minha prestação; os bugs e as evoluções da aplicação fora do âmbito corrigido; as alterações de código, de configuração ou de infraestrutura feitas sem validação e que estejam na origem do mau funcionamento; a utilização fora dos pressupostos de dimensionamento acordados; o incumprimento dos pré-requisitos ou das recomendações críticas documentados; os incidentes devidos a acessos, autorizações ou informações indisponíveis do lado do cliente.',
				},
				{
					title: 'Responsabilidades',
					text: 'O cliente mantém a responsabilidade pela operação corrente, pela validação das alterações e pela organização da resposta a incidentes, salvo prestação adicional explicitamente prevista. A garantia não inclui serviço de piquete 24 h/24, prazo de reação imediato nem compensação financeira automática.',
				},
				{
					title: 'Como comunicar um defeito',
					text: 'Durante o período coberto, o cliente envia uma descrição do problema e as informações úteis para o diagnóstico. Quando a não conformidade entra no âmbito da prestação, as modalidades de correção são acordadas de acordo com a sua natureza e o seu impacto.',
				},
			],
		},
		button: 'Vamos definir o objetivo de disponibilidade adequado ao teu projeto',
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
			title: 'Quatro alavancas para tornar o teu SaaS fiável e fazê-lo crescer.',
			intro:
				'Da qualidade do código à monitorização em produção, intervenho nos pontos que travam a tua equipa. Depois de um diagnóstico, definimos juntos o âmbito, as prioridades e a ordem das intervenções. Podes confiar-me uma necessidade específica ou um projeto completo.',
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
				cleanup: {
					description:
						'Um bug e código duplicado desaparecem: o código fica mais curto e o tempo de resposta desce.',
					bug: 'bug',
					duplicate: '×2',
					responseTime: 'tempo de resposta',
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
			title: 'Cinco etapas para avançar com tranquilidade.',
			steps: [
				{
					name: 'Conversa inicial',
					sentence:
						'45 minutos por Google Meet para perceber o teu produto, as tuas prioridades e as tuas restrições. Gratuita, sem compromisso.',
				},
				{
					name: 'Diagnóstico',
					sentence:
						'Um primeiro levantamento gratuito do teu código e, se for preciso, da tua infraestrutura. Resposta em 3 a 5 dias úteis depois de receber os acessos necessários.',
				},
				{
					name: 'Proposta de intervenção',
					sentence:
						'Um âmbito preciso, prioridades, um calendário e um preço acordados antes de começar.',
				},
				{
					name: 'Implementação',
					sentence:
						'Trabalho com a tua equipa, limitando as perturbações no desenvolvimento. Um ponto de situação regular, em princípio todas as semanas, permite acompanhar as ações e as decisões.',
				},
				{
					name: 'Entrega e transferência',
					sentence:
						'Documentação, verificações finais e transferência de conhecimento para que a tua equipa fique autónoma.',
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
