import { PREFIXES, type Language } from '../config/site';

/**
 * A mesma página noutra língua. Os slugs são iguais nas três línguas, por isso só muda o início:
 * `/pt/questions/` → `/questions/` em francês e `/en/questions/` em inglês.
 */
export function pathInLanguage(path: string, from: Language, to: Language): string {
	if (!path.startsWith(PREFIXES[from])) {
		throw new Error(
			`O caminho ${path} não começa por ${PREFIXES[from]}, o início da língua ${from}.`,
		);
	}
	return PREFIXES[to] + path.slice(PREFIXES[from].length);
}
