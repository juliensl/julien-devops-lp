// Creates the routes for the thin pages in src/localized-pages/<language>/, only for the published languages.
// French, the Default language, has no prefix:
//   src/localized-pages/fr/index.astro → /
//   src/localized-pages/pt/index.astro → /pt/
//   src/localized-pages/pt/questions.astro → /pt/questions/
// Pages without a language (the 404, for example) live in src/pages/, as usual.
// Astro always generates every file in src/pages/, so pages with a language cannot live there.
// A new page only shows up in `npm run dev` after restarting it.
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
