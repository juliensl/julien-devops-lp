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
// Valores publicados: pesquisa «Que dados ambientais publicam os fornecedores cloud?» (#44),
// consultada a 16/10/2026. Nenhum valor é uma classificação.
export type ValorEco = { valor: number | null; texto?: string; ano?: string; ambito?: string; fonte?: string; estado: Estado; nota?: string };
export type MetricaEco = {
	id: string;
	nome: string;
	unidade: string;
	tipo: 'numero' | 'texto';
	min?: number;
	max?: number;
	marcas?: number[];
	explica: string;
	aviso: string;
};
export const metricasEco: MetricaEco[] = [
	{
		id: 'pue',
		nome: 'PUE',
		unidade: '',
		tipo: 'numero',
		min: 1,
		max: 1.5,
		marcas: [1, 1.1, 1.2, 1.3, 1.4, 1.5],
		explica: 'Energia total do centro de dados a dividir pela energia dos servidores. 1,0 seria o ideal.',
		aviso: 'Cada fornecedor conta centros diferentes (só os próprios, os geridos ou todos os usados) e o ano não é o mesmo.',
	},
	{
		id: 'renovavel',
		nome: 'Eletricidade renovável',
		unidade: '%',
		tipo: 'numero',
		min: 0,
		max: 100,
		marcas: [0, 25, 50, 75, 100],
		explica: 'Parte da eletricidade coberta por fontes renováveis, segundo o método de cada fornecedor.',
		aviso: 'Quase todos dizem 100 %, com métodos diferentes. A correspondência anual não garante renovável a cada hora: medida hora a hora, a Google fica nos 65 %.',
	},
	{
		id: 'agua',
		nome: 'Água (WUE)',
		unidade: 'L/kWh',
		tipo: 'numero',
		min: 0,
		max: 0.4,
		marcas: [0, 0.1, 0.2, 0.3, 0.4],
		explica: 'Litros de água por kWh consumido pelos servidores.',
		aviso: 'Uns contam a água retirada, outros só a de arrefecimento; os anos também mudam.',
	},
	{
		id: 'emissoes',
		nome: 'Emissões publicadas',
		unidade: '',
		tipo: 'texto',
		explica: 'O que cada fornecedor publica sobre as suas emissões de gases com efeito de estufa.',
		aviso: 'A AWS, a Google e a Microsoft só publicam o total da empresa inteira. Um total maior não diz nada sobre a pegada de cada cliente.',
	},
	{
		id: 'ferramenta',
		nome: 'Ferramenta para clientes',
		unidade: '',
		tipo: 'texto',
		explica: 'Ferramenta onde o cliente vê a pegada da sua própria infraestrutura.',
		aviso: 'Os métodos e os âmbitos das ferramentas são diferentes entre si.',
	},
];

const F = {
	aws: 'https://sustainability.aboutamazon.com/2025-aws-summary.pdf',
	awsRen: 'https://sustainability.aboutamazon.com/2025-renewable-energy-assurance.pdf',
	awsRel: 'https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf',
	awsFer: 'https://docs.aws.amazon.com/sustainability/latest/userguide/',
	gcp: 'https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf',
	gcpFer: 'https://cloud.google.com/carbon-footprint/docs/methodology',
	azure: 'https://aka.ms/SustainabilityReport2026',
	azureFicha: 'https://aka.ms/SustainabilityFactsheet2026',
	azureFer: 'https://learn.microsoft.com/en-us/azure/carbon-optimization/view-emissions',
	ovh: 'https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf',
	ovhFer: 'https://corporate.ovhcloud.com/sites/default/files/2025-10/methodology_-_environmental_impact_tracker.pdf',
	scw: 'https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf',
	scwRen: 'https://www.scaleway.com/en/environmental-leadership/',
	scwFer: 'https://www.scaleway.com/en/docs/environmental-footprint/additional-content/environmental-footprint-calculator/',
	ik: 'https://www.infomaniak.com/en/impact-report',
	ikRel: 'https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf',
	ikGee: 'https://news.infomaniak.com/wp-content/uploads/2026/10/Bilan_gaz_a_effet_de_serre_2024.pdf',
	ikFer: 'https://www.infomaniak.com/en/support/faq/1160/discover-eco-design-to-reduce-your-carbon-footprint',
	clever: 'https://www.clever.cloud/cloud-and-green-it/',
};
const pb = (valor: number | null, ano: string, ambito: string, fonte: string, nota?: string): ValorEco => ({
	valor,
	ano,
	ambito,
	fonte,
	nota,
	estado: 'publicado',
});
const tx = (texto: string, fonte?: string, ano?: string): ValorEco => ({ valor: null, texto, fonte, ano, estado: 'publicado' });

export const dadosEco: Record<string, Record<string, ValorEco>> = {
	aws: {
		pue: pb(1.14, '2025', 'Centros da AWS, global', F.aws, 'Na Europa: 1,11'),
		renovavel: pb(100, '2025', 'Toda a Amazon, não só a AWS', F.awsRen, 'Correspondência anual em volume'),
		agua: pb(0.12, '2025', 'Centros da AWS, global; água retirada', F.aws, 'Na Europa: 0,05'),
		emissoes: tx('Só o total da Amazon: 80,85 Mt CO2e (market-based). Scope 2: 21,82 Mt location-based contra 3,74 Mt market-based.', F.awsRel, '2025'),
		ferramenta: tx('AWS Sustainability console: por região, serviço e conta.', F.awsFer, '2026'),
	},
	clever: {
		pue: { valor: null, texto: '«<1,2» em alguns centros, sem dizer quais', fonte: F.clever, estado: 'publicado', nota: 'Sem ano nem método: não comparável' },
		renovavel: { valor: null, estado: 'publicado', texto: 'Sem percentagem publicada', fonte: F.clever },
		agua: { valor: null, estado: 'publicado', texto: 'Não encontrado' },
		emissoes: tx('Não publicado.'),
		ferramenta: tx('Nenhuma encontrada.'),
	},
	gcp: {
		pue: pb(1.09, '2025', 'Campus geridos pela Google, global', F.gcp),
		renovavel: pb(100, '2025', 'Toda a Google', F.gcp, 'Correspondência anual; hora a hora (CFE): 65 %'),
		agua: { valor: null, estado: 'publicado', texto: 'WUE de 2025 não publicado (só o consumo total)', fonte: F.gcp },
		emissoes: tx('Só o total da Alphabet: 18,85 Mt CO2e (scope 2 market-based). Scope 2: 15,15 Mt location-based contra 2,82 Mt market-based.', F.gcp, '2025'),
		ferramenta: tx('Google Cloud Carbon Footprint: por projeto, serviço e região.', F.gcpFer, '2026'),
	},
	infomaniak: {
		pue: pb(1.085, '2024', 'Centros próprios em Genebra', F.ik),
		renovavel: pb(100, '2024', 'Infomaniak', F.ikRel, 'Produtos certificados do distribuidor (SIG) e solar própria'),
		agua: pb(0.0145, '2023', 'Infomaniak', F.ikRel),
		emissoes: tx('Total: 2 124,8 t CO2e (myclimate, ISO 14069).', F.ikGee, '2024'),
		ferramenta: tx('CO2 anual na fatura, só para alojamento web e email.', F.ikFer, '2024'),
	},
	azure: {
		pue: pb(1.17, 'FY2025 (jul. 2024 a jun. 2025)', 'Centros próprios da Microsoft, global', F.azure, 'Na EMEA: 1,16'),
		renovavel: pb(100, 'FY2025', 'Toda a Microsoft', F.azureFicha, 'Renovável «direta» anual, sem certificados avulsos; 78 % em FY2024'),
		agua: pb(0.27, 'FY2025', 'Centros próprios, global; água de arrefecimento e humidificação', F.azure, 'Na EMEA: 0,03'),
		emissoes: tx('Só o total da Microsoft: 21,12 Mt CO2e (scope 2 market-based).', F.azureFicha, 'FY2025'),
		ferramenta: tx('Azure carbon optimization: por subscrição, recurso e região.', F.azureFer, '2026'),
	},
	ovh: {
		pue: pb(1.24, 'FY2025 (set. 2024 a ago. 2025)', '9 centros geridos pela OVHcloud', F.ovh),
		renovavel: pb(100, 'FY2025', 'Centros geridos pela OVHcloud', F.ovh, 'ISO/IEC 30134-3: PPA e certificados; 92 % em FY2024'),
		agua: pb(0.34, 'FY2025', 'Centros geridos; toda a água retirada conta como consumida', F.ovh),
		emissoes: tx('Total do grupo: 112 863 t CO2e market-based ou 158 748 t location-based.', F.ovh, 'FY2025'),
		ferramenta: tx('Environmental Impact Tracker: mensal, por servidor.', F.ovhFer, '2026'),
	},
	scaleway: {
		pue: pb(1.375, '2024', 'Todos os centros usados, incluindo os de terceiros', F.scw),
		renovavel: pb(100, '2024', 'Energia dos centros de dados', F.scwRen, 'Garantias de origem; PPA não contados'),
		agua: pb(0.222, '2024', 'Média de 4 centros franceses e AMS1', F.scw),
		emissoes: tx('Total: 18 284 t CO2e, só location-based.', F.scw, '2024'),
		ferramenta: tx('Environmental Footprint Calculator: diário, por projeto e zona.', F.scwFer, '2026'),
	},
};

export type Regiao = { id: string; nome: string; g: number; estado: Estado; ano?: string; fonte?: string };
// Intensidade carbónica média da produção de eletricidade (gCO2e/kWh, ciclo de vida), Ember, 2025.
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
	r('be', 'Bélgica', 151.3),
	r('es', 'Espanha', 153.5),
	r('uk', 'Reino Unido', 218.2),
	r('nl', 'Países Baixos', 253.7),
	r('ie', 'Irlanda', 263.3),
	r('it', 'Itália', 284.4),
	r('de', 'Alemanha', 334.1),
	r('pl', 'Polónia', 590.8),
];

// Países onde cada fornecedor tem regiões (pesquisa #45).
export const paisesFornecedor: Record<string, string[]> = {
	aws: ['de', 'ie', 'it', 'fr', 'es', 'se', 'uk', 'ch'],
	clever: ['fr', 'pl', 'uk'],
	gcp: ['fi', 'se', 'pl', 'es', 'be', 'de', 'nl', 'it', 'fr', 'uk', 'ch'],
	infomaniak: ['ch'],
	azure: ['at', 'be', 'dk', 'fr', 'de', 'it', 'ie', 'pl', 'es', 'se', 'nl', 'no', 'ch', 'uk'],
	ovh: ['fr', 'de', 'it', 'pl', 'uk'],
	scaleway: ['fr', 'nl', 'pl', 'it'],
};

// Watts por vCPU com 0 % e 100 % de utilização: código do Cloud Carbon Footprint (commit f584c549ee).
// O CCF só tem valores para a AWS, a Google Cloud e o Azure; os outros usam os da AWS, como hipótese.
const CCF = 'https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/tree/f584c549ee/packages';
export type Coef = { wMin: number; wMax: number; estado: Estado; nota: string; fonte?: string };
export const coeficientesCcf: Record<string, Coef> = {
	aws: { wMin: 0.74, wMax: 3.5, estado: 'publicado', nota: 'CCF, AWS, processador desconhecido', fonte: `${CCF}/aws` },
	gcp: { wMin: 0.68, wMax: 4.11, estado: 'publicado', nota: 'CCF, Google Cloud, processador desconhecido', fonte: `${CCF}/gcp` },
	azure: { wMin: 0.74, wMax: 3.54, estado: 'publicado', nota: 'CCF, Azure, processador desconhecido', fonte: `${CCF}/azure` },
};
export const coeficientePadrao: Coef = {
	wMin: 0.74,
	wMax: 3.5,
	estado: 'hipotese',
	nota: 'O CCF não tem valores para este fornecedor: usa os da AWS',
};
export const utilizacaoCcf = 50;

export const fontesEco: { n: string; titulo: string; url: string }[] = [
	{
		n: '1',
		titulo: 'Pesquisa «Que dados ambientais publicam os fornecedores cloud?» (16/10/2026), com todas as fontes',
		url: 'https://github.com/juliensl/julien-devops-lp/blob/research/dados-ambientais-cloud/docs/research/dados-ambientais-cloud.md',
	},
	{ n: '2', titulo: 'Ember, produção de eletricidade anual por país (intensidade carbónica, 2025)', url: EMBER },
	{ n: '3', titulo: 'Cloud Carbon Footprint, metodologia', url: 'https://www.cloudcarbonfootprint.org/docs/methodology/' },
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
