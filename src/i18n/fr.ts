// The texts in French, the Reference language.
// Portuguese and English are typed from this file: a missing text makes `astro check` fail.
// The texts carry no HTML: links, bold text and non-breaking spaces are added in the components.
import type { AudienceId } from '../config/audiences';
import type { LevelId } from '../config/availability';
import type { CriterionId, ProviderId, Rating, ScenarioId } from '../config/cloud-providers';
import type { SourceId } from '../config/ecology';
import type { ColumnId, Law, NOTE_SOURCES, Placement } from '../config/sovereignty';

const promise = 'Moins de bugs. Un code plus propre. Un SaaS prêt à grandir.';

type Step = { name: string; sentence: string };

type Card = { title: string; text: string };

type Block = {
	name: string;
	summary: string;
	text: string;
	tools: string[];
	/** Said after the tools, in plain text: what the list leaves open. */
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
	/** The «Choisir son cloud» page: Julien's introduction, the cloud provider chart and the button. */
	cloud: {
		/** The page's entry in the «Ressources» submenu. */
		link: 'Choisir son cloud',
		page: {
			title: 'Quel cloud choisir pour ton entreprise ?',
			description:
				'Le meilleur cloud dépend de ton produit, de ton équipe, de ta croissance, de ton budget et de tes contraintes réglementaires. Compare les fournisseurs selon tes priorités.',
			intro:
				'Le meilleur cloud dépend de ton produit, de ton équipe, de ta croissance, de ton budget et de tes contraintes réglementaires. Compare les options selon ton contexte, plutôt que de choisir un fournisseur uniquement sur sa notoriété.',
			/** The end of the page, beside the button. */
			cta: {
				title: 'Tu hésites entre plusieurs architectures ?',
				text: 'Parlons de ton projet et comparons les options adaptées à tes contraintes.',
			},
		},
		/** The cloud provider chart. The facts behind each note are in src/config/cloud-providers.ts,
		 * with their sources. */
		chart: {
			title: 'Compare les fournisseurs selon tes priorités',
			instruction:
				'Choisis un scénario pour voir les points forts, les limites et les sources officielles de chaque fournisseur.',
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
					name: 'Maîtrise des coûts',
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
			/** Below the chart. */
			legend:
				'Les résultats sont des repères pour préparer une décision, pas un classement universel. Les critères et leur importance peuvent varier selon le projet. Les données sont datées et les évaluations de pertinence sont indicatives.',
			footnote:
				"Les faits viennent des pages officielles des fournisseurs et de l'ANSSI. Les poids de chaque scénario et le critère « Visibilité et maîtrise des coûts » reflètent l'avis de Julien.",
			/** Before the day the facts were checked. */
			verified: 'Faits vérifiés le',
			/** What each fact says, in words. No legal claims. */
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
	},
	/** The ecology page, and the links that lead to it. */
	ecology: {
		/** The links to the page, with the leaf, in the header and the footer. */
		link: 'Écologie',
		/** The home page's Ecology section. */
		home: {
			title: "Un cloud plus efficace, c'est aussi un numérique plus responsable.",
			text: "Le choix du datacenter, l'architecture et la qualité du code influencent la consommation de ressources. Compare les solutions, découvre les données disponibles et comprends comment réduire les dépenses inutiles et l'empreinte de ton application.",
			link: "Explorer l'impact environnemental",
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
		/** The only three badges. */
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
			/** After the emissions result: the method's name, in English in every language. */
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
		/** What infrastructure can change: the title and the 4 cards. */
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
	/** The data sovereignty page, in «Ressources». */
	sovereignty: {
		/** The page's name, in «Ressources» and in its title. */
		name: 'Souveraineté des données',
		description:
			'Héberger une application en Europe ne suffit pas à comprendre où circulent les données. La souveraineté se construit par des choix techniques, contractuels et organisationnels.',
		title: 'Tes données sont-elles vraiment sous ton contrôle ?',
		intro:
			'Héberger une application en Europe ne suffit pas, à lui seul, à comprendre où circulent les données ni quels prestataires peuvent y accéder. La souveraineté se construit par des choix techniques, contractuels et organisationnels.',
		sections: [
			{
				title: 'Hébergement européen : une première étape, pas une réponse complète.',
				text: "La localisation des serveurs compte, mais il faut aussi regarder la société qui fournit le service, les sous-traitants, les sauvegardes, la supervision, les accès d'administration et les services externes utilisés par l'application.",
			},
			{
				title: 'Les données ne restent pas forcément là où tourne ton serveur.',
				text: "Un outil d'analyse, un système de logs, un CDN, un service d'authentification, une solution d'e-mail ou une API d'intelligence artificielle peut traiter certaines données hors de ton hébergement principal. Cartographier ces flux permet de détecter les transferts et les dépendances que l'on oublie facilement.",
			},
			{
				title: 'Fournisseur français, européen ou international : quelles différences ?',
				text: "Le bon choix dépend de tes obligations, des fonctionnalités nécessaires et des garanties contractuelles offertes. Un fournisseur européen n'offre pas automatiquement toutes les garanties attendues, et une région européenne d'un fournisseur international ne règle pas à elle seule toutes les questions juridiques.",
			},
			{
				title: 'Réglementation, contrats et protections techniques.',
				text: "RGPD, transferts internationaux, règles de juridiction, chiffrement et contrôle des accès doivent être examinés ensemble. Le CLOUD Act américain peut compter dans l'analyse de certains fournisseurs, mais son existence ne signifie pas que toutes les données hébergées auprès de ces entreprises sont librement accessibles. Les exigences sectorielles, comme SecNumCloud lorsqu'elles s'appliquent, doivent être vérifiées dans les référentiels officiels.",
			},
			{
				title: 'Une architecture adaptée à tes contraintes de souveraineté.',
				text: "Je t'aide à identifier les dépendances techniques, à comparer les options d'hébergement et à intégrer les contraintes de localisation, de sécurité et de réversibilité dans l'architecture. Pour les conclusions juridiques et réglementaires, l'analyse doit être validée par les spécialistes compétents.",
			},
		] satisfies [Card, Card, Card, Card, Card],
		/** The booking button at the end of the page. */
		cta: 'Parlons de la souveraineté de ton infrastructure',
		/** Under the table: Switzerland and the European Union. Legal content, reviewed before release. */
		switzerland: {
			text: "La Suisse ne fait pas partie de l'Union européenne. La Commission européenne reconnaît toutefois qu'elle assure un niveau de protection adéquat des données personnelles : des données personnelles peuvent y être transférées depuis l'UE sans garantie supplémentaire. Cela ne remplace pas le reste de l'analyse : contrat, sous-traitants, accès.",
			sources: {
				euMembers: 'Union européenne, les 27 pays membres',
				notMember: 'Confédération suisse (DFAE), accords bilatéraux',
				adequacy: "Commission européenne, décisions d'adéquation",
				decision: 'Décision 2000/518/CE',
			} satisfies Record<keyof typeof NOTE_SOURCES.switzerland, string>,
		},
		/** In the fourth section: the CLOUD Act and the Patriot Act. Legal content, reviewed before release. */
		cloudAct: {
			text: "Le CLOUD Act et le Patriot Act ne sont pas synonymes. Le Patriot Act est une loi antiterroriste américaine de 2001. Le CLOUD Act, adopté en 2018, prévoit qu'un fournisseur soumis au droit américain doit communiquer, sur demande légale des autorités américaines, les données qu'il a en sa possession ou sous son contrôle, qu'elles soient stockées aux États-Unis ou ailleurs. Une entreprise non américaine peut aussi y être soumise si elle a des liens suffisants avec les États-Unis : cela s'apprécie au cas par cas.",
			sources: {
				statute: '18 U.S.C. § 2713 (CLOUD Act)',
				whitePaper: 'Département de la Justice des États-Unis, livre blanc sur le CLOUD Act',
				patriotAct: 'Public Law 107-56 (USA PATRIOT Act)',
			} satisfies Record<keyof typeof NOTE_SOURCES.cloudAct, string>,
		},
		/** Before the sources of a note. */
		sources: 'Sources',
		/** The table of providers, in the third section. */
		table: {
			caption:
				"Ce que disent les sources officielles sur le cloud public standard de quelques fournisseurs, par ordre alphabétique. Ce n'est pas un classement : vérifie chaque point pour ton offre et ton contrat.",
			columns: {
				provider: 'Fournisseur',
				headquarters: 'Pays du siège',
				zones: "Zones d'hébergement",
				contract: 'Juridiction du contrat',
				backupsAndLogs: 'Sauvegardes et logs',
				certifications: "Certifications de l'offre",
				references: 'Références officielles',
			},
			/** After a label, before what it introduces: French puts a space before it. */
			colon: ' :',
			/** A value no official source states. */
			notDisclosed: 'non communiqué',
			/** Before the country of the provider's group. */
			group: 'Groupe',
			eu: 'UE',
			outsideEu: 'Hors UE',
			/** When the provider also has regions outside Europe. */
			elsewhere: "Aussi hors d'Europe",
			laws: {
				CH: 'Droit suisse',
				DE: 'Droit allemand',
				FR: 'Droit français',
				IE: 'Droit irlandais',
				LU: 'Droit luxembourgeois',
				'US-CA': 'Droit de la Californie (États-Unis)',
			} satisfies Record<Law, string>,
			backups: 'Sauvegardes',
			logs: 'Logs',
			placements: {
				chosenRegion: 'dans la région choisie (ailleurs seulement si tu le configures)',
				chosenCountry: 'dans le pays choisi',
				inEu: "dans l'UE si l'emplacement choisi y est, parfois sur un autre site",
				otherRegionByDefault: 'par défaut, aussi dans une autre région (modifiable)',
				partlyElsewhere: "une partie peut être hors de l'emplacement choisi",
			} satisfies Record<Placement, string>,
			/** Before the days the row's sources were read. */
			read: 'Consultées le',
			/** Before each reference: the columns whose values it gives. */
			references: {
				headquarters: 'Siège',
				zones: 'Zones',
				contract: 'Contrat',
				backups: 'Sauvegardes',
				logs: 'Logs',
				certifications: 'Certifications',
			} satisfies Record<ColumnId, string>,
		},
	},
	/** The availability page: the levels, the calculator and the guarantee. */
	availability: {
		/** In the «Ressources» menu, above the heading and in the browser's title. */
		title: 'Disponibilité & conditions',
		description:
			"Compare les niveaux de disponibilité, calcule ton temps d'indisponibilité théorique et consulte les conditions de la garantie de conformité.",
		heading: 'Quel niveau de disponibilité pour ton SaaS ?',
		intro:
			"Un objectif de disponibilité se choisit selon l'impact réel d'une interruption sur ton activité. Plus l'objectif est élevé, plus l'architecture, la redondance et l'exploitation peuvent devenir exigeantes et coûteuses. Compare les niveaux avant de décider.",
		calculator: {
			title: "Calcule ton temps d'indisponibilité théorique",
			text: "Choisis un objectif de disponibilité et découvre ce qu'il représente en minutes par mois et en heures par an. Ces valeurs sont indicatives : un objectif d'architecture ne garantit pas, à lui seul, la disponibilité de toute l'application.",
			/** The name of the choice of level, and of the chosen level in the result. */
			objective: 'Objectif de disponibilité',
			/** The name of the choice of 28, 30 or 31 days. */
			month: 'Durée du mois',
			/** After a number of days: "30 jours". */
			days: 'jours',
			/** The result's title, above the month's and the year's downtime. */
			result: 'Indisponibilité maximale théorique',
			perMonth: 'Par mois',
			perYear: 'Équivalent annuel',
			/** Before a downtime rounded to the second, in place of "≈", which the font lacks. */
			about: 'environ',
			formula:
				'Formule, pour une mesure 24 h/24 : (1 − objectif / 100) × durée de la période en secondes, sur le mois choisi ou sur une année de 365 jours.',
		},
		/** Each level's name and text, after its objective (src/config/availability.ts). */
		levels: {
			essential: {
				title: 'Disponibilité essentielle',
				text: 'Pour une application qui peut tolérer des interruptions occasionnelles. Une infrastructure simple peut suffire selon les dépendances et les risques acceptés.',
			},
			reinforced: {
				title: 'Disponibilité renforcée',
				text: 'Pour réduire les interruptions et mieux sécuriser les services critiques. La supervision et la limitation des points uniques de défaillance deviennent prioritaires.',
			},
			high: {
				title: 'Haute disponibilité',
				text: 'Pour des services où une interruption prolongée a un impact important. Une redondance adaptée, des mécanismes de bascule et des tests de reprise peuvent être nécessaires.',
			},
			veryHigh: {
				title: 'Disponibilité très élevée',
				text: "Pour des usages particulièrement sensibles aux interruptions. L'architecture et les procédures d'exploitation doivent être étudiées au cas par cas.",
			},
		} satisfies Record<LevelId, Card>,
		/** Never says that a topology guarantees a percentage. */
		architecture: {
			title: "Ce que l'objectif demande à l'architecture",
			intro:
				"Plus l'objectif est élevé, plus l'architecture doit limiter les points uniques de défaillance et se remettre vite d'une panne. Les choix ci-dessous peuvent y contribuer selon le niveau retenu, mais aucune topologie ne garantit, à elle seule, un pourcentage de disponibilité.",
			cards: [
				{
					title: 'Redondance',
					text: "Plusieurs instances de l'application, pour qu'une instance en panne n'arrête pas tout le service. Aux niveaux les moins exigeants, une infrastructure simple peut suffire.",
				},
				{
					title: 'Sauvegardes',
					text: "Des sauvegardes régulières, avec des restaurations testées, quel que soit le niveau. Elles permettent de repartir après un incident, sans empêcher l'interruption.",
				},
				{
					title: 'Base de données',
					text: "Souvent le point unique de défaillance le plus délicat. Quand l'objectif augmente, une réplique prête à prendre le relais peut devenir nécessaire.",
				},
				{
					title: 'Multi-AZ',
					text: "Répartir les ressources sur plusieurs zones de disponibilité d'une même région, pour que la panne d'une zone n'arrête pas tout le service.",
				},
				{
					title: 'Bascule (failover)',
					text: "Des mécanismes qui redirigent le trafic vers une ressource saine, et des tests de reprise pour vérifier qu'ils fonctionnent.",
				},
				{
					title: 'Supervision',
					text: 'Des alertes pour détecter une interruption et réagir vite. Elle devient prioritaire dès 99,9 %.',
				},
			] satisfies [Card, Card, Card, Card, Card, Card],
		},
		commitment: {
			title: "Un objectif de disponibilité n'est pas une astreinte.",
			text: "Je conçois, configure et vérifie l'infrastructure pour répondre au niveau de disponibilité retenu dans la proposition d'intervention. Le fournisseur cloud reste responsable de ses propres engagements de service. Après livraison, la surveillance quotidienne et la réaction aux incidents relèvent de l'organisation prévue avec ton équipe ou ton prestataire d'exploitation. Une intervention humaine 24 h/24 n'est pas incluse.",
		},
		guarantee: {
			title: 'Trois mois de garantie de conformité technique.',
			text: "Lorsque les quatre blocs sont réalisés dans le cadre d'une prestation complète, les défauts de conception ou de configuration de l'infrastructure qui me sont directement imputables peuvent être signalés pendant les trois mois suivant la livraison. Leur analyse et leur correction sont prises en charge selon le périmètre et les modalités définis au contrat. Cette garantie ne couvre pas automatiquement les bugs applicatifs, les pannes externes ou les modifications non validées.",
		},
		/** The guarantee's conditions and limits, which the signed contract overrides. */
		conditions: {
			title: 'Conditions et limites de la garantie de conformité',
			intro:
				"Les conditions contractuelles de la proposition d'intervention font foi. Les principes ci-dessous expliquent le fonctionnement de la garantie et ne remplacent pas le contrat signé.",
			items: [
				{
					title: 'Ce qui est couvert',
					text: "Les défauts de conception, de paramétrage ou de déploiement de l'infrastructure directement liés aux travaux livrés et inclus dans le périmètre contractuel, signalés dans les trois mois suivant la livraison de la prestation complète couvrant les quatre blocs.",
				},
				{
					title: "Ce qui n'est pas couvert",
					text: "Les indisponibilités propres aux fournisseurs cloud ou à des services tiers, sauf lorsqu'elles révèlent une faute de conception ou de configuration relevant de ma prestation ; les bugs et évolutions applicatives hors du périmètre corrigé ; les changements de code, de configuration ou d'infrastructure effectués sans validation et à l'origine du dysfonctionnement ; l'utilisation en dehors des hypothèses de dimensionnement convenues ; le non-respect des prérequis ou recommandations critiques documentés ; les incidents dus à des accès, autorisations ou informations indisponibles du côté client.",
				},
				{
					title: 'Responsabilités',
					text: "Le client conserve la responsabilité de l'exploitation courante, de la validation des changements et de l'organisation de la réponse aux incidents, sauf prestation supplémentaire explicitement prévue. La garantie n'inclut pas d'astreinte 24 h/24, de délai de réaction immédiat ni de compensation financière automatique.",
				},
				{
					title: 'Comment signaler un défaut',
					text: 'Pendant la période couverte, le client transmet une description du problème et les informations utiles au diagnostic. Lorsque la non-conformité entre dans le périmètre de la prestation, les modalités de correction sont convenues en fonction de sa nature et de son impact.',
				},
			] satisfies [Card, Card, Card, Card],
		},
		/** The button that ends the page, to the booking page. */
		button: "Définissons l'objectif de disponibilité adapté à ton projet",
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
		/** The Services: the 4 Blocks, after an introduction on how the work is scoped. */
		services: {
			label: 'Services',
			title: 'Quatre leviers pour fiabiliser et faire grandir ton SaaS.',
			intro:
				"De la qualité du code à la supervision en production, j'interviens sur les points qui freinent ton équipe. Après un diagnostic, nous définissons ensemble le périmètre, les priorités et l'ordre des interventions. Tu peux me confier un besoin ciblé ou un projet complet.",
			/** Before each Block's number: "Bloc 1". */
			blockLabel: 'Bloc',
			/** The name of each Block's list of tools, for screen readers. */
			toolsLabel: 'Outils',
			/** The 4 Blocks. A language with fewer than 4 makes `astro check` fail. */
			blocks: [
				{
					name: 'Audit du code & CI/CD',
					summary: "Détecte les problèmes avant qu'ils n'arrivent en production.",
					text: "J'analyse le dépôt et les processus de livraison, puis je mets en place une pipeline adaptée à ton projet : qualité du code, lint, tests automatisés, analyse de sécurité et contrôles des dépendances. Les erreurs sont signalées dès la pull request, avant de devenir des incidents chez tes clients.",
					tools: [
						'GitHub Actions',
						'GitLab CI',
						'Lint',
						'Tests unitaires',
						"Tests d'intégration",
						'Tests E2E',
						'SonarQube',
						'Trivy',
						'Gitleaks',
					],
					toolsAlternative: 'Et plus selon la stack',
				},
				{
					name: 'Nettoyage & optimisation du code',
					summary: 'Moins de dette technique, plus de temps pour développer.',
					text: "Je prends directement en charge les corrections applicatives, le refactoring du code et les optimisations de performances identifiés comme prioritaires. J'automatise également une partie de la maintenance répétitive. L'objectif : rendre l'application plus propre, plus rapide et plus simple à faire évoluer. Le volume d'intervention est défini après l'audit : il ne s'agit pas d'une refonte illimitée de tout le code.",
					tools: [
						'Refactoring',
						'Dette technique',
						'Performances',
						'API & requêtes',
						'Dépendances',
						'Maintenance automatisée',
					],
					toolsAlternative: 'Selon la stack',
				},
				{
					name: 'Infrastructure scalable',
					summary: 'La bonne architecture pour ton usage, pas de complexité inutile.',
					text: "Je conteneurise l'application lorsque c'est nécessaire et je choisis l'hébergement adapté à sa charge : conteneurs managés, services serverless ou Kubernetes. L'Infrastructure as Code permet de décrire, versionner et reproduire les environnements. L'objectif est de pouvoir évoluer sans surdimensionner l'infrastructure dès le départ.",
					tools: [
						'Docker',
						'Containers as a Service',
						'Kubernetes',
						'Terraform',
						'GCP',
						'AWS',
						'Azure',
						'Scaleway',
						'OVHcloud',
						'Infomaniak',
					],
					toolsAlternative: 'Et autres fournisseurs',
				},
				{
					name: 'Observabilité',
					summary: 'Ne découvre plus les incidents par tes clients.',
					text: "Je mets en place les métriques, journaux, tableaux de bord et alertes nécessaires pour suivre la santé de l'application et de son infrastructure. Au lieu de vérifier manuellement si tout fonctionne, ton équipe est avertie dès qu'un problème détectable apparaît et dispose des informations nécessaires pour intervenir.",
					tools: ['Grafana', 'Prometheus', 'Logs', 'Alertes', 'Monitoring', 'Tracing'],
					toolsAlternative: 'Outils natifs du cloud',
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
				cleanup: {
					description:
						'Un bug et du code en double disparaissent : le code raccourcit et le temps de réponse baisse.',
					bug: 'bug',
					/** Beside the lines written twice. */
					duplicate: '×2',
					responseTime: 'temps de réponse',
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
			title: 'Cinq étapes pour avancer sereinement.',
			steps: [
				{
					name: 'Échange initial',
					sentence:
						'45 minutes sur Google Meet pour comprendre ton produit, tes priorités et tes contraintes. Gratuit, sans engagement.',
				},
				{
					name: 'Diagnostic',
					sentence:
						'Un premier état des lieux gratuit de ton code et, si nécessaire, de ton infrastructure. Retour sous 3 à 5 jours ouvrés après réception des accès utiles.',
				},
				{
					name: "Proposition d'intervention",
					sentence:
						'Un périmètre précis, des priorités, un calendrier et un prix convenus avant de commencer.',
				},
				{
					name: 'Mise en œuvre',
					sentence:
						"J'interviens avec ton équipe, en limitant les perturbations du développement. Un point d'avancement régulier, en principe chaque semaine, permet de suivre les actions et les décisions.",
				},
				{
					name: 'Livraison & passation',
					sentence:
						'Documentation, vérifications finales et transfert de connaissances pour que ton équipe reste autonome.',
				},
			] satisfies [Step, Step, Step, Step, Step],
		},
		/** The home section that leads to the availability page; it names the levels of `availability.levels`. */
		availability: {
			label: 'Disponibilité & fiabilité',
			title: 'Une infrastructure fiable, conçue pour durer.',
			text: "Selon les besoins de ton SaaS, je conçois et teste une infrastructure visant un objectif de disponibilité défini ensemble : 99,5 %, 99,9 %, 99,95 % ou davantage lorsque l'architecture le justifie. Le bon niveau dépend de ton activité, des services utilisés et de ton budget.",
			/** The three-month guarantee, only with the four Blocks. */
			guarantee:
				"Pour une intervention complète couvrant les quatre blocs, je propose une garantie de conformité technique de trois mois après la livraison : si un défaut de conception ou de configuration relevant de mon intervention est constaté, je prends en charge sa correction dans les conditions convenues au contrat. Il ne s'agit pas d'une astreinte 24 h/24 ni d'une garantie d'absence de panne applicative.",
			link: 'Comprendre les niveaux de disponibilité et consulter les conditions',
		},
		about: {
			title: 'Qui est Julien ?',
			wayOfWorking:
				"J'interviens sur ton projet en français, en anglais ou en portugais. J'utilise des technologies modernes et éprouvées, je limite autant que possible la dépendance à un fournisseur et je documente ce que je livre pour que ton équipe reste autonome. Mes solutions s'adaptent à tes contraintes techniques et métier, pas l'inverse.",
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
		finalCta: {
			title: 'Ton SaaS mérite mieux que des correctifs en urgence.',
			text: "Tu as déjà un projet en tête, ou simplement des questions sur ton code, ton infrastructure ou ton prochain déploiement ? Parlons-en. Un premier échange suffit pour identifier les priorités et voir comment je peux t'aider.",
			button: 'Réserver un échange gratuit',
			conversation: '45 minutes sur Google Meet. Sans engagement.',
			// Not shown while the booking page is in French (values.ts).
			bookingNotice:
				"La page de réservation est en français, mais l'Échange peut se faire en anglais ou en portugais.",
		},
	},
	/** «Tes défis»: the questions by audience, on their page and in the header submenu.
	 * The 23 answers are Julien's, word for word in French; each
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
