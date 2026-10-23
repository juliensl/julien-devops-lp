// O domínio, as línguas e o que cada fase da página publica.
// O PR do Lançamento comercial muda só este ficheiro: FASE_ATUAL passa a LANCAMENTO_COMERCIAL.

export const SITE = 'https://devops.julienlaffont.com';

export const LINGUAS = ['fr', 'en', 'pt'] as const;
export type Lingua = (typeof LINGUAS)[number];

/** O início dos URLs de cada língua. O francês, Língua por defeito, fica em `/`. */
export const PREFIXOS: Record<Lingua, string> = { fr: '/', en: '/en/', pt: '/pt/' };

/** O valor de `<html lang>` em cada língua. */
export const CODIGOS_HTML: Record<Lingua, string> = { fr: 'fr', en: 'en', pt: 'pt-PT' };

/** O que uma fase da página publica: só as línguas publicadas têm páginas. */
export interface Fase {
	linguasPublicadas: readonly Lingua[];
	/** Põe `noindex` em todas as páginas. A verificação de SEO lê este mesmo valor. */
	noindex: boolean;
}

export const PRIMEIRA_VALIDACAO: Fase = { linguasPublicadas: ['pt'], noindex: true };
export const LANCAMENTO_COMERCIAL: Fase = { linguasPublicadas: LINGUAS, noindex: false };

/** A fase do site publicado. */
export const FASE_ATUAL: Fase = PRIMEIRA_VALIDACAO;

/**
 * A fase que este build gera: a atual, ou o Lançamento comercial no build de teste
 * (`LANCAMENTO_COMERCIAL=1`), que verifica já o que só existe com várias línguas.
 */
export const FASE: Fase =
	process.env.LANCAMENTO_COMERCIAL === '1' ? LANCAMENTO_COMERCIAL : FASE_ATUAL;
