/**
 * Os espaços inseparáveis, que os componentes montam porque os dicionários não os levam (#54).
 * Um número nunca fica no fim de uma linha, longe do que mede («99 %», «45 min», «48 h»); um
 * intervalo nunca se parte («5 a 20», «3 e 4», «€100 to €500»); e em francês os sinais « ? ! : ; »
 * nunca começam uma linha. É o U+00A0, que as duas fontes do site têm: a Geist não tem o espaço
 * fino (U+202F), que viria da fonte de recurso (#60).
 */
export function withNonBreakingSpaces(text: string): string {
	return text
		.replace(/(\d) (a|à|e|et|to|and) (?=[\d€])/g, '$1 $2 ')
		.replace(/(\d) /g, '$1 ')
		.replace(/ ([?!:;»])/g, ' $1')
		.replace(/« /g, '« ');
}
