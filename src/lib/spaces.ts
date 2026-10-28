/**
 * The non-breaking spaces, which the components add because the dictionaries do not carry them (#54).
 * A number never ends a line, away from what it measures ("99 %", "45 min", "48 h"); a range never
 * breaks ("5 a 20", "3 e 4", "€100 to €500"); and in French the signs « ? ! : ; » never start a
 * line. It is U+00A0, which both site fonts have: Geist lacks the narrow no-break space (U+202F),
 * which would come from the fallback font (#60).
 */
export function withNonBreakingSpaces(text: string): string {
	return text
		.replace(/(\d) (a|à|e|et|to|and) (?=[\d€])/g, '$1 $2 ')
		.replace(/(\d) /g, '$1 ')
		.replace(/ ([?!:;»])/g, ' $1')
		.replace(/« /g, '« ');
}
