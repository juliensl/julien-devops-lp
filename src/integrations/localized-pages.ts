// Cria as rotas das páginas finas de src/localized-pages/<língua>/, só para as línguas publicadas.
// O francês, Língua por defeito, fica sem prefixo:
//   src/localized-pages/fr/index.astro → /
//   src/localized-pages/pt/index.astro → /pt/
//   src/localized-pages/pt/questions.astro → /pt/questions/
// As páginas sem língua (a 404, por exemplo) ficam em src/pages/, como de costume.
// O Astro gera sempre todos os ficheiros de src/pages/, por isso as páginas com língua não podem ficar lá.
// Uma página nova só aparece no npm run dev depois de o reiniciar.
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { PHASE, PREFIXES } from '../config/site';

export default function localizedPages(): AstroIntegration {
	return {
		name: 'localized-pages',
		hooks: {
			'astro:config:setup': ({ config, injectRoute }) => {
				const pagesDir = fileURLToPath(new URL('src/localized-pages/', config.root));
				for (const language of PHASE.publishedLanguages) {
					for (const file of globSync('**/*.astro', { cwd: `${pagesDir}${language}` })) {
						const page = file.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
						injectRoute({
							pattern: `${PREFIXES[language]}${page}`,
							entrypoint: `${pagesDir}${language}/${file}`,
						});
					}
				}
			},
		},
	};
}
