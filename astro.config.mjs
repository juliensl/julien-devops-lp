// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site';
import localizedPages from './src/integrations/localized-pages';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	trailingSlash: 'always',
	integrations: [react(), localizedPages()],

	// As 2 fontes do site, alojadas nele: um woff2 por família, gerado por
	// src/assets/fonts/subset.sh. O Astro cria a fonte de recurso com size-adjust.
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Bona Nova',
			cssVariable: '--fonte-bona-nova',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [{ src: ['./src/assets/fonts/bona-nova.woff2'], weight: 400, style: 'normal' }],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Geist',
			cssVariable: '--fonte-geist',
			fallbacks: ['sans-serif'],
			options: {
				variants: [{ src: ['./src/assets/fonts/geist.woff2'], weight: '100 900', style: 'normal' }],
			},
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
