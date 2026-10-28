// Writes sitemap.xml and robots.txt at the end of the build (#54, "SEO").
// The sitemap lists the pages that may be indexed, those without noindex in the generated HTML. That way
// the 404 (always noindex) and the First review pages stay out without a rule of their own.
// The hreflang links live only in the HTML, not in the sitemap.
// robots.txt blocks nothing: Google has to crawl the pages to see the noindex.
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { SITE } from '../config/site';

/** The meta tag that Base.astro puts on the pages that are not indexed. */
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
