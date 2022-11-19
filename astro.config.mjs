import { defineConfig } from 'astro/config';
import remarkCodeTitles from 'remark-code-titles';

// Integrations
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import { remarkReadingTime } from './src/shared/utils/remark-reading-time.mjs';
import { tokens, foregroundPrimary, backgroundPrimary } from './lib/syntax-highlighting-theme';

// https://astro.build/config
export default defineConfig({
	site: 'https://sergiobarria.com',
	integrations: [
		react(),
		mdx({
			extendPlugins: 'markdown',
		}),
	],
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: {
				name: 'Star Gazer',
				type: 'dark',
				settings: tokens,
				fg: foregroundPrimary,
				bg: backgroundPrimary,
			},
		},
		remarkPlugins: [remarkReadingTime, remarkCodeTitles],
	},
	vite: {
		server: {
			open: true,
		},
		ssr: {
			noExternal: [
				'@radix-ui/react-tooltip',
				'@radix-ui/react-popover',
				'@radix-ui/react-select',
				'@radix-ui/react-tabs',
			],
		},
	},
	server: {
		host: 'localhost',
		port: 8080,
	},
});
