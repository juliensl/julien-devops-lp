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
				],
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
				],
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
				],
			},
		},
		page: {
			description:
				'Perguntas e respostas para CTO, CEO e equipas técnicas de SaaS: prazos, custos, acessos, riscos e ferramentas.',
			title: 'Respostas para cada perfil.',
			intro:
				'Escolhe o teu perfil ou pesquisa uma palavra. Se a tua pergunta não estiver aqui, faz-ma na Conversa.',
			filter: 'Filtrar por perfil',
			everyone: 'Todas',
			search: 'Pesquisar nas perguntas',
			searchPlaceholder: 'Pesquisar: testes, custos, acessos…',
			noResults: 'Nenhuma pergunta com essas palavras.',
			index: 'Perfis',
			notFound: 'Não encontras a tua pergunta?',
		},
	},
};
