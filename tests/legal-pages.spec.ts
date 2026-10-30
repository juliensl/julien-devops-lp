// The legal pages (#71, #54 «Páginas legais»): the Legal information and the Privacy policy, in each
// published language, which the footer of every page leads to, next to the email on the domain.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild, pagesOf } from './builds';
import { EMAIL, LANGUAGES, NAME, type Language } from './expected';

/** The titles of the two pages in each language (#54). */
const TITLES: Record<Language, { legal: string; privacy: string }> = {
	fr: { legal: 'Mentions légales', privacy: 'Politique de confidentialité' },
	en: { legal: 'Legal notice', privacy: 'Privacy policy' },
	pt: { legal: 'Informação legal', privacy: 'Política de privacidade' },
};

const PAGES = ['legal', 'privacy'] as const;

/** The Legal information's fields (#54), validated by Julien (#23), and the host's public data. */
const PROVIDER = {
	name: 'Julien Laffont EI',
	status: 'micro-entrepreneur',
	siret: '98767158300027',
	address: '2 Impasse Fino-Bricka, 34000 Montpellier',
	phone: '+33 6 49 81 21 97',
	tel: 'tel:+33649812197',
};
const HOST = {
	name: 'Infomaniak Network SA',
	address: 'Rue Eugène Marziano 25, 1227 Les Acacias (GE)',
	phone: '+41 22 820 35 41',
	tel: 'tel:+41228203541',
};

/**
 * What the Legal information never shows (#54): the NIF, the SIREN, «RCS», the activity codes; and the
 * VAT number, until Julien confirms it is active (#71, #75).
 */
const NEVER_SHOWN = [
	/\bNIF\b/,
	/\bSIREN\b/,
	/\bRCS\b/,
	/62\.01Z/,
	/68\.20A/,
	/519294700/,
	/FR90987671583/,
	/\b(IVA|TVA|VAT)\b/,
];

/** The texts of the Legal information in each language. PT is the reference; FR and EN go to #75. */
const LEGAL_TEXTS: Record<
	Language,
	{ france: string; switzerland: string; director: string; host: string; b2b: string }
> = {
	pt: {
		france: 'França',
		switzerland: 'Suíça',
		director: 'Diretor da publicação',
		host: 'Alojamento',
		b2b: 'Serviços destinados exclusivamente a profissionais.',
	},
	fr: {
		france: 'France',
		switzerland: 'Suisse',
		director: 'Directeur de la publication',
		host: 'Hébergeur',
		b2b: 'Services destinés exclusivement aux professionnels.',
	},
	en: {
		france: 'France',
		switzerland: 'Switzerland',
		director: 'Publication director',
		host: 'Host',
		b2b: 'Services intended exclusively for businesses.',
	},
};

/**
 * The Privacy policy in each language. The processings, their recipients and retention periods come
 * from #54 «Tratamentos e prazos», the legal bases from the intern's proposal. PT is the reference; FR and
 * EN go to #75.
 */
const PRIVACY: Record<
	Language,
	{
		controller: string;
		/** Each processing has a purpose, a legal basis, recipients and a retention period (#54). */
		labels: string[];
		processings: { heading: string; mentions: string[] }[];
		rights: { heading: string; objection: string };
		complaint: { heading: string; residence: string };
		afterDeath: string;
	}
> = {
	pt: {
		controller: 'Responsável pelo tratamento',
		labels: ['Finalidade', 'Base legal', 'Destinatários', 'Prazo'],
		processings: [
			{ heading: 'Logs do servidor e estatísticas', mentions: ['IP', 'Infomaniak', '7 dias'] },
			{ heading: 'Emails recebidos', mentions: ['Google', '3 anos'] },
			{
				heading: 'Marcações da Conversa',
				mentions: ['Calendly', 'Google', 'Data Privacy Framework', '3 anos'],
			},
			{ heading: 'Clientes', mentions: ['10 anos'] },
			{
				heading: 'Autores dos Testemunhos',
				mentions: ['primeiro nome', 'cargo', 'empresa', 'consentimento'],
			},
		],
		rights: { heading: 'Os teus direitos', objection: 'opor-te' },
		complaint: { heading: 'Reclamação', residence: 'país onde vives' },
		afterDeath: 'Os teus dados depois da tua morte',
	},
	fr: {
		controller: 'Responsable du traitement',
		labels: ['Finalité', 'Base légale', 'Destinataires', 'Durée de conservation'],
		processings: [
			{ heading: 'Journaux du serveur et statistiques', mentions: ['IP', 'Infomaniak', '7 jours'] },
			{ heading: 'E-mails reçus', mentions: ['Google', '3 ans'] },
			{
				heading: 'Réservations de l’Échange',
				mentions: ['Calendly', 'Google', 'Data Privacy Framework', '3 ans'],
			},
			{ heading: 'Clients', mentions: ['10 ans'] },
			{
				heading: 'Auteurs des Témoignages',
				mentions: ['prénom', 'poste', 'entreprise', 'consentement'],
			},
		],
		rights: { heading: 'Tes droits', objection: 't’opposer' },
		complaint: { heading: 'Réclamation', residence: 'pays où tu vis' },
		afterDeath: 'Tes données après ta mort',
	},
	en: {
		controller: 'Data controller',
		labels: ['Purpose', 'Legal basis', 'Recipients', 'Retention'],
		processings: [
			{ heading: 'Server logs and statistics', mentions: ['IP', 'Infomaniak', '7 days'] },
			{ heading: 'Emails received', mentions: ['Google', '3 years'] },
			{
				heading: 'Conversation bookings',
				mentions: ['Calendly', 'Google', 'Data Privacy Framework', '3 years'],
			},
			{ heading: 'Clients', mentions: ['10 years'] },
			{
				heading: 'Testimonial authors',
				mentions: ['first name', 'job title', 'company', 'consent'],
			},
		],
		rights: { heading: 'Your rights', objection: 'object' },
		complaint: { heading: 'Complaints', residence: 'country where you live' },
		afterDeath: 'Your data after your death',
	},
};

/** The text under a heading, up to the next heading of the same or a higher level, on one line. */
async function sectionText(page: Page, heading: string): Promise<string> {
	const element = page.getByRole('heading', { name: heading, exact: true });
	await expect(element).toBeVisible();
	const text = await element.evaluate((h) => {
		const level = Number(h.tagName[1]);
		const isEnd = (e: Element) => /^H[1-6]$/.test(e.tagName) && Number(e.tagName[1]) <= level;
		let text = '';
		for (let e = h.nextElementSibling; e && !isEnd(e); e = e.nextElementSibling) {
			text += ` ${(e as HTMLElement).innerText}`;
		}
		return text;
	});
	return text.replace(/\s+/g, ' ');
}

inEachBuild((build) => {
	for (const { path, language } of pagesOf(build)) {
		// The 404 has no language of its own: its texts are in English and, like its logo, its links lead
		// to the first published language.
		const target = language ?? build.phase.publishedLanguages[0];
		const titles = TITLES[language ?? 'en'];

		test.describe(`${path} footer`, () => {
			test('shows the email on the domain', async ({ page }) => {
				await page.goto(path);
				const link = page.getByRole('contentinfo').getByRole('link', { name: EMAIL, exact: true });
				await expect(link).toBeVisible();
				await expect(link).toHaveAttribute('href', `mailto:${EMAIL}`);
			});

			for (const legalPage of PAGES) {
				test(`leads to the ${legalPage} page in the same language`, async ({ page }) => {
					await page.goto(path);
					const link = page
						.getByRole('contentinfo')
						.getByRole('link', { name: titles[legalPage], exact: true });
					await expect(link).toBeVisible();
					const href = `${LANGUAGES[target].prefix}${legalPage}/`;
					await expect(link).toHaveAttribute('href', href);
					if (path === href) {
						await expect(link).toHaveAttribute('aria-current', 'page');
					} else {
						await expect(link).not.toHaveAttribute('aria-current');
					}
				});
			}
		});
	}

	test('no page has a cookie notice, a cookie page or the Livro de Reclamações (#54)', async ({
		page,
	}) => {
		const pages = pagesOf(build);
		for (const { path } of pages) expect(path).not.toMatch(/cookie|reclama/i);
		for (const { path } of pages) {
			await page.goto(path);
			await expect(page.getByRole('dialog'), path).toHaveCount(0);
			await expect(page.getByText('Livro de Reclamações'), path).toHaveCount(0);
			const hrefs = await page
				.getByRole('link')
				.evaluateAll((links) => links.map((l) => l.getAttribute('href') ?? ''));
			for (const href of hrefs) expect(href, path).not.toMatch(/cookie|livroreclamacoes/i);
		}
	});

	for (const language of build.phase.publishedLanguages) {
		for (const legalPage of PAGES) {
			const path = `${LANGUAGES[language].prefix}${legalPage}/`;
			const title = TITLES[language][legalPage];

			test(`${path} has the title «${title}»`, async ({ page }) => {
				const response = await page.goto(path);
				expect(response?.status()).toBe(200);
				await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
				await expect(page).toHaveTitle(`${title} · ${NAME}`);
			});
		}

		const texts = LEGAL_TEXTS[language];
		test.describe(`${LANGUAGES[language].prefix}legal/`, () => {
			test.beforeEach(async ({ page }) => {
				await page.goto(`${LANGUAGES[language].prefix}legal/`);
			});

			test('identifies the provider, with the email and phone as links', async ({ page }) => {
				const main = page.getByRole('main');
				await expect(main).toContainText(PROVIDER.name);
				await expect(main).toContainText(PROVIDER.status);
				await expect(main).toContainText(PROVIDER.siret);
				await expect(main).toContainText(`${PROVIDER.address}, ${texts.france}`);
				const phone = main.getByRole('link', { name: PROVIDER.phone, exact: true });
				await expect(phone).toHaveAttribute('href', PROVIDER.tel);
				const email = main.getByRole('link', { name: EMAIL, exact: true });
				await expect(email).toHaveAttribute('href', `mailto:${EMAIL}`);
			});

			test('names Julien as publication director', async ({ page }) => {
				await expect(page.getByRole('heading', { name: texts.director })).toBeVisible();
				await expect(page.getByRole('main')).toContainText(
					new RegExp(`${texts.director}\\s*${NAME}`),
				);
			});

			test('gives the host’s name, address and phone', async ({ page }) => {
				await expect(page.getByRole('heading', { name: texts.host, exact: true })).toBeVisible();
				const main = page.getByRole('main');
				await expect(main).toContainText(HOST.name);
				await expect(main).toContainText(`${HOST.address}, ${texts.switzerland}`);
				const phone = main.getByRole('link', { name: HOST.phone, exact: true });
				await expect(phone).toHaveAttribute('href', HOST.tel);
			});

			test('says the services are only for businesses', async ({ page }) => {
				await expect(page.getByText(texts.b2b, { exact: true })).toBeVisible();
			});

			test('never shows the NIF, the SIREN, «RCS», the activity code or the VAT number', async ({
				page,
			}) => {
				const text = await page.getByRole('main').innerText();
				for (const pattern of NEVER_SHOWN) expect(text).not.toMatch(pattern);
			});
		});

		const privacy = PRIVACY[language];
		test.describe(`${LANGUAGES[language].prefix}privacy/`, () => {
			test.beforeEach(async ({ page }) => {
				await page.goto(`${LANGUAGES[language].prefix}privacy/`);
			});

			test('names the controller and the contact email', async ({ page }) => {
				const text = await sectionText(page, privacy.controller);
				expect(text).toContain(PROVIDER.name);
				expect(text).toContain(EMAIL);
				const email = page.getByRole('main').getByRole('link', { name: EMAIL, exact: true });
				await expect(email.first()).toHaveAttribute('href', `mailto:${EMAIL}`);
			});

			for (const { heading, mentions } of privacy.processings) {
				test(`explains «${heading}»: purpose, legal basis, recipients and retention`, async ({
					page,
				}) => {
					const text = await sectionText(page, heading);
					for (const expected of [...privacy.labels, ...mentions]) expect(text).toContain(expected);
				});
			}

			test('says how to object by email, and the other rights', async ({ page }) => {
				const text = await sectionText(page, privacy.rights.heading);
				expect(text).toContain(privacy.rights.objection);
				expect(text).toContain(EMAIL);
			});

			test('leads to a complaint to the CNIL, or to the authority where you live', async ({
				page,
			}) => {
				const text = await sectionText(page, privacy.complaint.heading);
				expect(text).toContain('CNIL');
				expect(text).toContain(privacy.complaint.residence);
				const link = page.getByRole('main').getByRole('link', { name: /cnil/i });
				await expect(link).toHaveAttribute('href', 'https://www.cnil.fr/fr/plaintes');
			});

			test('mentions the directives for after death', async ({ page }) => {
				expect(await sectionText(page, privacy.afterDeath)).toContain(EMAIL);
			});
		});
	}
});
