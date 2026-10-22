/**
 * Os espaços inseparáveis, que os componentes montam porque os dicionários não os levam (#54).
 * Um número nunca fica no fim de uma linha, longe do que mede («99 %», «45 min», «48 h»); um
 * intervalo nunca se parte («5 a 20», «3 e 4», «€100 to €500»); e em francês os sinais « ? ! : ; »
 * nunca começam uma linha. É o U+00A0, que as duas fontes do site têm; a Geist não tem o espaço
 * fino (U+202F).
 */
export function inseparaveis(texto: string): string {
	return texto
		.replace(/(\d) (a|à|e|et|to|and) (?=[\d€])/g, '$1\u00a0$2\u00a0')
		.replace(/(\d) /g, '$1\u00a0')
		.replace(/ ([?!:;»])/g, '\u00a0$1')
		.replace(/« /g, '«\u00a0');
}

/** O mesmo, em cada texto de um bloco do dicionário e em cada item das suas listas. */
export function blocoComInseparaveis<T extends Record<string, string | string[]>>(bloco: T): T {
	const resultado: Record<string, string | string[]> = {};
	for (const [chave, texto] of Object.entries(bloco)) {
		resultado[chave] = typeof texto === 'string' ? inseparaveis(texto) : texto.map(inseparaveis);
	}
	return resultado as T;
}
