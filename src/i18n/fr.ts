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
	},
};
