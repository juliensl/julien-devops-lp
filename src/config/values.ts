// Os valores únicos: iguais nas três línguas e guardados só aqui.
// Se algum faltar ou não for válido, o build falha.
import { z } from 'astro/zod';

const esquema = z.object({
	nome: z.string().trim().min(1),
	/** A página de marcação da Conversa, em francês para as três línguas (#10). */
	paginaDeMarcacao: z.url({ protocol: /^https$/ }),
	linkedin: z.url({ protocol: /^https$/ }),
});

const resultado = esquema.safeParse({
	nome: 'Julien Laffont',
	paginaDeMarcacao: 'https://calendly.com/contact-julienlaffont/appel-cadrage',
	linkedin: 'https://www.linkedin.com/in/julien-laffont-4a3623134/',
} satisfies z.input<typeof esquema>);

if (!resultado.success) {
	throw new Error(
		`Valores únicos em falta ou inválidos em src/config/values.ts:\n${z.prettifyError(resultado.error)}`,
	);
}

export const valores = resultado.data;
