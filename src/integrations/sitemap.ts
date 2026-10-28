// Escreve o sitemap.xml e o robots.txt no fim do build (#54, «SEO»).
// O sitemap lista as páginas que se deixam indexar, as que não têm noindex no HTML gerado. Assim, a 404
// (sempre com noindex) e as páginas da Primeira validação ficam de fora sem uma regra própria.
// As hreflang ficam só no HTML, e não no sitemap.
// O robots.txt não bloqueia nada: o Google tem de rastrear as páginas para ver o noindex.
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { SITE } from '../config/site';

/** A meta tag que o Base.astro põe nas páginas que não se indexam. */
const NOINDEX = /<meta name="robots" content="[^"]*\bnoindex\b/;

export default function sitemap(): AstroIntegration {
	return {
		name: 'sitemap',
		hooks: {
			'astro:build:done': ({ dir }) => {
				const outDir = fileURLToPath(dir);
				const urls = globSync('**/*.html', { cwd: outDir })
					.filter((file) => !NOINDEX.test(readFileSync(join(outDir, file), 'utf8')))
					.map((file) => new URL(file.replace(/(^|\/)index\.html$/, '$1'), SITE).href)
					.sort();

				const xml = [
					'<?xml version="1.0" encoding="UTF-8"?>',
					'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
					...urls.map((url) => `\t<url><loc>${url}</loc></url>`),
					'</urlset>',
				];
				writeFileSync(join(outDir, 'sitemap.xml'), `${xml.join('\n')}\n`);

				const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE}/sitemap.xml`];
				writeFileSync(join(outDir, 'robots.txt'), `${robots.join('\n')}\n`);
			},
		},
	};
}
