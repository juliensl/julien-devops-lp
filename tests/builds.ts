// Os dois builds que a suite verifica, e as páginas que cada um gerou.
import { existsSync, globSync } from 'node:fs';
import { test } from '@playwright/test';
import { FASE_ATUAL, LANCAMENTO_COMERCIAL, type Fase } from '../src/config/site.ts';
import { LINGUAS, type Lingua } from './expected.ts';

export const BUILDS = [
	{ nome: 'publicado', dist: 'dist', porta: 4331, fase: FASE_ATUAL, comando: 'npm run build' },
	{
		nome: 'Lançamento comercial',
		dist: 'dist-lancamento',
		porta: 4332,
		fase: LANCAMENTO_COMERCIAL,
		comando: 'npm run build:lancamento',
	},
] satisfies { nome: string; dist: string; porta: number; fase: Fase; comando: string }[];

export type Build = (typeof BUILDS)[number];

/** Declara os testes uma vez por build, cada um no seu servidor. */
export function emCadaBuild(testes: (build: Build) => void) {
	for (const build of BUILDS) {
		test.describe(`build ${build.nome}`, () => {
			test.use({ baseURL: `http://localhost:${build.porta}` });
			testes(build);
		});
	}
}

export interface Pagina {
	caminho: string;
	/** A língua, pelo início do caminho. As páginas de erro (`/404.html`) não têm. */
	lingua?: Lingua;
}

/** Todas as páginas HTML do build: `pt/index.html` → `/pt/`. */
export function paginas(build: Build): Pagina[] {
	if (!existsSync(build.dist)) {
		throw new Error(`Falta a pasta ${build.dist}. Corre primeiro «${build.comando}».`);
	}
	return paginasDe(build.dist);
}

/** Todas as páginas HTML de uma pasta, como se fosse um build. */
export function paginasDe(pasta: string): Pagina[] {
	return globSync('**/*.html', { cwd: pasta })
		.map((ficheiro) => `/${ficheiro.replace(/(^|\/)index\.html$/, '$1')}`)
		.sort()
		.map((caminho) => ({ caminho, lingua: caminho.endsWith('/') ? linguaDe(caminho) : undefined }));
}

/** O francês não tem prefixo: é a língua de tudo o que não começa por outra. */
function linguaDe(caminho: string): Lingua {
	const outras = (Object.keys(LINGUAS) as Lingua[]).filter((l) => LINGUAS[l].inicio !== '/');
	return outras.find((l) => caminho.startsWith(LINGUAS[l].inicio)) ?? 'fr';
}
