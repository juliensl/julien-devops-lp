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
		destinoDoLogotipo: "page d'accueil",
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
		etapas: {
			titulo: 'Cinq étapes, toujours dans le même ordre.',
			etapas: [
				{ nome: 'Échange', frase: '45 min sur Google Meet, gratuit.' },
				{
					nome: 'Diagnostic',
					frase:
						'Gratuit. 2 à 3 jours ouvrés après réception des accès, ou 3 à 5 si le cloud est inclus.',
				},
				{
					nome: "Proposition d'intervention",
					frase: 'Quels blocs, en combien de temps et pour quel prix fixe.',
				},
				{ nome: 'Mise en œuvre', frase: '30 jours calendaires au maximum.' },
				{
					nome: 'Livraison et passation',
					frase: "Documentation et passation, pour que l'équipe soit autonome.",
				},
			],
		},
	},
};
