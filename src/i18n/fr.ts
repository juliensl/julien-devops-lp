// The texts in French, the Reference language.
// Portuguese and English are typed from this file: a missing text makes `astro check` fail.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
import type { AudienceId } from '../config/audiences';
import type { CriterionId, ProviderId, Rating, ScenarioId } from '../config/cloud-providers';
import type { SourceId } from '../config/ecology';

const promise = 'Moins de bugs. Un code plus propre. Un SaaS prêt à grandir.';

type Step = { name: string; sentence: string };

type Card = { title: string; text: string };

type Block = {
	name: string;
	summary: string;
	text: string;
	tools: string[];
	/** Said after the tools, when the client's cloud can provide its own. */
	toolsAlternative?: string;
};

/** Checked as exactly 4 Blocks, then typed as such, so that any Block may leave out `toolsAlternative`. */
type Blocks = [Block, Block, Block, Block];

type Question = { question: string; answer: string };

type Audience = {
	/** The audience's heading on the questions page, and its link in the header submenu. */
	name: string;
	/** In the filter. */
	short: string;
	description: string;
	questions: Question[];
};

export const fr = {
	designation: 'Consultant DevOps',
	promise,
	bookButton: 'Réserver un échange',
	header: {
		/** Appended to the name in the logo, which links to the home page. */
		logoTarget: "page d'accueil",
		/** The name of the language switcher, for screen readers. */
		languages: 'Langue',
		/** The button that opens the menu on mobile. */
		menu: 'Menu',
		/** The submenu of the pages that help a CTO decide. */
		resources: 'Ressources',
	},
	/** The fixed button that pauses the automatic animations: its name says what a click does. */
	animation: {
		pause: "Mettre l'animation en pause",
		resume: "Reprendre l'animation",
	},
	/** The ecology page, and the links that lead to it. The texts of #54 are as validated there; the
	 * others come from prototype v3. */
	ecology: {
		/** The links to the page, with the leaf, in the header and the footer. */
		link: 'Écologie',
		/** The home page's Ecology section. */
		home: {
			title: "L'infrastructure aussi a une empreinte.",
			text: "L'endroit où tourne l'application, sa durée de fonctionnement et son efficacité changent son impact environnemental. La page écologie te permet d'estimer une charge selon le pays où elle tourne, en séparant données publiées, hypothèses et calculs.",
			link: 'Ouvrir la page écologie',
		},
		page: {
			title: 'Écologie et infrastructure',
			description:
				"Estime l'énergie et les émissions d'une charge selon le pays où elle tourne, avec le calcul complet, la méthode, les sources et les limites.",
			heading: "Les choix d'infrastructure ont aussi des conséquences environnementales.",
			intro:
				"L'endroit où tourne l'application, sa durée de fonctionnement et son efficacité font varier l'énergie qu'elle consomme et les émissions de l'électricité qu'elle utilise. Ici, tu estimes une charge selon le pays où elle tourne, avec la méthode et les sources sous les yeux.",
			/** The badge on each value: what each of the three means. */
			legend: {
				label: 'Comment lire les données de cette page',
				published: "valeur d'une base de données ou d'une étude publiques, avec année et source",
				assumption: 'hypothèse du calcul, que tu peux changer',
				calculated: 'résultat des deux précédents',
			},
		},
		/** The only three badges (#54). */
		badges: { published: 'Publié', assumption: 'Hypothèse', calculated: 'Calculé' },
		estimator: {
			label: 'Estimer une charge',
			title: 'La même application, à des endroits différents.',
			intro:
				"Choisis le pays, la charge et l'efficacité du centre de données. Le calcul suit la méthode ouverte de Cloud Carbon Footprint : énergie des processeurs × efficacité du centre de données × intensité carbone de l'électricité.",
			fields: {
				country: "Pays où tourne l'infrastructure",
				vcpu: 'Processeurs virtuels (vCPU)',
				utilisation: 'Utilisation moyenne',
				hoursPerDay: 'Heures par jour',
				pue: 'Efficacité du centre de données (PUE)',
			},
			/** Below the two fields whose first value comes from a source. */
			hints: {
				utilisation: "50 % est la valeur de CCF quand on ne connaît pas l'utilisation",
				pue: '1,52 est la moyenne du secteur en 2026 (Uptime Institute) ; le fournisseur peut indiquer celui du centre que tu utilises',
			},
			/** The name of the two results, for screen readers. */
			result: 'Résultat',
			calculation: 'Le calcul',
			comparison: 'La même charge dans chaque pays',
			/** After each number of the calculation. */
			units: {
				vcpu: 'vCPU',
				wattsPerVcpu: 'W par vCPU',
				perDay: 'par jour',
				daysPerMonth: 'jours par mois',
				kwhPerMonth: 'kWh par mois',
				kgPerMonth: 'kg CO2e par mois',
			},
			/** Where the watts per vCPU come from. */
			wattsSource: 'Cloud Carbon Footprint, processeur inconnu',
			/** The kind of intensity, after the country and Ember's year. */
			lifeCycle: 'cycle de vie',
			/** After the emissions result: the method's name, in English in every language (#54). */
			locationBased: 'location-based',
		},
		method: {
			label: 'Comment on calcule',
			title: 'Une seule méthode, expliquée.',
			cards: [
				{
					title: 'Location-based',
					text: "Cette méthode utilise la moyenne annuelle de l'électricité produite dans le pays. Elle ne tient pas compte des contrats d'énergie renouvelable : ce serait la méthode market-based, absente ici parce qu'elle demande des données contractuelles que nous n'avons pas.",
				},
				{
					title: 'Cycle de vie',
					text: "L'intensité d'Ember inclut les émissions en amont (construction des centrales, extraction et transport du combustible). Elle est donc plus élevée que si l'on comptait seulement les émissions directes de la combustion. Les deux types ne se mélangent jamais sur cette page.",
				},
				{
					title: 'Seulement les processeurs',
					text: "L'estimateur prend en compte l'énergie des vCPU et l'efficacité du centre de données. La mémoire, le stockage, le réseau et la fabrication des serveurs en sont exclus, donc la valeur réelle est plus élevée.",
				},
			] satisfies [Card, Card, Card],
		},
		/** What infrastructure can change: the title and the 4 cards validated in #54. */
		levers: {
			label: "Ce que l'infrastructure peut changer",
			title: "Plus d'efficacité, plus de visibilité.",
			cards: [
				{
					title: 'Ajuster les ressources à la charge',
					text: "Avec l'infrastructure scalable (bloc 3), les ressources suivent la charge de l'application.",
				},
				{
					title: 'Voir ce qui est consommé',
					text: "L'observabilité (bloc 4) donne de la visibilité sur l'utilisation des ressources et les coûts.",
				},
				{
					title: 'Choisir en connaissance de cause',
					text: "L'intensité carbone de l'électricité change d'un pays à l'autre, et l'estimateur montre de combien.",
				},
				{
					title: 'Hébergement à moindre impact environnemental',
					text: "Quand les besoins et le budget le permettent, c'est l'une des options que je propose.",
				},
			] satisfies [Card, Card, Card, Card],
		},
		sources: {
			title: 'Sources et limites',
			names: {
				ember: "Ember, production annuelle d'électricité par pays (intensité carbone, 2025)",
				cloudCarbonFootprint: 'Cloud Carbon Footprint, méthodologie',
				uptimeInstitute: 'Uptime Institute, PUE moyen du secteur (enquête 2026)',
				research:
					'Recherche interne sur les données environnementales des fournisseurs cloud (16/10/2026)',
			} satisfies Record<SourceId, string>,
			limits: [
				'Estimation illustrative, pas une mesure de ton infrastructure.',
				'Les watts par vCPU sont ceux de Cloud Carbon Footprint pour un processeur inconnu ; le serveur réel peut consommer plus ou moins.',
				"L'intensité est une moyenne annuelle du pays ; l'heure de la journée change la valeur réelle.",
				'Le PUE de 1,52 est la moyenne par centre de données ; pondérée par la capacité, elle est de 1,36. Les grands centres, comme ceux du cloud, ont souvent des valeurs plus basses.',
			],
		},
		back: "Retour à la page d'accueil",
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
			/** The booking button below the situations. */
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
		/** The Services: the 4 Blocks, and the note on hiring them in any combination. */
		services: {
			label: 'Services',
			title: 'Quatre couches de ton infrastructure.',
			note: 'Tu prends les blocs que tu veux, dans la combinaison de ton choix. 30 jours au maximum, à compter du début de la Mise en œuvre. Le bloc 3 demande une application conteneurisée, par le bloc 2 ou par ton équipe.',
			/** Before each Block's number: "Bloc 1". */
			blockLabel: 'Bloc',
			/** The name of each Block's list of tools, for screen readers. */
			toolsLabel: 'Outils',
			/** The 4 Blocks, in the pitch's order. A language with fewer than 4 makes `astro check` fail. */
			blocks: [
				{
					name: 'Audit du code et pipeline CI',
					summary: 'Les bugs sont attrapés à la pull request.',
					text: "Chaque modification passe par les tests, le lint et l'analyse avant d'arriver en production, avec la sécurité au premier plan : dépendances avec des failles connues, secrets oubliés dans le code et analyse du code lui-même. Ce qui est rouge ne passe pas.",
					tools: ['SonarQube', 'Trivy'],
				},
				{
					name: 'Conteneurisation',
					summary: "L'application tourne de la même façon partout.",
					text: "L'application devient indépendante de son environnement. Sur le portable d'un dev ou en production, le même comportement.",
					tools: ['Docker'],
				},
				{
					name: 'Infrastructure scalable',
					summary: "L'infrastructure suit la charge.",
					text: "Sur deux niveaux : des conteneurs serverless pour les volumes moyens, Kubernetes quand la charge le justifie. Avec l'Infrastructure as Code, l'infrastructure est décrite sous forme de code et peut être recréée.",
					tools: ['Kubernetes', 'Terraform'],
				},
				{
					name: 'Observabilité',
					summary: 'Tu vois les problèmes avant tes clients.',
					text: "Un dashboard de santé en temps réel et une alerte immédiate en cas d'incident.",
					tools: ['Grafana', 'Prometheus'],
					toolsAlternative: 'ou les outils de ton cloud',
				},
			] satisfies Blocks as Blocks,
			/** The words drawn in the Blocks' mini-diagrams, and what each one shows, for screen readers. */
			diagrams: {
				pipeline: {
					description:
						'Une modification avec une faille de sécurité est bloquée avant la production.',
					commit: 'commit',
					tests: 'tests',
					security: 'sécurité',
					production: 'production',
					blocked: 'bloqué',
				},
				containers: {
					description:
						'Le même conteneur tourne de la même façon sur le portable et en production.',
					laptop: 'portable',
					production: 'production',
				},
				scaling: {
					description: 'Les instances augmentent avec la charge, puis diminuent.',
					load: 'charge',
					instances: 'instances',
				},
				monitoring: {
					description: 'Une anomalie dans le signal déclenche une alerte immédiate.',
					dashboard: 'dashboard',
					alert: 'alerte',
				},
			},
		},
		/** The 5 Steps, in glossary order, each with one sentence. A language with fewer than 5
		 * makes `astro check` fail. */
		steps: {
			title: 'Cinq étapes, toujours dans le même ordre.',
			steps: [
				{ name: 'Échange', sentence: '45 min sur Google Meet, gratuit.' },
				{
					name: 'Diagnostic',
					sentence:
						'Gratuit. 2 à 3 jours ouvrés après réception des accès, ou 3 à 5 si le cloud est inclus.',
				},
				{
					name: "Proposition d'intervention",
					sentence: 'Quels blocs, en combien de temps et pour quel prix fixe.',
				},
				{ name: 'Mise en œuvre', sentence: '30 jours calendaires au maximum.' },
				{
					name: 'Livraison et passation',
					sentence: "Documentation et passation, pour que l'équipe soit autonome.",
				},
			] satisfies [Step, Step, Step, Step, Step],
		},
		guarantee: {
			label: 'La Garantie',
			title: 'Disponible au moins 99 % du temps, chaque mois.',
			text: "En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver.",
			appliesWhen:
				"La Garantie s'applique quand tu prends l'Infrastructure scalable et l'Observabilité (et la Conteneurisation, si l'application n'est pas encore conteneurisée).",
			conditionsTitle: 'Conditions',
			conditions: [
				'Un test écrit pour chaque bug corrigé.',
				'Aucun dev ne passe outre un test au rouge.',
				'Un accès en lecture au dépôt.',
				'Un interlocuteur technique qui répond sous 48 h.',
			],
			exclusionsTitle: 'Exclusions',
			exclusions: [
				'Les pannes du fournisseur cloud.',
				'Les modifications qui ne sont pas passées par la pipeline.',
			],
			number: '99 %',
			belowNumber: 'du temps, chaque mois',
			inService: 'en service',
			outOfService: 'au plus 1 % hors service',
			note: 'Pendant les 3 mois qui suivent la livraison.',
		},
		// «Souveraineté des données» is the name Julien approved (#46).
		/** The cloud provider chart. The names of the scenarios and criteria are #54's; the facts
		 * behind each note are in src/config/cloud-providers.ts, with their sources. */
		cloudChart: {
			label: 'Fournisseurs cloud',
			title: 'Quel cloud pour quelle entreprise ?',
			intro:
				"Choisis un scénario. Chaque barre montre quels critères de ce scénario le fournisseur remplit. C'est un repère pour l'Échange, pas un classement : aucun fournisseur n'est idéal pour toutes les entreprises.",
			/** The name of the group of scenarios, for screen readers. */
			scenariosLabel: "Scénario d'entreprise",
			scenarios: {
				beforeLaunch: {
					name: 'Avant le lancement',
					description: "Petite équipe, qui n'a pas le temps de gérer des serveurs.",
				},
				growth: {
					name: 'SaaS en croissance',
					description: "Le produit a déjà des clients et l'équipe grandit.",
				},
				dataSovereignty: {
					name: 'Souveraineté des données',
					description:
						"Les données doivent rester dans l'UE, chez un fournisseur européen, ou le secteur exige SecNumCloud.",
				},
				variableLoad: {
					name: 'Charge très variable',
					description: 'De forts pics et des périodes creuses.',
				},
				costControl: {
					name: 'Coûts maîtrisés',
					description: "Voir et maîtriser les coûts d'infrastructure à mesure que le SaaS grandit.",
				},
			} satisfies Record<ScenarioId, { name: string; description: string }>,
			criteria: {
				kubernetes: 'Kubernetes managé',
				containers: "Conteneurs avec mise à l'échelle automatique",
				paas: 'PaaS',
				europeanHeadquarters: 'Siège en Europe',
				secNumCloud: 'Offre SecNumCloud',
				euRegions: "Régions dans l'UE",
				costs: 'Visibilité et maîtrise des coûts',
			} satisfies Record<CriterionId, string>,
			/** Before a criterion's weight in the scenario: "poids 3". */
			weight: 'poids',
			/** Marks the criterion that is Julien's opinion, not a fact. */
			opinion: 'avis de Julien',
			ratings: {
				consider: 'À considérer',
				possible: 'Possible',
				unsuitable: 'Peu indiqué',
			} satisfies Record<Rating, string>,
			/** A provider's value on a criterion: 1, ½ or 0. */
			values: { yes: 'Oui', partly: 'En partie', no: 'Non' },
			hint: 'Clique sur une barre pour voir les faits.',
			/** After a label, before what it introduces: French puts a space before it. */
			colon: ' :',
			/** Before the date each source was read. */
			read: 'consultée le',
			source: 'Source',
			sources: 'Sources',
			/** The note on outbound traffic, in the cost criterion. */
			outboundTraffic: 'Trafic sortant',
			footnote:
				"Les faits viennent des pages officielles des fournisseurs et de l'ANSSI. Les poids de chaque scénario et le critère « Visibilité et maîtrise des coûts » reflètent l'avis de Julien.",
			/** What each fact says, in words. No legal claims (#54). */
			notes: {
				aws: {
					paas: 'App Runner est fermé aux nouveaux clients depuis le 30/04/2026.',
					europeanHeadquarters:
						"Siège à Seattle, États-Unis. En Europe, AWS annonce l'AWS European Sovereign Cloud, avec une région en Allemagne.",
					secNumCloud: "Absent du catalogue SecNumCloud de l'ANSSI.",
					euRegions: "6 régions dans l'UE.",
					costs:
						'Coûts par compte et par tag, avec prévision. Budgets avec alertes et actions automatiques.',
				},
				googleCloud: {
					paas: "Cloud Run déploie à partir du code source ou d'un dépôt Git.",
					europeanHeadquarters: 'Siège à Mountain View, États-Unis.',
					secNumCloud:
						'Offre de Thales avec la technologie Google Cloud, qualifiée depuis le 17/12/2025 au nom de Thales.',
					euRegions: "11 régions dans l'UE.",
					costs:
						'Coûts par projet et par tag, avec prévision. Budgets avec alertes et plafonds qui arrêtent certains services.',
				},
				infomaniak: {
					containers:
						"Pas de conteneurs serverless : Jelastic Cloud met à l'échelle des conteneurs Docker.",
					paas: 'Déploie à partir de Git.',
					europeanHeadquarters: "Siège à Genève, Suisse, hors de l'UE.",
					secNumCloud: "Absent du catalogue SecNumCloud de l'ANSSI.",
					euRegions: "Aucune région dans l'UE : les 2 régions sont en Suisse.",
					costs:
						"Pas de tableau de bord des coûts documenté, seulement une API. Pas d'alertes de budget ; des quotas de ressources par projet.",
				},
				azure: {
					europeanHeadquarters:
						'Siège à Redmond, États-Unis. En Europe, Microsoft annonce des partenaires : Bleu, en France, et Delos Cloud, en Allemagne.',
					secNumCloud:
						"Absent du catalogue SecNumCloud de l'ANSSI. Bleu, partenaire de Microsoft, est en cours de qualification.",
					euRegions: "13 régions dans l'UE, dont 2 à accès restreint.",
					costs:
						'Coûts par abonnement, par ressource et par tag, avec prévision. Budgets avec alertes seulement.',
				},
				ovhcloud: {
					containers: 'Conteneurs serverless annoncés comme « Coming soon ».',
					paas: 'Web PaaS a fermé le 31/01/2025.',
					europeanHeadquarters: 'Siège à Roubaix, France.',
					secNumCloud: '3 offres IaaS qualifiées.',
					euRegions: "7 régions dans l'UE.",
					costs:
						'Consommation par projet et par ressource, avec prévision. Tags non trouvés. Alerte sur la prévision, sans limite.',
				},
				scaleway: {
					paas: 'Non trouvé. Le plus proche : les Serverless Functions.',
					europeanHeadquarters: 'Siège à Paris, France.',
					secNumCloud:
						"En cours de qualification : pas encore dans le catalogue SecNumCloud de l'ANSSI.",
					euRegions: "4 régions dans l'UE.",
					costs:
						'Coûts par projet et par produit. Tags et prévision non trouvés. Les alertes ne font que prévenir.',
				},
			} satisfies Record<ProviderId, Partial<Record<CriterionId, string>>>,
			/** Outbound traffic to the internet, from Europe. */
			outbound: {
				aws: 'payant au-delà de 100 Go/mois.',
				googleCloud: 'payant dès le premier Go (Premium Tier).',
				infomaniak: 'inclus dans les instances.',
				azure: 'payant au-delà de 100 Go/mois.',
				ovhcloud: 'inclus dans les instances.',
				scaleway: 'inclus dans les instances.',
			} satisfies Record<ProviderId, string>,
		},
		about: {
			title: 'Qui est Julien',
			wayOfWorking:
				"Je travaille à distance, en portugais, en français et en anglais. J'utilise des technologies standard, sans lock-in, et je documente tout pour que ton équipe soit autonome.",
			linkedin: 'Voir mon profil LinkedIn',
		},
		/** The Testimonials. Their texts, authors and approvals are in src/config/testimonials.ts. */
		testimonials: {
			title: 'Ce que disent les clients',
			/** What screen readers call the carousel and each Testimonial in it. */
			carousel: 'carrousel',
			slide: 'témoignage',
			/** Between the two numbers of «1 sur 3». */
			of: 'sur',
			previous: 'Témoignage précédent',
			next: 'Témoignage suivant',
			/** The strip of Testimonials, which slides sideways. */
			strip: 'Témoignages : fais défiler pour voir les autres',
			// Never shown: in French, the page shows the authors' own text.
			translated: 'Traduit du français',
			malt: 'Voir sur Malt',
		},
		/** The Questions section: its general questions and the Audiences come from `questions`. */
		questions: {
			label: 'Questions',
			title: "L'essentiel, avant l'Échange.",
			byAudience: 'Questions pour ton profil',
		},
		finalCta: {
			title: "Tu ne perds jamais l'infrastructure.",
			text: "Même si ton équipe ne se lance pas tout de suite dans les tests, tu gardes une pipeline propre, documentée et aux standards du marché, prête pour le jour où tu décideras d'y aller.",
			conversation: 'Échange de 45 min sur Google Meet, gratuit et sans engagement.',
			// Not shown while the booking page is in French (values.ts).
			bookingNotice:
				"La page de réservation est en français, mais l'Échange peut se faire en anglais ou en portugais.",
		},
	},
	/** «Tes défis»: the questions by audience, on their page, in the header submenu and in the home
	 * page's Questions section. The 23 answers are Julien's, word for word in French; each
	 * audience is typed with its number of questions, so a language with one missing fails `astro check`. */
	questions: {
		/** The name of the page and of the header menu that leads to it. */
		menu: 'Tes défis',
		all: 'Voir toutes les questions',
		/** After a number of questions: «7 questions». The language's plural rules pick the form. */
		count: { one: 'question', other: 'questions' },
		audiences: {
			general: {
				name: 'Questions générales',
				short: 'Générales',
				description: 'Pour qui évalue le service.',
				questions: [
					{
						question: 'Que fais-tu, exactement ?',
						answer:
							"J'interviens sur quatre domaines : audit et CI/CD, nettoyage et optimisation du code, infrastructure scalable et observabilité. L'objectif est de réduire les problèmes récurrents et de permettre à l'application de grandir sur des bases plus solides. Le périmètre de chaque mission est défini après diagnostic.",
					},
					{
						question: 'Combien de temps ça prend ?',
						answer:
							"Cela dépend de l'état du code, des services existants et des travaux prioritaires. Après le diagnostic, je propose un calendrier réaliste, avec des étapes et des livrables précis. Il n'y a pas de promesse artificielle de tout réaliser en 30 jours.",
					},
					{
						question: 'Combien ça coûte ?',
						answer:
							"Le prix est défini à partir du périmètre convenu après un premier diagnostic gratuit. La proposition distingue mes honoraires des éventuels coûts récurrents de cloud et d'outils.",
					},
					{
						question: 'Comment ça commence ?',
						answer:
							"Nous commençons par un échange gratuit de 45 minutes. Viennent ensuite le diagnostic, la proposition d'intervention, la mise en œuvre avec des points d'avancement réguliers, puis la livraison et la passation à ton équipe.",
					},
					{
						question: 'Puis-je choisir seulement certains blocs ?',
						answer:
							"Oui, je peux intervenir sur un besoin ciblé. L'ordre et les dépendances techniques sont déterminés après diagnostic. La garantie de conformité technique de trois mois présentée sur ce site concerne uniquement les prestations complètes couvrant les quatre blocs.",
					},
				] satisfies [Question, Question, Question, Question, Question],
			},
			cto: {
				name: 'Pour les CTO',
				short: 'CTO',
				description:
					"Infrastructure, CI/CD, tests, montée en charge, fiabilité, observabilité et travail avec l'équipe.",
				questions: [
					{
						question: 'Qui écrit les tests ?',
						answer:
							"Je mets en place et j'améliore l'automatisation des contrôles. Lorsque des tests ou des corrections de code sont nécessaires, nous décidons ensemble qui les réalise et dans quel périmètre. Dans le bloc d'optimisation, je peux écrire ou adapter les tests liés aux modifications que je prends en charge.",
					},
					{
						question: "Faut-il arrêter le développement pendant l'intervention ?",
						answer:
							"En principe non. Le travail est organisé avec des branches, des environnements adaptés et des validations progressives. Certaines migrations ou modifications critiques peuvent exiger une fenêtre de changement planifiée avec l'équipe.",
					},
					{
						question: 'Avec quelles stacks et quels clouds travailles-tu ?',
						answer:
							"J'utilise notamment GitHub Actions, GitLab CI, Terraform, Docker, Kubernetes, Grafana et les services natifs des clouds. Je travaille avec AWS, Google Cloud, Azure, Scaleway, OVHcloud et d'autres fournisseurs selon le projet. Les outils sont choisis en fonction du contexte, pas imposés à l'avance.",
					},
					{
						question: 'De quels accès as-tu besoin ?',
						answer:
							"Pour le diagnostic, des accès en lecture au code et, si nécessaire, aux métriques et à la configuration cloud. Pour l'implémentation, des droits adaptés aux opérations convenues. Je privilégie des accès nominatifs, limités au strict nécessaire et révocables à la fin de la mission. Il n'est pas nécessaire de partager des mots de passe ou des clés privées.",
					},
					{
						question: 'Que couvre la garantie de trois mois ?',
						answer:
							"Pour une prestation complète couvrant les quatre blocs, elle concerne les défauts de conception ou de configuration de l'infrastructure qui me sont imputables, selon les conditions contractuelles. L'objectif de disponibilité est défini avec le client. Il ne s'agit ni d'une garantie de zéro bug applicatif, ni d'une astreinte 24 h/24.",
					},
					{
						question: "Quels outils utilises-tu pour l'observabilité ?",
						answer:
							"Selon le contexte, Grafana, Prometheus, des solutions de logs et de tracing, ou les outils de supervision natifs du fournisseur cloud. Le but est de disposer d'indicateurs utiles et d'alertes exploitables, plutôt que de multiplier les dashboards.",
					},
					{
						question: 'Comment travaillons-nous ensemble ?',
						answer:
							"J'échange directement avec les personnes concernées : CTO, tech lead, développeurs et responsable du projet. Nous organisons des points d'avancement réguliers, généralement chaque semaine, et nous documentons les décisions importantes.",
					},
				] satisfies [Question, Question, Question, Question, Question, Question, Question],
			},
			ceo: {
				name: 'Pour les CEO',
				short: 'CEO',
				description: 'Risques, coûts, continuité, prévisibilité et impact sur le business.',
				questions: [
					{
						question: "Quand connaîtrai-je le budget de l'intervention ?",
						answer:
							'Après le diagnostic gratuit, tu reçois une proposition précisant les travaux, le calendrier et le prix de mon intervention. Les éventuels coûts mensuels des fournisseurs sont présentés séparément.',
					},
					{
						question: 'Combien coûtera le cloud ensuite ?',
						answer:
							"Le coût dépend de l'architecture, du trafic, des données, de la région et du niveau de disponibilité recherché. Je présente une estimation argumentée avant les décisions structurantes, avec les hypothèses et les principaux postes de dépenses.",
					},
					{
						question: 'Mon entreprise va-t-elle dépendre de toi ?',
						answer:
							"Mon objectif est l'inverse : je privilégie des technologies documentées, une infrastructure décrite comme du code et une passation claire. Les dépendances propres au fournisseur choisi sont expliquées dès la conception.",
					},
					{
						question: 'Y a-t-il un risque pour la production ?',
						answer:
							"Toute intervention présente des risques, mais ils sont évalués avant l'exécution. Nous préparons les tests, les sauvegardes et, lorsque c'est pertinent, un plan de retour arrière. Les changements sensibles sont coordonnés avec ton équipe.",
					},
					{
						question: 'Quel retour sur investissement puis-je attendre ?',
						answer:
							'Moins de temps perdu sur les incidents et les tâches répétitives, un code plus maintenable et des déploiements plus fiables. Les gains exacts dépendent de la situation de départ ; le diagnostic sert aussi à identifier les améliorations à plus forte valeur.',
					},
					{
						question: 'Dans quelles langues travailles-tu ?',
						answer:
							"Je peux intervenir en français, en anglais et en portugais, selon les besoins de l'équipe et du projet.",
					},
				] satisfies [Question, Question, Question, Question, Question, Question],
			},
			team: {
				name: "Pour l'équipe technique",
				short: 'Équipe technique',
				description:
					'Les devs et tech leads qui vont travailler avec la pipeline et la nouvelle infrastructure.',
				questions: [
					{
						question: "Qu'est-ce qui change au quotidien ?",
						answer:
							"Des contrôles automatisés plus utiles, moins de tâches manuelles, une meilleure visibilité sur les problèmes et un code progressivement plus simple à maintenir. Les modifications de workflow sont préparées avec l'équipe, pas imposées sans discussion.",
					},
					{
						question: 'Qui maintient les pipelines après ton départ ?',
						answer:
							'Ton équipe conserve les outils, les configurations et la documentation. Je prévois une passation pour que leur fonctionnement soit compris et que les évolutions puissent être réalisées en autonomie.',
					},
					{
						question: 'Avec qui communiques-tu pendant la mission ?',
						answer:
							'Avec les interlocuteurs techniques et métier utiles au projet. Nous prévoyons un point de suivi régulier, normalement hebdomadaire, et des échanges complémentaires lorsque des décisions ou des validations sont nécessaires.',
					},
					{
						question: 'Peut-on continuer à développer pendant les changements ?',
						answer:
							"Oui, l'objectif est de préserver le rythme de développement. Les modifications sont préparées et testées en parallèle lorsque c'est possible. Une fenêtre de stabilisation ou de migration peut être convenue pour les changements sensibles.",
					},
					{
						question: 'Quels outils allons-nous utiliser ?',
						answer:
							"Il n'y a pas de stack imposée. Selon le projet : pipelines CI/CD, analyse de code, outils de refactoring et de performance, Docker, services de conteneurs managés, Kubernetes, Terraform, Grafana, Prometheus ou équivalents. Je privilégie les outils pertinents pour l'équipe et l'existant.",
					},
				] satisfies [Question, Question, Question, Question, Question],
			},
		} satisfies Record<AudienceId, Audience>,
		page: {
			description:
				"Questions et réponses pour les CEO, les CTO et les développeurs : le code, l'infrastructure, les coûts et notre façon de travailler.",
			title: 'Des réponses concrètes, selon ton rôle.',
			intro:
				"Tu es CEO, CTO, développeur ou tu portes le projet seul ? Retrouve les réponses aux questions les plus fréquentes sur le code, l'infrastructure, les coûts et notre façon de travailler. Et si ta question n'est pas ici, parlons-en.",
			/** The name of the filter by audience, for screen readers. */
			filter: 'Filtrer par profil',
			/** The filter's first choice: every audience. */
			everyone: 'Toutes',
			/** The name of the search field, for screen readers. */
			search: 'Chercher dans les questions',
			searchPlaceholder: 'Chercher : tests, coûts, accès…',
			noResults: 'Aucune question avec ces mots.',
			/** The name of the index of audiences, for screen readers. */
			index: 'Profils',
			notFound: 'Tu ne trouves pas ta réponse ?',
			/** Under «notFound», before the button. */
			notFoundText: 'Réserve un échange gratuit et parlons de ton contexte.',
		},
	},
};

export type Dictionary = typeof fr;
