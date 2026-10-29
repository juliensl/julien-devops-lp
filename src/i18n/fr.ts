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
			notLaunchedYet: "Ton SaaS n'est pas encore lancé ? Tu peux réserver l'échange quand même.",
			exclusionsTitle: "Ce n'est pas pour",
			exclusions: [
				'Ceux qui ont déjà une pipeline CI, une application conteneurisée et une infrastructure avec auto-scaling.',
				"Ce qui n'est ni web ni mobile.",
				"Ceux qui refusent 100 à 500 €/mois de services et d'infrastructure.",
				'Le secteur militaire.',
			],
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
			alreadyTriedTitle: 'Ce que tu as déjà essayé',
			alreadyTried: [
				"Un freelance DevOps exécutant, qui n'apporte pas d'expertise.",
				'Tester à la main, ou via un stagiaire.',
				"Des outils de test que les devs doivent lancer en local, et qu'ils ne lancent jamais.",
				'Demander à un dev de monter en compétence : des semaines perdues, un résultat médiocre.',
				'Des freelances qui codent chacun à leur manière : chaque départ emporte la connaissance.',
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
				"S'applique quand tu prends les blocs 3 et 4 (et le 2, si l'application n'est pas encore conteneurisée).",
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
};
