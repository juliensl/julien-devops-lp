// Cria as rotas das páginas finas de src/paginas/<língua>/, só para as línguas publicadas.
// O francês, Língua por defeito, fica sem prefixo:
//   src/paginas/fr/index.astro → /
//   src/paginas/pt/index.astro → /pt/
//   src/paginas/pt/questions.astro → /pt/questions/
// As páginas sem língua (a 404, por exemplo) ficam em src/pages/, como de costume.
// O Astro gera sempre todos os ficheiros de src/pages/, por isso as páginas com língua não podem ficar lá.
// Uma página nova só aparece no npm run dev depois de o reiniciar.
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { FASE, PREFIXOS } from '../config/site';

export default function paginasPorLingua(): AstroIntegration {
	return {
		name: 'paginas-por-lingua',
		hooks: {
			'astro:config:setup': ({ config, injectRoute }) => {
				const raiz = fileURLToPath(new URL('src/paginas/', config.root));
				for (const lingua of FASE.linguasPublicadas) {
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
