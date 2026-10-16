// PROTÓTIPO DESCARTÁVEL v2 do ticket «Qual a direção visual?» (#8).
// Fica no ramo prototipo/direcao-visual-v2 e nunca entra na main.
// Textos validados vêm do protótipo v1; o resto está marcado com o seu estado.
export {
	calendly,
	textos,
	problemas,
	depois,
	paraQuem,
	blocos,
	notaBlocos,
	rodape,
	contraste,
} from '../prototipo-direcao-visual/conteudo';

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

// ---------- Navegação ----------
export const seccoes = [
	{ id: 'servicos', nome: 'Serviços' },
	{ id: 'garantia', nome: 'Garantia' },
	{ id: 'cloud', nome: 'Cloud' },
	{ id: 'quem', nome: 'Quem é o Julien' },
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
			nota: 'A Clever Cloud, que aparece no gráfico, não está nesta lista validada.',
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
			r: 'Ferramentas standard ou as da tua cloud.',
			estado: 'a-validar',
			nota: 'Falta saber se se nomeiam Grafana e Prometheus.',
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
			r: 'Resposta a definir com o Julien.',
			estado: 'a-validar',
			nota: 'Os números do pitch (custos de suporte, testes manuais) não foram validados para publicação. Não inventar valores.',
		},
		{
			p: 'Em que línguas e países trabalhas?',
			r: 'Com clientes de qualquer país, à distância, em português, francês ou inglês.',
			estado: 'validado',
		},
	],
	equipa: [
		{
			p: 'Vamos ter de mudar a forma como trabalhamos?',
			r: 'A pipeline bloqueia o que está a vermelho, e ninguém passa à frente de um teste a falhar. Com a Garantia, cada bug corrigido leva um teste.',
			estado: 'a-validar',
			nota: 'As regras vêm das condições da Garantia; falta o Julien dizer o que muda no dia a dia sem ela.',
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
			r: 'Bloco 1: SonarQube e Trivy. Bloco 2: Docker. Bloco 3: Kubernetes e Terraform. Bloco 4: ferramentas standard ou as da vossa cloud.',
			estado: 'validado',
		},
	],
};

// ---------- Garantia ----------
export const garantia = {
	pct: 99,
	mesesGarantia: 3,
	// 1 % de um mês médio (30,4375 dias) ≈ 7 h 18 min; 12 × isso ≈ 3 dias e 15 h.
	porMes: '7 h 18 min',
	porAno: '3 dias e 15 h',
	questao:
		'A Garantia validada é mensal e dura 3 meses. O valor anual é só uma equivalência (12 × o máximo de cada mês). Para o publicar como referência, o Julien tem de dizer se a Garantia passa a 12 meses ou se o ano aparece só como leitura.',
};

// ---------- Fornecedores cloud ----------
export type Fornecedor = { id: string; nome: string; curto: string };
// Ordem alfabética, para não sugerir uma classificação.
export const fornecedores: Fornecedor[] = [
	{ id: 'aws', nome: 'AWS', curto: 'AWS' },
	{ id: 'clever', nome: 'Clever Cloud', curto: 'Clever Cloud' },
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
	{ id: 'catalogo', nome: 'Catálogo de serviços geridos', tipo: 'opiniao', explica: 'Amplitude dos serviços geridos (bases de dados, filas, IA…).' },
	{ id: 'fatura', nome: 'Fatura previsível', tipo: 'opiniao', explica: 'Facilidade em prever a fatura mensal.' },
];

export type Cenario = { id: string; nome: string; descricao: string; pesos: Record<string, number> };
// Pesos: opinião a validar pelo Julien.
export const cenarios: Cenario[] = [
	{
		id: 'arranque',
		nome: 'Antes do lançamento',
		descricao: 'Equipa pequena, sem tempo para operar servidores.',
		pesos: { paas: 3, serverless: 2, fatura: 2, catalogo: 1 },
	},
	{
		id: 'crescimento',
		nome: 'SaaS em crescimento',
		descricao: 'De centenas para milhares de utilizadores, com uma equipa de 5 a 20 pessoas.',
		pesos: { k8s: 2, serverless: 2, catalogo: 2, regioes: 1, fatura: 1 },
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
		pesos: { serverless: 3, k8s: 2, catalogo: 1 },
	},
	{
		id: 'complexa',
		nome: 'Muitos serviços geridos',
		descricao: 'Arquitetura com bases de dados, filas, pesquisa e IA geridas.',
		pesos: { catalogo: 3, k8s: 2, regioes: 1 },
	},
	{
		id: 'orcamento',
		nome: 'Orçamento previsível',
		descricao: 'A fatura mensal tem de ser fácil de prever.',
		pesos: { fatura: 3, paas: 1, serverless: 1 },
	},
];

/** Valor de um fornecedor num critério: 1 sim, 0.5 em parte, 0 não, null desconhecido. */
export type Celula = { v: 1 | 0.5 | 0 | null; estado: Estado; nota?: string };
// Factos: pesquisa «Que factos distinguem os fornecedores cloud para cada tipo de empresa?» (#45),
// consultada a 16/10/2026. Catálogo e fatura são opinião, a validar pelo Julien.
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
		catalogo: o(1),
		fatura: o(0, 'Facto relacionado: 100 GB/mês de saída grátis, depois 0,09 USD/GB'),
	},
	clever: {
		k8s: f(0.5, 'Clever Kubernetes Engine, em beta pública'),
		serverless: f(1, 'Aplicações Docker com escala automática'),
		paas: f(1, 'Deploy por git push (produto principal)'),
		europa: f(1, 'Sede em Nantes, França'),
		secnum: f(0.5, 'Própria em curso; zona na Cloud Temple (qualificada) a pedido'),
		regioes: f(1, '8 zonas na UE (7 em França e Varsóvia), várias em datacenters de outros fornecedores'),
		catalogo: o(0.5),
		fatura: o(0.5, 'Facto relacionado: sem taxa de saída nas aplicações; sem preço fixo mensal'),
	},
	gcp: {
		k8s: f(1, 'Google Kubernetes Engine (GKE)'),
		serverless: f(1, 'Cloud Run'),
		paas: f(1, 'Cloud Run a partir do código; App Engine'),
		europa: f(0, 'Sede em Mountain View, EUA'),
		secnum: f(0.5, 'Através da S3NS (Thales), qualificada desde 17/12/2025'),
		regioes: f(1, '11 regiões na UE'),
		catalogo: o(1),
		fatura: o(0, 'Facto relacionado: sem saída grátis a partir da Europa no escalão predefinido'),
	},
	infomaniak: {
		k8s: f(1, 'Kubernetes Service'),
		serverless: f(0.5, 'Sem serverless; o Jelastic Cloud escala contentores Docker'),
		paas: f(1, 'Jelastic Cloud (deploy por Git)'),
		europa: f(1, 'Sede em Genebra, Suíça (fora da UE)'),
		secnum: f(0, 'Não está no catálogo da ANSSI'),
		regioes: f(0, '0 regiões na UE; 2 na Suíça'),
		catalogo: o(0, 'Facto relacionado: PostgreSQL gerido ainda «available soon»'),
		fatura: o(1, 'Facto relacionado: tráfego de saída incluído; VPS a preço fixo'),
	},
	azure: {
		k8s: f(1, 'Azure Kubernetes Service (AKS)'),
		serverless: f(1, 'Azure Container Apps'),
		paas: f(1, 'Azure App Service'),
		europa: f(0, 'Sede em Redmond, EUA; parceiros Bleu (França) e Delos (Alemanha)'),
		secnum: f(0, 'A Bleu está em qualificação; não qualificada'),
		regioes: f(1, '13 regiões na UE (2 de acesso restrito)'),
		catalogo: o(1),
		fatura: o(0, 'Facto relacionado: 100 GB/mês de saída grátis, depois 0,087 USD/GB'),
	},
	ovh: {
		k8s: f(1, 'Managed Kubernetes Service'),
		serverless: f(0, 'Serverless «coming soon»'),
		paas: f(0, 'O Web PaaS fechou a 31/01/2025'),
		europa: f(1, 'Sede em Roubaix, França'),
		secnum: f(1, '3 ofertas IaaS qualificadas, incluindo a SNC Cloud Platform'),
		regioes: f(1, '7 regiões na UE'),
		catalogo: o(0.5),
		fatura: o(1, 'Facto relacionado: tráfego de saída incluído; VPS a preço fixo'),
	},
	scaleway: {
		k8s: f(1, 'Kubernetes Kapsule'),
		serverless: f(1, 'Serverless Containers'),
		paas: f(0, 'Não encontrado; o mais próximo são as Serverless Functions'),
		europa: f(1, 'Sede em Paris, França'),
		secnum: f(0, 'Em qualificação; não qualificada'),
		regioes: f(1, '4 regiões na UE'),
		catalogo: o(0.5),
		fatura: o(1, 'Facto relacionado: tráfego de saída incluído nas instâncias'),
	},
};

// ---------- Ecologia ----------
export type ValorEco = { valor: number | null; texto?: string; ano?: number; ambito?: string; fonte?: string; estado: Estado; nota?: string };
export type MetricaEco = { id: string; nome: string; unidade: string; melhor: 'menor' | 'maior' | null; explica: string; aviso: string };
export const metricasEco: MetricaEco[] = [
	{
		id: 'pue',
		nome: 'PUE',
		unidade: '',
		melhor: 'menor',
		explica: 'Energia total do centro de dados a dividir pela energia dos servidores. 1,0 seria o ideal.',
		aviso: 'Âmbitos diferentes: média da frota, de uma região ou de um centro de dados; anos diferentes.',
	},
	{
		id: 'renovavel',
		nome: 'Eletricidade renovável',
		unidade: '%',
		melhor: 'maior',
		explica: 'Parte da eletricidade coberta por fontes renováveis, segundo o método de cada fornecedor.',
		aviso: 'Métodos diferentes: correspondência anual por certificados não é o mesmo que correspondência hora a hora.',
	},
];

// DEMONSTRAÇÃO até chegar a pesquisa «Que dados ambientais publicam os fornecedores cloud?» (#44).
const de = (valor: number | null): ValorEco => ({ valor, estado: 'demo' });
export const dadosEco: Record<string, Record<string, ValorEco>> = {
	aws: { pue: de(1.2), renovavel: de(100) },
	clever: { pue: de(null), renovavel: de(null) },
	gcp: { pue: de(1.1), renovavel: de(64) },
	infomaniak: { pue: de(1.1), renovavel: de(100) },
	azure: { pue: de(1.2), renovavel: de(100) },
	ovh: { pue: de(1.3), renovavel: de(80) },
	scaleway: { pue: de(1.3), renovavel: de(100) },
};

export type Regiao = { id: string; nome: string; g: number; estado: Estado; ano?: number; fonte?: string };
// gCO2e/kWh: DEMONSTRAÇÃO até à pesquisa #44.
export const regioes: Regiao[] = [
	{ id: 'fr', nome: 'França', g: 50, estado: 'demo' },
	{ id: 'se', nome: 'Suécia', g: 40, estado: 'demo' },
	{ id: 'ch', nome: 'Suíça', g: 40, estado: 'demo' },
	{ id: 'es', nome: 'Espanha', g: 150, estado: 'demo' },
	{ id: 'be', nome: 'Bélgica', g: 150, estado: 'demo' },
	{ id: 'it', nome: 'Itália', g: 300, estado: 'demo' },
	{ id: 'ie', nome: 'Irlanda', g: 300, estado: 'demo' },
	{ id: 'nl', nome: 'Países Baixos', g: 300, estado: 'demo' },
	{ id: 'de', nome: 'Alemanha', g: 350, estado: 'demo' },
	{ id: 'pl', nome: 'Polónia', g: 650, estado: 'demo' },
];

// Coeficientes do estimador (W por vCPU com 0 % e 100 % de utilização). DEMONSTRAÇÃO até à pesquisa #44.
export const coeficientes = { wMin: 0.7, wMax: 3.5, estado: 'demo' as Estado, fonte: '', pueDefeito: 1.4 };

export const fontesEco: { n: string; titulo: string; url: string }[] = [];
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
