// Os dados do estimador da página de ecologia, iguais nas três línguas (#54, «Página de ecologia»).
// Só dados por país e hipóteses à vista: nenhum dado ambiental dos fornecedores.
// O script do estimador também importa este ficheiro, por isso não importa nada do build (site.ts).

/**
 * A intensidade carbónica da eletricidade de cada país, em g CO2e/kWh: Ember, ciclo de vida,
 * location-based (Publicado). Por ordem crescente, como na comparação entre países.
 * Os países são códigos ISO 3166: o nome vem do Intl, na língua da página.
 */
export const INTENSIDADES = [
	{ pais: 'NO', g: 28.1 },
	{ pais: 'SE', g: 35.4 },
	{ pais: 'CH', g: 39.1 },
	{ pais: 'FR', g: 41.2 },
	{ pais: 'FI', g: 57.2 },
	{ pais: 'DK', g: 99.9 },
	{ pais: 'AT', g: 116.6 },
	{ pais: 'PT', g: 127.8 },
	{ pais: 'BE', g: 151.3 },
	{ pais: 'ES', g: 153.5 },
	{ pais: 'GB', g: 218.2 },
	{ pais: 'NL', g: 253.7 },
	{ pais: 'IE', g: 263.3 },
	{ pais: 'IT', g: 284.4 },
	{ pais: 'DE', g: 334.1 },
	{ pais: 'PL', g: 590.8 },
] as const;

export type Pais = (typeof INTENSIDADES)[number]['pais'];

export const ANO_DAS_INTENSIDADES = 2025;
export const PAIS_POR_DEFEITO: Pais = 'FR';

/**
 * Os watts por vCPU com 0 % e 100 % de utilização: os do Cloud Carbon Footprint para um
 * processador desconhecido. Usá-los para qualquer servidor é uma Hipótese.
 */
export const WATTS_POR_VCPU = { minimo: 0.74, maximo: 3.5 };

/** Os cursores do estimador: limites, passo e valor por defeito. */
export const CURSORES = {
	vcpu: { min: 1, max: 64, passo: 1, defeito: 8 },
	/** Em %. 50 % é o valor do Cloud Carbon Footprint quando não se conhece a utilização (Hipótese). */
	utilizacao: { min: 5, max: 100, passo: 5, defeito: 50 },
	horas: { min: 1, max: 24, passo: 1, defeito: 24 },
	/** 1,52: a média anual do setor por centro de dados, Uptime Institute, inquérito de 2026 (Publicado). */
	pue: { min: 1, max: 2, passo: 0.01, defeito: 1.52 },
};

/** O PUE médio ponderado pela capacidade, no mesmo inquérito: só aparece nos limites. */
export const PUE_PONDERADO = 1.36;

/** Os dias de um mês médio: 365,25 / 12. */
export const DIAS_POR_MES = 30.4375;

/** As ligações das fontes. A pesquisa #44 fica sem ligação: está num repositório privado. */
export const FONTES = {
	ember:
		'https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv',
	ccf: 'https://www.cloudcarbonfootprint.org/docs/methodology/',
	uptime:
		'https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers',
};
