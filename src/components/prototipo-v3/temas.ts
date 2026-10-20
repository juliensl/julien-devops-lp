// PROTÓTIPO v3 · As três variantes de cor (A, B, C) sobre a estrutura do protótipo 3,
// e as ligações entre vistas. Internamente as variantes são 1, 2 e 3 (ids p1, p2, p3).
import type { P, Pagina, Modo } from './dados';

export type Tema = {
	p: P;
	letra: 'A' | 'B' | 'C';
	nome: string;
	resumo: string;
	fontes: { nome: string; uso: string; kb: number }[];
	fundo: string;
	cores: { nome: string; hex: string; sobre?: string; fundo?: boolean }[];
	decisoes: string[];
};

const fontes = [
	{ nome: 'Bona Nova', uso: 'títulos', kb: 26.9 },
	{ nome: 'Geist', uso: 'texto, dados e interface', kb: 29.4 },
];

export const temas: Tema[] = [
	{
		p: 1,
		letra: 'A',
		nome: 'Escuro',
		resumo: 'A direção escolhida pelo Julien: fundo escuro e sombreado, com o roxo e o verde como cores complementares.',
		fontes,
		fundo: '#0e0c12',
		cores: [
			{ nome: 'Fundo escuro', hex: '#0e0c12' },
			{ nome: 'Superfície', hex: '#17141f', fundo: true },
			{ nome: 'Faixa «Quem é o Julien»', hex: '#0b1511', fundo: true },
			{ nome: 'Texto', hex: '#f2eef7' },
			{ nome: 'Texto secundário', hex: '#b3aac2' },
			{ nome: 'Roxo (ações)', hex: '#c3a6ff' },
			{ nome: 'Verde (etiquetas e dados)', hex: '#86d9a8' },
		],
		decisoes: [
			'Fundo quase preto, sombreado com um brilho roxo e um verde (escolhido a 20/10/2026; saem B e C).',
			'Botões roxos; etiquetas, dados e Garantia a verde.',
			'Pontos do topo a roxo e a verde.',
			'Faixa «Quem é o Julien» num verde quase preto, para não destoar.',
			'Hero: ∞ de pontos do qual sai um ramo que desce até ao CTA final.',
		],
	},
	{
		p: 2,
		letra: 'B',
		nome: 'Roxo',
		resumo: 'Fundo roxo, com mais elementos verdes: botões, etiquetas, dados e pontos a verde.',
		fontes,
		fundo: '#2a1745',
		cores: [
			{ nome: 'Fundo roxo', hex: '#2a1745' },
			{ nome: 'Roxo mais claro', hex: '#331d52', fundo: true },
			{ nome: 'Texto', hex: '#f6f1ff' },
			{ nome: 'Texto secundário', hex: '#d2c6e8' },
			{ nome: 'Verde (ações e dados)', hex: '#8fe3b0' },
			{ nome: 'Lilás (acento)', hex: '#dccbff' },
		],
		decisoes: [
			'Fundo roxo em toda a página, com faixas um pouco mais claras.',
			'O verde passa a ser a cor das ações: botões, etiquetas, dados e pontos.',
			'Lilás claro só como acento.',
		],
	},
	{
		p: 3,
		letra: 'C',
		nome: 'Verde',
		resumo: 'Fundo verde, com bastantes elementos roxos: botões, etiquetas, dados e pontos a lilás.',
		fontes,
		fundo: '#0f2c22',
		cores: [
			{ nome: 'Fundo verde', hex: '#0f2c22' },
			{ nome: 'Verde mais claro', hex: '#143628', fundo: true },
			{ nome: 'Faixa roxa', hex: '#2a2147', fundo: true },
			{ nome: 'Texto', hex: '#effaf4' },
			{ nome: 'Texto secundário', hex: '#bcd6c9' },
			{ nome: 'Lilás (ações e dados)', hex: '#d2bdff' },
			{ nome: 'Verde claro (acento)', hex: '#93e3b5' },
		],
		decisoes: [
			'Fundo verde em toda a página, com uma faixa roxa em «Quem é o Julien».',
			'O roxo passa a ser a cor das ações: botões, etiquetas, dados e pontos.',
			'Verde claro só como acento.',
		],
	},
];

export const letras: Record<P, 'a' | 'b' | 'c'> = { 1: 'a', 2: 'b', 3: 'c' };

export const nomesPagina: Record<Pagina, string> = {
	inicio: 'Página principal',
	ecologia: 'Ecologia',
	perguntas: 'Perguntas',
};

/** Ligação para uma vista ou uma secção, nas rotas do Astro ou no modo de uma só página (hash). */
export function ligacao(modo: Modo, p: P, pagina: Pagina, seccao?: string): string {
	const ancora = seccao ? `p${p}-${seccao}` : '';
	if (modo === 'hash') return '#' + (ancora || (pagina === 'inicio' ? `p${p}` : `p${p}-${pagina}`));
	const base = `/prototipo/v3/${letras[p]}/` + (pagina === 'inicio' ? '' : `${pagina}/`);
	return base + (ancora ? `#${ancora}` : '');
}

export const idVista = (p: P, pagina: Pagina) => (pagina === 'inicio' ? `p${p}` : `p${p}-${pagina}`);
