// The legal pages (#71, #54 «Páginas legais»): the Legal information and the Privacy policy, in
// Markdown, one folder per language: src/content/legal/<language>/<legal|privacy>.md (id `pt/legal`).
// `LegalPage.astro` fails the build when a published language lacks one.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
	loader: glob({ pattern: '*/{legal,privacy}.md', base: './src/content/legal' }),
	schema: z.object({
		/** The page's title (#54), also the footer link's text. */
		title: z.string().trim().min(1),
		description: z.string().trim().min(1),
	}),
});

export const collections = { legal };
