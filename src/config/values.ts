// The shared values: the same in all three languages and stored only here.
// If any is missing or invalid, the build fails.
import { z } from 'astro/zod';
import { LANGUAGES } from './site';

const schema = z.object({
	name: z.string().trim().min(1),
	/** The booking page for the Conversation, in French for all three languages (#10). */
	bookingPage: z.url({ protocol: /^https$/ }),
	/** In the other languages, the final CTA warns that the booking page is in this one. */
	bookingPageLanguage: z.enum(LANGUAGES),
	linkedin: z.url({ protocol: /^https$/ }),
	/** Julien's Malt profile, where the Testimonials were posted: each one links to it. */
	malt: z.url({ protocol: /^https$/ }),
});

const result = schema.safeParse({
	name: 'Julien Laffont',
	bookingPage: 'https://calendly.com/contact-julienlaffont/appel-cadrage',
	bookingPageLanguage: 'fr',
	linkedin: 'https://www.linkedin.com/in/julien-laffont-4a3623134/',
	malt: 'https://www.malt.fr/profile/julienlaffont',
} satisfies z.input<typeof schema>);

if (!result.success) {
	throw new Error(
		`Missing or invalid shared values in src/config/values.ts:\n${z.prettifyError(result.error)}`,
	);
}

export const values = result.data;
