// PROTÓTIPO v2 · Os três temas e as ligações entre vistas.
import type { P, Pagina, Modo } from './dados';

export type Tema = {
	p: P;
	nome: string;
	resumo: string;
	fontes: { nome: string; uso: string; kb: number }[];
	fundo: string;
	cores: { nome: string; hex: string; sobre?: string; fundo?: boolean }[];
	decisoes: string[];
};

export const temas: Tema[] = [
	{
		p: 1,
		nome: 'Noite com pontos',
		resumo: 'Evolução da A: ameixa e lilás, com o verde como segunda cor estrutural e pontos em movimento.',
		fontes: [
			{ nome: 'Bona Nova', uso: 'títulos', kb: 26.9 },
			{ nome: 'Inter', uso: 'texto, dados e interface', kb: 48.3 },
		],
		fundo: '#18121f',
		cores: [
			{ nome: 'Fundo ameixa', hex: '#18121f' },
			{ nome: 'Superfície verde', hex: '#13261f', fundo: true },
			{ nome: 'Texto', hex: '#f1ebe4' },
			{ nome: 'Texto secundário', hex: '#b4a9bf' },
			{ nome: 'Lilás (ações)', hex: '#c3a6ff' },
			{ nome: 'Verde', hex: '#8ccfa6' },
		],
		decisoes: [
			'Grelha de 12 colunas: o Hero divide-se entre a Promessa e os 30 dias desenhados em pontos.',
			'Serviços como uma pipeline horizontal: os 4 blocos ligados por uma linha de pontos em movimento.',
			'Garantia num ano de 12 quadrados de 100 pontos (cada ponto é 1 % de um mês).',
			'Sem animação de pull request: o movimento vem só dos pontos.',
		],
	},
	{
		p: 2,
		nome: 'Painel aberto',
		resumo: 'Evolução da B: cartões numa grelha de tamanhos variados que ocupa a largura toda, sobre a paleta da A.',
		fontes: [
			{ nome: 'Bona Nova', uso: 'títulos', kb: 26.9 },
			{ nome: 'Instrument Sans', uso: 'texto, dados e interface', kb: 30.1 },
		],
		fundo: '#1a1422',
		cores: [
			{ nome: 'Fundo', hex: '#1a1422' },
			{ nome: 'Cartão', hex: '#262033', fundo: true },
			{ nome: 'Texto', hex: '#f3eef6' },
			{ nome: 'Texto secundário', hex: '#bcb1c8' },
			{ nome: 'Lilás (ações)', hex: '#c9b2ff' },
			{ nome: 'Verde', hex: '#92d6ad' },
		],
		decisoes: [
			'Hero em duas metades: a Promessa e o pull request do bloco 1, que corre uma vez e se pode repetir.',
			'Serviços numa grelha de cartões de tamanhos diferentes, com os mini-diagramas melhorados (só animam quando estão à vista).',
			'As 5 etapas numa linha horizontal de cartões.',
			'Garantia com o ano numa linha de 12 meses.',
		],
	},
	{
		p: 3,
		nome: 'Estratos verdes',
		resumo: 'Verde como identidade: floresta escura, linhas de contorno e os serviços como camadas de uma infraestrutura.',
		fontes: [
			{ nome: 'Bona Nova', uso: 'títulos', kb: 26.9 },
			{ nome: 'Geist', uso: 'texto, dados e interface', kb: 29.4 },
		],
		fundo: '#0d1f19',
		cores: [
			{ nome: 'Fundo floresta', hex: '#0d1f19' },
			{ nome: 'Musgo', hex: '#163126', fundo: true },
			{ nome: 'Texto', hex: '#eaf3ee' },
			{ nome: 'Texto secundário', hex: '#a9c2b5' },
			{ nome: 'Menta (ações)', hex: '#8fe0b0' },
			{ nome: 'Lilás (acento)', hex: '#c7b2ff' },
		],
		decisoes: [
			'Título do Hero em toda a largura, sobre linhas de contorno.',
			'Os 4 blocos como camadas empilhadas que se abrem (código, contentores, infraestrutura, observação).',
			'Garantia por trimestres, com o período de 3 meses destacado.',
			'O verde é estrutural (fundos, superfícies, gráficos) e o lilás fica como acento.',
		],
	},
];

export const nomesPagina: Record<Pagina, string> = {
	inicio: 'Página principal',
	ecologia: 'Ecologia',
	perguntas: 'Perguntas',
};

/** Ligação para uma vista ou uma secção, nas rotas do Astro ou no modo de uma só página (hash). */
export function ligacao(modo: Modo, p: P, pagina: Pagina, seccao?: string): string {
	const ancora = seccao ? `p${p}-${seccao}` : '';
	if (modo === 'hash') return '#' + (ancora || (pagina === 'inicio' ? `p${p}` : `p${p}-${pagina}`));
	const base = `/prototipo/v2/${p}/` + (pagina === 'inicio' ? '' : `${pagina}/`);
	return base + (ancora ? `#${ancora}` : '');
}

export const idVista = (p: P, pagina: Pagina) => (pagina === 'inicio' ? `p${p}` : `p${p}-${pagina}`);
