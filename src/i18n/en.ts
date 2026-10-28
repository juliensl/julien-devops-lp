// Tradução do português, a validar pela estagiária antes do Lançamento comercial (#75).
// A Designação é a validada pelo Julien.
import type { Dicionario } from './pt';

const promessa = 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.';

export const en: Dicionario = {
	designacao: 'Freelance DevOps consultant for SaaS',
	promessa,
	botaoMarcar: 'Book a conversation',
	cabecalho: {
		destinoDoLogotipo: 'home page',
		linguas: 'Language',
		menu: 'Menu',
	},
	animacao: {
		pausar: 'Pause animation',
		retomar: 'Resume animation',
	},
	paginaPrincipal: {
		descricao: `${promessa} For CTOs of growing SaaS companies.`,
		hero: {
			apoio:
				'Bugs get caught in the pull request, not by your customers. And your devs get back to coding instead of doing support.',
			nota: '45-min conversation on Google Meet, free of charge.',
		},
		etapas: {
			titulo: 'Five steps, always in the same order.',
			etapas: [
				{ nome: 'Conversation', frase: '45 min on Google Meet, free of charge.' },
				{
					nome: 'Diagnosis',
					frase:
						'Free. 2 to 3 business days once access is granted, or 3 to 5 if it includes the cloud.',
				},
				{
					nome: 'Intervention proposal',
					frase: 'Which blocks, in what timeframe and at what fixed price.',
				},
				{ nome: 'Implementation', frase: 'At most 30 calendar days.' },
				{
					nome: 'Delivery and handover',
					frase: 'Documentation and handover, so the team can be self-sufficient.',
				},
			],
		},
	},
};
