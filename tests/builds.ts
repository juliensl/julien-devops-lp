// Os dois builds que a suite verifica, e as páginas que cada um gerou.
import { existsSync, globSync } from 'node:fs';
import { test } from '@playwright/test';
import { CURRENT_PHASE, COMMERCIAL_LAUNCH, type Phase } from '../src/config/site.ts';
import { LANGUAGES, type Language } from './expected.ts';

export const BUILDS = [
	{ name: 'publicado', dist: 'dist', port: 4331, phase: CURRENT_PHASE, command: 'npm run build' },
	{
		name: 'Lançamento comercial',
		dist: 'dist-lancamento',
		port: 4332,
		phase: COMMERCIAL_LAUNCH,
		command: 'npm run build:lancamento',
	},
] satisfies { name: string; dist: string; port: number; phase: Phase; command: string }[];

export type Build = (typeof BUILDS)[number];

/** Declara os testes uma vez por build, cada um no seu servidor. */
export function inEachBuild(tests: (build: Build) => void) {
	for (const build of BUILDS) {
		test.describe(`build ${build.name}`, () => {
			test.use({ baseURL: `http://localhost:${build.port}` });
			tests(build);
		});
	}
}

export interface SitePage {
	path: string;
	/** A língua, pelo início do caminho. As páginas de erro (`/404.html`) não têm. */
	language?: Language;
}

/** Todas as páginas HTML do build: `pt/index.html` → `/pt/`. */
export function pagesOf(build: Build): SitePage[] {
	if (!existsSync(build.dist)) {
		throw new Error(`Falta a pasta ${build.dist}. Corre primeiro «${build.command}».`);
	}
	return pagesIn(build.dist);
}

/** Todas as páginas HTML de uma pasta, como se fosse um build. */
export function pagesIn(folder: string): SitePage[] {
	return globSync('**/*.html', { cwd: folder })
		.map((file) => `/${file.replace(/(^|\/)index\.html$/, '$1')}`)
		.sort()
		.map((path) => ({ path, language: path.endsWith('/') ? languageOf(path) : undefined }));
}

/** O francês não tem prefixo: é a língua de tudo o que não começa por outra. */
function languageOf(path: string): Language {
	const others = (Object.keys(LANGUAGES) as Language[]).filter((l) => LANGUAGES[l].prefix !== '/');
	return others.find((l) => path.startsWith(LANGUAGES[l].prefix)) ?? 'fr';
}
