import { defineConfig } from 'astro/config';

// Integrations
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	site: 'https://sergiobarria.com',
	markdown: {
		shikiConfig: {
			theme: 'material-ocean',
			// css-variables tells shiki to read the theme from CSS variables
			// theme: 'css-variables',
			// theme: 'dracula',
		},
	},
	integrations: [
		react(),
		mdx(),
		robotsTxt(),
		sitemap(),
		tailwind({
			config: {
				applyAstroPreset: false,
				applyBaseStyles: true,
			},
		}),
		partytown(),
	],
	vite: {
		server: {
			open: true,
		},
		ssr: {},
	},
	server: {
		host: 'localhost',
		port: 8080,
	},
	// the following is needed for SSR
	// see: https://docs.astro.build/en/guides/server-side-rendering/
	output: 'server',
	adapter: vercel(),
});
