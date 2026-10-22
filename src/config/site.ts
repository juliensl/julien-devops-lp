// O domínio, as línguas publicadas e a indexação.
// O PR do Lançamento comercial muda só este ficheiro: publica as três línguas e põe NOINDEX a false.

export const SITE = 'https://julienlaffont.com';

export const LINGUAS = ['fr', 'en', 'pt'] as const;
export type Lingua = (typeof LINGUAS)[number];

/** O início dos URLs de cada língua. O francês, Língua por defeito, fica em `/`. */
export const PREFIXOS: Record<Lingua, string> = { fr: '/', en: '/en/', pt: '/pt/' };

/** As línguas publicadas. Só estas têm páginas no site. */
export const LINGUAS_PUBLICADAS: readonly Lingua[] = ['pt'];

/** Põe `noindex` em todas as páginas. A verificação de SEO lê esta mesma constante. */
export const NOINDEX = true;

/**
 * As línguas que este build gera: as publicadas, ou as três no build de teste
 * (`TRES_LINGUAS=1`), que verifica já o que só existe com várias línguas.
 */
export const LINGUAS_GERADAS: readonly Lingua[] =
	process.env.TRES_LINGUAS === '1' ? LINGUAS : LINGUAS_PUBLICADAS;
