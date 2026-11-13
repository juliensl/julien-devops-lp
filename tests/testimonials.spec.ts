// The Testimonials (#67): the three Julien received on Malt, one at a time in a carousel that moves
// on by itself. A Testimonial only shows in a language its author authorised and, in English and
// Portuguese, whose translation the author approved; with none, the section does not exist.
import { expect, test, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, type Language } from './expected';

/** Each Testimonial links to Julien's Malt profile, where it was posted. */
const MALT_PROFILE = 'https://www.malt.fr/profile/julienlaffont';

interface Testimonial {
	/** First name · role · company, as the page shows them. */
	caption: string;
	paragraphs: string[];
}

// The authors' texts are the ones on Malt, copied in #51. The Portuguese translations are the ones
// the authors approved; the English ones are not approved yet, so English shows none. The section
// titles and the link in French and English are translations the intern reviews before the
// Commercial launch (#75).
const EXPECTED: Record<
	Language,
	{ title: string; malt: string; translatedNotice?: string; testimonials: Testimonial[] }
> = {
	fr: {
		title: 'Ce que disent les clients',
		malt: 'Voir sur Malt',
		testimonials: [
			{
				caption: 'Thibaud · Founder · Vasco',
				paragraphs: [
					"Julien a été très pro dans l'approche. Il est intervenu sur un périmètre précis, il a aidé notre équipe technique sénior qui avait déjà de bonnes notions, mais le DevOps est une discipline à part entière et c'est en collaborant avec Julien qu'on en devient convaincus. Un profil à recommander à 100%",
				],
			},
			{
				caption: 'Guillaume · Lead développeur · DADOUN PERE ET FILS',
				paragraphs: [
					'Julien nous a beaucoup aidés sur nos sujets DevOps avec sérieux, efficacité et beaucoup de pédagogie.',
					'Il a tout de suite compris notre contexte, proposé des solutions adaptées, et nous a permis d’améliorer la stabilité et la fiabilité de notre plateforme. Les échanges ont toujours été simples, clairs et agréables.',
					'C’est quelqu’un de fiable, disponible et très compétent. Nous recommandons Julien sans hésitation, et retravaillerons avec lui avec plaisir.',
				],
			},
			{
				caption: 'Adam · Expert devops · Venus consulting',
				paragraphs: [
					"J'ai fait appel à Julien dans le cadre d'un projet de formation en DevOps, et son intervention a été une totale réussite. Julien s'est montré parfaitement à la hauteur de la mission.",
					"Grâce à sa double expertise de développeur et de spécialiste DevOps, il a su transmettre des compétences pointues avec beaucoup de pédagogie et de clarté. Son professionnalisme, sa maîtrise technique et sa capacité à s'adapter aux besoins du projet ont été des atouts majeurs. Je recommande vivement Julien à quiconque cherche un expert DevOps fiable, compétent et excellent pédagogue. Un grand merci pour ton travail !",
				],
			},
		],
	},
	en: {
		title: 'What clients say',
		malt: 'View on Malt',
		translatedNotice: 'Translated from French',
		testimonials: [],
	},
	pt: {
		title: 'O que dizem os clientes',
		malt: 'Ver no Malt',
		translatedNotice: 'Traduzido do francês',
		testimonials: [
			{
				caption: 'Thibaud · Fundador · Vasco',
				paragraphs: [
					'O Julien foi muito profissional na abordagem. Interveio num âmbito preciso e ajudou a nossa equipa técnica sénior, que já tinha boas noções, mas o DevOps é uma disciplina por direito próprio e é a trabalhar com o Julien que ficamos convencidos disso. Um perfil a recomendar a 100 %.',
				],
			},
			{
				caption: 'Guillaume · Programador principal · DADOUN PERE ET FILS',
				paragraphs: [
					'O Julien ajudou-nos muito nos nossos temas de DevOps, com seriedade, eficácia e muita pedagogia.',
					'Percebeu logo o nosso contexto, propôs soluções adaptadas e permitiu-nos melhorar a estabilidade e a fiabilidade da nossa plataforma. A comunicação foi sempre simples, clara e agradável.',
					'É alguém fiável, disponível e muito competente. Recomendamos o Julien sem hesitar e voltaremos a trabalhar com ele com todo o gosto.',
				],
			},
			{
				caption: 'Adam · Especialista DevOps · Venus consulting',
				paragraphs: [
					'Recorri ao Julien para um projeto de formação em DevOps, e a intervenção dele foi um êxito total. O Julien esteve perfeitamente à altura da missão.',
					'Graças à dupla experiência de programador e de especialista DevOps, soube transmitir competências avançadas com muita pedagogia e clareza. O profissionalismo, o domínio técnico e a capacidade de se adaptar às necessidades do projeto foram trunfos importantes. Recomendo vivamente o Julien a quem procure um especialista DevOps fiável, competente e excelente pedagogo. Muito obrigado pelo teu trabalho!',
				],
			},
		],
	},
};

/** The authors' first names, which are never translated: the French captions have all three. */
const AUTHORS = EXPECTED.fr.testimonials.map(({ caption }) => caption.split(' · ')[0]);

/** The notice of a translation, in any language. */
const NOTICES = new RegExp(
	`^(${Object.values(EXPECTED)
		.map((e) => e.translatedNotice)
		.filter(Boolean)
		.join('|')})$`,
);

const section = (page: Page, language: Language) =>
	page.getByRole('region', { name: EXPECTED[language].title });

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];
		const { malt, translatedNotice, testimonials } = EXPECTED[language];

		if (testimonials.length === 0) {
			test(`${prefix}: no Testimonial can show, so there is no section`, async ({ page }) => {
				await page.goto(prefix);
				await expect(section(page, language)).toHaveCount(0);
				for (const author of AUTHORS) await expect(page.getByText(author)).toHaveCount(0);
			});
			continue;
		}

		test(`${prefix}: the Testimonials that can show it, in Julien's order, each with its author, full text and Malt link`, async ({
			page,
		}) => {
			await page.goto(prefix);
			const figures = section(page, language).getByRole('figure');
			await expect(figures).toHaveCount(testimonials.length);
			for (const [k, { caption, paragraphs }] of testimonials.entries()) {
				const figure = figures.nth(k);
				await expect(figure.getByText(caption, { exact: true })).toHaveCount(1);
				await expect(figure.getByRole('blockquote').getByRole('paragraph')).toHaveText(paragraphs);
				// A translation says so; the author's own text does not.
				await expect(figure.getByText(NOTICES)).toHaveText(
					translatedNotice ? [translatedNotice] : [],
				);
				// Malt, in the same tab, like every link on the page.
				const link = figure.getByRole('link', { name: malt, exact: true });
				await expect(link).toHaveAttribute('href', MALT_PROFILE);
				await expect(link).not.toHaveAttribute('target');
			}
			// No photo or logo: Julien's photo is the page's only image.
			await expect(section(page, language).getByRole('img')).toHaveCount(0);
		});
	}
});

// The carousel's behaviour, in French, in the build with the three languages (#54, «Decisões de teste»).
inEachBuild((build) => {
	if (!build.phase.publishedLanguages.includes('fr')) return;

	test.describe('the carousel, in French', () => {
		const carousel = (page: Page) => section(page, 'fr');
		const arrow = (page: Page, name: 'Témoignage précédent' | 'Témoignage suivant') =>
			carousel(page).getByRole('button', { name, exact: true });
		const position = (page: Page, current: number) =>
			carousel(page).getByText(`${current} sur 3`, { exact: true });

		// Whether the carousel passes by itself shows in what screen readers hear: the indicator is read
		// out only while it does not pass. The tests wait for it, because the page notices a scroll a
		// frame later, and WebKit without a screen draws few frames.
		const indicator = (page: Page) => carousel(page).getByText(/^\d sur 3$/);
		const expectPassing = (page: Page) =>
			expect(indicator(page)).toHaveAttribute('aria-live', 'off');
		const expectStopped = (page: Page) =>
			expect(indicator(page)).toHaveAttribute('aria-live', 'polite');

		/** Which Testimonial the strip shows: the one lined up with its left edge, or -1 while it slides. */
		const shown = (page: Page) =>
			carousel(page)
				.getByRole('group')
				.evaluate((strip) => {
					const left = strip.getBoundingClientRect().left;
					return [...strip.querySelectorAll('figure')].findIndex(
						(f) => Math.abs(f.getBoundingClientRect().left - left) < 2,
					);
				});

		async function openCarousel(page: Page) {
			await page.goto('/');
			await carousel(page).scrollIntoViewIfNeeded();
			await expect(position(page, 1)).toBeVisible();
		}

		// The time each Testimonial stays: its words at about 200 per minute, at least 8 s (#54).
		// Counted by hand in #51's texts: 52, 69 and 98 words.
		const READING_SECONDS = [15.6, 20.7, 29.4];

		/**
		 * Freezes the page's clock, so the test moves time on itself: the Testimonials then pass in a
		 * moment instead of half a minute each.
		 */
		async function freezeTime(page: Page) {
			await page.clock.pauseAt(await page.evaluate(() => Date.now() + 100));
		}

		/** Moves the page's time on by half-seconds until `current` shows, and says how long it took. */
		async function secondsUntil(page: Page, current: number, limit = 60) {
			let seconds = 0;
			while (seconds < limit && !(await position(page, current).isVisible())) {
				await page.clock.fastForward(500);
				seconds += 0.5;
			}
			return seconds;
		}

		/** Moves the page's time on by `seconds`, a second at a time. */
		async function passTime(page: Page, seconds: number) {
			for (let k = 0; k < seconds; k++) await page.clock.fastForward(1000);
		}

		test('each Testimonial stays the time to read it, then the next one comes, and after the last the first', async ({
			page,
		}) => {
			await page.clock.install();
			await openCarousel(page);
			await expectPassing(page);
			await freezeTime(page);
			for (const [k, seconds] of READING_SECONDS.entries()) {
				const next = (k + 1) % 3;
				// Within a second: the time is moved on by half-seconds.
				const waited = await secondsUntil(page, next + 1);
				expect(
					Math.abs(waited - seconds),
					`Testimonial ${k + 1} stayed ${waited} s`,
				).toBeLessThanOrEqual(1);
				await expect.poll(() => shown(page)).toBe(next);
			}
		});

		test('the arrows go to the next and previous Testimonials, round the ends', async ({
			page,
		}) => {
			await openCarousel(page);
			expect(await shown(page)).toBe(0);

			await arrow(page, 'Témoignage suivant').click();
			await expect(position(page, 2)).toBeVisible();
			await expect.poll(() => shown(page)).toBe(1);

			await arrow(page, 'Témoignage précédent').click();
			await arrow(page, 'Témoignage précédent').click();
			await expect(position(page, 3)).toBeVisible();
			await expect.poll(() => shown(page)).toBe(2);

			await arrow(page, 'Témoignage suivant').click();
			await expect(position(page, 1)).toBeVisible();
			await expect.poll(() => shown(page)).toBe(0);
		});

		test('it stops while the mouse is over it, and goes on when the mouse leaves', async ({
			page,
		}) => {
			await page.clock.install();
			await openCarousel(page);
			await freezeTime(page);
			await carousel(page).getByRole('blockquote').first().hover();
			await expectStopped(page);
			await passTime(page, 60);
			await expect(position(page, 1)).toBeVisible();

			await page.mouse.move(0, 0);
			await expectPassing(page);
			expect(await secondsUntil(page, 2)).toBeLessThanOrEqual(READING_SECONDS[0] + 1);
		});

		test('it stops while the focus is in it', async ({ page }) => {
			await page.clock.install();
			await openCarousel(page);
			await freezeTime(page);
			await arrow(page, 'Témoignage suivant').focus();
			await expectStopped(page);
			await passTime(page, 60);
			await expect(position(page, 1)).toBeVisible();
		});

		test('it stops off the screen', async ({ page }) => {
			await page.clock.install();
			await openCarousel(page);
			await freezeTime(page);
			await page.evaluate(() => scrollTo(0, 0));
			await expectStopped(page);
			await passTime(page, 60);
			await carousel(page).scrollIntoViewIfNeeded();
			await expect(position(page, 1)).toBeVisible();
			await expectPassing(page);
			expect(await secondsUntil(page, 2)).toBeLessThanOrEqual(READING_SECONDS[0] + 1);
		});

		test('the page pause button stops it, and it goes on once resumed', async ({ page }) => {
			const { pause, resume } = LANGUAGES.fr;
			await page.clock.install();
			await openCarousel(page);
			await freezeTime(page);
			await page.getByRole('button', { name: pause, exact: true }).click();
			await expectStopped(page);
			await passTime(page, 60);
			await expect(position(page, 1)).toBeVisible();

			await page.getByRole('button', { name: resume, exact: true }).click();
			await expectPassing(page);
			expect(await secondsUntil(page, 2)).toBeLessThanOrEqual(READING_SECONDS[0] + 1);
		});

		test('with reduced motion, it does not pass by itself, and the arrows and the indicator stay', async ({
			page,
		}) => {
			await page.emulateMedia({ reducedMotion: 'reduce' });
			await page.clock.install();
			await openCarousel(page);
			await freezeTime(page);
			await passTime(page, 60);
			await expect(position(page, 1)).toBeVisible();
			await expectStopped(page);

			await arrow(page, 'Témoignage suivant').click();
			await expect(position(page, 2)).toBeVisible();
			await expect.poll(() => shown(page)).toBe(1);
		});

		// While it passes by itself, a screen reader would otherwise read «2 sur 3» every few seconds.
		test('screen readers hear the indicator only while it does not pass by itself', async ({
			page,
		}) => {
			await openCarousel(page);
			await expectPassing(page);
			await arrow(page, 'Témoignage suivant').focus();
			await expectStopped(page);
		});

		test('with the keyboard, each Malt link brings its Testimonial into view, and the indicator follows', async ({
			page,
		}) => {
			await openCarousel(page);
			await arrow(page, 'Témoignage suivant').focus();
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');
			await expect(
				carousel(page).getByRole('link', { name: 'Voir sur Malt' }).nth(1),
			).toBeFocused();
			await expect.poll(() => shown(page)).toBe(1);
			await expect(position(page, 2)).toBeVisible();
		});

		test.describe('without JavaScript', () => {
			test.use({ javaScriptEnabled: false });

			test('the strip slides sideways, with no arrows', async ({ page }) => {
				await page.goto('/');
				await expect(arrow(page, 'Témoignage suivant')).toBeHidden();
				const strip = carousel(page).getByRole('group');
				await strip.scrollIntoViewIfNeeded();
				await strip.hover();
				await page.mouse.wheel((await strip.boundingBox())!.width, 0);
				await expect.poll(() => shown(page)).toBe(1);
			});
		});
	});
});
