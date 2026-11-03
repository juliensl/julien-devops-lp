// Translated from Portuguese, to be reviewed by the intern before the Commercial launch (#75).
// The Promise and the Designation are the ones Julien approved.
import type { Dictionary } from './pt';

const promise =
	"En 30 jours, je te livre l'infrastructure devOps nécessaire pour que tu puisses scaler ton SaaS.";

export const fr: Dictionary = {
	designation: 'Consultant DevOps freelance pour SaaS',
	promise,
	bookButton: 'Réserver un échange',
	header: {
		logoTarget: "page d'accueil",
		languages: 'Langue',
		menu: 'Menu',
	},
	animation: {
		pause: "Mettre l'animation en pause",
		resume: "Reprendre l'animation",
	},
	ecology: {
		link: 'Écologie',
		home: {
			title: "L'infrastructure aussi a une empreinte.",
			text: "L'endroit où tourne l'application, combien de temps elle tourne et avec quelle efficacité changent son impact environnemental. La page écologie te permet d'estimer une charge selon le pays où elle tourne, en séparant données publiées, hypothèses et calculs.",
			link: 'Ouvrir la page écologie',
		},
		page: {
			title: 'Écologie et infrastructure',
			description:
				"Estime l'énergie et les émissions d'une charge selon le pays où elle tourne, avec le calcul complet, la méthode, les sources et les limites.",
			heading: "Les choix d'infrastructure ont aussi des conséquences environnementales.",
			intro:
				"L'endroit où tourne l'application, combien de temps elle tourne et avec quelle efficacité changent l'énergie qu'elle consomme et les émissions de l'électricité qu'elle utilise. Ici, tu estimes une charge selon le pays où elle tourne, avec la méthode et les sources sous les yeux.",
			legend: {
				label: 'Comment lire les données de cette page',
				published: "valeur d'une base de données ou d'une étude publiques, avec année et source",
				assumption: 'hypothèse du calcul, que tu peux changer',
				calculated: 'résultat des deux précédents',
			},
		},
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
			hints: {
				utilisation: "50 % est la valeur de CCF quand on ne connaît pas l'utilisation",
				pue: '1,52 est la moyenne du secteur en 2026 (Uptime Institute) ; le fournisseur peut indiquer celui du centre que tu utilises',
			},
			result: 'Résultat',
			calculation: 'Le calcul',
			comparison: 'La même charge dans chaque pays',
			units: {
				vcpu: 'vCPU',
				wattsPerVcpu: 'W par vCPU',
				perDay: 'par jour',
				daysPerMonth: 'jours par mois',
				kwhPerMonth: 'kWh par mois',
				kgPerMonth: 'kg CO2e par mois',
			},
			wattsSource: 'Cloud Carbon Footprint, processeur inconnu',
			lifeCycle: 'cycle de vie',
			locationBased: 'location-based',
		},
		method: {
			label: 'Comment on calcule',
			title: 'Une seule méthode, expliquée.',
			cards: [
				{
					title: 'Location-based',
					text: "Utilise la moyenne annuelle de l'électricité produite dans le pays. Ne compte pas les contrats d'énergie renouvelable : ce serait la méthode market-based, absente ici parce qu'elle demande des données contractuelles que nous n'avons pas.",
				},
				{
					title: 'Cycle de vie',
					text: "L'intensité d'Ember inclut les émissions en amont (construction des centrales, extraction et transport du combustible). Elle est donc plus élevée que si l'on comptait seulement les émissions directes de la combustion. Les deux types ne se mélangent jamais sur cette page.",
				},
				{
					title: 'Seulement les processeurs',
					text: "L'estimateur compte l'énergie des vCPU et l'efficacité du centre de données. La mémoire, le stockage, le réseau et la fabrication des serveurs restent en dehors, donc la valeur réelle est plus élevée.",
				},
			],
		},
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
			],
		},
		sources: {
			title: 'Sources et limites',
			names: {
				ember: "Ember, production d'électricité annuelle par pays (intensité carbone, 2025)",
				cloudCarbonFootprint: 'Cloud Carbon Footprint, méthodologie',
				uptimeInstitute: 'Uptime Institute, PUE moyen du secteur (enquête 2026)',
				research:
					'Recherche interne sur les données environnementales des fournisseurs cloud (16/10/2026)',
			},
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
		description: `${promise} Pour les CTO de SaaS en croissance.`,
		hero: {
			support:
				'Les bugs sont repérés dans la pull request, pas par ton client. Et tes devs se remettent à coder au lieu de faire du support.',
			note: 'Échange de 45 min sur Google Meet, gratuit.',
		},
		whoItsFor: {
			title: 'Pour qui',
			profile: [
				'Un SaaS web ou mobile, déjà lancé.',
				"Qui passe de quelques dizaines ou centaines à plusieurs milliers d'utilisateurs récurrents.",
				'Une équipe de 5 à 20 personnes en général, dont au moins 3 devs.',
			],
			notLaunchedYet: {
				text: "Ton SaaS n'est pas encore lancé ? Tu peux réserver l'échange quand même.",
				link: "réserver l'échange",
			},
		},
		todayAndAfter: {
			title: "Aujourd'hui, et après.",
			todayTitle: "Aujourd'hui",
			today: [
				{
					title: 'Une fonctionnalité en casse une autre.',
					text: "La régression est devenue normale, et c'est le client qui la découvre.",
				},
				{
					title: 'Tes devs font du support.',
					text: 'Ils répondent à des tickets au lieu de coder.',
				},
				{
					title: 'Les tests se font à la main.',
					text: "Des journées entières, par quelqu'un dont ce n'est pas le métier.",
				},
				{
					title: 'Personne ne sait si ça tient.',
					text: "Ça tourne avec les clients d'aujourd'hui. Avec beaucoup plus, personne ne sait le dire.",
				},
			],
			afterTitle: 'Après',
			after: [
				'Les bugs sont attrapés dans la pull request, pas par ton client.',
				"Tes devs récupèrent les journées qu'ils passaient en support.",
				"Ton équipe grandit sans craindre qu'un junior casse la prod.",
				"Tu ajoutes des fonctionnalités sans en casser d'autres.",
				"L'infrastructure suit la charge, et tu vois les problèmes avant tes clients.",
			],
		},
		services: {
			label: 'Services',
			title: 'Quatre couches de ton infrastructure.',
			note: "Tu choisis les blocs que tu veux, dans n'importe quelle combinaison. 30 jours au maximum, à compter du début de la Mise en œuvre. Le bloc 3 demande une application conteneurisée, par le bloc 2 ou par ton équipe.",
			blockLabel: 'Bloc',
			toolsLabel: 'Outils',
			blocks: [
				{
					name: 'Audit du code et pipeline CI',
					summary: 'Les bugs sont attrapés à la pull request.',
					text: "Chaque modification passe par les tests, le lint et l'analyse avant d'arriver en production, avec la sécurité au premier plan : dépendances aux failles connues, secrets oubliés dans le code et analyse du code lui-même. Ce qui est rouge ne passe pas.",
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
					text: "Sur deux niveaux : du serverless de conteneurs pour les volumes moyens, Kubernetes quand la charge le justifie. Avec l'Infrastructure as Code, l'infrastructure est décrite dans du code et peut être recréée.",
					tools: ['Kubernetes', 'Terraform'],
				},
				{
					name: 'Observabilité',
					summary: 'Tu vois les problèmes avant tes clients.',
					text: "Un tableau de bord de santé en temps réel et une alerte immédiate en cas d'incident.",
					tools: ['Grafana', 'Prometheus'],
					toolsAlternative: 'ou les outils de ton cloud',
				},
			],
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
					dashboard: 'tableau de bord',
					alert: 'alerte',
				},
			},
		},
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
			],
		},
		guarantee: {
			label: 'La Garantie',
			title: 'Disponible au moins 99 % du temps, chaque mois.',
			text: "En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver.",
			appliesWhen:
				"S'applique quand tu prends l'Infrastructure scalable et l'Observabilité (et la Conteneurisation, si l'application n'est pas encore conteneurisée).",
			conditionsTitle: 'Conditions',
			conditions: [
				'Un test écrit pour chaque bug corrigé.',
				'Aucun dev ne passe outre un test au rouge.',
				'Un accès en lecture au dépôt.',
				'Une personne technique qui répond sous 48 h.',
			],
			exclusionsTitle: 'Exclusions',
			exclusions: [
				'Les pannes du fournisseur cloud.',
				'Les modifications qui ne sont pas passées par la pipeline.',
			],
			number: '99 %',
			belowNumber: 'du temps, chaque mois',
			inService: 'avec service',
			outOfService: 'au plus 1 % sans service',
			note: 'Pendant les 3 mois qui suivent la livraison.',
		},
		// «Souveraineté des données» is the name Julien approved (#46).
		cloudChart: {
			label: 'Fournisseurs cloud',
			title: 'Quel cloud pour quelle entreprise ?',
			intro:
				"Choisis un scénario. Chaque barre montre quels critères de ce scénario le fournisseur remplit. C'est une orientation pour l'échange, pas un classement : aucun fournisseur n'est idéal pour toutes les entreprises.",
			scenariosLabel: "Scénario d'entreprise",
			scenarios: {
				beforeLaunch: {
					name: 'Avant le lancement',
					description: 'Petite équipe, sans temps pour gérer des serveurs.',
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
					description: 'Des pics forts et des périodes calmes.',
				},
				costControl: {
					name: 'Coûts maîtrisés',
					description: "Voir et maîtriser les coûts d'infrastructure à mesure que le SaaS grandit.",
				},
			},
			criteria: {
				kubernetes: 'Kubernetes managé',
				containers: "Conteneurs avec mise à l'échelle automatique",
				paas: 'PaaS',
				europeanHeadquarters: 'Siège en Europe',
				secNumCloud: 'Offre SecNumCloud',
				euRegions: "Régions dans l'UE",
				costs: 'Visibilité et maîtrise des coûts',
			},
			weight: 'poids',
			opinion: 'avis de Julien',
			ratings: { consider: 'À considérer', possible: 'Possible', unsuitable: 'Peu indiqué' },
			values: { yes: 'Oui', partly: 'En partie', no: 'Non' },
			hint: 'Clique sur une barre pour voir les faits.',
			colon: ' :',
			read: 'lue le',
			source: 'Source',
			sources: 'Sources',
			outboundTraffic: 'Trafic sortant',
			footnote:
				"Les faits viennent des pages officielles des fournisseurs et de l'ANSSI. Les poids de chaque scénario et le critère « Visibilité et maîtrise des coûts » sont l'avis de Julien.",
			notes: {
				aws: {
					paas: 'App Runner est fermé aux nouveaux clients depuis le 30/04/2026.',
					europeanHeadquarters:
						"Siège à Seattle, États-Unis. En Europe, annonce l'AWS European Sovereign Cloud, avec une région en Allemagne.",
					secNumCloud: "Absent du catalogue SecNumCloud de l'ANSSI.",
					euRegions: "6 régions dans l'UE.",
					costs:
						'Coûts par compte et par étiquette, avec prévision. Budgets avec alertes et actions automatiques.',
				},
				googleCloud: {
					paas: "Cloud Run déploie à partir du code source ou d'un dépôt Git.",
					europeanHeadquarters: 'Siège à Mountain View, États-Unis.',
					secNumCloud:
						'Offre de Thales avec la technologie Google Cloud, qualifiée depuis le 17/12/2025 au nom de Thales.',
					euRegions: "11 régions dans l'UE.",
					costs:
						'Coûts par projet et par étiquette, avec prévision. Budgets avec alertes et plafonds qui arrêtent certains services.',
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
						'Siège à Redmond, États-Unis. En Europe, annonce des partenaires : Bleu, en France, et Delos Cloud, en Allemagne.',
					secNumCloud:
						"Absent du catalogue SecNumCloud de l'ANSSI. Bleu, partenaire de Microsoft, est en cours de qualification.",
					euRegions: "13 régions dans l'UE, dont 2 à accès restreint.",
					costs:
						'Coûts par abonnement, par ressource et par étiquette, avec prévision. Budgets avec alertes seulement.',
				},
				ovhcloud: {
					containers: 'Conteneurs serverless annoncés comme « Coming soon ».',
					paas: 'Web PaaS a fermé le 31/01/2025.',
					europeanHeadquarters: 'Siège à Roubaix, France.',
					secNumCloud: '3 offres IaaS qualifiées.',
					euRegions: "7 régions dans l'UE.",
					costs:
						'Consommation par projet et par ressource, avec prévision. Étiquettes non trouvées. Alerte sur la prévision, sans limite.',
				},
				scaleway: {
					paas: 'Non trouvé. Le plus proche : les Serverless Functions.',
					europeanHeadquarters: 'Siège à Paris, France.',
					secNumCloud:
						"En cours de qualification : pas encore dans le catalogue SecNumCloud de l'ANSSI.",
					euRegions: "4 régions dans l'UE.",
					costs:
						'Coûts par projet et par produit. Étiquettes et prévision non trouvées. Les alertes ne font que prévenir.',
				},
			},
			outbound: {
				aws: 'payant au-delà de 100 Go/mois.',
				googleCloud: 'payant dès le premier Go (Premium Tier).',
				infomaniak: 'inclus dans les instances.',
				azure: 'payant au-delà de 100 Go/mois.',
				ovhcloud: 'inclus dans les instances.',
				scaleway: 'inclus dans les instances.',
			},
		},
		about: {
			title: 'Qui est Julien',
			wayOfWorking:
				"Je travaille à distance, en portugais, en français et en anglais. J'utilise des technologies standard, sans lock-in, et je documente tout pour que ton équipe soit autonome.",
			linkedin: 'Voir mon profil LinkedIn',
		},
		testimonials: {
			title: 'Ce que disent les clients',
			carousel: 'carrousel',
			slide: 'témoignage',
			of: 'sur',
			previous: 'Témoignage précédent',
			next: 'Témoignage suivant',
			strip: 'Témoignages : fais défiler pour voir les autres',
			// Never shown: in French, the page shows the authors' own text.
			translated: 'Traduit du français',
			malt: 'Voir sur Malt',
		},
		questions: {
			label: 'Questions',
			title: "L'essentiel, avant l'Échange.",
			byAudience: 'Questions pour ton profil',
		},
		finalCta: {
			title: "Tu ne perds jamais l'infrastructure.",
			text: "Même si ton équipe ne se lance pas tout de suite dans les tests, tu gardes une pipeline propre, documentée et aux standards du marché, prête pour le jour où tu décides d'y aller.",
			conversation: 'Échange de 45 min sur Google Meet, gratuit et sans engagement.',
			// Not shown while the booking page is in French (values.ts).
			bookingNotice:
				"La page de réservation est en français, mais l'échange peut se faire en anglais ou en portugais.",
		},
	},
	questions: {
		menu: 'Tes défis',
		all: 'Voir toutes les questions',
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
							"Je livre l'infrastructure DevOps dont un SaaS a besoin pour grandir, en quatre blocs : pipeline CI et audit du code, conteneurisation, infrastructure scalable et observabilité. Tu prends ceux que tu veux, dans n'importe quelle combinaison.",
					},
					{
						question: 'Combien de temps ça prend ?',
						answer:
							"30 jours au maximum, pour n'importe quelle combinaison de blocs, à compter du début de la Mise en œuvre. Le délai exact figure dans la Proposition d'intervention.",
					},
					{
						question: 'Combien ça coûte ?',
						answer:
							"Un prix fixe, que je donne dans la Proposition d'intervention, après le Diagnostic gratuit.",
					},
					{
						question: 'Comment ça commence ?',
						answer:
							"Par un Échange de 45 min sur Google Meet. Viennent ensuite le Diagnostic gratuit, la Proposition d'intervention, la Mise en œuvre et la Livraison et passation.",
					},
					{
						question: 'Je peux prendre seulement certains blocs ?',
						answer:
							"Oui, dans n'importe quelle combinaison. Le bloc 3 demande une application conteneurisée, par le bloc 2 ou par ton équipe.",
					},
				],
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
							"Ton équipe. Je n'écris pas de tests : je livre le système qui les exécute, les mesure et bloque ce qui est au rouge.",
					},
					{
						question: 'Faut-il arrêter le développement ?',
						answer:
							"Non. Le bloc 1 n'implique ni migration ni risque pour la production. Pour les blocs 2 et 3, le travail avance en parallèle (branches, environnements de test, infrastructure séparée). Certaines modifications demandent une coordination avec les devs, et à la fin de la migration, une courte période sans modification du code peut être nécessaire, convenue avec toi.",
					},
					{
						question: 'Avec quelles stacks et quels clouds travailles-tu ?',
						answer:
							'CI : GitHub Actions, GitLab CI, Azure DevOps et Google Cloud Build. Cloud : AWS, Google Cloud, Microsoft Azure, OVHcloud, Scaleway et Infomaniak. Le choix dépend des besoins et du budget, et peut inclure un hébergement à moindre impact environnemental.',
					},
					{
						question: 'De quels accès as-tu besoin ?',
						answer:
							"Pour le Diagnostic, un accès en lecture au dépôt. Au cloud (métriques et logs) seulement si le problème touche l'infrastructure, les performances, les coûts ou la disponibilité. Jamais de mots de passe, de clés privées ni de droits d'administrateur. Pour la Mise en œuvre, j'ai besoin d'un accès en écriture au dépôt et d'un compte sur ton cloud avec les droits nécessaires pour créer l'infrastructure des blocs choisis. Tu retires ces accès à la Livraison et passation.",
					},
					{
						question: 'Comment fonctionne la Garantie de disponibilité ?',
						answer:
							"En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver. Elle s'applique avec les blocs 3 et 4, et demande un test écrit pour chaque bug corrigé, aucun dev qui passe outre un test au rouge, un accès en lecture au dépôt et une personne technique qui répond sous 48 h.",
					},
					{
						question: "Quels outils utilises-tu pour l'observabilité ?",
						answer: 'Des outils standard, comme Grafana et Prometheus, ou ceux de ton cloud.',
					},
					{
						question: 'Comment travaillons-nous ensemble ?',
						answer:
							'À distance, sur Google Meet. Je parle avec le CTO et avec les devs, surtout avec le CTO.',
					},
				],
			},
			ceo: {
				name: 'Pour les CEO',
				short: 'CEO',
				description: 'Risques, coûts, continuité, prévisibilité et impact sur le business.',
				questions: [
					{
						question: 'Combien ça va coûter, et quand vais-je le savoir ?',
						answer:
							"Un prix fixe, que je donne dans la Proposition d'intervention. La Proposition arrive après le Diagnostic gratuit, qui prend 2 à 3 jours ouvrés à partir du moment où j'ai les accès, ou 3 à 5 si le cloud est inclus.",
					},
					{
						question: "Et les coûts de l'infrastructure ?",
						answer:
							"En plus du prix fixe, l'infrastructure et les outils ont leur propre coût mensuel, que tu paies directement aux fournisseurs, sur tes comptes. Le service suppose un budget de 100 à 500 € par mois pour ces coûts.",
					},
					{
						question: 'Allons-nous dépendre de toi ?',
						answer:
							"Non. J'utilise uniquement des technologies standard et je documente tout. Tu changes de prestataire quand tu veux et tu ne perds jamais l'infrastructure.",
					},
					{
						question: 'Quels risques pour la production ?',
						answer:
							"Le bloc 1 ne touche pas à la production. Pour les blocs 2 et 3, l'objectif est d'éviter les interruptions ; si la migration touche des bases de données ou des services critiques, une courte interruption, planifiée à l'avance, est possible. Il y a toujours un plan pour revenir à la version précédente.",
					},
					{
						question: 'Quel retour puis-je attendre ?',
						answer:
							"Moins de temps à corriger des problèmes. Plus de temps pour développer le produit. J'aide les équipes SaaS à automatiser les tests et les livraisons, à détecter les régressions plus tôt et à rendre l'infrastructure plus fiable, pour qu'elles puissent grandir avec plus de confiance.",
					},
					{
						question: 'Dans quelles langues et quels pays travailles-tu ?',
						answer:
							"Avec des clients de n'importe quel pays, à distance, en portugais, en français ou en anglais.",
					},
				],
			},
			team: {
				name: "Pour l'équipe technique",
				short: 'Équipe technique',
				description:
					'Les devs et tech leads qui vont travailler avec la pipeline et la nouvelle infrastructure.',
				questions: [
					{
						question: "Qu'est-ce qui change au quotidien pour l'équipe ?",
						answer:
							"L'objectif est de réduire le temps perdu en tâches manuelles et en problèmes récurrents, de faciliter la détection des régressions et de rendre les livraisons plus fiables. L'équipe gagne des processus plus clairs, une meilleure visibilité sur l'infrastructure et plus de temps pour se concentrer sur le développement du produit. Les résultats dépendent du contexte et de l'état initial de chaque projet.",
					},
					{
						question: 'Qui maintient la pipeline ensuite ?',
						answer:
							'Ton équipe. La documentation technique et la passation à la fin vous rendent autonomes.',
					},
					{
						question: 'Avec qui parles-tu au quotidien ?',
						answer:
							"Avec le CTO et avec les devs, surtout avec le CTO, sur Google Meet. Il n'y a pas de point d'avancement régulier.",
					},
					{
						question: 'Pouvons-nous continuer à coder pendant la migration ?',
						answer:
							'Oui. Le travail avance en parallèle, sur des branches, des environnements de test et une infrastructure séparée. À la fin, une courte période sans modification du code peut être nécessaire, convenue avec vous.',
					},
					{
						question: 'Quels outils allons-nous utiliser ?',
						answer:
							'Bloc 1 : SonarQube et Trivy. Bloc 2 : Docker. Bloc 3 : Kubernetes et Terraform. Bloc 4 : Grafana et Prometheus, ou les outils de votre cloud.',
					},
				],
			},
		},
		page: {
			description:
				'Questions et réponses pour les CTO, les CEO et les équipes techniques de SaaS : délais, coûts, accès, risques et outils.',
			title: 'Des réponses pour chaque profil.',
			intro:
				"Choisis ton profil ou cherche un mot. Si ta question n'est pas ici, pose-la-moi pendant l'Échange.",
			filter: 'Filtrer par profil',
			everyone: 'Toutes',
			search: 'Chercher dans les questions',
			searchPlaceholder: 'Chercher : tests, coûts, accès…',
			noResults: 'Aucune question avec ces mots.',
			index: 'Profils',
			notFound: 'Tu ne trouves pas ta question ?',
		},
	},
};
