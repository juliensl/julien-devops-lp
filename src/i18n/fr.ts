// Tradução do português, a validar pela estagiária antes do Lançamento comercial (#75).
// A Promessa e a Designação são as validadas pelo Julien.
import type { Dicionario } from './pt';

const promessa =
	"En 30 jours, je te livre l'infrastructure devOps nécessaire pour que tu puisses scaler ton SaaS.";

export const fr: Dicionario = {
	designacao: 'Consultant DevOps freelance pour SaaS',
	promessa,
	botaoMarcar: 'Réserver un échange',
	cabecalho: {
		paginaPrincipal: "page d'accueil",
		linguas: 'Langue',
		menu: 'Menu',
	},
	paginaPrincipal: {
		descricao: `${promessa} Pour les CTO de SaaS en croissance.`,
		hero: {
			apoio:
				'Les bugs sont repérés dans la pull request, pas par ton client. Et tes devs se remettent à coder au lieu de faire du support.',
			nota: 'Échange de 45 min sur Google Meet, gratuit.',
		},
		ecologia: {
			etiqueta: 'Écologie',
			titulo: "L'infrastructure a aussi une empreinte.",
			texto:
				"L'endroit où l'application tourne, combien de temps et avec quelle efficacité changent son impact environnemental. La page écologie te permet d'estimer une charge selon le pays où elle tourne, en séparant données publiées, hypothèses et calculs.",
			ligacao: 'Ouvrir la page écologie',
		},
	},
	ecologia: {
		ligacao: 'Écologie',
		etiqueta: 'Écologie et infrastructure',
		descricao:
			"Estime l'énergie et les émissions d'une charge selon le pays où elle tourne, avec la méthode, les sources et les limites en clair.",
		titulo: "Les choix d'infrastructure ont aussi des conséquences environnementales.",
		introducao:
			"L'endroit où l'application tourne, combien de temps elle tourne et avec quelle efficacité changent l'énergie qu'elle consomme et les émissions de l'électricité qu'elle utilise. Ici, tu estimes une charge selon le pays où elle tourne, avec la méthode et les sources en clair.",
		selos: { publicado: 'Publié', hipotese: 'Hypothèse', calculado: 'Calculé' },
		legenda: {
			nome: 'Comment lire les données de cette page',
			publicado: "valeur d'une base de données ou d'une étude publiques, avec année et source",
			hipotese: 'hypothèse du calcul, que tu peux changer',
			calculado: 'résultat des deux précédents',
		},
		estimar: {
			etiqueta: '1 · Estimer une charge',
			titulo: 'La même application, à des endroits différents.',
			introducao:
				"Choisis le pays, la charge et l'efficacité du centre de données. Le calcul suit la méthode ouverte de Cloud Carbon Footprint\u202f: énergie des processeurs × efficacité du centre de données × intensité carbone de l'électricité.",
			pais: "Pays où tourne l'infrastructure",
			vcpu: 'Processeurs virtuels (vCPU)',
			utilizacao: 'Utilisation moyenne',
			dicaUtilizacao: (valor: string) =>
				`${valor}, c'est la valeur de Cloud Carbon Footprint quand on ne connaît pas l'utilisation`,
			horas: 'Heures par jour',
			pue: 'Efficacité du centre de données (PUE)',
			dicaPue: (valor: string) =>
				`${valor}, c'est la moyenne du secteur en 2026 (Uptime Institute)\u202f; ton fournisseur peut indiquer celui du centre que tu utilises`,
			kwh: 'kWh par mois',
			kg: 'kg CO2e par mois, location-based',
			pontos: { antes: 'Chaque point vaut environ', depois: 'kg CO2e.' },
			calculo: {
				resumo: 'Voir le calcul',
				dias: 'jours',
				notaWatts: 'Cloud Carbon Footprint, processeur inconnu',
				cicloDeVida: 'cycle de vie',
			},
			paises: 'La même charge dans chaque pays',
		},
		metodo: {
			etiqueta: '2 · Comment on calcule',
			titulo: 'Une seule méthode, expliquée.',
			cartoes: [
				{
					titulo: 'Location-based',
					texto:
						"Utilise la moyenne annuelle de l'électricité produite dans le pays. Ne compte pas les contrats d'énergie renouvelable. Ce serait la méthode market-based, absente ici parce qu'elle demande des données contractuelles que nous n'avons pas.",
				},
				{
					titulo: 'Cycle de vie',
					texto:
						"L'intensité d'Ember inclut les émissions en amont (construction des centrales, extraction et transport du combustible). Elle est donc plus élevée que les seules émissions directes de la combustion. Les deux types ne se mélangent jamais sur cette page.",
				},
				{
					titulo: 'Seulement les processeurs',
					texto:
						"L'estimateur compte l'énergie des vCPU et l'efficacité du centre de données. La mémoire, le stockage, le réseau et la fabrication des serveurs restent en dehors, donc la valeur réelle est plus élevée.",
				},
			],
		},
		infraestrutura: {
			etiqueta: "3 · Ce que l'infrastructure peut changer",
			titulo: "Plus d'efficacité, plus de visibilité.",
			cartoes: [
				{
					titulo: 'Ajuster les ressources à la charge',
					texto:
						"Avec l'infrastructure scalable (bloc 3), les ressources suivent la charge de l'application.",
				},
				{
					titulo: 'Voir ce qui est consommé',
					texto:
						"L'observabilité (bloc 4) donne de la visibilité sur l'utilisation des ressources et les coûts.",
				},
				{
					titulo: 'Choisir en connaissance de cause',
					texto:
						"L'intensité carbone de l'électricité change d'un pays à l'autre, et l'estimateur montre de combien.",
				},
				{
					titulo: 'Hébergement à moindre impact environnemental',
					texto:
						"Quand les besoins et le budget le permettent, c'est l'une des options que je propose.",
				},
			],
		},
		fontes: {
			titulo: 'Sources et limites',
			ember:
				"Ember, production d'électricité annuelle par pays (intensité carbone, 2025), fichier CSV",
			ccf: 'Cloud Carbon Footprint, méthodologie',
			uptime: 'Uptime Institute, PUE moyen du secteur (enquête de 2026)',
			pesquisa:
				'Recherche «\u202fQuelles données environnementales publient les fournisseurs cloud\u202f?\u202f» (16/10/2026)',
			limites: [
				'Estimation illustrative, pas une mesure de ton infrastructure.',
				'Les watts par vCPU sont ceux de Cloud Carbon Footprint pour un processeur inconnu. Le serveur réel peut consommer plus ou moins.',
				"L'intensité est une moyenne annuelle du pays. L'heure de la journée change la valeur réelle.",
			],
			limitePue: (pue: string, ponderado: string) =>
				`Le PUE de ${pue} est la moyenne par centre de données, et ${ponderado} pondéré par la capacité. Les grands centres, comme ceux du cloud, ont souvent des valeurs plus basses.`,
			voltar: "Retour à la page d'accueil",
		},
	},
};
