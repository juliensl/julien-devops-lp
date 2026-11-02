// Generates the share image (Open Graph) in public/: the logo and the English Designation (#54).
// Takes the built 404 page, for the site's fonts, colors and background, and puts the logo image
// in the middle, at full resolution, with the Designation below it. It only needs to run again
// when the logo, the English Designation or the colors change:
//   npm run build && npm run share-image
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import { SHARE_IMAGE } from '../src/config/share-image.ts';
import { en } from '../src/i18n/en.ts';

const DIST = 'dist';
const OUTPUT_PATH = `public${SHARE_IMAGE.path}`;
const LOGO = `data:image/png;base64,${readFileSync('src/assets/logo.png').toString('base64')}`;

if (!existsSync(DIST)) throw new Error(`Missing folder ${DIST}. Run "npm run build" first.`);

const server = await preview({ outDir: DIST, server: { port: 0 }, logLevel: 'error' });
const browser = await chromium.launch();
try {
	const page = await browser.newPage({
		viewport: { width: SHARE_IMAGE.width, height: SHARE_IMAGE.height },
		deviceScaleFactor: 1,
	});
	// The 404 exists in every phase and is already in English. Only the page background stays.
	await page.goto(`http://localhost:${server.port}/404.html`, { waitUntil: 'networkidle' });
	await page.evaluate(
		async ({ designation, logoSource }) => {
			const logo = document.createElement('img');
			logo.src = logoSource;
			logo.alt = '';
			logo.style.height = '160px';
			await logo.decode();
			const text = document.createElement('p');
			text.textContent = designation;
			text.style.cssText = 'margin-top: 3.5rem; font-size: 2.5rem; color: var(--color-foreground)';
			const scene = document.createElement('div');
			scene.style.cssText =
				'margin: auto; display: flex; flex-direction: column; align-items: center';
			scene.append(logo, text);
			document.body.replaceChildren(scene);
		},
		{ designation: en.designation, logoSource: LOGO },
	);
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: OUTPUT_PATH });
	console.log(`Share image generated at ${OUTPUT_PATH}.`);
} finally {
	await browser.close();
	await server.stop();
}
