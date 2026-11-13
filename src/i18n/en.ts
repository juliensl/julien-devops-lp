// Typed from French, the Reference language. A text still in French waits for its translation.
import type { Dictionary } from './fr';

const promise = 'Moins de bugs. Un code plus propre. Un SaaS prêt à grandir.';

export const en: Dictionary = {
	designation: 'Consultant DevOps',
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
		description: `${promise} J'automatise la qualité du code, je réduis la dette technique et je construis une infrastructure capable de suivre ta croissance.`,
		hero: {
			support:
				"J'automatise la qualité du code, je réduis la dette technique et je construis une infrastructure capable de suivre ta croissance. Tes développeurs passent moins de temps à corriger les problèmes, et plus de temps à faire évoluer ton produit.",
			note: '45 min sur Google Meet. Gratuit et sans engagement.',
		},
		whoItsFor: {
			title: 'Pour qui ?',
			intro:
				"Tu développes un SaaS ou une application web, seul ou avec une équipe ? Je m'adapte à ton stade de développement, à ton organisation et à tes contraintes techniques.",
			situations: [
				'Tu prépares un lancement et tu veux partir sur des bases solides.',
				'Ton produit est déjà en ligne et les bugs ou la maintenance ralentissent les nouveautés.',
				'Tu anticipes une montée en charge et tu veux éviter les mauvaises surprises.',
			],
			button: 'Parlons de ton projet',
		},
		todayAndAfter: {
			title: "Aujourd'hui… et après.",
			todayTitle: "Aujourd'hui",
			today: [
				'Une nouvelle fonctionnalité en casse une autre, et les clients découvrent les régressions.',
				'Tes développeurs passent trop de temps sur les bugs, les correctifs et le support.',
				"Le code obsolète s'accumule, les dépendances vieillissent et les performances se dégradent.",
				'Les tests et les déploiements reposent encore sur des vérifications manuelles.',
				"Tu manques de visibilité sur l'état réel de ton application et sur sa capacité à monter en charge.",
			],
			afterTitle: 'Après',
			after: [
				'Les régressions sont détectées plus tôt grâce aux contrôles automatisés.',
				'Les corrections et les optimisations prioritaires rendent ton code plus maintenable.',
				'Une partie de la maintenance répétitive est automatisée, pour libérer du temps de développement.',
				"Les déploiements sont plus prévisibles et l'infrastructure s'adapte à la charge prévue.",
				"Tu disposes d'indicateurs et d'alertes pour détecter les incidents au plus tôt.",
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
				"Applies when you take Scalable infrastructure and Observability (and Containerisation, if the application isn't containerised yet).",
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
			linkedin: 'See my LinkedIn profile',
		},
		testimonials: {
			title: 'What clients say',
			carousel: 'carousel',
			slide: 'testimonial',
			of: 'of',
			previous: 'Previous testimonial',
			next: 'Next testimonial',
			strip: 'Testimonials: scroll to see the others',
			translated: 'Translated from French',
			malt: 'View on Malt',
		},
		questions: {
			label: 'Questions',
			title: 'The essentials, before the Conversation.',
			byAudience: 'Questions for your role',
		},
		finalCta: {
			title: 'You never lose the infrastructure.',
			text: "Even if your team doesn't get to the tests right away, you keep a clean, documented pipeline built to market standards, ready for when you decide to go ahead.",
			conversation: '45-min conversation on Google Meet, free and with no commitment.',
			bookingNotice:
				'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
	questions: {
		menu: 'Your challenges',
		all: 'See all questions',
		count: { one: 'question', other: 'questions' },
		audiences: {
			general: {
				name: 'General questions',
				short: 'General',
				description: 'For anyone evaluating the service.',
				questions: [
					{
						question: 'What exactly do you do?',
						answer:
							'I deliver the DevOps infrastructure a SaaS needs to grow, in four blocks: CI pipeline and code audit, containerisation, scalable infrastructure and observability. You hire the ones you want, in any combination.',
					},
					{
						question: 'How long does it take?',
						answer:
							'At most 30 days, for any combination of blocks, from the start of the Implementation. The exact timeframe comes in the Intervention proposal.',
					},
					{
						question: 'How much does it cost?',
						answer:
							'A fixed price, which I give in the Intervention proposal, after the free Diagnosis.',
					},
					{
						question: 'How does it start?',
						answer:
							'With a 45 min Conversation on Google Meet. Then come the free Diagnosis, the Intervention proposal, the Implementation and the Delivery and handover.',
					},
					{
						question: 'Can I hire only some of the blocks?',
						answer:
							'Yes, in any combination. Block 3 needs a containerised application, from block 2 or from your team.',
					},
				],
			},
			cto: {
				name: 'For CTOs',
				short: 'CTO',
				description:
					'Infrastructure, CI/CD, testing, scaling, reliability, observability and working with the team.',
				questions: [
					{
						question: 'Who writes the tests?',
						answer:
							"Your team. I don't write tests: I deliver the system that runs them, measures them and blocks whatever is failing.",
					},
					{
						question: 'Do we have to stop development?',
						answer:
							'No. Block 1 involves no migration and no risk to production. In blocks 2 and 3 the work runs in parallel (branches, test environments, separate infrastructure). Some changes need coordination with the devs, and at the end of the migration a short period with no code changes may be needed, agreed with you.',
					},
					{
						question: 'Which stacks and clouds do you work with?',
						answer:
							'CI: GitHub Actions, GitLab CI, Azure DevOps and Google Cloud Build. Cloud: AWS, Google Cloud, Microsoft Azure, OVHcloud, Scaleway and Infomaniak. The choice depends on your needs and budget, and can include lower-impact hosting.',
					},
					{
						question: 'What access do you need?',
						answer:
							'For the Diagnosis, read access to the repository. Access to the cloud (metrics and logs) only if the problem is about infrastructure, performance, costs or availability. Never passwords, private keys or administrator permissions. For the Implementation, I need write access to the repository and an account on your cloud with the permissions needed to create the infrastructure of the blocks you hired. You remove that access at the Delivery and handover.',
					},
					{
						question: 'How does the Availability Guarantee work?',
						answer:
							"In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is. It applies with blocks 3 and 4, and requires a test written for every bug fixed, no dev pushing past a failing test, read access to the repository and a technical contact who replies within 48 h.",
					},
					{
						question: 'Which observability tools do you use?',
						answer: "Standard tools, such as Grafana and Prometheus, or your cloud's own.",
					},
					{
						question: 'How do we work together?',
						answer:
							'Remotely, over Google Meet. I talk with the CTO and the devs, mostly with the CTO.',
					},
				],
			},
			ceo: {
				name: 'For CEOs',
				short: 'CEO',
				description: 'Risks, costs, continuity, predictability and business impact.',
				questions: [
					{
						question: 'How much will it cost, and when will I know?',
						answer:
							'A fixed price, which I give in the Intervention proposal. The proposal comes after the free Diagnosis, which takes 2 to 3 business days from when I have access, or 3 to 5 if it includes the cloud.',
					},
					{
						question: 'What about infrastructure costs?',
						answer:
							'On top of the fixed price, the infrastructure and tools have their own monthly cost, which you pay directly to the providers, on your own accounts. The service assumes a budget of €100 to €500 a month for these costs.',
					},
					{
						question: 'Will we depend on you?',
						answer:
							'No. I only use standard technologies and document everything. You can change provider whenever you want, and you never lose the infrastructure.',
					},
					{
						question: 'What are the risks for production?',
						answer:
							"Block 1 doesn't touch production. In blocks 2 and 3, the aim is to avoid downtime; if the migration involves databases or critical services, there may be a short downtime, scheduled in advance. There is always a plan to roll back to the previous version.",
					},
					{
						question: 'What return can I expect?',
						answer:
							'Less time fixing problems. More time building the product. I help SaaS teams automate testing and delivery, catch regressions earlier and make their infrastructure more reliable, so they can grow with more confidence.',
					},
					{
						question: 'Which languages and countries do you work in?',
						answer: 'With clients from any country, remotely, in Portuguese, French or English.',
					},
				],
			},
			team: {
				name: 'For the tech team',
				short: 'Tech team',
				description:
					'Devs and tech leads who will work with the pipeline and the new infrastructure.',
				questions: [
					{
						question: "What changes in the team's day-to-day?",
						answer:
							"The aim is to cut the time lost on manual tasks and recurring problems, make regressions easier to catch and make deliveries more reliable. The team gets clearer processes, more visibility into the infrastructure and more time to focus on building the product. Results depend on each project's context and starting point.",
					},
					{
						question: 'Who maintains the pipeline afterwards?',
						answer:
							'Your team. The technical documentation and the handover at the end leave you self-sufficient.',
					},
					{
						question: 'Who do you talk to day to day?',
						answer:
							'The CTO and the devs, mostly the CTO, over Google Meet. There are no regular status meetings.',
					},
					{
						question: 'Can we keep coding during the migration?',
						answer:
							'Yes. The work runs in parallel, on branches, test environments and separate infrastructure. At the end, a short period with no code changes may be needed, agreed with you.',
					},
					{
						question: 'Which tools will we use?',
						answer:
							"Block 1: SonarQube and Trivy. Block 2: Docker. Block 3: Kubernetes and Terraform. Block 4: Grafana and Prometheus, or your cloud's own tools.",
					},
				],
			},
		},
		page: {
			description:
				'Questions and answers for SaaS CTOs, CEOs and tech teams: timelines, costs, access, risks and tools.',
			title: 'Answers for every role.',
			intro:
				"Pick your role or search for a word. If your question isn't here, ask me in the Conversation.",
			filter: 'Filter by role',
			everyone: 'All',
			search: 'Search the questions',
			searchPlaceholder: 'Search: tests, costs, access…',
			noResults: 'No questions with those words.',
			index: 'Roles',
			notFound: "Can't find your question?",
		},
	},
};
