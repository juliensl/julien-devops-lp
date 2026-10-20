// PROTÓTIPO DESCARTÁVEL v2 do ticket «Qual a direção visual?» (#8).
// Fica no ramo prototipo/direcao-visual-v3 e nunca entra na main.
// Textos validados vêm do protótipo v1; o resto está marcado com o seu estado.
export {
	calendly,
	textos,
	problemas,
	depois,
	paraQuem,
	notaBlocos,
	rodape,
	contraste,
} from '../prototipo-direcao-visual/conteudo';
import { blocos as blocosV1 } from '../prototipo-direcao-visual/conteudo';

// Bloco 4: Grafana e Prometheus passam a ser nomeados (validado pelo Julien a 19/10/2026).
export const blocos = blocosV1.map((b) =>
	b.n === 4
		? {
				...b,
				texto: 'Um painel de saúde em tempo real e um alerta imediato quando há um incidente, com ferramentas standard ou as da tua cloud.',
				ferramentas: ['Grafana', 'Prometheus'],
			}
		: b,
);

export type P = 1 | 2 | 3;
export type Pagina = 'inicio' | 'ecologia' | 'perguntas';
export type Modo = 'rotas' | 'hash';

/** Estado de cada dado mostrado no protótipo. */
export type Estado = 'validado' | 'publicado' | 'calculado' | 'hipotese' | 'demo' | 'a-validar';
export const nomesEstado: Record<Estado, string> = {
	validado: 'Validado pelo Julien',
	publicado: 'Publicado',
	calculado: 'Calculado',
	hipotese: 'Hipótese',
	demo: 'Demonstração',
	'a-validar': 'A validar',
};

export const etapas = [
	{ nome: 'Conversa', texto: '45 min por Google Meet, gratuita.' },
	{ nome: 'Diagnóstico', texto: 'Gratuito. 2 a 3 dias úteis depois de receber os acessos, ou 3 a 5 se incluir a cloud.' },
	{ nome: 'Proposta de intervenção', texto: 'Que blocos, em que prazo e por que preço fixo.' },
	{ nome: 'Implementação', texto: 'No máximo 30 dias, a contar do início.' },
	{ nome: 'Entrega e transferência', texto: 'Documentação e transferência para a equipa ficar autónoma.' },
];

export const factosHero = ['No máximo 30 dias', 'Diagnóstico gratuito', 'Preço fixo'];

// ---------- Testemunhos ----------
// Os 3 testemunhos do perfil Malt do Julien, já autorizados pelos autores (validado a 20/10/2026, #51).
// Primeiro nome, cargo e empresa como no Malt; texto completo; sem ligação ao Malt.
// Na página portuguesa aparece a tradução, assinalada; o autor ainda tem de a aprovar.
export type Testemunho = { nome: string; cargo: string; empresa: string; original: string[]; traducao: string[] };
export const testemunhos: Testemunho[] = [
	{
		nome: 'Thibaud',
		cargo: 'Fundador',
		empresa: 'Vasco',
		original: [
			"Julien a été très pro dans l'approche. Il est intervenu sur un périmètre précis, il a aidé notre équipe technique sénior qui avait déjà de bonnes notions, mais le DevOps est une discipline à part entière et c'est en collaborant avec Julien qu'on en devient convaincus. Un profil à recommander à 100%",
		],
		traducao: [
			'O Julien foi muito profissional na abordagem. Interveio num âmbito preciso e ajudou a nossa equipa técnica sénior, que já tinha boas noções, mas o DevOps é uma disciplina por direito próprio e é a trabalhar com o Julien que ficamos convencidos disso. Um perfil a recomendar a 100 %.',
		],
	},
	{
		nome: 'Adam',
		cargo: 'Especialista DevOps',
		empresa: 'Venus consulting',
		original: [
			"J'ai fait appel à Julien dans le cadre d'un projet de formation en DevOps, et son intervention a été une totale réussite. Julien s'est montré parfaitement à la hauteur de la mission.",
			"Grâce à sa double expertise de développeur et de spécialiste DevOps, il a su transmettre des compétences pointues avec beaucoup de pédagogie et de clarté. Son professionnalisme, sa maîtrise technique et sa capacité à s'adapter aux besoins du projet ont été des atouts majeurs. Je recommande vivement Julien à quiconque cherche un expert DevOps fiable, compétent et excellent pédagogue. Un grand merci pour ton travail !",
		],
		traducao: [
			'Recorri ao Julien para um projeto de formação em DevOps, e a intervenção dele foi um êxito total. O Julien esteve perfeitamente à altura da missão.',
			'Graças à dupla experiência de programador e de especialista DevOps, soube transmitir competências avançadas com muita pedagogia e clareza. O profissionalismo, o domínio técnico e a capacidade de se adaptar às necessidades do projeto foram trunfos importantes. Recomendo vivamente o Julien a quem procure um especialista DevOps fiável, competente e excelente pedagogo. Muito obrigado pelo teu trabalho!',
		],
	},
	{
		nome: 'Guillaume',
		cargo: 'Programador principal',
		empresa: 'DADOUN PERE ET FILS',
		original: [
			'Julien nous a beaucoup aidés sur nos sujets DevOps avec sérieux, efficacité et beaucoup de pédagogie.',
			"Il a tout de suite compris notre contexte, proposé des solutions adaptées, et nous a permis d’améliorer la stabilité et la fiabilité de notre plateforme. Les échanges ont toujours été simples, clairs et agréables.",
			'C’est quelqu’un de fiable, disponible et très compétent. Nous recommandons Julien sans hésitation, et retravaillerons avec lui avec plaisir.',
		],
		traducao: [
			'O Julien ajudou-nos muito nos nossos temas de DevOps, com seriedade, eficácia e muita pedagogia.',
			'Percebeu logo o nosso contexto, propôs soluções adaptadas e permitiu-nos melhorar a estabilidade e a fiabilidade da nossa plataforma. A comunicação foi sempre simples, clara e agradável.',
			'É alguém fiável, disponível e muito competente. Recomendamos o Julien sem hesitar e voltaremos a trabalhar com ele com todo o gosto.',
		],
	},
];

// ---------- Perguntas por público ----------
export type Publico = 'gerais' | 'cto' | 'ceo' | 'equipa';
export const publicos: { id: Publico; nome: string; curto: string; descricao: string }[] = [
	{ id: 'gerais', nome: 'Perguntas gerais', curto: 'Gerais', descricao: 'Para quem está a avaliar o serviço.' },
	{
		id: 'cto',
		nome: 'Para CTO',
		curto: 'CTO',
		descricao: 'Infraestrutura, CI/CD, testes, escala, fiabilidade, observabilidade e trabalho com a equipa.',
	},
	{
		id: 'ceo',
		nome: 'Para CEO',
		curto: 'CEO',
		descricao: 'Riscos, custos, continuidade, previsibilidade e impacto no negócio.',
	},
	{
		id: 'equipa',
		nome: 'Para a equipa técnica',
		curto: 'Equipa técnica',
		descricao: 'Devs e tech leads que vão trabalhar com a pipeline e a nova infraestrutura.',
	},
];

export type Pergunta = { p: string; r: string; estado: 'validado' | 'a-validar'; nota?: string };
export const perguntas: Record<Publico, Pergunta[]> = {
	gerais: [
		{
			p: 'O que fazes, exatamente?',
			r: 'Entrego a infraestrutura DevOps de que um SaaS precisa para crescer, em quatro blocos: pipeline de CI e auditoria de código, contentorização, infraestrutura escalável e observabilidade. Contratas os que quiseres, em qualquer combinação.',
			estado: 'validado',
		},
		{
			p: 'Quanto tempo demora?',
			r: 'No máximo 30 dias, para qualquer combinação de blocos, a contar do início da Implementação. O prazo exato vem na Proposta de intervenção.',
			estado: 'validado',
		},
		{
			p: 'Quanto custa?',
			r: 'Um preço fixo, que dou na Proposta de intervenção, depois do Diagnóstico gratuito.',
			estado: 'validado',
		},
		{
			p: 'Como começa?',
			r: 'Com uma Conversa de 45 min por Google Meet. Depois vêm o Diagnóstico gratuito, a Proposta de intervenção, a Implementação e a Entrega e transferência.',
			estado: 'validado',
		},
		{
			p: 'Posso contratar só alguns blocos?',
			r: 'Sim, em qualquer combinação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
			estado: 'validado',
		},
	],
	cto: [
		{
			p: 'Quem escreve os testes?',
			r: 'A tua equipa. Eu não escrevo testes: entrego o sistema que os corre, os mede e bloqueia o que está a vermelho.',
			estado: 'validado',
		},
		{
			p: 'É preciso parar o desenvolvimento?',
			r: 'Não. No bloco 1 não há migração nem risco para a produção. Nos blocos 2 e 3 o trabalho corre em paralelo (ramos, ambientes de teste, infraestrutura separada). Algumas alterações pedem coordenação com os devs, e no fim da migração pode ser preciso um curto período sem alterações ao código, combinado contigo.',
			estado: 'validado',
		},
		{
			p: 'Com que stack e clouds trabalhas?',
			r: 'CI: GitHub Actions, GitLab CI, Azure DevOps e Google Cloud Build. Cloud: AWS, Google Cloud, Microsoft Azure, OVHcloud, Scaleway e Infomaniak. A escolha depende das necessidades e do orçamento, e pode incluir um alojamento com menor impacto ambiental.',
			estado: 'validado',
		},
		{
			p: 'De que acessos precisas?',
			r: 'No Diagnóstico, acesso de leitura ao repositório. À cloud (métricas e logs) só se o problema for de infraestrutura, desempenho, custos ou disponibilidade. Nunca passwords, chaves privadas nem permissões de administrador. Na Implementação, preciso de acesso de escrita ao repositório e de uma conta na tua cloud com as permissões necessárias para criar a infraestrutura dos blocos contratados. Retiras esses acessos na Entrega e transferência.',
			estado: 'validado',
		},
		{
			p: 'Como funciona a Garantia de disponibilidade?',
			r: 'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá. Aplica-se com os blocos 3 e 4, e pede um teste escrito para cada bug corrigido, nenhum dev a passar à frente de um teste a vermelho, acesso de leitura ao repositório e uma pessoa técnica que responde em 48 h.',
			estado: 'validado',
		},
		{
			p: 'Que ferramentas usas na observabilidade?',
			r: 'Ferramentas standard, como Grafana e Prometheus, ou as da tua cloud.',
			estado: 'validado',
		},
		{
			p: 'Como trabalhamos juntos?',
			r: 'À distância, por Google Meet. Falo com o CTO e com os devs, sobretudo com o CTO.',
			estado: 'validado',
		},
	],
	ceo: [
		{
			p: 'Quanto vai custar, e quando fico a saber?',
			r: 'Um preço fixo, que dou na Proposta de intervenção. A Proposta vem depois do Diagnóstico gratuito, que demora 2 a 3 dias úteis a partir do momento em que tenho os acessos, ou 3 a 5 se incluir a cloud.',
			estado: 'validado',
		},
		{
			p: 'E os custos da infraestrutura?',
			r: 'Além do preço fixo, a infraestrutura e as ferramentas têm um custo mensal próprio, que pagas diretamente aos fornecedores, nas tuas contas. O serviço pressupõe um orçamento de 100 a 500 € por mês para estes custos.',
			estado: 'validado',
		},
		{
			p: 'Ficamos dependentes de ti?',
			r: 'Não. Uso só tecnologias standard e deixo tudo documentado. Mudas de prestador quando quiseres e nunca perdes a infraestrutura.',
			estado: 'validado',
		},
		{
			p: 'Que riscos há para a produção?',
			r: 'O bloco 1 não toca na produção. Nos blocos 2 e 3, o objetivo é evitar paragens; se a migração mexer em bases de dados ou serviços críticos, pode haver uma paragem curta, marcada antes. Há sempre um plano para voltar à versão anterior.',
			estado: 'validado',
		},
		{
			p: 'Que retorno posso esperar?',
			r: 'Menos tempo a corrigir problemas. Mais tempo a desenvolver o produto. Ajudo equipas SaaS a automatizar testes e entregas, detetar regressões mais cedo e melhorar a fiabilidade da infraestrutura, para que possam crescer com mais confiança.',
			estado: 'validado',
		},
		{
			p: 'Em que línguas e países trabalhas?',
			r: 'Com clientes de qualquer país, à distância, em português, francês ou inglês.',
			estado: 'validado',
		},
	],
	equipa: [
		{
			p: 'O que muda no dia a dia da equipa?',
			r: 'O objetivo é reduzir o tempo perdido em tarefas manuais e problemas recorrentes, facilitar a deteção de regressões e tornar as entregas mais fiáveis. A equipa ganha processos mais claros, maior visibilidade sobre a infraestrutura e mais tempo para se concentrar no desenvolvimento do produto. Os resultados dependem do contexto e do estado inicial de cada projeto.',
			estado: 'validado',
		},
		{
			p: 'Quem mantém a pipeline depois?',
			r: 'A tua equipa. A documentação técnica e a transferência no fim deixam-vos autónomos.',
			estado: 'validado',
		},
		{
			p: 'Com quem falas no dia a dia?',
			r: 'Com o CTO e com os devs, sobretudo com o CTO, por Google Meet. Não há ponto de situação regular.',
			estado: 'validado',
		},
		{
			p: 'Continuamos a programar durante a migração?',
			r: 'Sim. O trabalho corre em paralelo, em ramos, ambientes de teste e infraestrutura separada. No fim pode ser preciso um curto período sem alterações ao código, combinado convosco.',
			estado: 'validado',
		},
		{
			p: 'Que ferramentas vamos usar?',
			r: 'Bloco 1: SonarQube e Trivy. Bloco 2: Docker. Bloco 3: Kubernetes e Terraform. Bloco 4: Grafana e Prometheus, ou as ferramentas da vossa cloud.',
			estado: 'validado',
		},
	],
};

// ---------- Garantia ----------
// Pelo menos 99 % em cada mês, nos 3 meses seguintes à entrega. Sem equivalência anual
// (validado pelo Julien a 19/10/2026).
export const garantia = { pct: 99, meses: 3 };

// ---------- Fornecedores cloud ----------
export type Fornecedor = { id: string; nome: string; curto: string };
// Ordem alfabética, para não sugerir uma classificação.
export const fornecedores: Fornecedor[] = [
	{ id: 'aws', nome: 'AWS', curto: 'AWS' },
	{ id: 'gcp', nome: 'Google Cloud', curto: 'Google Cloud' },
	{ id: 'infomaniak', nome: 'Infomaniak', curto: 'Infomaniak' },
	{ id: 'azure', nome: 'Microsoft Azure', curto: 'Azure' },
	{ id: 'ovh', nome: 'OVHcloud', curto: 'OVHcloud' },
	{ id: 'scaleway', nome: 'Scaleway', curto: 'Scaleway' },
];

export type Criterio = { id: string; nome: string; tipo: 'facto' | 'opiniao'; explica: string };
export const criterios: Criterio[] = [
	{ id: 'k8s', nome: 'Kubernetes gerido', tipo: 'facto', explica: 'O fornecedor gere o cluster Kubernetes.' },
	{ id: 'serverless', nome: 'Contentores com escala automática', tipo: 'facto', explica: 'Corre contentores sem gerir servidores e escala com a carga.' },
	{ id: 'paas', nome: 'PaaS', tipo: 'facto', explica: 'Publica a aplicação a partir do código, sem montar infraestrutura.' },
	{ id: 'europa', nome: 'Sede na Europa', tipo: 'facto', explica: 'A empresa tem sede num país europeu.' },
	{ id: 'secnum', nome: 'Oferta SecNumCloud', tipo: 'facto', explica: 'Tem pelo menos uma oferta qualificada pela ANSSI.' },
	{ id: 'regioes', nome: 'Regiões na UE', tipo: 'facto', explica: 'Pelo menos duas regiões dentro da União Europeia; uma só conta como parcial.' },
	{
		id: 'custos',
		nome: 'Visibilidade e controlo dos custos',
		tipo: 'opiniao',
		explica:
			'Ferramentas do fornecedor para ver os custos (painel, divisão por projeto e por etiqueta, previsão) e para os controlar (alertas, tetos, ações automáticas).',
	},
];

export type Cenario = { id: string; nome: string; descricao: string; pesos: Record<string, number> };
// Pesos e limiares validados pelo Julien a 19/10/2026 («Que pesos e limiares usa o gráfico de
// fornecedores cloud?», #46). Antes de publicar, quem ficar a menos de 0,05 de um limiar volta ao Julien.
export const cenarios: Cenario[] = [
	{
		id: 'arranque',
		nome: 'Antes do lançamento',
		descricao: 'Equipa pequena, sem tempo para operar servidores.',
		pesos: { paas: 3, serverless: 2, custos: 2 },
	},
	{
		id: 'crescimento',
		nome: 'SaaS em crescimento',
		descricao: 'O produto já tem clientes e a equipa está a crescer.',
		pesos: { k8s: 2, serverless: 2, regioes: 1, custos: 1 },
	},
	{
		id: 'soberania',
		nome: 'Soberania dos dados',
		descricao: 'Os dados têm de ficar na UE, com um fornecedor europeu, ou o setor exige SecNumCloud.',
		pesos: { regioes: 3, europa: 2, secnum: 2 },
	},
	{
		id: 'picos',
		nome: 'Carga muito variável',
		descricao: 'Picos fortes e períodos calmos.',
		pesos: { serverless: 3, k8s: 2 },
	},
	{
		id: 'custos',
		nome: 'Custos sob controlo',
		descricao: 'Ver e controlar os custos de infraestrutura à medida que o SaaS cresce.',
		pesos: { custos: 3, paas: 1, serverless: 1 },
	},
];

/** Valor de um fornecedor num critério: 1 sim, 0.5 em parte, 0 não, null desconhecido. */
export type Celula = { v: 1 | 0.5 | 0 | null; estado: Estado; nota?: string };
// Factos: pesquisa «Que factos distinguem os fornecedores cloud para cada tipo de empresa?» (#45),
// consultada a 16/10/2026. «Visibilidade e controlo dos custos» é opinião do Julien (validada a 19/10/2026,
// #46): «sim» se ver e controlar estão completos, «em parte» se falta parte de um dos lados. Factos da pesquisa
// «Que ferramentas dão os fornecedores cloud para ver e controlar os custos?» (19/10/2026).
const f = (v: Celula['v'], nota?: string): Celula => ({ v, estado: 'publicado', nota });
const o = (v: Celula['v'], nota?: string): Celula => ({ v, estado: 'validado', nota });
export const matriz: Record<string, Record<string, Celula>> = {
	aws: {
		k8s: f(1, 'Amazon EKS'),
		serverless: f(1, 'AWS Fargate'),
		paas: f(1, 'Elastic Beanstalk (o App Runner fechou a novos clientes em 30/04/2026)'),
		europa: f(0, 'Sede em Seattle, EUA; oferta European Sovereign Cloud na Alemanha'),
		secnum: f(0, 'Não está no catálogo da ANSSI'),
		regioes: f(1, '6 regiões na UE'),
		custos: o(1, 'Cost Explorer por conta e etiqueta, com previsão; AWS Budgets com alertas e ações automáticas. Tráfego de saída pago depois de 100 GB/mês'),
	},
	gcp: {
		k8s: f(1, 'Google Kubernetes Engine (GKE)'),
		serverless: f(1, 'Cloud Run'),
		paas: f(1, 'Cloud Run a partir do código; App Engine'),
		europa: f(0, 'Sede em Mountain View, EUA'),
		secnum: f(0.5, 'Através da S3NS (Thales), qualificada desde 17/12/2025'),
		regioes: f(1, '11 regiões na UE'),
		custos: o(1, 'Billing Reports por projeto e etiqueta, com previsão; orçamentos com alertas e tetos que param alguns serviços. Tráfego de saída pago'),
	},
	infomaniak: {
		k8s: f(1, 'Kubernetes Service'),
		serverless: f(0.5, 'Sem serverless; o Jelastic Cloud escala contentores Docker'),
		paas: f(1, 'Jelastic Cloud (deploy por Git)'),
		europa: f(1, 'Sede em Genebra, Suíça (fora da UE)'),
		secnum: f(0, 'Não está no catálogo da ANSSI'),
		regioes: f(0, '0 regiões na UE; 2 na Suíça'),
		custos: o(0.5, 'Sem painel de custos documentado (só API) e sem alertas; quotas de recursos por projeto. Tráfego de saída incluído'),
	},
	azure: {
		k8s: f(1, 'Azure Kubernetes Service (AKS)'),
		serverless: f(1, 'Azure Container Apps'),
		paas: f(1, 'Azure App Service'),
		europa: f(0, 'Sede em Redmond, EUA; parceiros Bleu (França) e Delos (Alemanha)'),
		secnum: f(0, 'A Bleu está em qualificação; não qualificada'),
		regioes: f(1, '13 regiões na UE (2 de acesso restrito)'),
		custos: o(0.5, 'Cost Management por subscrição, recurso e etiqueta, com previsão; orçamentos só com alertas. Tráfego de saída pago depois de 100 GB/mês'),
	},
	ovh: {
		k8s: f(1, 'Managed Kubernetes Service'),
		serverless: f(0, 'Serverless «coming soon»'),
		paas: f(0, 'O Web PaaS fechou a 31/01/2025'),
		europa: f(1, 'Sede em Roubaix, França'),
		secnum: f(1, '3 ofertas IaaS qualificadas, incluindo a SNC Cloud Platform'),
		regioes: f(1, '7 regiões na UE'),
		custos: o(0.5, 'Consumo por projeto e por recurso, com previsão; etiquetas não encontradas; alerta sobre a previsão, sem limite. Tráfego de saída incluído'),
	},
	scaleway: {
		k8s: f(1, 'Kubernetes Kapsule'),
		serverless: f(1, 'Serverless Containers'),
		paas: f(0, 'Não encontrado; o mais próximo são as Serverless Functions'),
		europa: f(1, 'Sede em Paris, França'),
		secnum: f(0, 'Em qualificação; não qualificada'),
		regioes: f(1, '4 regiões na UE'),
		custos: o(0.5, 'Cost Manager por projeto e produto; etiquetas e previsão não encontradas; os alertas só avisam. Tráfego de saída incluído nas instâncias'),
	},
};

// ---------- Ecologia ----------
// A página não mostra dados ambientais dos fornecedores (validado pelo Julien a 19/10/2026,
// mantém a linha 20 de «Que informações do Julien entram nas secções?»). O estimador usa só
// dados por país e hipóteses visíveis. Método: emissões da eletricidade, location-based,
// com a intensidade de ciclo de vida da Ember (2025); sem market-based (não há dados contratuais).
export type Regiao = { id: string; nome: string; g: number; estado: Estado; ano?: string; fonte?: string };
const EMBER = 'https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv';
const r = (id: string, nome: string, g: number): Regiao => ({ id, nome, g, estado: 'publicado', ano: '2025', fonte: EMBER });
export const regioes: Regiao[] = [
	r('no', 'Noruega', 28.1),
	r('se', 'Suécia', 35.4),
	r('ch', 'Suíça', 39.1),
	r('fr', 'França', 41.2),
	r('fi', 'Finlândia', 57.2),
	r('dk', 'Dinamarca', 99.9),
	r('at', 'Áustria', 116.6),
	r('pt', 'Portugal', 127.8),
	r('be', 'Bélgica', 151.3),
	r('es', 'Espanha', 153.5),
	r('uk', 'Reino Unido', 218.2),
	r('nl', 'Países Baixos', 253.7),
	r('ie', 'Irlanda', 263.3),
	r('it', 'Itália', 284.4),
	r('de', 'Alemanha', 334.1),
	r('pl', 'Polónia', 590.8),
];

// Watts por vCPU com 0 % e 100 % de utilização: valores do Cloud Carbon Footprint para um
// processador desconhecido (commit f584c549ee). Usá-los para qualquer servidor é uma hipótese.
export const coeficientes = {
	wMin: 0.74,
	wMax: 3.5,
	nota: 'Cloud Carbon Footprint, processador desconhecido',
	fonte: 'https://www.cloudcarbonfootprint.org/docs/methodology/',
};
export const utilizacaoCcf = 50;
// Média anual do setor por centro de dados (Uptime Institute, inquérito de 2026), validada pelo
// Julien a 19/10/2026 em vez do 1,4 sem fonte. Ponderada pela capacidade, a média é 1,36.
const UPTIME = 'https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers';
export const pueSetor = 1.52;

export const fontesEco: { n: string; titulo: string; url: string }[] = [
	{ n: '1', titulo: 'Ember, produção de eletricidade anual por país (intensidade carbónica, 2025)', url: EMBER },
	{ n: '2', titulo: 'Cloud Carbon Footprint, metodologia', url: 'https://www.cloudcarbonfootprint.org/docs/methodology/' },
	{ n: '3', titulo: 'Uptime Institute, PUE médio do setor (inquérito de 2026)', url: UPTIME },
	{
		n: '4',
		titulo: 'Pesquisa «Que dados ambientais publicam os fornecedores cloud?» (16/10/2026)',
		url: 'https://github.com/juliensl/julien-devops-lp/blob/research/dados-ambientais-cloud/docs/research/dados-ambientais-cloud.md',
	},
];

export const fontesCloud: { n: string; titulo: string; url: string }[] = [
	{
		n: '1',
		titulo: 'Pesquisa «Que factos distinguem os fornecedores cloud para cada tipo de empresa?» (16/10/2026)',
		url: 'https://github.com/juliensl/julien-devops-lp/blob/research/factos-fornecedores-cloud/docs/research/factos-fornecedores-cloud.md',
	},
	{
		n: '2',
		titulo: 'ANSSI, catálogo de serviços qualificados (SecNumCloud), atualizado a 16/10/2026',
		url: 'https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf',
	},
	{
		n: '3',
		titulo: 'Pesquisa «Que ferramentas dão os fornecedores cloud para ver e controlar os custos?» (19/10/2026)',
		url: 'https://github.com/juliensl/julien-devops-lp/blob/research/custos-fornecedores-cloud/docs/research/custos-fornecedores-cloud.md',
	},
]
