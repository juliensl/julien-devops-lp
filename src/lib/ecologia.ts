// O cálculo do estimador da página de ecologia e a forma de escrever os números.
// Corre no build, para a página mostrar o resultado sem JS, e no navegador, a cada mudança.
import { DIAS_POR_MES, WATTS_POR_VCPU } from '../config/ecologia';

export interface Carga {
	vcpu: number;
	/** Em %. */
	utilizacao: number;
	horas: number;
	pue: number;
	/** Em g CO2e/kWh. */
	intensidade: number;
}

/**
 * O cálculo do protótipo v3 (#54):
 *   W por vCPU  = 0,74 + utilização × (3,5 − 0,74)
 *   kWh por mês = vCPU × W × horas por dia × 30,4375 × PUE / 1000
 *   kg CO2e     = kWh × intensidade do país em g CO2e/kWh / 1000
 */
export function calcula({ vcpu, utilizacao, horas, pue, intensidade }: Carga) {
	const { minimo, maximo } = WATTS_POR_VCPU;
	const watts = minimo + (utilizacao / 100) * (maximo - minimo);
	const kwh = (vcpu * watts * horas * DIAS_POR_MES * pue) / 1000;
	return { kwh, kg: (kwh * intensidade) / 1000 };
}

/** Os pontos de CO2e: cada um vale uma unidade escolhida para nunca passar de 200 pontos. */
export function pontos(kg: number) {
	const unidade = [0.1, 1, 10, 100, 1000].find((u) => kg / u <= 200) ?? 1000;
	return { unidade, quantidade: Math.max(1, Math.round(kg / unidade)) };
}

/** O espaço entre o número e o «%»: inseparável em português, fino e inseparável em francês. */
const ESPACO_DA_PERCENTAGEM: Record<string, string> = { 'pt-PT': '\u00a0', fr: '\u202f', en: '' };

/** Os números escritos na língua da página, pelo código de `<html lang>`. */
export function numeros(codigoHtml: string) {
	const formato = (opcoes: Intl.NumberFormatOptions) => new Intl.NumberFormat(codigoHtml, opcoes);
	const doisAlgarismos = formato({ minimumSignificantDigits: 2, maximumSignificantDigits: 2 });
	const tresAlgarismos = formato({ minimumSignificantDigits: 3, maximumSignificantDigits: 3 });
	const ateDuasCasas = formato({ maximumFractionDigits: 2 });
	const duasCasas = formato({ minimumFractionDigits: 2, maximumFractionDigits: 2 });
	return {
		/** Um resultado estimado: 2 algarismos significativos abaixo de 10, 3 a partir daí (0,78 · 5,0 · 18,8). */
		resultado: (n: number) => (n < 10 ? doisAlgarismos : tresAlgarismos).format(n),
		/** Um dado, como foi publicado ou escolhido: 41,2 · 0,74 · 8. */
		dado: (n: number) => ateDuasCasas.format(n),
		/** O PUE, sempre com 2 casas: 1,50. */
		pue: (n: number) => duasCasas.format(n),
		percentagem: (n: number) =>
			`${ateDuasCasas.format(n)}${ESPACO_DA_PERCENTAGEM[codigoHtml] ?? ''}%`,
		horas: (n: number) => `${ateDuasCasas.format(n)}\u00a0h`,
	};
}
