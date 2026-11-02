// The cloud provider chart (#66): the facts, the weights and the reading formula of #54
// («Gráfico de fornecedores cloud»). The facts come from research #45, read on 16/10/2026, and the
// cost tools from research #46, read on 19/10/2026. The weights, the thresholds and the cost criterion
// are Julien's opinion, validated on 19/10/2026 (#46).
// Only what is the same in every language lives here: the names of criteria and scenarios, the notes
// and the labels are in the dictionaries. No imports, so that `node` can run it from a script.

export type ProviderId = 'aws' | 'googleCloud' | 'infomaniak' | 'azure' | 'ovhcloud' | 'scaleway';
export type CriterionId =
	| 'kubernetes'
	| 'containers'
	| 'paas'
	| 'europeanHeadquarters'
	| 'secNumCloud'
	| 'euRegions'
	| 'costs';
export type ScenarioId =
	'beforeLaunch' | 'growth' | 'dataSovereignty' | 'variableLoad' | 'costControl';

/** In alphabetical order, so that the page does not look like a ranking. */
export const PROVIDERS: { id: ProviderId; name: string }[] = [
	{ id: 'aws', name: 'AWS' },
	{ id: 'googleCloud', name: 'Google Cloud' },
	{ id: 'infomaniak', name: 'Infomaniak' },
	{ id: 'azure', name: 'Microsoft Azure' },
	{ id: 'ovhcloud', name: 'OVHcloud' },
	{ id: 'scaleway', name: 'Scaleway' },
];

/** Facts have an official source; the cost criterion is Julien's opinion. */
export const CRITERIA: { id: CriterionId; opinion?: true }[] = [
	{ id: 'kubernetes' },
	{ id: 'containers' },
	{ id: 'paas' },
	{ id: 'europeanHeadquarters' },
	{ id: 'secNumCloud' },
	{ id: 'euRegions' },
	{ id: 'costs', opinion: true },
];

export const SCENARIOS: { id: ScenarioId; weights: Partial<Record<CriterionId, number>> }[] = [
	{ id: 'beforeLaunch', weights: { paas: 3, containers: 2, costs: 2 } },
	{ id: 'growth', weights: { kubernetes: 2, containers: 2, euRegions: 1, costs: 1 } },
	{ id: 'dataSovereignty', weights: { euRegions: 3, europeanHeadquarters: 2, secNumCloud: 2 } },
	{ id: 'variableLoad', weights: { containers: 3, kubernetes: 2 } },
	{ id: 'costControl', weights: { costs: 3, paas: 1, containers: 1 } },
];

/** The scenario the chart opens on: the profile the service is for (#54, «Para quem é»). */
export const FIRST_SCENARIO: ScenarioId = 'growth';

/** 1 yes · 0.5 in part · 0 no. */
export type Value = 1 | 0.5 | 0;

export interface Source {
	url: string;
	/** The day the page was read, as YYYY-MM-DD. */
	read: string;
}

export interface Fact {
	value: Value;
	/** The provider's product, when there is one. */
	product?: string;
	sources: Source[];
}

const RESEARCH_45 = '2026-10-16';
const RESEARCH_46 = '2026-10-19';
const source = (url: string, read = RESEARCH_45): Source => ({ url, read });

// The ANSSI's lists: the catalogue of qualified offers, and the offers being qualified.
const SECNUMCLOUD_CATALOGUE = source(
	'https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf',
);
const SECNUMCLOUD_IN_QUALIFICATION = source(
	'https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/prestataires-secnumcloud/',
);

/** Each provider's value on each criterion, with #54's values. */
export const FACTS: Record<ProviderId, Record<CriterionId, Fact>> = {
	aws: {
		kubernetes: {
			value: 1,
			product: 'Amazon EKS',
			sources: [source('https://aws.amazon.com/eks/')],
		},
		containers: {
			value: 1,
			product: 'AWS Fargate',
			sources: [source('https://aws.amazon.com/fargate/')],
		},
		paas: {
			value: 1,
			product: 'AWS Elastic Beanstalk',
			sources: [
				source('https://aws.amazon.com/elasticbeanstalk/'),
				source('https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html'),
			],
		},
		europeanHeadquarters: {
			value: 0,
			sources: [
				source(
					'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm',
				),
				source('https://aws.amazon.com/blogs/aws/opening-the-aws-european-sovereign-cloud/'),
			],
		},
		secNumCloud: { value: 0, sources: [SECNUMCLOUD_CATALOGUE] },
		euRegions: {
			value: 1,
			sources: [
				source('https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html'),
			],
		},
		costs: {
			value: 1,
			product: 'AWS Cost Explorer, AWS Budgets',
			sources: [
				source(
					'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html',
					RESEARCH_46,
				),
				source(
					'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-filtering.html',
					RESEARCH_46,
				),
				source('https://aws.amazon.com/aws-cost-management/aws-budgets/'),
				// Research #45 read the outbound traffic in the price list's JSON; this page says the same
				// 100 GB/month for free, in a form people can read.
				source('https://aws.amazon.com/ec2/pricing/on-demand/', '2026-10-29'),
			],
		},
	},
	googleCloud: {
		kubernetes: {
			value: 1,
			product: 'Google Kubernetes Engine (GKE)',
			sources: [source('https://cloud.google.com/kubernetes-engine')],
		},
		containers: {
			value: 1,
			product: 'Cloud Run',
			sources: [source('https://cloud.google.com/run')],
		},
		paas: {
			value: 1,
			product: 'Cloud Run, App Engine',
			sources: [source('https://cloud.google.com/run/docs/deploying-source-code')],
		},
		europeanHeadquarters: {
			value: 0,
			sources: [source('https://cloud.google.com/terms/google-entity')],
		},
		secNumCloud: {
			value: 0.5,
			product: 'S3NS',
			sources: [
				SECNUMCLOUD_CATALOGUE,
				source('https://www.s3ns.io/en/news/premi3ns-secnumcloud-qualification'),
			],
		},
		euRegions: {
			value: 1,
			sources: [source('https://cloud.google.com/compute/docs/regions-zones')],
		},
		costs: {
			value: 1,
			product: 'Cloud Billing Reports, Budgets',
			sources: [
				source('https://docs.cloud.google.com/billing/docs/how-to/reports', RESEARCH_46),
				source('https://cloud.google.com/billing/docs/how-to/budgets-spend-caps'),
				source('https://cloud.google.com/vpc/network-pricing'),
			],
		},
	},
	infomaniak: {
		kubernetes: {
			value: 1,
			product: 'Kubernetes Service',
			sources: [source('https://www.infomaniak.com/en/hosting/public-cloud/kubernetes')],
		},
		containers: {
			value: 0.5,
			product: 'Jelastic Cloud',
			sources: [
				source('https://www.infomaniak.com/en/hosting/dedicated-and-cloud-servers/jelastic-cloud'),
			],
		},
		paas: {
			value: 1,
			product: 'Jelastic Cloud',
			sources: [
				source('https://www.infomaniak.com/en/hosting/dedicated-and-cloud-servers/jelastic-cloud'),
			],
		},
		europeanHeadquarters: {
			value: 1,
			sources: [source('https://www.infomaniak.com/en/legal/legal-notice')],
		},
		secNumCloud: { value: 0, sources: [SECNUMCLOUD_CATALOGUE] },
		euRegions: {
			value: 0,
			sources: [
				source('https://docs.infomaniak.cloud/getting_started/first_project/connect_project/'),
			],
		},
		costs: {
			value: 0.5,
			sources: [
				source('https://docs.infomaniak.cloud/metering/billing/', RESEARCH_46),
				source('https://docs.infomaniak.cloud/quotas/', RESEARCH_46),
				source('https://www.infomaniak.com/en/hosting/public-cloud/prices'),
			],
		},
	},
	azure: {
		kubernetes: {
			value: 1,
			product: 'Azure Kubernetes Service (AKS)',
			sources: [source('https://learn.microsoft.com/en-us/azure/aks/what-is-aks')],
		},
		containers: {
			value: 1,
			product: 'Azure Container Apps',
			sources: [source('https://learn.microsoft.com/en-us/azure/container-apps/overview')],
		},
		paas: {
			value: 1,
			product: 'Azure App Service',
			sources: [source('https://learn.microsoft.com/en-us/azure/app-service/deploy-local-git')],
		},
		europeanHeadquarters: {
			value: 0,
			sources: [
				source('https://news.microsoft.com/facts-about-microsoft/'),
				source(
					'https://learn.microsoft.com/en-us/azure/azure-sovereign-clouds/microsoft-sovereign-cloud',
				),
			],
		},
		secNumCloud: { value: 0, sources: [SECNUMCLOUD_CATALOGUE, SECNUMCLOUD_IN_QUALIFICATION] },
		euRegions: {
			value: 1,
			sources: [source('https://learn.microsoft.com/en-us/azure/reliability/regions-list')],
		},
		costs: {
			value: 0.5,
			product: 'Cost Management, Budgets',
			sources: [
				source(
					'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis',
					RESEARCH_46,
				),
				source(
					'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/group-filter',
					RESEARCH_46,
				),
				source(
					'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets',
				),
				source('https://azure.microsoft.com/en-us/pricing/details/bandwidth/'),
			],
		},
	},
	ovhcloud: {
		kubernetes: {
			value: 1,
			product: 'Managed Kubernetes Service',
			sources: [source('https://www.ovhcloud.com/en/public-cloud/kubernetes/')],
		},
		containers: {
			value: 0,
			sources: [source('https://www.ovhcloud.com/en/public-cloud/regions-availability/')],
		},
		paas: {
			value: 0,
			sources: [source('https://community.ovhcloud.com/t/end-of-life-eol-web-paas/3526')],
		},
		europeanHeadquarters: {
			value: 1,
			sources: [source('https://www.ovhcloud.com/fr/terms-and-conditions/')],
		},
		secNumCloud: { value: 1, product: 'SNC Cloud Platform', sources: [SECNUMCLOUD_CATALOGUE] },
		euRegions: {
			value: 1,
			sources: [source('https://www.ovhcloud.com/en/public-cloud/regions-availability/')],
		},
		costs: {
			value: 0.5,
			sources: [
				source(
					'https://docs.ovhcloud.com/fr/guides/public-cloud/cross-functional/analyze-billing',
					RESEARCH_46,
				),
				source('https://www.ovhcloud.com/en-ie/public-cloud/project-management/'),
				source('https://www.ovhcloud.com/en-ie/public-cloud/prices/'),
			],
		},
	},
	scaleway: {
		kubernetes: {
			value: 1,
			product: 'Kubernetes Kapsule',
			sources: [source('https://www.scaleway.com/en/kubernetes-kapsule/')],
		},
		containers: {
			value: 1,
			product: 'Serverless Containers',
			sources: [source('https://www.scaleway.com/en/serverless-containers/')],
		},
		paas: {
			value: 0,
			sources: [
				source(
					'https://www.scaleway.com/en/docs/serverless-functions/how-to/migrate-functions-to-containers/',
				),
			],
		},
		europeanHeadquarters: {
			value: 1,
			sources: [source('https://www.scaleway.com/en/legal-notice/')],
		},
		secNumCloud: { value: 0, sources: [SECNUMCLOUD_CATALOGUE, SECNUMCLOUD_IN_QUALIFICATION] },
		euRegions: {
			value: 1,
			sources: [source('https://www.scaleway.com/en/product-availability-by-region/')],
		},
		costs: {
			value: 0.5,
			product: 'Cost Manager, Billing Alerts',
			sources: [
				source(
					'https://www.scaleway.com/en/docs/billing/how-to/use-the-cost-manager/',
					RESEARCH_46,
				),
				source('https://www.scaleway.com/en/docs/billing/how-to/use-billing-alerts/', RESEARCH_46),
				source('https://www.scaleway.com/en/pricing/virtual-instances/'),
			],
		},
	},
};

export type Rating = 'consider' | 'possible' | 'unsuitable';

/** From the best rating to the worst. */
export const RATINGS: Rating[] = ['consider', 'possible', 'unsuitable'];

// #54's thresholds and the boundary margin, in hundredths. Values are 0, ½ or 1 and weights are whole
// numbers, so a score × 100 × the sum of weights is a whole number: the comparisons have no rounding
// error, and 0.7 is exactly 0.7.
const THRESHOLDS = [70, 40];
const BOUNDARY_MARGIN = 5;

export interface Weighted {
	criterion: CriterionId;
	weight: number;
}

/** The scenario's criteria, heaviest first (ties keep the criteria's order): a bar's segments, from the bottom. */
export function criteriaOf(scenario: ScenarioId): Weighted[] {
	const { weights } = SCENARIOS.find(({ id }) => id === scenario)!;
	return CRITERIA.flatMap(({ id }) =>
		weights[id] ? [{ criterion: id, weight: weights[id] }] : [],
	).sort((a, b) => b.weight - a.weight);
}

/** Σ (value × weight) and Σ weights: the score is their ratio. */
function points(scenario: ScenarioId, provider: ProviderId) {
	const weighted = criteriaOf(scenario);
	return {
		earned: weighted.reduce(
			(sum, { criterion, weight }) => sum + FACTS[provider][criterion].value * weight,
			0,
		),
		total: weighted.reduce((sum, { weight }) => sum + weight, 0),
	};
}

/** #54's score: Σ (value × weight) / Σ weights of the scenario, from 0 to 1. */
export function score(scenario: ScenarioId, provider: ProviderId) {
	const { earned, total } = points(scenario, provider);
	return earned / total;
}

/** ≥ 0.7 worth considering · ≥ 0.4 possible · below, less suited: the k-th threshold passed gives RATINGS[k]. */
export function rating(scenario: ScenarioId, provider: ProviderId): Rating {
	const { earned, total } = points(scenario, provider);
	const passed = THRESHOLDS.findIndex((threshold) => earned * 100 >= threshold * total);
	return RATINGS[passed === -1 ? THRESHOLDS.length : passed]!;
}

export interface BoundaryCase {
	scenario: ScenarioId;
	provider: ProviderId;
	score: number;
	rating: Rating;
	/** The rating it would have on the other side of the threshold. */
	otherSide: Rating;
}

/**
 * Each provider within 0.05 of a threshold, with the rating it would have on the other side: Julien
 * reviews them before the Commercial launch (#75). The weights are never tuned to avoid a threshold.
 */
export function boundaryCases(): BoundaryCase[] {
	return SCENARIOS.flatMap(({ id: scenario }) =>
		PROVIDERS.flatMap(({ id: provider }) => {
			const { earned, total } = points(scenario, provider);
			const k = THRESHOLDS.findIndex(
				(threshold) => Math.abs(earned * 100 - threshold * total) < BOUNDARY_MARGIN * total,
			);
			if (k === -1) return [];
			// Threshold k separates RATINGS[k] (at or above it) from RATINGS[k + 1] (below it).
			const current = rating(scenario, provider);
			const otherSide = current === RATINGS[k] ? RATINGS[k + 1]! : RATINGS[k]!;
			return [{ scenario, provider, score: score(scenario, provider), rating: current, otherSide }];
		}),
	);
}
