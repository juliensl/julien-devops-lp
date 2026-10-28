// Gera a imagem de partilha (Open Graph) em public/: o logótipo e a Designação em inglês (#54).
// Fotografa o logótipo do site construído, com as fontes, as cores e o fundo do site, para que a
// imagem nunca se afaste dele. Só é preciso voltar a correr quando o logótipo, a Designação inglesa
// ou as cores mudarem:
//   npm run build && npm run imagem-de-partilha
import { existsSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import { SHARE_IMAGE } from '../src/config/share-image.ts';
import { en } from '../src/i18n/en.ts';

const DIST = 'dist';
const OUTPUT_PATH = `public${SHARE_IMAGE.path}`;

if (!existsSync(DIST)) throw new Error(`Falta a pasta ${DIST}. Corre primeiro «npm run build».`);

const server = await preview({ outDir: DIST, server: { port: 0 }, logLevel: 'error' });
const browser = await chromium.launch();
try {
	const page = await browser.newPage({
		viewport: { width: SHARE_IMAGE.width, height: SHARE_IMAGE.height },
		deviceScaleFactor: 1,
	});
	// A 404 existe em todas as fases e já é em inglês. Da página fica só o fundo; o logótipo do
	// cabeçalho passa para o centro, maior, com a Designação por baixo.
	await page.goto(`http://localhost:${server.port}/404.html`, { waitUntil: 'networkidle' });
	await page.evaluate((designation) => {
		const logo = document.querySelector<HTMLElement>('header .logo')!;
		logo.style.fontSize = '4.5rem';
		// O traço do ∞ tem uma espessura fixa: maior, para não desaparecer quando a imagem é reduzida.
		for (const stroke of logo.querySelectorAll<SVGPathElement>('path')) {
			stroke.style.strokeWidth = '2.5';
		}
		const text = document.createElement('p');
		text.textContent = designation;
		text.style.cssText = 'margin-top: 3.5rem; font-size: 2.5rem; color: var(--color-foreground)';
		const scene = document.createElement('div');
		scene.style.cssText =
			'margin: auto; display: flex; flex-direction: column; align-items: center';
		scene.append(logo, text);
		document.body.replaceChildren(scene);
	}, en.designation);
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: OUTPUT_PATH });
	console.log(`Imagem de partilha gerada em ${OUTPUT_PATH}.`);
} finally {
	await browser.close();
	await server.stop();
}
