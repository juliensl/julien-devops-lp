// The Services section (#64): the 4 Blocks, each with its mini-diagram, name, summary, text and
// tags. On desktop, the section stays pinned while the cards pass sideways; on a
// phone, the cards are one below the other, and with reduced motion they are in a grid.
import { expect, test, type Locator, type Page } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, type Language } from './expected';
import { fadesDone } from './reveal';

interface Block {
	name: string;
	summary: string;
	text: string;
	tools: string[];
}

// The Blocks and their tags: in French, Julien's final text; in Portuguese, its translation. English
// still holds the French text, until it is translated.
const FRENCH = {
	label: 'Services',
	title: 'Quatre leviers pour fiabiliser et faire grandir ton SaaS.',
	intro:
		"De la qualité du code à la supervision en production, j'interviens sur les points qui freinent ton équipe. Après un diagnostic, nous définissons ensemble le périmètre, les priorités et l'ordre des interventions. Tu peux me confier un besoin ciblé ou un projet complet.",
	blocks: [
		{
			name: 'Audit du code & CI/CD',
			summary: "Détecte les problèmes avant qu'ils n'arrivent en production.",
			text: "J'analyse le dépôt et les processus de livraison, puis je mets en place une pipeline adaptée à ton projet : qualité du code, lint, tests automatisés, analyse de sécurité et contrôles des dépendances. Les erreurs sont signalées dès la pull request, avant de devenir des incidents chez tes clients.",
			tools: [
				'GitHub Actions',
				'GitLab CI',
				'Lint',
				'Tests unitaires',
				"Tests d'intégration",
				'Tests E2E',
				'SonarQube',
				'Trivy',
				'Gitleaks',
				'Et plus selon la stack',
			],
		},
		{
			name: 'Nettoyage & optimisation du code',
			summary: 'Moins de dette technique, plus de temps pour développer.',
			text: "Je prends directement en charge les corrections applicatives, le refactoring du code et les optimisations de performances identifiés comme prioritaires. J'automatise également une partie de la maintenance répétitive. L'objectif : rendre l'application plus propre, plus rapide et plus simple à faire évoluer. Le volume d'intervention est défini après l'audit : il ne s'agit pas d'une refonte illimitée de tout le code.",
			tools: [
				'Refactoring',
				'Dette technique',
				'Performances',
				'API & requêtes',
				'Dépendances',
				'Maintenance automatisée',
				'Selon la stack',
			],
		},
		{
			name: 'Infrastructure scalable',
			summary: 'La bonne architecture pour ton usage, pas de complexité inutile.',
			text: "Je conteneurise l'application lorsque c'est nécessaire et je choisis l'hébergement adapté à sa charge : conteneurs managés, services serverless ou Kubernetes. L'Infrastructure as Code permet de décrire, versionner et reproduire les environnements. L'objectif est de pouvoir évoluer sans surdimensionner l'infrastructure dès le départ.",
			tools: [
				'Docker',
				'Containers as a Service',
				'Kubernetes',
				'Terraform',
				'GCP',
				'AWS',
				'Azure',
				'Scaleway',
				'OVHcloud',
				'Infomaniak',
				'Et autres fournisseurs',
			],
		},
		{
			name: 'Observabilité',
			summary: 'Ne découvre plus les incidents par tes clients.',
			text: "Je mets en place les métriques, journaux, tableaux de bord et alertes nécessaires pour suivre la santé de l'application et de son infrastructure. Au lieu de vérifier manuellement si tout fonctionne, ton équipe est avertie dès qu'un problème détectable apparaît et dispose des informations nécessaires pour intervenir.",
			tools: [
				'Grafana',
				'Prometheus',
				'Logs',
				'Alertes',
				'Monitoring',
				'Tracing',
				'Outils natifs du cloud',
			],
		},
	],
};

const EXPECTED: Record<
	Language,
	{
		label: string;
		title: string;
		intro: string;
		blockLabel: string;
		toolsLabel: string;
		blocks: Block[];
	}
> = {
	pt: {
		label: 'Serviços',
		title: 'Quatro alavancas para tornar o teu SaaS fiável e fazê-lo crescer.',
		intro:
			'Da qualidade do código à monitorização em produção, intervenho nos pontos que travam a tua equipa. Depois de um diagnóstico, definimos juntos o âmbito, as prioridades e a ordem das intervenções. Podes confiar-me uma necessidade específica ou um projeto completo.',
		blockLabel: 'Bloco',
		toolsLabel: 'Áreas e ferramentas',
		blocks: [
			{
				name: 'Auditoria do código e CI/CD',
				summary: 'Deteta os problemas antes de chegarem à produção.',
				text: 'Analiso o repositório e os processos de entrega e, depois, monto uma pipeline adaptada ao teu projeto: qualidade do código, lint, testes automatizados, análise de segurança e controlo das dependências. Os erros são assinalados logo no pull request, antes de se tornarem incidentes nos teus clientes.',
				tools: [
					'GitHub Actions',
					'GitLab CI',
					'Lint',
					'Testes unitários',
					'Testes de integração',
					'Testes E2E',
					'SonarQube',
					'Trivy',
					'Gitleaks',
					'E mais, conforme a stack',
				],
			},
			{
				name: 'Limpeza e otimização do código',
				summary: 'Menos dívida técnica, mais tempo para desenvolver.',
				text: 'Encarrego-me diretamente das correções na aplicação, do refactoring do código e das otimizações de desempenho identificados como prioritários. Também automatizo uma parte da manutenção repetitiva. O objetivo: tornar a aplicação mais limpa, mais rápida e mais simples de fazer evoluir. O volume da intervenção é definido depois da auditoria: não se trata de uma reformulação ilimitada de todo o código.',
				tools: [
					'Refactoring',
					'Dívida técnica',
					'Desempenho',
					'API e consultas',
					'Dependências',
					'Manutenção automatizada',
					'Conforme a stack',
				],
			},
			{
				name: 'Infraestrutura escalável',
				summary: 'A arquitetura certa para o teu uso, sem complexidade desnecessária.',
				text: 'Contentorizo a aplicação quando é necessário e escolho o alojamento adequado à sua carga: contentores geridos, serviços serverless ou Kubernetes. A Infrastructure as Code permite descrever, versionar e reproduzir os ambientes. O objetivo é poder evoluir sem sobredimensionar a infraestrutura logo de início.',
				tools: [
					'Docker',
					'Containers as a Service',
					'Kubernetes',
					'Terraform',
					'GCP',
					'AWS',
					'Azure',
					'Scaleway',
					'OVHcloud',
					'Infomaniak',
					'E outros fornecedores',
				],
			},
			{
				name: 'Observabilidade',
				summary: 'Deixa de descobrir os incidentes pelos teus clientes.',
				text: 'Implemento as métricas, registos, painéis e alertas necessários para acompanhar a saúde da aplicação e da sua infraestrutura. Em vez de verificar manualmente se tudo funciona, a tua equipa é avisada assim que surge um problema detetável e tem a informação necessária para intervir.',
				tools: [
					'Grafana',
					'Prometheus',
					'Logs',
					'Alertas',
					'Monitorização',
					'Tracing',
					'Ferramentas nativas da cloud',
				],
			},
		],
	},
	fr: { ...FRENCH, blockLabel: 'Bloc', toolsLabel: 'Domaines et outils' },
	en: { ...FRENCH, blockLabel: 'Block', toolsLabel: 'Domaines et outils' },
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
const TABLET: Viewport = { label: 'on a tablet', width: 820, height: 1180 };
// All 4 cards fit side by side: there is nothing to pass sideways.
const WIDE_SCREEN: Viewport = {
	label: 'on a very wide screen, where the 4 cards fit',
	width: 2560,
	height: 1440,
};
// The lowest and narrowest laptop window where the section must still pin.
const SMALL_LAPTOP: Viewport = { label: 'on a small laptop', width: 1054, height: 695 };
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

/**
 * Scrolls the page by `distance` px. With JS, it returns two frames later: the page moves the cards
 * and the counter in the frame after the scroll, and WebKit without a screen only draws a frame when
 * one is asked for. Without JS, there is nothing to wait for, and a frame callback would never run.
 */
async function scrollPage(page: Page, distance: number, javaScript = true) {
	if (!javaScript) return page.evaluate((d) => scrollBy(0, d), distance);
	await page.evaluate(
		(d) =>
			new Promise((resolve) => {
				scrollBy(0, d);
				requestAnimationFrame(() => requestAnimationFrame(resolve));
			}),
		distance,
	);
}

/** Brings the top of the section to the bottom of the sticky header, where a pinned section starts. */
async function scrollToSection(page: Page, language: Language) {
	const header = (await page.getByRole('banner').boundingBox())!;
	const top = await section(page, language).evaluate((s) => s.getBoundingClientRect().top);
	await scrollPage(page, top - (header.y + header.height));
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
	await scrollPage(page, distance);
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

/**
 * Whether the whole card is on the screen. Pinned, the cards still to come are beyond its right edge.
 * On a phone, a card taller than the screen is on it when it fills the screen.
 */
function isOnScreen(card: Locator) {
	return card.evaluate((e) => {
		const { left, right, top, bottom } = e.getBoundingClientRect();
		// Within a pixel: the page scrolls by whole pixels, so the card may stop a fraction of one off.
		const fits =
			bottom - top > innerHeight
				? top < 1 && bottom > innerHeight - 1
				: top > -1 && bottom < innerHeight + 1;
		return left >= 0 && right <= innerWidth && fits;
	});
}

/**
 * Brings the card into full view the way a Visitor does: by scrolling down from the top of the
 * section. Pinned, the cards pass sideways and each one comes into view after some scroll.
 */
async function scrollToCard(page: Page, language: Language, k: number, javaScript = true) {
	const card = cards(page, language).nth(k);
	const top = await section(page, language).evaluate((s) => s.getBoundingClientRect().top);
	if (top > 0) await scrollPage(page, top, javaScript);
	// Not past the card's top: a card taller than the screen is on it only with its top at 0.
	for (let step = 0; step < 100 && !(await isOnScreen(card)); step++) {
		const cardTop = await card.evaluate((e) => e.getBoundingClientRect().top);
		await scrollPage(page, cardTop >= 1 ? Math.min(Math.floor(cardTop), 100) : 100, javaScript);
	}
}

/** Each Block is in view, in order, with its number, name, summary, text and tools. */
async function expectFourBlocksVisible(page: Page, language: Language, javaScript = true) {
	const expected = EXPECTED[language];
	await expect(cards(page, language)).toHaveCount(4);
	for (const [k, block] of expected.blocks.entries()) {
		const card = cards(page, language).nth(k);
		await scrollToCard(page, language, k, javaScript);
		expect(await isOnScreen(card), `card ${k + 1} on the screen`).toBe(true);
		await expect(card.getByRole('img')).toBeVisible();
		await expect(card.getByRole('img')).toHaveAccessibleName(/\w/);
		await expect(card.getByText(`${expected.blockLabel} ${k + 1}`, { exact: true })).toBeVisible();
		await expect(card.getByRole('heading', { level: 3, name: block.name })).toBeVisible();
		await expect(card.getByText(block.summary, { exact: true })).toBeVisible();
		await expect(card.getByText(block.text, { exact: true })).toBeVisible();
		await expect(
			card.getByRole('list', { name: expected.toolsLabel }).getByRole('listitem'),
		).toHaveText(block.tools);
	}
}

/** Two screenshots of each element, 1 s apart: true if anything moved in any of them. */
async function isMoving(...elements: Locator[]) {
	const before: Buffer[] = [];
	for (const element of elements) before.push(await element.screenshot());
	await elements[0]!.page().waitForTimeout(1000);
	for (const [k, element] of elements.entries()) {
		if (!before[k]!.equals(await element.screenshot())) return true;
	}
	return false;
}

/**
 * The animations running in the section right now, as the browser reports them. A screenshot
 * cannot tell whether something out of sight is moving; the browser can (as in motion.spec.ts).
 */
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

/** What block 2's mini-diagram shows, for screen readers. */
const CLEANUP_DIAGRAM: Record<Language, string> = {
	fr: 'Un bug et du code en double disparaissent : le code raccourcit et le temps de réponse baisse.',
	en: 'Un bug et du code en double disparaissent : le code raccourcit et le temps de réponse baisse.',
	pt: 'Um bug e código duplicado desaparecem: o código fica mais curto e o tempo de resposta desce.',
};

/** The 4 mini-diagrams, in order. */
const diagrams = (page: Page, language: Language) =>
	[0, 1, 2, 3].map((k) => diagram(page, language, k));

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix } = LANGUAGES[language];

		test.describe(prefix, () => {
			test('the introduction says the scope, priorities and order come after a diagnosis', async ({
				page,
			}) => {
				await page.goto(prefix);
				await expect(
					section(page, language).getByText(EXPECTED[language].intro, { exact: true }),
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
				const label = (await section(page, language)
					.getByText(EXPECTED[language].label, { exact: true })
					.boundingBox())!;
				const counterBox = (await counter(page, language, 1).boundingBox())!;
				expect(
					Math.abs(counterBox.y + counterBox.height / 2 - (label.y + label.height / 2)),
					'the counter on the line of the label',
				).toBeLessThan(label.height / 2);

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

			// On the lowest screen where the section pins, the cards come closest to the button.
			test(`${SMALL_LAPTOP.label}, while the cards pass, the pause button never covers them`, async ({
				page,
			}) => {
				const button = page.getByRole('button', { name: LANGUAGES[language].pause, exact: true });
				await openPage(page, prefix, SMALL_LAPTOP);
				await scrollToSection(page, language);
				const buttonBox = (await button.boundingBox())!;
				// Down 200 px at a time, while the title stays put (pinned).
				let pinnedSteps = 0;
				for (; pinnedSteps < 100; pinnedSteps++) {
					const { title } = await scrollDown(page, language, 200);
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
				expect(pinnedSteps, 'the section stayed pinned while the cards passed').toBeGreaterThan(3);
			});

			for (const viewport of [PHONE, TABLET, REDUCED_MOTION, SHORT_SCREEN, WIDE_SCREEN]) {
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

			for (const viewport of [TABLET, REDUCED_MOTION, WIDE_SCREEN]) {
				test(`${viewport.label}, the cards are in a grid of two columns`, async ({ page }) => {
					await openPage(page, prefix, viewport);
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
			}

			for (const viewport of [DESKTOP, PHONE, REDUCED_MOTION]) {
				test(`${viewport.label}, the 4 Blocks and their tools are visible`, async ({ page }) => {
					await openPage(page, prefix, viewport);
					await expectFourBlocksVisible(page, language);
				});
			}

			test('the mini-diagram of block 2 shows the code being cleaned', async ({ page }) => {
				await page.goto(prefix);
				await expect(diagram(page, language, 1)).toHaveAccessibleName(CLEANUP_DIAGRAM[language]);
			});

			for (const k of [0, 1]) {
				test(`${DESKTOP.label}, the mini-diagram of block ${k + 1} moves, and the pause button stops it`, async ({
					page,
				}) => {
					const { pause, resume } = LANGUAGES[language];
					await openPage(page, prefix, DESKTOP);
					await scrollToCard(page, language, k);
					expect(await isMoving(diagram(page, language, k)), 'before the pause').toBe(true);

					await page.getByRole('button', { name: pause, exact: true }).click();
					await expect
						.poll(() => isMoving(diagram(page, language, k)), {
							message: 'paused',
							timeout: 10_000,
						})
						.toBe(false);

					await page.getByRole('button', { name: resume, exact: true }).click();
					expect(await isMoving(diagram(page, language, k)), 'after resuming').toBe(true);
				});
			}

			test('paused before reaching the section, the mini-diagrams stay still when they come into view', async ({
				page,
			}) => {
				await openPage(page, prefix, PHONE);
				await page.getByRole('button', { name: LANGUAGES[language].pause, exact: true }).click();
				for (let k = 0; k < 4; k++) await scrollToCard(page, language, k);
				// The cards still fade in with the scroll, as the branch still grows with it.
				await fadesDone(page);
				expect(await isMoving(...diagrams(page, language))).toBe(false);
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
				expect(await isMoving(...diagrams(page, language))).toBe(false);
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the 4 Blocks and their tools are visible', async ({ page, javaScriptEnabled }) => {
					await page.setViewportSize({ width: DESKTOP.width, height: DESKTOP.height });
					await page.goto(prefix);
					await expectFourBlocksVisible(page, language, javaScriptEnabled);
				});

				// Without JS, the pause button would not work: so the mini-diagrams may not move.
				test('the mini-diagrams stay still', async ({ page }) => {
					await page.setViewportSize({ width: DESKTOP.width, height: DESKTOP.height });
					await page.goto(prefix);
					expect(await isMoving(...diagrams(page, language))).toBe(false);
				});
			});
		});
	}
});
