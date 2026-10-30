// The ecology page's estimator (#68): the data and the calculation of #54 («Página de ecologia»), taken
// from prototype v3. The intensities are Ember's for 2025 (life cycle, location-based), read in research
// #44 on 16/10/2026; the watts per vCPU are Cloud Carbon Footprint's for an unknown processor; the PUE
// is the Uptime Institute's 2026 average per data centre, validated by Julien on 19/10/2026 (#47).
// No provider data: the page makes no environmental claim about any provider (#54).
// The build writes the first result into the page and the page's script recomputes it, both from here.

/** An ISO 3166 code: the page names each country in its language with `Intl.DisplayNames`. */
export type CountryCode =
	| 'NO'
	| 'SE'
	| 'CH'
	| 'FR'
	| 'FI'
	| 'DK'
	| 'AT'
	| 'PT'
	| 'BE'
	| 'ES'
	| 'GB'
	| 'NL'
	| 'IE'
	| 'IT'
	| 'DE'
	| 'PL';

/** g CO2e per kWh of electricity generated in the country, lowest first, as the comparison shows them. */
export const INTENSITIES: Record<CountryCode, number> = {
	NO: 28.1,
	SE: 35.4,
	CH: 39.1,
	FR: 41.2,
	FI: 57.2,
	DK: 99.9,
	AT: 116.6,
	PT: 127.8,
	BE: 151.3,
	ES: 153.5,
	GB: 218.2,
	NL: 253.7,
	IE: 263.3,
	IT: 284.4,
	DE: 334.1,
	PL: 590.8,
};

export const COUNTRIES = Object.keys(INTENSITIES) as CountryCode[];

/** The year of the intensities. A new year changes it, the values above and the sources' names. */
export const INTENSITY_YEAR = 2025;

/** Watts per vCPU at 0 % and at 100 % utilisation. Using them for any server is an assumption. */
export const WATTS = { idle: 0.74, full: 3.5 };

/** The average month: 365.25 days / 12. */
export const DAYS_PER_MONTH = 30.4375;

/** The published PUE the page starts with. Any other value is the Visitor's assumption. */
export const PUBLISHED_PUE = 1.52;

export interface Load {
	country: CountryCode;
	vcpu: number;
	/** In %. */
	utilisation: number;
	hoursPerDay: number;
	pue: number;
}

/** The fields' ranges, and the load the page opens with (#54). */
export const FIELDS = {
	vcpu: { min: 1, max: 64, step: 1 },
	utilisation: { min: 5, max: 100, step: 5 },
	hoursPerDay: { min: 1, max: 24, step: 1 },
	pue: { min: 1, max: 2, step: 0.01 },
} satisfies Record<Exclude<keyof Load, 'country'>, { min: number; max: number; step: number }>;

export const FIRST_LOAD: Load = {
	country: 'FR',
	vcpu: 8,
	// Cloud Carbon Footprint's value when the utilisation is unknown.
	utilisation: 50,
	hoursPerDay: 24,
	pue: PUBLISHED_PUE,
};

export const SOURCES = {
	ember: 'https://ember-energy.org/data/yearly-electricity-data/',
	cloudCarbonFootprint: 'https://www.cloudcarbonfootprint.org/docs/methodology/',
	uptimeInstitute:
		'https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers',
	/** Research #44 lives in the private repository, so the page cites it without a link. */
	research: null,
} satisfies Record<string, string | null>;
export type SourceId = keyof typeof SOURCES;

/** The calculation of #54: the watts of one vCPU, the energy per month and its emissions. */
function estimate({ country, vcpu, utilisation, hoursPerDay, pue }: Load) {
	const watts = WATTS.idle + (utilisation / 100) * (WATTS.full - WATTS.idle);
	const kwh = (vcpu * watts * hoursPerDay * DAYS_PER_MONTH * pue) / 1000;
	return { watts, kwh, kg: kgIn(country, kwh) };
}

/** The emissions of `kwh` in a country. */
function kgIn(country: CountryCode, kwh: number) {
	return (kwh * INTENSITIES[country]) / 1000;
}

/**
 * Every number the page writes for a load, in the page's language: the fields (as screen readers hear
 * them, with their unit), the calculation, the two results and the result in each country (`kg-FR`).
 */
export function figures(locale: string, load: Load): Record<string, string> {
	const format = (n: number, options?: Intl.NumberFormatOptions) =>
		new Intl.NumberFormat(locale, options).format(n);
	// A result: 1 decimal, or 2 significant digits under 1, so a small load never shows 0.
	const amount = (n: number) =>
		format(
			n,
			n >= 1
				? { minimumFractionDigits: 1, maximumFractionDigits: 1 }
				: { maximumSignificantDigits: 2 },
		);
	const { watts, kwh, kg } = estimate(load);
	return {
		vcpu: format(load.vcpu),
		// As the dictionaries write it: "50%" in English, "50 %" in French and Portuguese.
		utilisation: `${format(load.utilisation)}${locale === 'en' ? '' : '\u00a0'}%`,
		hoursPerDay: `${format(load.hoursPerDay)}\u00a0h`,
		pue: format(load.pue, { minimumFractionDigits: 2 }),
		watts: format(watts, { maximumFractionDigits: 2 }),
		intensity: format(INTENSITIES[load.country], { minimumFractionDigits: 1 }),
		kwh: amount(kwh),
		kg: amount(kg),
		...Object.fromEntries(COUNTRIES.map((c) => [`kg-${c}`, amount(kgIn(c, kwh))])),
	};
}
