// The domain, the languages and what each phase of the page publishes.
// The Commercial launch PR changes only this file: `CURRENT_PHASE` becomes `COMMERCIAL_LAUNCH`.

export const SITE = 'https://devops.julienlaffont.com';

export const LANGUAGES = ['fr', 'en', 'pt'] as const;
export type Language = (typeof LANGUAGES)[number];

/** The start of each language's URLs. French, the Default language, sits at `/`. */
export const PREFIXES: Record<Language, string> = { fr: '/', en: '/en/', pt: '/pt/' };

/** The value of `<html lang>` in each language. */
export const HTML_CODES: Record<Language, string> = { fr: 'fr', en: 'en', pt: 'pt-PT' };

/** Each language's name in that language, which the switcher reads out to screen readers. */
export const LANGUAGE_NAMES: Record<Language, string> = {
	fr: 'Français',
	en: 'English',
	pt: 'Português',
};

/** What a phase of the page publishes: only the published languages have pages. */
export interface Phase {
	publishedLanguages: readonly Language[];
	/** Puts `noindex` on every page. The SEO check reads this same value. */
	noindex: boolean;
}

export const FIRST_REVIEW: Phase = { publishedLanguages: ['pt'], noindex: true };
export const COMMERCIAL_LAUNCH: Phase = { publishedLanguages: LANGUAGES, noindex: false };

/** The phase of the published site. */
export const CURRENT_PHASE: Phase = FIRST_REVIEW;

/**
 * The phase this build generates: the current one, or the Commercial launch in the test build
 * (`LANCAMENTO_COMERCIAL=1`), which checks now what only exists with several languages.
 */
export const PHASE: Phase =
	process.env.LANCAMENTO_COMERCIAL === '1' ? COMMERCIAL_LAUNCH : CURRENT_PHASE;
