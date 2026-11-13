// The data sovereignty page's facts and official sources. No imports, so that `node` can load it.

export type SovereigntyProviderId =
	| 'aws'
	| 'exoscale'
	| 'googleCloud'
	| 'hetzner'
	| 'infomaniak'
	| 'azure'
	| 'ovhcloud'
	| 'outscale'
	| 'scaleway';

/** An ISO 3166 code: the page names each country in its language with `Intl.DisplayNames`. */
export type CountryCode = string;

/** The law of a contract: a country, or a state of the United States. */
export type Law = 'CH' | 'DE' | 'FR' | 'IE' | 'LU' | 'US-CA';

/** Where backups or logs can be, as the provider's contract or documentation says. */
export type Placement =
	/** In the region the customer chose; in another one only if the customer sets it up. */
	| 'chosenRegion'
	/** In the country the customer chose. */
	| 'chosenCountry'
	/** In the EU when the chosen location is, possibly on another site. */
	| 'inEu'
	/** By default also in another region, which the customer can change. */
	| 'otherRegionByDefault'
	/** Partly outside the chosen location: some services, or the provider's own operational data. */
	| 'partlyElsewhere';

export interface SovereigntySource {
	url: string;
	/** The day the page was read, as YYYY-MM-DD. */
	read: string;
}

/**
 * What a value describes: the company that provides the service, its group, the contract a business
 * customer in France signs, the row's offer (the standard public cloud), or another, named offer.
 */
export type Level = 'company' | 'group' | 'contract' | 'offer' | 'namedOffer';

export interface SovereigntyFact<T> {
	value: T | null;
	level: Level;
	sources: SovereigntySource[];
}

export interface Provider {
	id: SovereigntyProviderId;
	name: string;
	/** The company's country, and its group's when it is another. */
	headquarters: SovereigntyFact<{ company: CountryCode; group?: CountryCode }>;
	/** The countries of the regions in Europe, and whether there are others elsewhere. */
	zones: SovereigntyFact<{ europe: CountryCode[]; elsewhere: boolean }>;
	/** The company a business customer in France signs with, and the law of that contract. */
	contract: SovereigntyFact<{ entity: string | null; law: Law | null }>;
	/** The country of the provider's parent company, as an official source names it. */
	parent: SovereigntyFact<CountryCode>;
	backups: SovereigntyFact<Placement>;
	logs: SovereigntyFact<Placement>;
	/**
	 * SecNumCloud and HDS from the official French lists, which were searched for every provider, and
	 * ISO/IEC 27001 from the provider.
	 */
	certifications: { value: Certification[]; sources: SovereigntySource[] };
}

export interface Certification {
	name: string;
	/** The named offers it covers, when it is not the standard public cloud. */
	offer?: string;
	/** The countries of the sites it covers, when it does not cover them all. */
	sites?: CountryCode[];
	level: Level;
}

export type ColumnId =
	'headquarters' | 'zones' | 'contract' | 'parent' | 'backups' | 'logs' | 'certifications';

const READ = '2026-11-13';
const source = (url: string, read = READ): SovereigntySource => ({ url, read });

// ANSSI's catalogue of qualified offers (SecNumCloud), updated on 27/10/2026, and the Agence du
// numérique en santé's list of certified health data hosts (HDS).
const SECNUMCLOUD = source(
	'https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf',
);
const HDS = source('https://esante.gouv.fr/produits-services/hds/liste-des-hebergeurs-certifies');
const hds: Certification = { name: 'HDS', level: 'company' };

/** The 27 member states of the European Union, from the EU's list. */
const EU_LIST = source('https://european-union.europa.eu/easy-read_en');
export const EU_MEMBERS: CountryCode[] = [
	'AT',
	'BE',
	'BG',
	'CY',
	'CZ',
	'DE',
	'DK',
	'EE',
	'ES',
	'FI',
	'FR',
	'GR',
	'HR',
	'HU',
	'IE',
	'IT',
	'LT',
	'LU',
	'LV',
	'MT',
	'NL',
	'PL',
	'PT',
	'RO',
	'SE',
	'SI',
	'SK',
];

/** In alphabetical order, so that the table does not look like a ranking. */
export const SOVEREIGNTY_PROVIDERS: Provider[] = [
	{
		id: 'aws',
		name: 'AWS',
		headquarters: {
			value: { company: 'US' },
			level: 'company',
			sources: [
				source('https://aws.amazon.com/agreement/'),
				source(
					'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm',
				),
			],
		},
		zones: {
			value: { europe: ['DE', 'IE', 'GB', 'IT', 'FR', 'ES', 'SE', 'CH'], elsewhere: true },
			level: 'offer',
			sources: [
				source('https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html'),
			],
		},
		contract: {
			value: { entity: 'Amazon Web Services EMEA SARL', law: 'LU' },
			level: 'contract',
			sources: [source('https://aws.amazon.com/agreement/')],
		},
		parent: {
			value: 'US',
			level: 'group',
			sources: [
				source('https://aws.amazon.com/legal/aws-emea/'),
				source(
					'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm',
				),
			],
		},
		backups: {
			value: 'chosenRegion',
			level: 'offer',
			sources: [
				source('https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html'),
				source('https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html'),
			],
		},
		logs: {
			value: 'partlyElsewhere',
			level: 'offer',
			sources: [
				source(
					'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html',
				),
			],
		},
		certifications: {
			value: [hds, { name: 'ISO/IEC 27001', level: 'offer' }],
			sources: [SECNUMCLOUD, HDS, source('https://aws.amazon.com/compliance/iso-27001-faqs/')],
		},
	},
	{
		id: 'exoscale',
		name: 'Exoscale',
		headquarters: {
			value: { company: 'CH', group: 'AT' },
			level: 'group',
			sources: [
				source('https://www.exoscale.com/about-us/'),
				source('https://www.exoscale.com/terms/'),
				source('https://www.exoscale.com/privacy/'),
			],
		},
		zones: {
			value: { europe: ['AT', 'BG', 'CH', 'DE', 'HR'], elsewhere: false },
			level: 'offer',
			sources: [source('https://community.exoscale.com/platform/dc-zones/')],
		},
		contract: {
			value: { entity: 'Akenes SA', law: 'CH' },
			level: 'contract',
			sources: [source('https://www.exoscale.com/terms/')],
		},
		parent: {
			value: 'AT',
			level: 'group',
			sources: [
				source('https://www.exoscale.com/terms/'),
				source('https://www.exoscale.com/about-us/'),
			],
		},
		backups: {
			value: 'chosenCountry',
			level: 'contract',
			sources: [source('https://www.exoscale.com/terms/')],
		},
		logs: {
			value: 'partlyElsewhere',
			level: 'contract',
			sources: [source('https://www.exoscale.com/terms/')],
		},
		certifications: {
			value: [hds, { name: 'ISO/IEC 27001', level: 'company' }],
			sources: [SECNUMCLOUD, HDS, source('https://www.exoscale.com/compliance/iso27001/')],
		},
	},
	{
		id: 'googleCloud',
		name: 'Google Cloud',
		headquarters: {
			value: { company: 'US' },
			level: 'company',
			sources: [source('https://cloud.google.com/terms/google-entity')],
		},
		zones: {
			value: {
				europe: ['PL', 'FI', 'SE', 'ES', 'BE', 'DE', 'IT', 'GB', 'NL', 'CH', 'FR'],
				elsewhere: true,
			},
			level: 'offer',
			sources: [
				source('https://docs.cloud.google.com/compute/docs/regions-zones'),
				source('https://cloud.google.com/about/locations'),
			],
		},
		contract: {
			value: { entity: 'Google Cloud France', law: 'US-CA' },
			level: 'contract',
			sources: [
				source('https://cloud.google.com/terms'),
				source('https://cloud.google.com/terms/regional-modifications'),
			],
		},
		parent: {
			value: 'US',
			level: 'group',
			sources: [source('https://cloud.google.com/terms/subprocessors')],
		},
		backups: {
			value: 'otherRegionByDefault',
			level: 'offer',
			sources: [
				source('https://docs.cloud.google.com/compute/docs/disks/snapshots'),
				source('https://cloud.google.com/terms/service-terms'),
			],
		},
		logs: {
			value: 'partlyElsewhere',
			level: 'offer',
			sources: [
				source('https://docs.cloud.google.com/logging/docs/regionalized-logs'),
				source('https://cloud.google.com/terms/cloud-privacy-notice'),
			],
		},
		certifications: {
			value: [hds, { name: 'ISO/IEC 27001', level: 'offer' }],
			sources: [SECNUMCLOUD, HDS, source('https://cloud.google.com/security/compliance/iso-27001')],
		},
	},
	{
		id: 'hetzner',
		name: 'Hetzner',
		headquarters: {
			value: { company: 'DE' },
			level: 'company',
			sources: [source('https://www.hetzner.com/legal/legal-notice/')],
		},
		zones: {
			value: { europe: ['DE', 'FI'], elsewhere: true },
			level: 'offer',
			sources: [source('https://docs.hetzner.com/cloud/general/locations/')],
		},
		contract: {
			value: { entity: 'Hetzner Online GmbH', law: 'DE' },
			level: 'contract',
			sources: [source('https://www.hetzner.com/legal/terms-and-conditions/')],
		},
		parent: {
			value: null,
			level: 'group',
			sources: [source('https://www.hetzner.com/legal/legal-notice/')],
		},
		backups: {
			value: 'inEu',
			level: 'company',
			sources: [
				source('https://docs.hetzner.com/general/company-and-policy/data-protection-at-hetzner/'),
			],
		},
		logs: {
			value: null,
			level: 'offer',
			sources: [source('https://www.hetzner.com/AV/DPA_en.pdf')],
		},
		certifications: {
			value: [{ name: 'ISO/IEC 27001', sites: ['DE', 'FI'], level: 'company' }],
			sources: [SECNUMCLOUD, HDS, source('https://www.hetzner.com/unternehmen/zertifizierung/')],
		},
	},
	{
		id: 'infomaniak',
		name: 'Infomaniak',
		headquarters: {
			value: { company: 'CH' },
			level: 'company',
			sources: [source('https://www.infomaniak.com/en/legal/impressum')],
		},
		zones: {
			value: { europe: ['CH'], elsewhere: false },
			level: 'offer',
			sources: [source('https://www.infomaniak.com/en/hosting/public-cloud')],
		},
		contract: {
			value: { entity: 'Infomaniak Network SA', law: 'CH' },
			level: 'contract',
			sources: [
				source('https://welcome.infomaniak.com/api/web-components/1/cgu/latest?id=1&locale=en_GB'),
			],
		},
		parent: {
			value: 'CH',
			level: 'group',
			sources: [
				source(
					'https://www.infomaniak.com/documents/financial/rapport-financier-semestriel-30-06-2026.pdf',
				),
				source('https://www.infomaniak.com/en/investors'),
			],
		},
		backups: {
			value: 'chosenCountry',
			level: 'contract',
			sources: [
				source('https://welcome.infomaniak.com/api/web-components/1/cgu/latest?id=70&locale=en_GB'),
			],
		},
		logs: {
			value: null,
			level: 'contract',
			sources: [
				source('https://welcome.infomaniak.com/api/web-components/1/cgu/latest?id=70&locale=en_GB'),
			],
		},
		certifications: {
			value: [{ name: 'ISO/IEC 27001', level: 'company' }],
			sources: [SECNUMCLOUD, HDS, source('https://www.infomaniak.com/en/certifications')],
		},
	},
	{
		id: 'azure',
		name: 'Microsoft Azure',
		headquarters: {
			value: { company: 'US' },
			level: 'company',
			sources: [
				source(
					'https://www.sec.gov/Archives/edgar/data/789019/000119312526323660/msft-20260630.htm',
				),
			],
		},
		zones: {
			value: {
				europe: [
					'AT',
					'BE',
					'DK',
					'FR',
					'DE',
					'IT',
					'IE',
					'NL',
					'PL',
					'ES',
					'SE',
					'NO',
					'CH',
					'GB',
				],
				elsewhere: true,
			},
			level: 'offer',
			sources: [source('https://learn.microsoft.com/en-us/azure/reliability/regions-list')],
		},
		contract: {
			value: { entity: null, law: 'IE' },
			level: 'contract',
			sources: [
				source(
					'https://www.microsoft.com/licensing/docs/documents/download/MCASample_France_March2023_en-us.docx',
				),
			],
		},
		parent: {
			value: 'US',
			level: 'group',
			sources: [
				source('https://www.sec.gov/Archives/edgar/data/789019/000119312526323660/msft-ex21.htm'),
				source(
					'https://www.sec.gov/Archives/edgar/data/789019/000119312526323660/msft-20260630.htm',
				),
			],
		},
		backups: {
			value: 'otherRegionByDefault',
			level: 'offer',
			sources: [
				source(
					'https://learn.microsoft.com/en-us/azure/backup/backup-create-recovery-services-vault',
				),
				source('https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/'),
			],
		},
		logs: {
			value: 'partlyElsewhere',
			level: 'offer',
			sources: [
				source('https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/all'),
				source('https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/'),
			],
		},
		certifications: {
			value: [hds, { name: 'ISO/IEC 27001', level: 'offer' }],
			sources: [
				SECNUMCLOUD,
				HDS,
				source('https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-iso-27001'),
			],
		},
	},
	{
		id: 'outscale',
		name: 'OUTSCALE',
		headquarters: {
			value: { company: 'FR' },
			level: 'company',
			sources: [source('https://en.outscale.com/legal-informations/')],
		},
		zones: {
			value: { europe: ['FR'], elsewhere: true },
			level: 'offer',
			sources: [source('https://docs.outscale.com/en/userguide/About-Regions-and-Subregions.html')],
		},
		contract: {
			value: { entity: 'Outscale SASU', law: 'FR' },
			level: 'contract',
			sources: [
				source('https://fr.outscale.com/wp-content/uploads/2026/04/GTC-OUTSCALE-2025-12-15.pdf'),
			],
		},
		parent: {
			value: 'FR',
			level: 'group',
			sources: [
				source(
					'https://en.outscale.com/press-releases/archives/welcome-to-cloud-days-2021-the-annual-conference-of-3ds-outscale/',
				),
				source('https://en.outscale.com/legal-informations/'),
			],
		},
		backups: {
			value: 'chosenRegion',
			level: 'offer',
			sources: [source('https://docs.outscale.com/en/userguide/About-Snapshots.html')],
		},
		logs: {
			value: null,
			level: 'offer',
			sources: [source('https://docs.outscale.com/en/userguide/About-OMS.html')],
		},
		certifications: {
			value: [
				{ name: 'SecNumCloud', offer: 'IaaS Cloud on Demand', level: 'namedOffer' },
				hds,
				{ name: 'ISO/IEC 27001', level: 'company' },
			],
			sources: [SECNUMCLOUD, HDS, source('https://en.outscale.com/our-certifications/')],
		},
	},
	{
		id: 'ovhcloud',
		name: 'OVHcloud',
		headquarters: {
			value: { company: 'FR' },
			level: 'company',
			sources: [source('https://www.ovhcloud.com/fr/terms-and-conditions/')],
		},
		zones: {
			value: { europe: ['FR', 'IT', 'DE', 'PL', 'GB'], elsewhere: true },
			level: 'offer',
			sources: [source('https://www.ovhcloud.com/en/public-cloud/regions-availability/')],
		},
		contract: {
			value: { entity: 'OVH SAS', law: 'FR' },
			level: 'contract',
			sources: [
				source(
					'https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/814a669-contrat_genServices-FR-16.0.pdf',
				),
			],
		},
		parent: {
			value: 'FR',
			level: 'group',
			sources: [
				source(
					'https://corporate.ovhcloud.com/sites/default/files/2026-11/ovh2026_urd_fr_light_1.pdf',
				),
			],
		},
		backups: {
			value: 'chosenRegion',
			level: 'contract',
			sources: [
				source(
					'https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/c7f0edf-Conditions_particulieres_OVH_Stack-FR-22.0.pdf',
				),
			],
		},
		logs: {
			value: null,
			level: 'contract',
			sources: [
				source(
					'https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/76ecbce-OVH_Data_Protection_Agreement-FR-7.0.pdf',
				),
			],
		},
		certifications: {
			value: [
				{
					name: 'SecNumCloud',
					offer: 'Hosted Private Cloud powered by VMware, Bare Metal Pod, SNC Cloud Platform',
					level: 'namedOffer',
				},
				hds,
				{ name: 'ISO/IEC 27001', level: 'offer' },
			],
			sources: [
				SECNUMCLOUD,
				HDS,
				source('https://www.ovhcloud.com/en/compliance/iso-27001-27017-27018/'),
			],
		},
	},
	{
		id: 'scaleway',
		name: 'Scaleway',
		headquarters: {
			value: { company: 'FR' },
			level: 'company',
			sources: [source('https://www.scaleway.com/fr/mentions-legales/')],
		},
		zones: {
			value: { europe: ['FR', 'NL', 'PL', 'IT'], elsewhere: false },
			level: 'offer',
			sources: [
				source('https://www.scaleway.com/en/docs/instances/concepts/'),
				source('https://www.scaleway.com/en/product-availability-by-region/'),
			],
		},
		contract: {
			value: { entity: 'Scaleway SAS', law: 'FR' },
			level: 'contract',
			sources: [
				source(
					'https://www-uploads.scaleway.com/Conditions_Generales_de_Services_v2026_a0028de41c.pdf',
				),
			],
		},
		parent: {
			value: 'FR',
			level: 'group',
			sources: [source('https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf')],
		},
		backups: {
			value: 'chosenRegion',
			level: 'contract',
			sources: [
				source('https://www-uploads.scaleway.com/Specific_Conditions_Storage_4abcda87c7.pdf'),
			],
		},
		logs: {
			value: 'partlyElsewhere',
			level: 'offer',
			sources: [source('https://www.scaleway.com/en/docs/audit-trail/faq/')],
		},
		certifications: {
			value: [hds, { name: 'ISO/IEC 27001', sites: ['FR', 'NL', 'PL'], level: 'offer' }],
			sources: [
				SECNUMCLOUD,
				HDS,
				source('https://www-uploads.scaleway.com/IS_787020_EN_46136c6c21.pdf'),
			],
		},
	},
];

/** The official sources of the page's notes on Switzerland and on the CLOUD Act. */
export const NOTE_SOURCES = {
	switzerland: {
		euMembers: EU_LIST,
		notMember: source('https://www.europa.eda.admin.ch/fr/vue-densemble-des-accords-bilateraux'),
		adequacy: source(
			'https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en',
		),
		decision: source('https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32000D0518'),
	},
	cloudAct: {
		statute: source(
			'https://www.govinfo.gov/content/pkg/USCODE-2023-title18/html/USCODE-2023-title18-partI-chap121-sec2713.htm',
		),
		whitePaper: source('https://www.justice.gov/criminal/media/999601/dl?inline'),
		patriotAct: source(
			'https://www.govinfo.gov/content/pkg/PLAW-107publ56/html/PLAW-107publ56.htm',
		),
	},
} satisfies Record<string, Record<string, SovereigntySource>>;
