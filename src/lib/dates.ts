import { HTML_CODES, type Language } from '../config/site';

/** A day given as YYYY-MM-DD, as the language writes a date: "13 nov. 2026" in French. */
export function dayText(day: string, language: Language): string {
	return new Intl.DateTimeFormat(HTML_CODES[language], {
		dateStyle: 'medium',
		timeZone: 'UTC',
	}).format(new Date(day));
}

/** The days some sources were read, each once, from the earliest: "2 nov. 2026, 13 nov. 2026". */
export function readDays(sources: { read: string }[], language: Language): string {
	return [...new Set(sources.map(({ read }) => read))]
		.sort()
		.map((day) => dayText(day, language))
		.join(', ');
}
