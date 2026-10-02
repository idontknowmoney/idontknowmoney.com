// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://idontknowmoney.com',
	integrations: [mdx(), sitemap(), react()],

	// Code colors come from CSS variables (see global.css), so they follow the design system
	// and switch with the light/dark theme.
	markdown: { shikiConfig: { theme: 'css-variables' } },

	redirects: {
		'/blog': '/posts',
	},

	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Instrument Sans',
			cssVariable: '--font-sans',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
