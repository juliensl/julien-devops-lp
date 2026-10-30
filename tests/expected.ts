// The expected values, taken from the spec (#54) and not from the code.
// The button in French and English, the Promise in English and the pause button names in French and
// English are translations the intern reviews before the Commercial launch (#75).

export const SITE = 'https://devops.julienlaffont.com';
export const BOOKING_PAGE = 'https://calendly.com/contact-julienlaffont/appel-cadrage';
export const LINKEDIN = 'https://www.linkedin.com/in/julien-laffont-4a3623134/';
export const NAME = 'Julien Laffont';
/** The email on the domain, chosen by Julien (#56). */
export const EMAIL = 'hello@julienlaffont.com';

// In the language switcher, each language shows its label and gives screen readers the full name.
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
		// The pause button: its name says what a click does, as in the approved prototype.
		pause: 'Pausar animação',
		resume: 'Retomar animação',
	},
} as const;

export type Language = keyof typeof LANGUAGES;

/** The same page in another language: the slugs are the same in all three, only the prefix changes. */
export function equivalent(path: string, from: Language, to: Language) {
	return LANGUAGES[to].prefix + path.slice(LANGUAGES[from].prefix.length);
}
