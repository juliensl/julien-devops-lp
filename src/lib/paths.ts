import { PREFIXES, type Language } from '../config/site';

/**
 * The same page in another language. Slugs are the same in all three languages, so only the start
 * changes: `/pt/questions/` → `/questions/` in French and `/en/questions/` in English.
 */
export function pathInLanguage(path: string, from: Language, to: Language): string {
	if (!path.startsWith(PREFIXES[from])) {
		throw new Error(
			`The path ${path} does not start with ${PREFIXES[from]}, the start of language ${from}.`,
		);
	}
	return PREFIXES[to] + path.slice(PREFIXES[from].length);
}
