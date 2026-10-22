// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site';
import paginasPorLingua from './src/integracoes/paginas-por-lingua';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	trailingSlash: 'always',
	integrations: [react(), paginasPorLingua()],

	vite: {
		plugins: [tailwindcss()],
	},
});
