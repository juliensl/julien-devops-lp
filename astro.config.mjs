// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site';
import localizedPages from './src/integrations/localized-pages';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	trailingSlash: 'always',
	integrations: [react(), localizedPages()],

	vite: {
		plugins: [tailwindcss()],
	},
});
