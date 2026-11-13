// The Steps section (#65): the 5 Steps, from the Conversation to the Delivery and handover. On
// desktop, the section stays pinned; on a phone and with reduced motion, it is not pinned. Each Step
// shows when the branch reaches it and goes again when the branch shrinks back above it.
import { expect, test, type Locator, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, type Language } from './expected';

// French is Julien's text, Portuguese its translation; English shows the French until it is translated.
const FRENCH = {
	title: 'Cinq étapes pour avancer sereinement.',
	steps: [
		[
			'Échange initial',
			'45 minutes sur Google Meet pour comprendre ton produit, tes priorités et tes contraintes. Gratuit, sans engagement.',
		],
		[
			'Diagnostic',
			'Un premier état des lieux gratuit de ton code et, si nécessaire, de ton infrastructure. Retour sous 3 à 5 jours ouvrés après réception des accès utiles.',
		],
		[
			"Proposition d'intervention",
			'Un périmètre précis, des priorités, un calendrier et un prix convenus avant de commencer.',
		],
		[
			'Mise en œuvre',
			"J'interviens avec ton équipe, en limitant les perturbations du développement. Un point d'avancement régulier, en principe chaque semaine, permet de suivre les actions et les décisions.",
		],
		[
			'Livraison & passation',
			'Documentation, vérifications finales et transfert de connaissances pour que ton équipe reste autonome.',
		],
	] as [string, string][],
};
const EXPECTED: Record<Language, { title: string; steps: [string, string][] }> = {
	pt: {
		title: 'Cinco etapas para avançar com tranquilidade.',
		steps: [
			[
				'Conversa inicial',
				'45 minutos por Google Meet para perceber o teu produto, as tuas prioridades e as tuas restrições. Gratuita, sem compromisso.',
			],
			[
				'Diagnóstico',
				'Um primeiro levantamento gratuito do teu código e, se for preciso, da tua infraestrutura. Resposta em 3 a 5 dias úteis depois de receber os acessos necessários.',
			],
			[
				'Proposta de intervenção',
				'Um âmbito preciso, prioridades, um calendário e um preço acordados antes de começar.',
			],
			[
				'Implementação',
				'Trabalho com a tua equipa, limitando as perturbações no desenvolvimento. Um ponto de situação regular, em princípio todas as semanas, permite acompanhar as ações e as decisões.',
			],
			[
				'Entrega e transferência',
				'Documentação, verificações finais e transferência de conhecimento para que a tua equipa fique autónoma.',
			],
		],
	},
	fr: FRENCH,
	en: FRENCH,
};

/** Unpinned, the branch's tip follows the line at 62 % of the screen. */
const GROWTH_LINE = 0.62;

/** Where the Visitor opens the page. */
interface Viewport {
	label: string;
	width: number;
	height: number;
	reducedMotion?: boolean;
}

const DESKTOP: Viewport = { label: 'on desktop', width: 1280, height: 800 };
const PHONE: Viewport = { label: 'on a phone', width: 375, height: 700 };
const REDUCED_MOTION: Viewport = {
	...DESKTOP,
	label: 'on desktop, with reduced motion',
	reducedMotion: true,
};
// Pinned, part of the Steps would be hidden below the screen.
const SHORT_SCREEN: Viewport = {
	...DESKTOP,
	label: 'on a short screen, where the Steps do not fit',
	height: 360,
};

const section = (page: Page, language: Language) =>
	page.getByRole('region', { name: EXPECTED[language].title });

/** Opens the page on that screen and waits until the JS, which starts once loading ends, has run. */
async function openPage(page: Page, path: string, viewport: Viewport) {
	if (viewport.reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.setViewportSize({ width: viewport.width, height: viewport.height });
	await page.goto(path);
	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve)));
}

/** The 5 Steps are in view, in order, each with its name and sentence. */
async function expectFiveStepsVisible(page: Page, language: Language) {
	const steps = section(page, language).getByRole('list').getByRole('listitem');
	await expect(steps).toHaveCount(5);
	for (const [k, [name, sentence]] of EXPECTED[language].steps.entries()) {
		await steps.nth(k).scrollIntoViewIfNeeded();
		await expect(steps.nth(k).getByText(name, { exact: true })).toBeVisible();
		await expect(steps.nth(k).getByText(sentence, { exact: true })).toBeVisible();
	}
}

/** Brings the top of the section to the bottom of the sticky header, where a pinned section starts. */
async function scrollToSection(page: Page, language: Language) {
	const header = (await page.getByRole('banner').boundingBox())!;
	await section(page, language).evaluate(
		(s, headerBottom) => scrollBy(0, s.getBoundingClientRect().top - headerBottom),
		header.y + header.height,
	);
}

/**
 * Scrolls the page down `distance` px and says how far the page actually scrolled and how far the
 * section title rose. Unpinned, the title rises as much as the page scrolls; pinned, it stays put.
 */
async function scrollDown(page: Page, language: Language, distance: number) {
	const heading = section(page, language).getByRole('heading', { level: 2 });
	const before = {
		scroll: await page.evaluate(() => scrollY),
		title: (await heading.boundingBox())!.y,
	};
	await page.evaluate((d) => scrollBy(0, d), distance);
	return {
		scroll: (await page.evaluate(() => scrollY)) - before.scroll,
		title: before.title - (await heading.boundingBox())!.y,
	};
}

/** Scrolls until the middle of `element` is `y` px from the top of the screen. */
async function placeMiddle(element: Locator, y: number) {
	await element.evaluate((e, y) => {
		const { top, height } = e.getBoundingClientRect();
		scrollBy(0, top + height / 2 - y);
	}, y);
}

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];

		test.describe(prefix, () => {
			test('on desktop, the section stays pinned for about half a screen per Step', async ({
				page,
			}) => {
				const { height } = DESKTOP;
				await openPage(page, prefix, DESKTOP);
				await scrollToSection(page, language);
				// 5 Steps, about 2.5 screens: pinned up to 2.25 (less than 2 px, the header border),
				// already unpinned at 2.75.
				const stuck = await scrollDown(page, language, 2.25 * height);
				expect(stuck.scroll).toBeCloseTo(2.25 * height, 0);
				expect(Math.abs(stuck.title)).toBeLessThan(2);
				expect((await scrollDown(page, language, 0.5 * height)).title).toBeGreaterThan(
					0.2 * height,
				);
			});

			test('on desktop, each Step shows when its turn comes, and goes again on the way back up', async ({
				page,
			}) => {
				await openPage(page, prefix, DESKTOP);
				await scrollToSection(page, language);
				const steps = section(page, language).getByRole('listitem');
				const expectShown = async (shown: number) => {
					for (let k = 0; k < 5; k++) {
						await expect(steps.nth(k), `${shown} shown`).toHaveCSS(
							'opacity',
							k < shown ? '1' : '0',
						);
					}
				};

				// Each half screen of scroll shows one more Step, in order; back up, they go in reverse.
				for (let shown = 0; shown <= 5; shown++) {
					await expectShown(shown);
					if (shown < 5) await page.evaluate((d) => scrollBy(0, d), 0.5 * DESKTOP.height);
				}
				for (let shown = 4; shown >= 0; shown--) {
					await page.evaluate((d) => scrollBy(0, -d), 0.5 * DESKTOP.height);
					await expectShown(shown);
				}
			});

			test('on a phone, each Step shows once its number passes the growth line, and goes again below it', async ({
				page,
			}) => {
				await openPage(page, prefix, PHONE);
				const steps = section(page, language).getByRole('listitem');
				const line = GROWTH_LINE * PHONE.height;
				const stepNumber = (k: number) => steps.nth(k).getByText(String(k + 1), { exact: true });

				for (let k = 0; k < 5; k++) {
					await placeMiddle(stepNumber(k), line + 15);
					await expect(steps.nth(k)).toHaveCSS('opacity', '0');
					await placeMiddle(stepNumber(k), line - 15);
					await expect(steps.nth(k)).toHaveCSS('opacity', '1');
				}
				await placeMiddle(stepNumber(0), line + 15);
				await expect(steps.nth(0)).toHaveCSS('opacity', '0');
			});

			for (const viewport of [PHONE, REDUCED_MOTION, SHORT_SCREEN]) {
				test(`${viewport.label}, the section is not pinned`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await scrollToSection(page, language);
					const { scroll, title } = await scrollDown(page, language, 300);
					expect(scroll, 'the page scrolled').toBeGreaterThan(0);
					expect(title).toBeCloseTo(scroll, 0);
				});
			}

			for (const viewport of [DESKTOP, PHONE, REDUCED_MOTION]) {
				test(`${viewport.label}, the 5 Steps are visible`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await expectFiveStepsVisible(page, language);
				});
			}

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the 5 Steps are visible', async ({ page }) => {
					await page.setViewportSize({ width: DESKTOP.width, height: DESKTOP.height });
					await page.goto(prefix);
					await expectFiveStepsVisible(page, language);
				});
			});
		});
	}
});
