import { PREFIXOS, type Lingua } from '../config/site';

/**
 * A mesma página noutra língua. Os slugs são iguais nas três línguas, por isso só muda o início:
 * `/pt/questions/` → `/questions/` em francês e `/en/questions/` em inglês.
 */
export function caminhoNaLingua(caminho: string, de: Lingua, para: Lingua): string {
	if (!caminho.startsWith(PREFIXOS[de])) {
		throw new Error(
			`O caminho ${caminho} não começa por ${PREFIXOS[de]}, o início da língua ${de}.`,
		);
	}
	return PREFIXOS[para] + caminho.slice(PREFIXOS[de].length);
}

/** A página de ecologia na língua dada (src/paginas/<língua>/ecology.astro): `/pt/ecology/`. */
export function caminhoDaEcologia(lingua: Lingua): string {
	return `${PREFIXOS[lingua]}ecology/`;
}
