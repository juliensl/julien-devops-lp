// Os valores esperados, tirados da spec (#54) e não do código.
// O botão em francês e em inglês, a Promessa em inglês e os nomes do botão de pausa em francês e em
// inglês são traduções que a estagiária valida antes do Lançamento comercial (#75).

export const SITE = 'https://devops.julienlaffont.com';
export const PAGINA_DE_MARCACAO = 'https://calendly.com/contact-julienlaffont/appel-cadrage';
export const LINKEDIN = 'https://www.linkedin.com/in/julien-laffont-4a3623134/';
export const NOME = 'Julien Laffont';

// No seletor de língua, cada língua mostra o rótulo e diz o nome completo aos leitores de ecrã.
export const LINGUAS = {
	fr: {
		rotulo: 'FR',
		nome: 'Français',
		inicio: '/',
		codigoHtml: 'fr',
		designacao: 'Consultant DevOps freelance pour SaaS',
		promessa:
			"En 30 jours, je te livre l'infrastructure devOps nécessaire pour que tu puisses scaler ton SaaS.",
		botao: 'Réserver un échange',
		pausar: "Mettre l'animation en pause",
		retomar: "Reprendre l'animation",
	},
	en: {
		rotulo: 'EN',
		nome: 'English',
		inicio: '/en/',
		codigoHtml: 'en',
		designacao: 'Freelance DevOps consultant for SaaS',
		promessa: 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.',
		botao: 'Book a conversation',
		pausar: 'Pause animation',
		retomar: 'Resume animation',
	},
	pt: {
		rotulo: 'PT',
		nome: 'Português',
		inicio: '/pt/',
		codigoHtml: 'pt-PT',
		designacao: 'Consultor DevOps freelance para SaaS',
		promessa:
			'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.',
		botao: 'Marcar uma conversa',
		// O botão de pausa: o nome diz o que um clique faz, como no protótipo validado.
		pausar: 'Pausar animação',
		retomar: 'Retomar animação',
	},
} as const;

export type Lingua = keyof typeof LINGUAS;
