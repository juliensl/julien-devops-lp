// Os valores esperados, tirados da spec (#54) e não do código.
// O botão em francês e em inglês e a Promessa em inglês são traduções
// que a estagiária valida antes do Lançamento comercial (#75).

export const SITE = 'https://julienlaffont.com';
export const PAGINA_DE_MARCACAO = 'https://calendly.com/contact-julienlaffont/appel-cadrage';

export const LINGUAS = {
	fr: {
		inicio: '/',
		codigoHtml: 'fr',
		designacao: 'Consultant DevOps freelance pour SaaS',
		promessa:
			"En 30 jours, je te livre l'infrastructure devOps nécessaire pour que tu puisses scaler ton SaaS.",
		botao: 'Réserver un échange',
	},
	en: {
		inicio: '/en/',
		codigoHtml: 'en',
		designacao: 'Freelance DevOps consultant for SaaS',
		promessa: 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.',
		botao: 'Book a conversation',
	},
	pt: {
		inicio: '/pt/',
		codigoHtml: 'pt-PT',
		designacao: 'Consultor DevOps freelance para SaaS',
		promessa:
			'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.',
		botao: 'Marcar uma conversa',
	},
} as const;

export type Lingua = keyof typeof LINGUAS;
