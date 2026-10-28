// O domínio, as línguas e o que cada fase da página publica.
// O PR do Lançamento comercial muda só este ficheiro: FASE_ATUAL passa a LANCAMENTO_COMERCIAL.

export const SITE = 'https://devops.julienlaffont.com';

export const LANGUAGES = ['fr', 'en', 'pt'] as const;
export type Language = (typeof LANGUAGES)[number];

/** O início dos URLs de cada língua. O francês, Língua por defeito, fica em `/`. */
export const PREFIXES: Record<Language, string> = { fr: '/', en: '/en/', pt: '/pt/' };

/** O valor de `<html lang>` em cada língua. */
export const HTML_CODES: Record<Language, string> = { fr: 'fr', en: 'en', pt: 'pt-PT' };

/** O nome de cada língua na própria língua, que o seletor diz aos leitores de ecrã. */
export const LANGUAGE_NAMES: Record<Language, string> = {
	fr: 'Français',
	en: 'English',
	pt: 'Português',
};

/** O que uma fase da página publica: só as línguas publicadas têm páginas. */
export interface Phase {
	publishedLanguages: readonly Language[];
	/** Põe `noindex` em todas as páginas. A verificação de SEO lê este mesmo valor. */
	noindex: boolean;
}

export const FIRST_REVIEW: Phase = { publishedLanguages: ['pt'], noindex: true };
export const COMMERCIAL_LAUNCH: Phase = { publishedLanguages: LANGUAGES, noindex: false };

/** A fase do site publicado. */
export const CURRENT_PHASE: Phase = FIRST_REVIEW;

/**
 * A fase que este build gera: a atual, ou o Lançamento comercial no build de teste
 * (`LANCAMENTO_COMERCIAL=1`), que verifica já o que só existe com várias línguas.
 */
export const PHASE: Phase =
	process.env.LANCAMENTO_COMERCIAL === '1' ? COMMERCIAL_LAUNCH : CURRENT_PHASE;
