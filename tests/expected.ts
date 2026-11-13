// The expected values, taken from the specs (#54, #129) and not from the code.
// The button and the pause button names in English are translations the intern reviews before the
// Commercial launch (#75); until then, the English Designation and Promise are the French ones.

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
		designation: 'Consultant DevOps',
		promise: 'Moins de bugs. Un code plus propre. Un SaaS prêt à grandir.',
		button: 'Réserver un échange',
		pause: "Mettre l'animation en pause",
		resume: "Reprendre l'animation",
	},
	en: {
		label: 'EN',
		name: 'English',
		prefix: '/en/',
		htmlCode: 'en',
		designation: 'Consultant DevOps',
		promise: 'Moins de bugs. Un code plus propre. Un SaaS prêt à grandir.',
		button: 'Book a conversation',
		pause: 'Pause animation',
		resume: 'Resume animation',
	},
	pt: {
		label: 'PT',
		name: 'Português',
		prefix: '/pt/',
		htmlCode: 'pt-PT',
		designation: 'Consultor DevOps',
		promise: 'Menos bugs. Um código mais limpo. Um SaaS pronto para crescer.',
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
