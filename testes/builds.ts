// Os dois builds que a suite verifica, e as páginas que cada um gerou.
import { existsSync, globSync } from 'node:fs';
import { LINGUAS, LINGUAS_PUBLICADAS } from '../src/config/site';

export const BUILDS = [
	{
		nome: 'publicado',
		dist: 'dist',
		porta: 4331,
		linguas: LINGUAS_PUBLICADAS,
		comando: 'npm run build',
	},
	{
		nome: 'três línguas',
		dist: 'dist-tres-linguas',
		porta: 4332,
		linguas: LINGUAS,
		comando: 'npm run build:tres-linguas',
	},
] as const;

export type Build = (typeof BUILDS)[number];

/** Os caminhos de todas as páginas HTML do build: `pt/index.html` → `/pt/`. */
export function paginas(build: Build): string[] {
	if (!existsSync(build.dist)) {
		throw new Error(`Falta a pasta ${build.dist}. Corre primeiro «${build.comando}».`);
	}
	return globSync('**/*.html', { cwd: build.dist })
		.map((ficheiro) => `/${ficheiro.replace(/(^|\/)index\.html$/, '$1')}`)
		.sort();
}
