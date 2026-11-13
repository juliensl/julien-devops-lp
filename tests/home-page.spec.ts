import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, BOOKING_PAGE, type Language } from './expected';

// The Hero's texts, from Julien's document; English keeps the French ones until it is translated.
// The page description is the Promise and the first sentence below it.
const FRENCH_HERO = {
	support:
		"J'automatise la qualité du code, je réduis la dette technique et je construis une infrastructure capable de suivre ta croissance. Tes développeurs passent moins de temps à corriger les problèmes, et plus de temps à faire évoluer ton produit.",
	note: '45 min sur Google Meet. Gratuit et sans engagement.',
	description:
		"Moins de bugs. Un code plus propre. Un SaaS prêt à grandir. J'automatise la qualité du code, je réduis la dette technique et je construis une infrastructure capable de suivre ta croissance.",
};
const HERO = {
	fr: FRENCH_HERO,
	en: FRENCH_HERO,
	pt: {
		support:
			'Automatizo a qualidade do código, reduzo a dívida técnica e construo uma infraestrutura capaz de acompanhar o teu crescimento. Os teus programadores passam menos tempo a corrigir problemas, e mais tempo a fazer evoluir o teu produto.',
		note: '45 min por Google Meet. Gratuita e sem compromisso.',
		description:
			'Menos bugs. Um código mais limpo. Um SaaS pronto para crescer. Automatizo a qualidade do código, reduzo a dívida técnica e construo uma infraestrutura capaz de acompanhar o teu crescimento.',
	},
} satisfies Record<Language, unknown>;

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, designation, promise, button } = LANGUAGES[language];
		const { support, note, description } = HERO[language];

		test(`${prefix}: the Hero shows the Designation, the Promise, its paragraph and the line by the button`, async ({
			page,
		}) => {
			await page.goto(prefix);
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(promise);
			// The Designation also appears in "Quem é o Julien" (#54).
			const hero = page.getByRole('region', { name: promise });
			await expect(hero.getByText(designation, { exact: true })).toBeVisible();
			await expect(hero.getByText(support, { exact: true })).toBeVisible();
			await expect(hero.getByText(note, { exact: true })).toBeVisible();
		});

		test(`${prefix}: the title has the Designation and the description is the Promise and its first sentence`, async ({
			page,
		}) => {
			await page.goto(prefix);
			await expect(page).toHaveTitle(`Julien Laffont · ${designation}`);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute(
				'content',
				description,
			);
		});

		test(`${prefix}: "${button}" leads to the booking page, in the same tab`, async ({ page }) => {
			await page.goto(prefix);
			const buttons = page.getByRole('link', { name: button, exact: true });
			await expect(buttons.first()).toBeVisible();
			for (const button of await buttons.all()) {
				await expect(button).toHaveAttribute('href', BOOKING_PAGE);
				await expect(button).not.toHaveAttribute('target');
			}
		});
	}
});
