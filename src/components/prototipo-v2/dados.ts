// PROTÓTIPO DESCARTÁVEL v2 do ticket «Qual a direção visual?» (#8).
// Fica no ramo prototipo/direcao-visual-v2 e nunca entra na main.
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
			r: 'No Diagnóstico, acesso de leitura ao repositório. À cloud (métricas e logs) só se o problema for de infraestrutura, desempenho, custos ou disponibilidade. Nunca passwords, chaves privadas nem permissões de administrador.',
			estado: 'validado',
			nota: 'A Implementação pede mais acessos; quais exatamente fica por validar.',
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
			r: 'Um preço fixo, dado na Proposta de intervenção, depois do Diagnóstico gratuito. Não há preço por hora.',
			estado: 'a-validar',
			nota: '«Não há preço por hora» é uma dedução do preço fixo; o resto está validado.',
		},
		{
			p: 'E os custos da infraestrutura?',
			r: 'Os serviços e a infraestrutura têm um custo mensal próprio, pago ao fornecedor cloud. O serviço não é para quem recusa 100 a 500 € por mês nesses custos.',
			estado: 'a-validar',
			nota: 'Os 100 a 500 €/mês estão validados como exclusão; esta formulação para CEO não.',
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
			r: 'Menos tempo a corrigir problemas. Mais tempo a desenvolver o produto. Ajudamos equipas SaaS a automatizar testes e entregas, detetar regressões mais cedo e melhorar a fiabilidade da infraestrutura, para que possam crescer com mais confiança.',
			estado: 'validado',
			nota: 'Texto do Julien. Falta confirmar «Ajudamos»: o resto da página fala na primeira pessoa do singular.',
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
	{ id: 'paas', nome: 'PaaS simples', tipo: 'facto', explica: 'Publica a aplicação a partir do código, sem montar infraestrutura.' },
	{ id: 'europa', nome: 'Sede na Europa', tipo: 'facto', explica: 'A empresa tem sede num país europeu.' },
	{ id: 'secnum', nome: 'Oferta SecNumCloud', tipo: 'facto', explica: 'Tem pelo menos uma oferta qualificada pela ANSSI.' },
	{ id: 'regioes', nome: 'Regiões na UE', tipo: 'facto', explica: 'Pelo menos duas regiões dentro da União Europeia; uma só conta como parcial.' },
	{
		id: 'custos',
		nome: 'Visibilidade e controlo dos custos',
		tipo: 'opiniao',
		explica: 'Ferramentas e modelo de preços que ajudam a ver e a controlar os custos de infraestrutura.',
	},
];

export type Cenario = { id: string; nome: string; descricao: string; pesos: Record<string, number> };
// Pesos e limiares: proposta, a validar pelo Julien antes de o gráfico servir de comparação.
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
		descricao: 'De centenas para milhares de utilizadores, com uma equipa de 5 a 20 pessoas.',
		pesos: { k8s: 2, serverless: 2, regioes: 1, custos: 1 },
	},
	{
		id: 'dados-ue',
		nome: 'Dados na UE',
		descricao: 'Os dados têm de ficar na União Europeia, ou o setor é regulado.',
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
// consultada a 16/10/2026. «Visibilidade e controlo dos custos» é opinião, a validar pelo Julien.
const f = (v: Celula['v'], nota?: string): Celula => ({ v, estado: 'publicado', nota });
const o = (v: Celula['v'], nota?: string): Celula => ({ v, estado: 'a-validar', nota });
export const matriz: Record<string, Record<string, Celula>> = {
	aws: {
		k8s: f(1, 'Amazon EKS'),
		serverless: f(1, 'AWS Fargate'),
		paas: f(1, 'Elastic Beanstalk (o App Runner fechou a novos clientes em 30/04/2026)'),
		europa: f(0, 'Sede em Seattle, EUA; oferta European Sovereign Cloud na Alemanha'),
		secnum: f(0, 'Não está no catálogo da ANSSI'),
		regioes: f(1, '6 regiões na UE'),
		custos: o(0.5, 'Factos relacionados: AWS Budgets com alertas e ações; saída paga depois de 100 GB/mês'),
	},
	gcp: {
		k8s: f(1, 'Google Kubernetes Engine (GKE)'),
		serverless: f(1, 'Cloud Run'),
		paas: f(1, 'Cloud Run a partir do código; App Engine'),
		europa: f(0, 'Sede em Mountain View, EUA'),
		secnum: f(0.5, 'Através da S3NS (Thales), qualificada desde 17/12/2025'),
		regioes: f(1, '11 regiões na UE'),
		custos: o(0.5, 'Factos relacionados: orçamentos com alertas e tetos que param alguns serviços; saída paga'),
	},
	infomaniak: {
		k8s: f(1, 'Kubernetes Service'),
		serverless: f(0.5, 'Sem serverless; o Jelastic Cloud escala contentores Docker'),
		paas: f(1, 'Jelastic Cloud (deploy por Git)'),
		europa: f(1, 'Sede em Genebra, Suíça (fora da UE)'),
		secnum: f(0, 'Não está no catálogo da ANSSI'),
		regioes: f(0, '0 regiões na UE; 2 na Suíça'),
		custos: o(1, 'Factos relacionados: quotas por projeto; tráfego de saída incluído; VPS a preço fixo'),
	},
	azure: {
		k8s: f(1, 'Azure Kubernetes Service (AKS)'),
		serverless: f(1, 'Azure Container Apps'),
		paas: f(1, 'Azure App Service'),
		europa: f(0, 'Sede em Redmond, EUA; parceiros Bleu (França) e Delos (Alemanha)'),
		secnum: f(0, 'A Bleu está em qualificação; não qualificada'),
		regioes: f(1, '13 regiões na UE (2 de acesso restrito)'),
		custos: o(0.5, 'Factos relacionados: orçamentos só com alertas; saída paga depois de 100 GB/mês'),
	},
	ovh: {
		k8s: f(1, 'Managed Kubernetes Service'),
		serverless: f(0, 'Serverless «coming soon»'),
		paas: f(0, 'O Web PaaS fechou a 31/01/2025'),
		europa: f(1, 'Sede em Roubaix, França'),
		secnum: f(1, '3 ofertas IaaS qualificadas, incluindo a SNC Cloud Platform'),
		regioes: f(1, '7 regiões na UE'),
		custos: o(1, 'Factos relacionados: alerta de previsão de consumo; tráfego de saída incluído; VPS a preço fixo'),
	},
	scaleway: {
		k8s: f(1, 'Kubernetes Kapsule'),
		serverless: f(1, 'Serverless Containers'),
		paas: f(0, 'Não encontrado; o mais próximo são as Serverless Functions'),
		europa: f(1, 'Sede em Paris, França'),
		secnum: f(0, 'Em qualificação; não qualificada'),
		regioes: f(1, '4 regiões na UE'),
		custos: o(1, 'Factos relacionados: alertas de faturação; tráfego de saída incluído nas instâncias'),
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
export const pueExemplo = 1.4;

export const fontesEco: { n: string; titulo: string; url: string }[] = [
	{ n: '1', titulo: 'Ember, produção de eletricidade anual por país (intensidade carbónica, 2025)', url: EMBER },
	{ n: '2', titulo: 'Cloud Carbon Footprint, metodologia', url: 'https://www.cloudcarbonfootprint.org/docs/methodology/' },
	{
		n: '3',
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
]
