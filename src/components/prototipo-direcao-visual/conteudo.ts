// PROTÓTIPO DESCARTÁVEL do ticket «Qual a direção visual?» (#8). Fica no ramo
// prototipo/direcao-visual e nunca entra na main. Textos provisórios, a partir
// das decisões já validadas pelo Julien; os níveis do gráfico são fictícios.

export const calendly = 'https://calendly.com/contact-julienlaffont/appel-cadrage';

export const textos = {
	designacao: 'Consultor DevOps freelance para SaaS',
	promessa:
		'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.',
	subPromessa:
		'Os bugs são apanhados no pull request, não pelo teu cliente. E os teus devs voltam a programar em vez de fazer suporte.',
	cta: 'Marcar uma conversa',
	notaCta: 'Conversa de 45 min por Google Meet, gratuita.',
	notaLingua:
		'A página de marcação está em francês. A conversa pode ser em português, francês ou inglês.',
	garantia:
		'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá.',
	garantiaCondicao: 'Aplica-se quando contratas os blocos 3 e 4.',
	quem: 'Sou o Julien Laffont, consultor DevOps freelance para SaaS. Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
	finalTitulo: 'Nunca perdes a infraestrutura.',
	finalTexto:
		'Mesmo que a tua equipa não avance logo com os testes, ficas com uma pipeline limpa, documentada e com os standards do mercado, pronta para quando decidires.',
	fotoAlt: 'Julien Laffont, sorridente, numa esplanada com o portátil',
};

export const factos = ['No máximo 30 dias', 'Diagnóstico gratuito', 'Disponibilidade de pelo menos 99 %'];

export const problemas = [
	{ titulo: 'Uma funcionalidade parte outra.', texto: 'A regressão passou a ser normal, e é o cliente que a descobre.' },
	{ titulo: 'Os devs fazem suporte.', texto: 'Respondem a tickets em vez de programar.' },
	{ titulo: 'Os testes fazem-se à mão.', texto: 'Dias inteiros, por quem não tem essa função.' },
	{ titulo: 'Ninguém sabe se aguenta.', texto: 'Funciona com os clientes de hoje. Com muitos mais, ninguém sabe dizer.' },
];

export const depois = [
	'Os bugs são apanhados no pull request, não pelo cliente.',
	'Os devs recuperam os dias que passavam em suporte.',
	'A equipa cresce sem medo de que um júnior parta a produção.',
	'Acrescentas funcionalidades sem partir outras.',
];

export const paraQuem = [
	'SaaS web ou mobile já lançado',
	'Equipa de 5 a 20 pessoas, com pelo menos 3 devs',
	'A passar de centenas para milhares de utilizadores',
];

export const blocos = [
	{
		n: 1,
		nome: 'Pipeline de CI e auditoria de código',
		texto: 'Cada alteração passa por testes, lint e análise de segurança antes de chegar à produção. O que está a vermelho não passa.',
		ferramentas: ['SonarQube', 'Trivy'],
	},
	{
		n: 2,
		nome: 'Contentorização',
		texto: 'A aplicação deixa de depender do ambiente onde corre. No portátil de um dev ou em produção, o mesmo comportamento.',
		ferramentas: ['Docker'],
	},
	{
		n: 3,
		nome: 'Infraestrutura escalável',
		texto: 'Acompanha a carga: serverless de contentores para volumes médios, Kubernetes quando a carga o justifica. Fica descrita em código e pode ser recriada.',
		ferramentas: ['Kubernetes', 'Terraform'],
	},
	{
		n: 4,
		nome: 'Observabilidade',
		texto: 'Um painel de saúde em tempo real e um alerta imediato quando há um incidente.',
		ferramentas: ['Ferramentas standard ou as da tua cloud'],
	},
];

export const notaBlocos =
	'Contratas os blocos que quiseres, em qualquer combinação. No máximo 30 dias, a contar do início da Implementação.';

export type Nivel = 1 | 2 | 3;
export const niveis: Record<Nivel, string> = { 3: 'Especialista', 2: 'Avançado', 1: 'Intermédio' };

export type Ferramenta = { nome: string; nivel: Nivel; aConfirmar?: boolean };
export const stack: { area: string; bloco: number; ferramentas: Ferramenta[] }[] = [
	{ area: 'Qualidade e segurança', bloco: 1, ferramentas: [{ nome: 'SonarQube', nivel: 3 }, { nome: 'Trivy', nivel: 2 }] },
	{
		area: 'CI',
		bloco: 1,
		ferramentas: [
			{ nome: 'GitHub Actions', nivel: 3 },
			{ nome: 'GitLab CI', nivel: 3 },
			{ nome: 'Azure DevOps', nivel: 2 },
			{ nome: 'Google Cloud Build', nivel: 1 },
		],
	},
	{ area: 'Contentores', bloco: 2, ferramentas: [{ nome: 'Docker', nivel: 3 }] },
	{ area: 'Infraestrutura', bloco: 3, ferramentas: [{ nome: 'Kubernetes', nivel: 3 }, { nome: 'Terraform', nivel: 2 }] },
	{
		area: 'Cloud',
		bloco: 3,
		ferramentas: [
			{ nome: 'AWS', nivel: 3 },
			{ nome: 'Google Cloud', nivel: 2 },
			{ nome: 'Microsoft Azure', nivel: 2 },
			{ nome: 'OVHcloud', nivel: 2 },
			{ nome: 'Scaleway', nivel: 2 },
			{ nome: 'Infomaniak', nivel: 1 },
		],
	},
	{
		area: 'Observabilidade',
		bloco: 4,
		ferramentas: [
			{ nome: 'Grafana', nivel: 3, aConfirmar: true },
			{ nome: 'Prometheus', nivel: 2, aConfirmar: true },
		],
	},
];

export const notaStack =
	'Níveis fictícios, só para mostrar o gráfico. O Julien indica os reais. Grafana e Prometheus ainda não estão confirmados.';

// Cursor A: o que quer dizer cada percentagem de disponibilidade (cálculo, num mês médio).
export const disponibilidades = [95, 97, 98, 99, 99.5, 99.9, 99.95, 99.99];

// Cursor B: afirmações novas, a validar pelo Julien.
export type Estado = 'Essencial' | 'Recomendado' | 'Pode esperar';
export const escalas: { nome: string; sinal: string; blocos: Estado[] }[] = [
	{
		nome: 'Antes do lançamento',
		sinal: 'Ainda dá para testar à mão. É o momento mais barato para criar o hábito.',
		blocos: ['Recomendado', 'Recomendado', 'Pode esperar', 'Pode esperar'],
	},
	{
		nome: 'Dezenas de utilizadores',
		sinal: 'Cada publicação depende de quem a faz. Os primeiros bugs chegam pelos clientes.',
		blocos: ['Essencial', 'Recomendado', 'Pode esperar', 'Recomendado'],
	},
	{
		nome: 'Centenas de utilizadores',
		sinal: 'Uma funcionalidade parte outra e os devs começam a fazer suporte.',
		blocos: ['Essencial', 'Essencial', 'Recomendado', 'Recomendado'],
	},
	{
		nome: 'Milhares de utilizadores',
		sinal: 'Os picos de carga deitam a aplicação abaixo e cada incidente custa clientes.',
		blocos: ['Essencial', 'Essencial', 'Essencial', 'Essencial'],
	},
];

export const faq = [
	{
		p: 'Quem escreve os testes?',
		r: 'A tua equipa. Eu não escrevo testes: entrego o sistema que os corre, os mede e bloqueia o que está a vermelho.',
	},
	{
		p: 'É preciso parar o desenvolvimento?',
		r: 'Não. No bloco 1 não há migração nem risco para a produção. Nos blocos 2 e 3 o trabalho corre em paralelo, e no fim da migração pode ser preciso um curto período sem alterações ao código, combinado contigo.',
	},
	{
		p: 'Posso contratar só alguns blocos?',
		r: 'Sim, em qualquer combinação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
	},
];

export const rodape = {
	marca: 'Julien Laffont EI',
	email: 'email no domínio (a definir)',
	ligacoes: ['LinkedIn', 'Informação legal', 'Política de privacidade'],
};

// Ficha de cada direção, mostrada pela barra do protótipo.
const lum = (hex: string) => {
	const c = hex
		.replace('#', '')
		.match(/../g)!
		.map((x) => parseInt(x, 16) / 255)
		.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const contraste = (a: string, b: string) => {
	const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
	return (x + 0.05) / (y + 0.05);
};

export type Direcao = {
	letra: 'a' | 'b' | 'c';
	nome: string;
	fontes: { nome: string; uso: string; kb: number }[];
	fundo: string;
	cores: { nome: string; hex: string; sobre?: string; fundo?: boolean }[];
	nomeTratamento: string;
	cursor: string;
	grafico: string;
	topo: string;
	estrutura: string;
};

export const direcoes: Direcao[] = [
	{
		letra: 'a',
		nome: 'Editorial noturno',
		fontes: [
			{ nome: 'Instrument Serif', uso: 'títulos', kb: 21.0 },
			{ nome: 'Geist', uso: 'texto', kb: 29.4 },
		],
		fundo: '#18121f',
		cores: [
			{ nome: 'Fundo ameixa', hex: '#18121f' },
			{ nome: 'Texto', hex: '#f1ebe4' },
			{ nome: 'Texto secundário', hex: '#b4a9bf' },
			{ nome: 'Lilás (ações)', hex: '#c3a6ff' },
			{ nome: 'Verde-salva', hex: '#8ccfa6' },
		],
		nomeTratamento: 'Moldura em pílula à volta de «Laffont».',
		cursor: 'Disponibilidade: de 95 % a 99,99 %, mostra a paragem máxima por mês. Marca nos 99 % da Garantia.',
		grafico: 'Barras horizontais, nomes legíveis à esquerda.',
		topo: 'Grelha de pontos fixa, como a da Arkoder.',
		estrutura: 'Uma coluna central, títulos grandes, Método em lista.',
	},
	{
		letra: 'b',
		nome: 'Painel acolhedor',
		fontes: [
			{ nome: 'Fraunces (eixo SOFT)', uso: 'títulos', kb: 62.4 },
			{ nome: 'Instrument Sans', uso: 'texto', kb: 30.1 },
		],
		fundo: '#141729',
		cores: [
			{ nome: 'Fundo azul-violeta', hex: '#141729' },
			{ nome: 'Texto', hex: '#eceaf6' },
			{ nome: 'Texto secundário', hex: '#a6a8c3' },
			{ nome: 'Violeta (texto)', hex: '#b89bfb' },
			{ nome: 'Violeta (botão)', hex: '#7a55e0', sobre: '#ffffff' },
			{ nome: 'Verde', hex: '#5cc493' },
		],
		nomeTratamento: 'O J e o L em caixinhas arredondadas.',
		cursor: 'Escala do SaaS, em palavras: o que costuma partir e que bloco resolve. Afirmações a validar.',
		grafico: 'Barras verticais agrupadas, como na Expertise By Me, com os nomes na horizontal.',
		topo: 'Riscas finas fixas.',
		estrutura: 'Grelha de cartões; os 4 blocos com mini-diagramas animados.',
	},
	{
		letra: 'c',
		nome: 'Faixas ao entardecer',
		fontes: [
			{ nome: 'Bona Nova', uso: 'títulos', kb: 26.9 },
			{ nome: 'Inter', uso: 'texto', kb: 48.3 },
		],
		fundo: '#1e1528',
		cores: [
			{ nome: 'Fundo roxo', hex: '#1e1528' },
			{ nome: 'Faixa verde-escura', hex: '#11271f', fundo: true },
			{ nome: 'Texto', hex: '#f4eff8' },
			{ nome: 'Texto secundário', hex: '#c0b4cd' },
			{ nome: 'Lilás (ações)', hex: '#d2b6ff' },
			{ nome: 'Verde', hex: '#97d6b0' },
		],
		nomeTratamento: 'Cantos arredondados em «Jul» e «ont», como as molduras da Expertise By Me.',
		cursor: 'Escolha de blocos, como os add-ons da Axiom: prazo e se a Garantia se aplica (só regras já validadas).',
		grafico: 'Barras verticais com filtro por bloco.',
		topo: 'Nenhum, para comparar.',
		estrutura: 'Faixas largas: título à esquerda, conteúdo à direita.',
	},
];
