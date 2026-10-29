// The Services section (#64): the 4 Blocks, in the pitch's order, each with its mini-diagram, name,
// summary, text and tools. On desktop, the section stays pinned while the cards pass sideways; on a
// phone, the cards are one below the other, and with reduced motion they are in a grid.
import { expect, test, type Locator, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, type Language } from './expected';

interface Block {
	name: string;
	summary: string;
	text: string;
	tools: string[];
}

// The Blocks and their tools come from the spec (#54); in Portuguese, the texts are the ones the
// user approved for the First validation (#74). French and English are translations the intern
// reviews before the Commercial launch (#75).
const EXPECTED: Record<
	Language,
	{ title: string; note: string; block: string; toolsLabel: string; blocks: Block[] }
> = {
	pt: {
		title: 'Quatro camadas da tua infraestrutura.',
		note: 'Contratas os blocos que quiseres, em qualquer combinação. No máximo 30 dias, a contar do início da Implementação. O bloco 3 precisa de uma aplicação contentorizada, pelo bloco 2 ou pela tua equipa.',
		block: 'Bloco',
		toolsLabel: 'Ferramentas',
		blocks: [
			{
				name: 'Pipeline de CI e auditoria de código',
				summary: 'Os bugs ficam no pull request.',
				text: 'Cada alteração passa por testes, lint e análise antes de chegar à produção, com a segurança em destaque: dependências com falhas conhecidas, segredos esquecidos no código e análise do próprio código. O que está a vermelho não passa.',
				tools: ['SonarQube', 'Trivy'],
			},
			{
				name: 'Contentorização',
				summary: 'A aplicação corre igual em todo o lado.',
				text: 'A aplicação deixa de depender do ambiente onde corre. No portátil de um dev ou em produção, o mesmo comportamento.',
				tools: ['Docker'],
			},
			{
				name: 'Infraestrutura escalável',
				summary: 'A infraestrutura acompanha a carga.',
				text: 'Em dois níveis: serverless de contentores para volumes médios, Kubernetes quando a carga o justifica. Com Infrastructure as Code, a infraestrutura fica descrita em código e pode ser recriada.',
				tools: ['Kubernetes', 'Terraform'],
			},
			{
				name: 'Observabilidade',
				summary: 'Vês os problemas antes dos clientes.',
				text: 'Um painel de saúde em tempo real e um alerta imediato quando há um incidente.',
				tools: ['Grafana', 'Prometheus', 'ou as ferramentas da tua cloud'],
			},
		],
	},
	fr: {
		title: 'Quatre couches de ton infrastructure.',
		note: "Tu choisis les blocs que tu veux, dans n'importe quelle combinaison. 30 jours au maximum, à compter du début de la mise en œuvre. Le bloc 3 demande une application conteneurisée, par le bloc 2 ou par ton équipe.",
		block: 'Bloc',
		toolsLabel: 'Outils',
		blocks: [
			{
				name: 'Audit du code et pipeline CI',
				summary: 'Les bugs sont attrapés à la pull request.',
				text: "Chaque modification passe par les tests, le lint et l'analyse avant d'arriver en production, avec la sécurité au premier plan : dépendances aux failles connues, secrets oubliés dans le code et analyse du code lui-même. Ce qui est rouge ne passe pas.",
				tools: ['SonarQube', 'Trivy'],
			},
			{
				name: 'Conteneurisation',
				summary: "L'application tourne de la même façon partout.",
				text: "L'application devient indépendante de son environnement. Sur le portable d'un dev ou en production, le même comportement.",
				tools: ['Docker'],
			},
			{
				name: 'Infrastructure scalable',
				summary: "L'infrastructure suit la charge.",
				text: "Sur deux niveaux : du serverless de conteneurs pour les volumes moyens, Kubernetes quand la charge le justifie. Avec l'Infrastructure as Code, l'infrastructure est décrite dans du code et peut être recréée.",
				tools: ['Kubernetes', 'Terraform'],
			},
			{
				name: 'Observabilité',
				summary: 'Tu vois les problèmes avant tes clients.',
				text: "Un tableau de bord de santé en temps réel et une alerte immédiate en cas d'incident.",
				tools: ['Grafana', 'Prometheus', 'ou les outils de ton cloud'],
			},
		],
	},
	en: {
		title: 'Four layers of your infrastructure.',
		note: 'You hire the blocks you want, in any combination. At most 30 days from the start of the Implementation. Block 3 needs a containerised application, from block 2 or from your team.',
		block: 'Block',
		toolsLabel: 'Tools',
		blocks: [
			{
				name: 'CI pipeline and code audit',
				summary: 'Bugs stay in the pull request.',
				text: 'Every change goes through tests, lint and analysis before it reaches production, with security up front: dependencies with known vulnerabilities, secrets left in the code, and analysis of the code itself. Whatever is red does not get through.',
				tools: ['SonarQube', 'Trivy'],
			},
			{
				name: 'Containerisation',
				summary: 'The application runs the same everywhere.',
				text: "The application no longer depends on the environment it runs in. On a developer's laptop or in production, it behaves the same.",
				tools: ['Docker'],
			},
			{
				name: 'Scalable infrastructure',
				summary: 'The infrastructure keeps up with the load.',
				text: 'At two levels: serverless containers for medium volumes, Kubernetes when the load justifies it. With Infrastructure as Code, the infrastructure is described in code and can be recreated.',
				tools: ['Kubernetes', 'Terraform'],
			},
			{
				name: 'Observability',
				summary: 'You see problems before your customers do.',
				text: 'A real-time health dashboard and an immediate alert when there is an incident.',
				tools: ['Grafana', 'Prometheus', "or your cloud's own tools"],
			},
		],
	},
};

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
// A laptop screen, lower than DESKTOP: the section still pins there.
const LAPTOP: Viewport = { label: 'on a laptop', width: 1536, height: 730 };
// Pinned, part of the cards would be hidden below the screen.
const SHORT_SCREEN: Viewport = {
	...DESKTOP,
	label: 'on a short screen, where the cards do not fit',
	height: 360,
};

const section = (page: Page, language: Language) =>
	page.getByRole('region', { name: EXPECTED[language].title });

/** The cards: the list items with a Block name, not the items of the tools lists. */
const cards = (page: Page, language: Language) =>
	section(page, language)
		.getByRole('listitem')
		.filter({ has: page.getByRole('heading', { level: 3 }) });

/** Opens the page on that screen and waits until the JS, which starts once loading ends, has run. */
async function openPage(page: Page, path: string, viewport: Viewport) {
	if (viewport.reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.setViewportSize({ width: viewport.width, height: viewport.height });
	await page.goto(path);
	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve)));
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

type Box = { x: number; y: number; width: number; height: number };

/** Where each card is on the page, in order. */
async function cardBoxes(page: Page, language: Language) {
	return Promise.all(
		[0, 1, 2, 3].map(async (k) => (await cards(page, language).nth(k).boundingBox())!),
	);
}

/** The counter, «1 / 4», shown only while the section is pinned. */
const counter = (page: Page, language: Language, current: number) =>
	section(page, language).getByText(`${current} / 4`, { exact: true });

/** The line beside the counter, which fills up in green as the cards pass. */
const progressBar = (page: Page, language: Language) =>
	section(page, language)
		.locator('p', { hasText: / \/ 4$/ })
		.locator('span > span');

/** Whether the whole card is on the screen. Pinned, the cards still to come are beyond its right edge. */
function isOnScreen(card: Locator) {
	return card.evaluate((e) => {
		const { left, right, top, bottom } = e.getBoundingClientRect();
		return left >= 0 && right <= innerWidth && top >= 0 && bottom <= innerHeight;
	});
}

/**
 * Brings the card into full view the way a Visitor does: by scrolling down from the top of the
 * section. Pinned, the cards pass sideways and each one comes into view after some scroll.
 */
async function scrollToCard(page: Page, card: Locator) {
	await card.evaluate((e) => {
		const top = e.closest('section')!.getBoundingClientRect().top;
		if (top > 0) scrollBy(0, top);
	});
	for (let step = 0; step < 100 && !(await isOnScreen(card)); step++) {
		await page.evaluate(() => scrollBy(0, 100));
	}
}

/** Each Block is in view, in order, with its number, name, summary, text and tools. */
async function expectFourBlocksVisible(page: Page, language: Language) {
	const expected = EXPECTED[language];
	await expect(cards(page, language)).toHaveCount(4);
	for (const [k, block] of expected.blocks.entries()) {
		const card = cards(page, language).nth(k);
		await scrollToCard(page, card);
		expect(await isOnScreen(card), `card ${k + 1} on the screen`).toBe(true);
		await expect(card.getByRole('img')).toBeVisible();
		await expect(card.getByRole('img')).toHaveAccessibleName(/\w/);
		await expect(card.getByText(`${expected.block} ${k + 1}`, { exact: true })).toBeVisible();
		await expect(card.getByRole('heading', { level: 3, name: block.name })).toBeVisible();
		await expect(card.getByText(block.summary, { exact: true })).toBeVisible();
		await expect(card.getByText(block.text, { exact: true })).toBeVisible();
		await expect(
			card.getByRole('list', { name: expected.toolsLabel }).getByRole('listitem'),
		).toHaveText(block.tools);
	}
}

/** Two screenshots of the element, 1 s apart: different if anything in it moved. */
async function isMoving(element: Locator) {
	const before = await element.screenshot();
	await element.page().waitForTimeout(1000);
	return !before.equals(await element.screenshot());
}

/** The animations running in the section right now, as the browser reports them. */
function runningAnimations(page: Page, language: Language) {
	return section(page, language).evaluate(
		(s) =>
			document
				.getAnimations()
				.filter(
					(a) =>
						a.playState === 'running' &&
						a.effect instanceof KeyframeEffect &&
						s.contains(a.effect.target),
				).length,
	);
}

const diagram = (page: Page, language: Language, k: number) =>
	cards(page, language).nth(k).getByRole('img');

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];

		test.describe(prefix, () => {
			test('the note says any combination of Blocks, at most 30 days, and block 3 needs a containerised application', async ({
				page,
			}) => {
				await page.goto(prefix);
				await expect(
					section(page, language).getByText(EXPECTED[language].note, { exact: true }),
				).toBeVisible();
			});

			test('on desktop, the section stays pinned while the cards pass sideways', async ({
				page,
			}) => {
				await openPage(page, prefix, DESKTOP);
				await scrollToSection(page, language);
				const firstCard = cards(page, language).first();
				const before = (await firstCard.boundingBox())!.x;
				const { scroll, title } = await scrollDown(page, language, 300);
				expect(scroll).toBeCloseTo(300, 0);
				expect(Math.abs(title), 'the title stays put').toBeLessThan(2);
				expect((await firstCard.boundingBox())!.x, 'the 1st card moved left').toBeLessThan(
					before - 100,
				);
			});

			test('on desktop, the counter goes from 1 / 4 to 4 / 4 and the bar fills up, then the section unpins', async ({
				page,
			}) => {
				await openPage(page, prefix, DESKTOP);
				await scrollToSection(page, language);
				await expect(counter(page, language, 1)).toBeVisible();
				expect((await progressBar(page, language).boundingBox())?.width ?? 0).toBeLessThan(1);

				// Down 100 px at a time, while the title stays put: the counter only goes up, one by one.
				const counts = [1];
				let barWidth = 0;
				let lastCardOnScreen = false;
				for (let step = 0; step < 100; step++) {
					const { title } = await scrollDown(page, language, 100);
					if (Math.abs(title) >= 2) break;
					const text = await section(page, language)
						.getByText(/^\d \/ 4$/)
						.innerText();
					const count = Number(text[0]);
					if (count !== counts.at(-1)) counts.push(count);
					const width = (await progressBar(page, language).boundingBox())!.width;
					expect(width, 'the bar never shrinks').toBeGreaterThanOrEqual(barWidth);
					barWidth = width;
					lastCardOnScreen = await isOnScreen(cards(page, language).nth(3));
				}
				expect(counts).toEqual([1, 2, 3, 4]);
				expect(lastCardOnScreen, 'the 4th card on the screen before the section unpins').toBe(true);
				expect(barWidth, 'the bar full').toBeGreaterThan(100);
			});

			for (const viewport of [DESKTOP, LAPTOP]) {
				test(`${viewport.label}, while the cards pass, the pause button never covers them`, async ({
					page,
				}) => {
					const button = page.getByRole('button', { name: LANGUAGES[language].pause, exact: true });
					await openPage(page, prefix, viewport);
					await scrollToSection(page, language);
					const buttonBox = (await button.boundingBox())!;
					// Down 100 px at a time, while the title stays put (pinned).
					let pinnedSteps = 0;
					for (; pinnedSteps < 100; pinnedSteps++) {
						const { title } = await scrollDown(page, language, 100);
						if (Math.abs(title) >= 2) break;
						for (const card of await cards(page, language).all()) {
							const box = (await card.boundingBox())!;
							const covered =
								box.x < buttonBox.x + buttonBox.width &&
								buttonBox.x < box.x + box.width &&
								box.y + box.height > buttonBox.y;
							expect(covered, `after ${pinnedSteps + 1} steps`).toBe(false);
						}
					}
					expect(pinnedSteps, 'the section stayed pinned while the cards passed').toBeGreaterThan(
						3,
					);
				});
			}

			for (const viewport of [PHONE, REDUCED_MOTION, SHORT_SCREEN]) {
				test(`${viewport.label}, the section is not pinned`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await scrollToSection(page, language);
					const { scroll, title } = await scrollDown(page, language, 300);
					expect(scroll, 'the page scrolled').toBeGreaterThan(0);
					expect(title).toBeCloseTo(scroll, 0);
					await expect(counter(page, language, 1)).toBeHidden();
				});
			}

			test('on a phone, the cards are one below the other', async ({ page }) => {
				await openPage(page, prefix, PHONE);
				const boxes = await cardBoxes(page, language);
				for (let k = 1; k < 4; k++) {
					expect(boxes[k]!.x, `card ${k + 1}`).toBeCloseTo(boxes[0]!.x, 0);
					expect(boxes[k]!.y, `card ${k + 1}`).toBeGreaterThanOrEqual(
						boxes[k - 1]!.y + boxes[k - 1]!.height,
					);
				}
			});

			test('on desktop, with reduced motion, the cards are in a grid of two columns', async ({
				page,
			}) => {
				await openPage(page, prefix, REDUCED_MOTION);
				const [first, second, third, fourth] = (await cardBoxes(page, language)) as [
					Box,
					Box,
					Box,
					Box,
				];
				expect(second.y, 'the 2nd card beside the 1st').toBeCloseTo(first.y, 0);
				expect(second.x).toBeGreaterThan(first.x + first.width);
				expect(third.x, 'the 3rd card below the 1st').toBeCloseTo(first.x, 0);
				expect(third.y).toBeGreaterThanOrEqual(
					Math.max(first.y + first.height, second.y + second.height),
				);
				expect(fourth.y, 'the 4th card beside the 3rd').toBeCloseTo(third.y, 0);
				expect(fourth.x).toBeCloseTo(second.x, 0);
			});

			for (const viewport of [DESKTOP, PHONE, REDUCED_MOTION]) {
				test(`${viewport.label}, the 4 Blocks and their tools are visible`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await expectFourBlocksVisible(page, language);
				});
			}

			for (const viewport of [DESKTOP, PHONE]) {
				test(`${viewport.label}, the mini-diagrams move, and the pause button stops them`, async ({
					page,
				}) => {
					const { pause, resume } = LANGUAGES[language];
					await openPage(page, prefix, viewport);
					await scrollToCard(page, cards(page, language).first());
					expect(await isMoving(diagram(page, language, 0)), 'before the pause').toBe(true);

					await page.getByRole('button', { name: pause, exact: true }).click();
					await expect
						.poll(() => isMoving(diagram(page, language, 0)), {
							message: 'paused',
							timeout: 10_000,
						})
						.toBe(false);

					await page.getByRole('button', { name: resume, exact: true }).click();
					expect(await isMoving(diagram(page, language, 0)), 'after resuming').toBe(true);
				});
			}

			test('paused before reaching the section, the mini-diagrams stay still when they come into view', async ({
				page,
			}) => {
				await openPage(page, prefix, PHONE);
				await page.getByRole('button', { name: LANGUAGES[language].pause, exact: true }).click();
				for (let k = 0; k < 4; k++) {
					await scrollToCard(page, cards(page, language).nth(k));
					expect(await isMoving(diagram(page, language, k)), `diagram ${k + 1}`).toBe(false);
				}
			});

			test('the mini-diagrams only animate in view', async ({ page }) => {
				await openPage(page, prefix, DESKTOP);
				await page.waitForTimeout(500);
				expect(await runningAnimations(page, language), 'at the top of the page').toBe(0);
				await scrollToSection(page, language);
				await expect.poll(() => runningAnimations(page, language)).toBeGreaterThan(0);
			});

			test('with reduced motion, the mini-diagrams stay still', async ({ page }) => {
				await openPage(page, prefix, REDUCED_MOTION);
				for (let k = 0; k < 4; k++) {
					await scrollToCard(page, cards(page, language).nth(k));
					expect(await isMoving(diagram(page, language, k)), `diagram ${k + 1}`).toBe(false);
				}
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the 4 Blocks and their tools are visible', async ({ page }) => {
					await page.setViewportSize({ width: DESKTOP.width, height: DESKTOP.height });
					await page.goto(prefix);
					await expectFourBlocksVisible(page, language);
				});

				// Without JS, the pause button would not work: so the mini-diagrams may not move.
				test('the mini-diagrams stay still', async ({ page }) => {
					await page.setViewportSize({ width: DESKTOP.width, height: DESKTOP.height });
					await page.goto(prefix);
					for (let k = 0; k < 4; k++) {
						await scrollToCard(page, cards(page, language).nth(k));
						expect(await isMoving(diagram(page, language, k)), `diagram ${k + 1}`).toBe(false);
					}
				});
			});
		});
	}
});
