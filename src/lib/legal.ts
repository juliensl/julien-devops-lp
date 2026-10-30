import { getEntry } from 'astro:content';
import type { Language } from '../config/site';

/** The two legal pages (#71): the Legal information and the Privacy policy. */
export const LEGAL_PAGES = ['legal', 'privacy'] as const;
export type LegalPageId = (typeof LEGAL_PAGES)[number];

/** A legal page in a language, from src/content/legal/. Without its Markdown file, the build fails. */
export async function legalPage(language: Language, page: LegalPageId) {
	const entry = await getEntry('legal', `${language}/${page}`);
	if (!entry) {
		throw new Error(
			`Missing src/content/legal/${language}/${page}.md: every legal page exists in all three languages (#71).`,
		);
	}
	return entry;
}
