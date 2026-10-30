import { getEntry } from 'astro:content';
import { HTML_CODES, type Language } from '../config/site';
import { values } from '../config/values';
import { withNonBreakingSpaces } from './spaces';

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

/** `{email}`, `{legal.siret}`, `{hosting.address}`: a path in the shared values. */
const PLACEHOLDER = /\{([a-z]+(?:\.[a-z]+)*)\}/gi;

/**
 * A legal page's HTML with the shared values in place of its placeholders, in the page's language:
 * an address ends with its country's name, the email is a `mailto:` link and the phones `tel:` links.
 * A `null` value (the VAT number until it is active) removes its list item or paragraph, and an unknown
 * placeholder fails the build. The text also gets its non-breaking spaces.
 */
export function withValues(html: string, language: Language): string {
	const countries = new Intl.DisplayNames(HTML_CODES[language], { type: 'region' });
	const valueAt = (path: string): unknown => {
		const value = path
			.split('.')
			.reduce<unknown>(
				(v, key) =>
					v !== null && typeof v === 'object' ? (v as Record<string, unknown>)[key] : undefined,
				values,
			);
		if (value === undefined) {
			throw new Error(`Unknown placeholder {${path}} in a legal page: see src/config/values.ts.`);
		}
		return value;
	};
	const toHtml = (path: string, value: unknown): string => {
		if (typeof value === 'string' && path === 'email') {
			return `<a href="mailto:${escape(value)}">${escape(value)}</a>`;
		}
		if (typeof value === 'string' && path.endsWith('.phone')) {
			return `<a href="tel:${escape(value.replaceAll(' ', ''))}">${escape(value)}</a>`;
		}
		if (typeof value === 'string') return escape(value);
		if (value !== null && typeof value === 'object' && 'country' in value) {
			const { street, city, country } = value as { street: string; city: string; country: string };
			return escape(`${street}, ${city}, ${countries.of(country)}`);
		}
		throw new Error(`The placeholder {${path}} in a legal page is not a text or an address.`);
	};

	return html
		.replace(/<(li|p)>([\s\S]*?)<\/\1>\n?/g, (block, _tag, inner: string) =>
			[...inner.matchAll(PLACEHOLDER)].some(([, path]) => valueAt(path) === null) ? '' : block,
		)
		.replace(PLACEHOLDER, (_, path: string) => toHtml(path, valueAt(path)))
		.replace(/>([^<]+)</g, (_, text: string) => `>${withNonBreakingSpaces(text)}<`);
}

function escape(text: string): string {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}
