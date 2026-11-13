// No published page makes a promise the offer has dropped.
// Each phrase is quoted from the copy that made the promise, so it cannot match the new copy that
// says what is not promised («30 jours», «24 h/24»).
import { expect, test } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import type { Language } from './expected';

const RETIRED: Record<Language, string[]> = {
	fr: [
		'En 30 jours, je te livre',
		'En 30 jours, je livre',
		'30 jours au maximum',
		'30 jours calendaires',
		'au moins 99 % du temps',
		'au plus 1 % hors service',
		"sans facturer jusqu'à y arriver",
		'5 à 20 personnes',
		'au moins 3 devs',
		'conteneurisée, par le bloc 2',
		'pipeline CI, conteneurisation',
		"pas de point d'avancement régulier",
		'budget de 100 à 500 €',
		"je n'écris pas de tests",
		'freelance pour SaaS',
	],
	pt: [
		'Em 30 dias, entrego',
		'No máximo 30 dias',
		'pelo menos 99 % do tempo',
		'no máximo 1 % sem serviço',
		'sem faturar até chegar lá',
		'5 a 20 pessoas',
		'pelo menos 3 devs',
		'contentorizada, pelo bloco 2',
		'auditoria de código, contentorização',
		'Não há ponto de situação regular',
		'orçamento de 100 a 500 €',
		'não escrevo testes',
		'freelance para SaaS',
	],
	en: [
		'In 30 days, I deliver',
		'At most 30 days',
		'At most 30 calendar days',
		'at least 99% of the time',
		'at most 1% out of service',
		'without billing until it is',
		'5 to 20 people',
		'at least 3 devs',
		'containerised application, from block 2',
		'code audit, containerisation',
		'no regular status meetings',
		'budget of €100 to €500',
		"I don't write tests",
		'Freelance DevOps consultant for SaaS',
	],
};

// English pages show French placeholders, so every page is checked in every language.
const PHRASES = Object.values(RETIRED).flat();

/** Case, curly apostrophes and non-breaking spaces never hide a phrase. */
function normalized(text: string) {
	return text.replace(/\s+/g, ' ').replaceAll('’', "'").toLowerCase();
}

inEachBuild((build) => {
	for (const { path } of pagesOf(build)) {
		test(`${path} makes no retired promise`, async ({ page }) => {
			await page.goto(path);
			// The text a visitor can read, closed answers included, and what search results and shares show.
			const text = normalized(
				await page.evaluate(() =>
					[
						document.documentElement.textContent,
						...Array.from(document.querySelectorAll('meta[content]'), (meta) =>
							meta.getAttribute('content'),
						),
					].join(' '),
				),
			);
			const found = PHRASES.filter((phrase) => text.includes(normalized(phrase)));
			expect(found, `retired promises on ${path}`).toEqual([]);
		});
	}
});
