// Os valores únicos: iguais nas três línguas e guardados só aqui.
// Se algum faltar ou não for válido, o build falha.
import { z } from 'astro/zod';
import { LANGUAGES } from './site';

const schema = z.object({
	name: z.string().trim().min(1),
	/** A página de marcação da Conversa, em francês para as três línguas (#10). */
	bookingPage: z.url({ protocol: /^https$/ }),
	/** Nas outras línguas, o CTA final avisa que a página de marcação está nesta. */
	bookingPageLanguage: z.enum(LANGUAGES),
	linkedin: z.url({ protocol: /^https$/ }),
});

const result = schema.safeParse({
	name: 'Julien Laffont',
	bookingPage: 'https://calendly.com/contact-julienlaffont/appel-cadrage',
	bookingPageLanguage: 'fr',
	linkedin: 'https://www.linkedin.com/in/julien-laffont-4a3623134/',
} satisfies z.input<typeof schema>);

if (!result.success) {
	throw new Error(
		`Valores únicos em falta ou inválidos em src/config/values.ts:\n${z.prettifyError(result.error)}`,
	);
}

export const values = result.data;
