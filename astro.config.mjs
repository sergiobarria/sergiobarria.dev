import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkCodeTitles from 'remark-code-titles';

// Integrations
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import { remarkReadingTime } from './src/shared/utils/remark-reading-time.mjs';
import {
	tokens,
	foregroundPrimary,
	backgroundPrimary,
} from './lib/syntax-highlighting-theme';

// https://astro.build/config
export default defineConfig({
	site: 'https://sergiobarria.com',
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: true,
			},
		}),
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
	},
	server: {
		host: 'localhost',
		port: 3000,
	},
});
