// Os valores esperados, tirados da spec (#54) e não do código.
// O botão em francês e em inglês, a Promessa em inglês e os nomes do botão de pausa em francês e em
// inglês são traduções que a estagiária valida antes do Lançamento comercial (#75).

export const SITE = 'https://devops.julienlaffont.com';
export const BOOKING_PAGE = 'https://calendly.com/contact-julienlaffont/appel-cadrage';
export const LINKEDIN = 'https://www.linkedin.com/in/julien-laffont-4a3623134/';
export const NAME = 'Julien Laffont';

// No seletor de língua, cada língua mostra o rótulo e diz o nome completo aos leitores de ecrã.
export const LANGUAGES = {
	fr: {
		label: 'FR',
		name: 'Français',
		prefix: '/',
		htmlCode: 'fr',
		designation: 'Consultant DevOps freelance pour SaaS',
		promise:
			"En 30 jours, je te livre l'infrastructure devOps nécessaire pour que tu puisses scaler ton SaaS.",
		button: 'Réserver un échange',
		pause: "Mettre l'animation en pause",
		resume: "Reprendre l'animation",
	},
	en: {
		label: 'EN',
		name: 'English',
		prefix: '/en/',
		htmlCode: 'en',
		designation: 'Freelance DevOps consultant for SaaS',
		promise: 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.',
		button: 'Book a conversation',
		pause: 'Pause animation',
		resume: 'Resume animation',
	},
	pt: {
		label: 'PT',
		name: 'Português',
		prefix: '/pt/',
		htmlCode: 'pt-PT',
		designation: 'Consultor DevOps freelance para SaaS',
		promise:
			'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.',
		button: 'Marcar uma conversa',
		// O botão de pausa: o nome diz o que um clique faz, como no protótipo validado.
		pause: 'Pausar animação',
		resume: 'Retomar animação',
	},
} as const;

export type Language = keyof typeof LANGUAGES;

/** A mesma página noutra língua: os slugs são iguais nas três, só muda o início. */
export function equivalent(path: string, from: Language, to: Language) {
	return LANGUAGES[to].prefix + path.slice(LANGUAGES[from].prefix.length);
}
