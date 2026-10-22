// Cria as rotas das páginas finas de src/paginas/<língua>/, só para as línguas que este build gera.
// O francês, Língua por defeito, fica sem prefixo:
//   src/paginas/fr/index.astro → /
//   src/paginas/pt/index.astro → /pt/
//   src/paginas/pt/questions.astro → /pt/questions/
// As páginas sem língua (a 404, por exemplo) ficam em src/pages/, como de costume.
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { LINGUAS_GERADAS, PREFIXOS } from '../config/site';

export default function paginasPorLingua(): AstroIntegration {
	return {
		name: 'paginas-por-lingua',
		hooks: {
			'astro:config:setup': ({ config, injectRoute }) => {
				const raiz = fileURLToPath(new URL('src/paginas/', config.root));
				for (const lingua of LINGUAS_GERADAS) {
					for (const ficheiro of globSync('**/*.astro', { cwd: `${raiz}${lingua}` })) {
						const pagina = ficheiro.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
						injectRoute({
							pattern: `${PREFIXOS[lingua]}${pagina}`,
							entrypoint: `${raiz}${lingua}/${ficheiro}`,
						});
					}
				}
			},
		},
	};
}
