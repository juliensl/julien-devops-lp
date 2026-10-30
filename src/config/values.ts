// The shared values: the same in all three languages and stored only here.
// If any is missing or invalid, the build fails.
// The legal pages' Markdown shows them with placeholders, such as `{legal.siret}` (src/lib/remark-values.ts).
import { z } from 'astro/zod';
import { LANGUAGES } from './site';

/** A postal address. The country is an ISO code: each page names it in its language. */
const address = z.object({
	street: z.string().trim().min(1),
	city: z.string().trim().min(1),
	country: z.string().regex(/^[A-Z]{2}$/),
});

/** A phone number in international format, written as the page shows it. */
const phone = z.string().regex(/^\+\d[\d ]+\d$/);

const schema = z.object({
	name: z.string().trim().min(1),
	/** The booking page for the Conversation, in French for all three languages (#10). */
	bookingPage: z.url({ protocol: /^https$/ }),
	/** In the other languages, the final CTA warns that the booking page is in this one. */
	bookingPageLanguage: z.enum(LANGUAGES),
	/** The email on the domain (#56), in the footer and the legal pages. */
	email: z.email(),
	linkedin: z.url({ protocol: /^https$/ }),
	/** Julien's Malt profile, where the Testimonials were posted: each one links to it. */
	malt: z.url({ protocol: /^https$/ }),
	/** The provider, in the Legal information (#54 «Páginas legais», validated by Julien in #23). */
	legal: z.object({
		/** The name with «EI» (entrepreneur individuel), as French law requires. */
		name: z.string().trim().min(1),
		status: z.string().trim().min(1),
		siret: z.string().regex(/^\d{14}$/),
		/** The establishment's address, where Julien works from. */
		address,
		phone,
		/** `null` until Julien confirms in VIES that the number is active (#71, #75): then its line shows. */
		vat: z
			.string()
			.regex(/^FR\d{11}$/)
			.nullable(),
	}),
	/**
	 * The host, in the Legal information. Infomaniak's public data: the name and address from its legal
	 * notice, the phone from its home page (the legal notice has none), checked on 30/10/2026.
	 */
	hosting: z.object({ name: z.string().trim().min(1), address, phone }),
});

const result = schema.safeParse({
	name: 'Julien Laffont',
	bookingPage: 'https://calendly.com/contact-julienlaffont/appel-cadrage',
	bookingPageLanguage: 'fr',
	email: 'hello@julienlaffont.com',
	linkedin: 'https://www.linkedin.com/in/julien-laffont-4a3623134/',
	malt: 'https://www.malt.fr/profile/julienlaffont',
	legal: {
		name: 'Julien Laffont EI',
		status: 'micro-entrepreneur',
		siret: '98767158300027',
		address: { street: '2 Impasse Fino-Bricka', city: '34000 Montpellier', country: 'FR' },
		phone: '+33 6 49 81 21 97',
		vat: null,
	},
	hosting: {
		name: 'Infomaniak Network SA',
		address: { street: 'Rue Eugène Marziano 25', city: '1227 Les Acacias (GE)', country: 'CH' },
		phone: '+41 22 820 35 41',
	},
} satisfies z.input<typeof schema>);

if (!result.success) {
	throw new Error(
		`Missing or invalid shared values in src/config/values.ts:\n${z.prettifyError(result.error)}`,
	);
}

export const values = result.data;
