// Gera a imagem de partilha (Open Graph) em public/: o logótipo e a Designação em inglês (#54).
// Fotografa o logótipo do site construído, com as fontes, as cores e o fundo do site, para que a
// imagem nunca se afaste dele. Só é preciso voltar a correr quando o logótipo, a Designação inglesa
// ou as cores mudarem:
//   npm run build && npm run imagem-de-partilha
import { existsSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import { IMAGEM_DE_PARTILHA } from '../src/config/share-image.ts';
import { en } from '../src/i18n/en.ts';

const DIST = 'dist';
const DESTINO = `public${IMAGEM_DE_PARTILHA.caminho}`;

if (!existsSync(DIST)) throw new Error(`Falta a pasta ${DIST}. Corre primeiro «npm run build».`);

const servidor = await preview({ outDir: DIST, server: { port: 0 }, logLevel: 'error' });
const navegador = await chromium.launch();
try {
	const pagina = await navegador.newPage({
		viewport: { width: IMAGEM_DE_PARTILHA.largura, height: IMAGEM_DE_PARTILHA.altura },
		deviceScaleFactor: 1,
	});
	// A 404 existe em todas as fases e já é em inglês. Da página fica só o fundo; o logótipo do
	// cabeçalho passa para o centro, maior, com a Designação por baixo.
	await pagina.goto(`http://localhost:${servidor.port}/404.html`, { waitUntil: 'networkidle' });
	await pagina.evaluate((designacao) => {
		const logotipo = document.querySelector<HTMLElement>('header .logo')!;
		logotipo.style.fontSize = '4.5rem';
		// O traço do ∞ tem uma espessura fixa: maior, para não desaparecer quando a imagem é reduzida.
		for (const traco of logotipo.querySelectorAll<SVGPathElement>('path')) {
			traco.style.strokeWidth = '2.5';
		}
		const texto = document.createElement('p');
		texto.textContent = designacao;
		texto.style.cssText = 'margin-top: 3.5rem; font-size: 2.5rem; color: var(--color-foreground)';
		const cena = document.createElement('div');
		cena.style.cssText = 'margin: auto; display: flex; flex-direction: column; align-items: center';
		cena.append(logotipo, texto);
		document.body.replaceChildren(cena);
	}, en.designacao);
	await pagina.evaluate(() => document.fonts.ready);
	await pagina.screenshot({ path: DESTINO });
	console.log(`Imagem de partilha gerada em ${DESTINO}.`);
} finally {
	await navegador.close();
	await servidor.stop();
}
