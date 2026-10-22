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
	animacao: {
		pausar: "Mettre l'animation en pause",
		retomar: "Reprendre l'animation",
	},
	paginaPrincipal: {
		descricao: `${promessa} Pour les CTO de SaaS en croissance.`,
		hero: {
			apoio:
				'Les bugs sont repérés dans la pull request, pas par ton client. Et tes devs se remettent à coder au lieu de faire du support.',
			nota: 'Échange de 45 min sur Google Meet, gratuit.',
		},
		paraQuem: {
			titulo: 'Pour qui',
			perfil: [
				'Un SaaS web ou mobile, déjà lancé.',
				"Qui passe de quelques dizaines ou centaines à plusieurs milliers d'utilisateurs récurrents.",
				'Une équipe de 5 à 20 personnes en général, dont au moins 3 devs.',
			],
			antesDoLancamento: "Ton SaaS n'est pas encore lancé ? Tu peux réserver l'échange quand même.",
			tituloDasExclusoes: "Ce n'est pas pour",
			exclusoes: [
				'Ceux qui ont déjà une pipeline CI, une application conteneurisée et une infrastructure avec auto-scaling.',
				"Ce qui n'est ni web ni mobile.",
				"Ceux qui refusent 100 à 500 €/mois de services et d'infrastructure.",
				'Le secteur militaire.',
			],
		},
		hojeEDepois: {
			titulo: "Aujourd'hui, et après.",
			tituloDeHoje: "Aujourd'hui",
			hoje: [
				{
					titulo: 'Une fonctionnalité en casse une autre.',
					texto: "La régression est devenue normale, et c'est le client qui la découvre.",
				},
				{
					titulo: 'Tes devs font du support.',
					texto: 'Ils répondent à des tickets au lieu de coder.',
				},
				{
					titulo: 'Les tests se font à la main.',
					texto: "Des journées entières, par quelqu'un dont ce n'est pas le métier.",
				},
				{
					titulo: 'Personne ne sait si ça tient.',
					texto:
						"Ça tourne avec les clients d'aujourd'hui. Avec beaucoup plus, personne ne sait le dire.",
				},
			],
			tituloDoQueJaTentaste: 'Ce que tu as déjà essayé',
			jaTentaste: [
				"Un freelance DevOps exécutant, qui n'apporte pas d'expertise.",
				'Tester à la main, ou via un stagiaire.',
				"Des outils de test que les devs doivent lancer en local, et qu'ils ne lancent jamais.",
				'Demander à un dev de monter en compétence : des semaines perdues, un résultat médiocre.',
				'Des freelances qui codent chacun à leur manière : chaque départ emporte la connaissance.',
			],
			tituloDeDepois: 'Après',
			depois: [
				'Les bugs sont attrapés dans la pull request, pas par ton client.',
				'Tes devs se remettent à coder au lieu de répondre à des tickets.',
				"Ton équipe grandit sans craindre qu'un junior casse la prod.",
				"Tu ajoutes des fonctionnalités sans en casser d'autres.",
				"L'infrastructure suit la charge, et tu vois les problèmes avant tes clients.",
			],
		},
		garantia: {
			etiqueta: 'La Garantie',
			titulo: 'Disponible au moins 99 % du temps, chaque mois.',
			texto:
				"En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver.",
			aplicaSe:
				"S'applique quand tu prends les blocs 3 et 4 (et le 2, si l'application n'est pas encore conteneurisée).",
			tituloDasCondicoes: 'Conditions',
			condicoes: [
				'Un test écrit pour chaque bug corrigé.',
				'Aucun dev ne passe outre un test au rouge.',
				'Un accès en lecture au dépôt.',
				'Une personne technique qui répond sous 48 h.',
			],
			tituloDasExclusoes: 'Exclusions',
			exclusoes: [
				'Les pannes du fournisseur cloud.',
				'Les modifications qui ne sont pas passées par la pipeline.',
			],
			numero: '99 %',
			porBaixoDoNumero: 'du temps, chaque mois',
			comServico: 'avec service',
			semServico: 'au plus 1 % sans service',
			nota: 'Pendant les 3 mois qui suivent la livraison.',
		},
		quem: {
			titulo: 'Qui est Julien',
			forma:
				"Je travaille à distance, en portugais, en français et en anglais. J'utilise des technologies standard, sans lock-in, et je documente tout pour que ton équipe soit autonome.",
		},
		ctaFinal: {
			titulo: "Tu ne perds jamais l'infrastructure.",
			texto:
				"Même si ton équipe ne se lance pas tout de suite dans les tests, tu gardes une pipeline propre, documentée et aux standards du marché, prête pour le jour où tu décides d'y aller.",
			conversa: 'Échange de 45 min sur Google Meet, gratuit et sans engagement.',
			// Não aparece enquanto a página de marcação estiver em francês (valores.ts).
			avisoDaMarcacao:
				"La page de réservation est en français, mais l'échange peut se faire en anglais ou en portugais.",
		},
	},
};
