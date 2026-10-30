// Translated from Portuguese, to be reviewed by the intern before the Commercial launch (#75).
// The Designation is the one Julien approved.
import type { Dictionary } from './pt';

const promise = 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.';

export const en: Dictionary = {
	designation: 'Freelance DevOps consultant for SaaS',
	promise,
	bookButton: 'Book a conversation',
	header: {
		logoTarget: 'home page',
		languages: 'Language',
		menu: 'Menu',
	},
	animation: {
		pause: 'Pause animation',
		resume: 'Resume animation',
	},
	ecology: {
		link: 'Ecology',
		home: {
			title: 'Infrastructure has a footprint too.',
			text: 'Where the application runs, how long it runs and how efficiently all change its environmental impact. The ecology page lets you estimate a workload by the country it runs in, keeping published data, assumptions and calculations apart.',
			link: 'Open the ecology page',
		},
		page: {
			title: 'Ecology and infrastructure',
			description:
				'Estimate the energy and emissions of a workload by the country it runs in, with the full calculation, the method, the sources and the limits.',
			heading: 'Infrastructure choices have environmental consequences too.',
			intro:
				'Where the application runs, how long it runs and how efficiently all change the energy it uses and the emissions of the electricity behind it. Here you estimate a workload by the country it runs in, with the method and the sources in plain sight.',
			legend: {
				label: 'How to read the data on this page',
				published: 'a value from a public database or study, with its year and source',
				assumption: 'an assumption of the calculation, which you can change',
				calculated: 'the result of the two above',
			},
		},
		badges: { published: 'Published', assumption: 'Assumption', calculated: 'Calculated' },
		estimator: {
			label: 'Estimate a workload',
			title: 'The same application, in different places.',
			intro:
				"Choose the country, the load and the data centre's efficiency. The calculation follows the open Cloud Carbon Footprint method: processor energy × data centre efficiency × carbon intensity of the electricity.",
			fields: {
				country: 'Country where the infrastructure runs',
				vcpu: 'Virtual processors (vCPU)',
				utilisation: 'Average utilisation',
				hoursPerDay: 'Hours per day',
				pue: 'Data centre efficiency (PUE)',
			},
			hints: {
				utilisation: '50% is the CCF value when the utilisation is unknown',
				pue: '1.52 is the 2026 industry average (Uptime Institute); your provider can give the figure for the data centre you use',
			},
			result: 'Result',
			calculation: 'The calculation',
			comparison: 'The same workload in each country',
			units: {
				vcpu: 'vCPU',
				wattsPerVcpu: 'W per vCPU',
				perDay: 'per day',
				daysPerMonth: 'days per month',
				kwhPerMonth: 'kWh per month',
				kgPerMonth: 'kg CO2e per month',
			},
			wattsSource: 'Cloud Carbon Footprint, unknown processor',
			lifeCycle: 'life cycle',
			locationBased: 'location-based',
		},
		method: {
			label: 'How it is calculated',
			title: 'One method, explained.',
			cards: [
				{
					title: 'Location-based',
					text: 'Uses the yearly average of the electricity generated in the country. It does not count renewable energy contracts: that would be the market-based method, which is not shown here because it needs contract data we do not have.',
				},
				{
					title: 'Life cycle',
					text: "Ember's intensity includes upstream emissions (building the power plants, extracting and transporting the fuel). That is why it is higher than counting only the direct emissions from burning. The two kinds are never mixed on this page.",
				},
				{
					title: 'Processors only',
					text: "The estimator counts the energy of the vCPUs and the data centre's efficiency. Memory, storage, network and server manufacturing are left out, so the real figure is higher.",
				},
			],
		},
		levers: {
			label: 'What infrastructure can change',
			title: 'More efficiency, more visibility.',
			cards: [
				{
					title: 'Matching resources to the load',
					text: "With scalable infrastructure (block 3), resources follow the application's load.",
				},
				{
					title: 'Seeing what is used',
					text: 'Observability (block 4) gives visibility into resource use and costs.',
				},
				{
					title: 'Choosing with information',
					text: 'The carbon intensity of electricity changes from country to country, and the estimator shows by how much.',
				},
				{
					title: 'Lower-impact hosting',
					text: 'When the needs and the budget allow it, it is one of the options I propose.',
				},
			],
		},
		sources: {
			title: 'Sources and limits',
			names: {
				ember: 'Ember, yearly electricity generation by country (carbon intensity, 2025)',
				cloudCarbonFootprint: 'Cloud Carbon Footprint, methodology',
				uptimeInstitute: 'Uptime Institute, industry average PUE (2026 survey)',
				research: "Own research on cloud providers' environmental data (16/10/2026)",
			},
			limits: [
				'An illustrative estimate, not a measurement of your infrastructure.',
				"The watts per vCPU are Cloud Carbon Footprint's for an unknown processor; the real server may use more or less.",
				"The intensity is the country's yearly average; the time of day changes the real figure.",
				'The PUE of 1.52 is the average per data centre; weighted by capacity, it is 1.36. Large data centres, like the cloud ones, tend to have lower values.',
			],
		},
		back: 'Back to the home page',
	},
	homePage: {
		description: `${promise} For CTOs of growing SaaS companies.`,
		hero: {
			support:
				'Bugs get caught in the pull request, not by your customers. And your devs get back to coding instead of doing support.',
			note: '45-min conversation on Google Meet, free of charge.',
		},
		whoItsFor: {
			title: "Who it's for",
			profile: [
				'A web or mobile SaaS, already launched.',
				'Growing from tens or hundreds to thousands of recurring users.',
				'A team of usually 5 to 20 people, with at least 3 devs.',
			],
			notLaunchedYet: "Haven't launched your SaaS yet? You can still book the conversation.",
			exclusionsTitle: 'Not for',
			exclusions: [
				'Teams that already have a CI pipeline, a containerised application and auto-scaling infrastructure.',
				"Anything that isn't web or mobile.",
				'Teams that turn down €100 to €500 a month for services and infrastructure.',
				'The military sector.',
			],
		},
		todayAndAfter: {
			title: 'Today, and after.',
			todayTitle: 'Today',
			today: [
				{
					title: 'One feature breaks another.',
					text: "Regressions have become normal, and it's your customers who find them.",
				},
				{ title: 'Your devs do support.', text: 'They answer tickets instead of coding.' },
				{
					title: 'Testing is done by hand.',
					text: "Whole days of it, by people for whom it isn't the job.",
				},
				{
					title: 'Nobody knows if it will hold.',
					text: "It works with today's customers. With many more, nobody can say.",
				},
			],
			alreadyTriedTitle: "What you've already tried",
			alreadyTried: [
				'A DevOps freelancer who only executes, without bringing expertise.',
				'Testing by hand, or getting an intern to do it.',
				'Test tools that devs have to run locally, and never do.',
				'Asking a dev to learn DevOps: weeks lost, and a poor result.',
				'Freelancers who each code their own way: every departure takes the knowledge with it.',
			],
			afterTitle: 'After',
			after: [
				'Bugs get caught in the pull request, not by your customers.',
				'Your devs get back the days they spent on support.',
				'Your team grows without fear of a junior breaking production.',
				'You add features without breaking others.',
				'The infrastructure keeps up with the load, and you see problems before your customers do.',
			],
		},
		services: {
			label: 'Services',
			title: 'Four layers of your infrastructure.',
			note: 'You hire the blocks you want, in any combination. At most 30 days from the start of the Implementation. Block 3 needs a containerised application, from block 2 or from your team.',
			blockLabel: 'Block',
			toolsLabel: 'Tools',
			blocks: [
				{
					name: 'CI pipeline and code audit',
					summary: 'Bugs stay in the pull request.',
					text: 'Every change goes through tests, lint and analysis before it reaches production, with security up front: dependencies with known vulnerabilities, secrets left in the code, and analysis of the code itself. Whatever is red does not get through.',
					tools: ['SonarQube', 'Trivy'],
				},
				{
					name: 'Containerisation',
					summary: 'The application runs the same everywhere.',
					text: "The application no longer depends on the environment it runs in. On a developer's laptop or in production, it behaves the same.",
					tools: ['Docker'],
				},
				{
					name: 'Scalable infrastructure',
					summary: 'The infrastructure keeps up with the load.',
					text: 'At two levels: serverless containers for medium volumes, Kubernetes when the load justifies it. With Infrastructure as Code, the infrastructure is described in code and can be recreated.',
					tools: ['Kubernetes', 'Terraform'],
				},
				{
					name: 'Observability',
					summary: 'You see problems before your customers do.',
					text: 'A real-time health dashboard and an immediate alert when there is an incident.',
					tools: ['Grafana', 'Prometheus'],
					toolsAlternative: "or your cloud's own tools",
				},
			],
			diagrams: {
				pipeline: {
					description: 'A change with a security flaw is blocked before production.',
					commit: 'commit',
					tests: 'tests',
					security: 'security',
					production: 'production',
					blocked: 'blocked',
				},
				containers: {
					description: 'The same container runs the same way on the laptop and in production.',
					laptop: 'laptop',
					production: 'production',
				},
				scaling: {
					description: 'The instances increase with the load, then decrease again.',
					load: 'load',
					instances: 'instances',
				},
				monitoring: {
					description: 'An anomaly in the signal triggers an immediate alert.',
					dashboard: 'health dashboard',
					alert: 'alert',
				},
			},
		},
		steps: {
			title: 'Five steps, always in the same order.',
			steps: [
				{ name: 'Conversation', sentence: '45 min on Google Meet, free of charge.' },
				{
					name: 'Diagnosis',
					sentence:
						'Free. 2 to 3 business days once access is granted, or 3 to 5 if it includes the cloud.',
				},
				{
					name: 'Intervention proposal',
					sentence: 'Which blocks, in what timeframe and at what fixed price.',
				},
				{ name: 'Implementation', sentence: 'At most 30 calendar days.' },
				{
					name: 'Delivery and handover',
					sentence: 'Documentation and handover, so the team can be self-sufficient.',
				},
			],
		},
		guarantee: {
			label: 'The Guarantee',
			title: 'Available at least 99% of the time, every month.',
			text: "In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is.",
			appliesWhen:
				"Applies when you take blocks 3 and 4 (and 2, if the application isn't containerised yet).",
			conditionsTitle: 'Conditions',
			conditions: [
				'A test written for every bug fixed.',
				'No dev pushes past a failing test.',
				'Read access to the repository.',
				'A technical contact who replies within 48 h.',
			],
			exclusionsTitle: 'Exclusions',
			exclusions: ['Cloud provider outages.', "Changes that didn't go through the pipeline."],
			number: '99%',
			belowNumber: 'of the time, every month',
			inService: 'in service',
			outOfService: 'at most 1% out of service',
			note: 'For the 3 months after delivery.',
		},
		cloudChart: {
			label: 'Cloud providers',
			title: 'Which cloud for which company?',
			intro:
				"Pick a scenario. Each bar shows which of the scenario's criteria the provider meets. It is a starting point for the Conversation, not a ranking: no provider is ideal for every company.",
			scenariosLabel: 'Company scenario',
			scenarios: {
				beforeLaunch: {
					name: 'Before launch',
					description: 'A small team, with no time to run servers.',
				},
				growth: {
					name: 'Growing SaaS',
					description: 'The product already has customers and the team is growing.',
				},
				dataSovereignty: {
					name: 'Data sovereignty',
					description:
						'Data must stay in the EU, with a European provider, or the sector requires SecNumCloud.',
				},
				variableLoad: {
					name: 'Highly variable load',
					description: 'Strong peaks and quiet periods.',
				},
				costControl: {
					name: 'Costs under control',
					description: 'See and control infrastructure costs as the SaaS grows.',
				},
			},
			criteria: {
				kubernetes: 'Managed Kubernetes',
				containers: 'Autoscaling containers',
				paas: 'PaaS',
				europeanHeadquarters: 'Headquarters in Europe',
				secNumCloud: 'SecNumCloud offering',
				euRegions: 'EU regions',
				costs: 'Cost visibility and control',
			},
			weight: 'weight',
			opinion: "Julien's opinion",
			ratings: { consider: 'Worth considering', possible: 'Possible', unsuitable: 'Less suited' },
			values: { yes: 'Yes', partly: 'Partly', no: 'No' },
			hint: 'Click a bar to see the facts.',
			colon: ':',
			read: 'read on',
			source: 'Source',
			sources: 'Sources',
			outboundTraffic: 'Outbound traffic',
			footnote:
				'The facts come from the official pages of the providers and of the ANSSI. The weights of each scenario and the "Cost visibility and control" criterion are Julien\'s opinion.',
			notes: {
				aws: {
					paas: 'App Runner closed to new customers on 30 April 2026.',
					europeanHeadquarters:
						'Headquarters in Seattle, USA. In Europe, it announces the AWS European Sovereign Cloud, with one region in Germany.',
					secNumCloud: "Not in the ANSSI's SecNumCloud catalogue.",
					euRegions: '6 regions in the EU.',
					costs:
						'Costs by account and by tag, with a forecast. Budgets with alerts and automatic actions.',
				},
				googleCloud: {
					paas: 'Cloud Run deploys from source code or from a Git repository.',
					europeanHeadquarters: 'Headquarters in Mountain View, USA.',
					secNumCloud:
						"Thales's offering, built on Google Cloud technology, qualified since 17 December 2025 in Thales's name.",
					euRegions: '11 regions in the EU.',
					costs:
						'Costs by project and by label, with a forecast. Budgets with alerts and caps that stop some services.',
				},
				infomaniak: {
					containers: 'No serverless containers: Jelastic Cloud scales Docker containers.',
					paas: 'Deploys from Git.',
					europeanHeadquarters: 'Headquarters in Geneva, Switzerland, outside the EU.',
					secNumCloud: "Not in the ANSSI's SecNumCloud catalogue.",
					euRegions: 'No region in the EU: its 2 regions are in Switzerland.',
					costs:
						'No documented cost dashboard, only an API. No budget alerts; resource quotas per project.',
				},
				azure: {
					europeanHeadquarters:
						'Headquarters in Redmond, USA. In Europe, it announces partners: Bleu, in France, and Delos Cloud, in Germany.',
					secNumCloud:
						"Not in the ANSSI's SecNumCloud catalogue. Bleu, a Microsoft partner, is being qualified.",
					euRegions: '13 regions in the EU, 2 of them with restricted access.',
					costs:
						'Costs by subscription, by resource and by tag, with a forecast. Budgets with alerts only.',
				},
				ovhcloud: {
					containers: 'Serverless containers announced as "Coming soon".',
					paas: 'Web PaaS closed on 31 January 2025.',
					europeanHeadquarters: 'Headquarters in Roubaix, France.',
					secNumCloud: '3 qualified IaaS offerings.',
					euRegions: '7 regions in the EU.',
					costs:
						'Usage by project and by resource, with a forecast. Tags not found. An alert on the forecast, with no limit.',
				},
				scaleway: {
					paas: 'Not found. The closest are Serverless Functions.',
					europeanHeadquarters: 'Headquarters in Paris, France.',
					secNumCloud: "Being qualified: not yet in the ANSSI's SecNumCloud catalogue.",
					euRegions: '4 regions in the EU.',
					costs: 'Costs by project and by product. Tags and forecast not found. Alerts only warn.',
				},
			},
			outbound: {
				aws: 'paid beyond 100 GB/month.',
				googleCloud: 'paid from the first GB (Premium Tier).',
				infomaniak: 'included with instances.',
				azure: 'paid beyond 100 GB/month.',
				ovhcloud: 'included with instances.',
				scaleway: 'included with instances.',
			},
		},
		about: {
			title: 'Who is Julien',
			wayOfWorking:
				'I work remotely, in Portuguese, French and English. I use standard technologies, with no lock-in, and document everything so your team can run on its own.',
		},
		finalCta: {
			title: 'You never lose the infrastructure.',
			text: "Even if your team doesn't get to the tests right away, you keep a clean, documented pipeline built to market standards, ready for when you decide to go ahead.",
			conversation: '45-min conversation on Google Meet, free and with no commitment.',
			bookingNotice:
				'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
};
