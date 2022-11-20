import { defineConfig } from 'astro/config';
import remarkCodeTitles from 'remark-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';

// Integrations
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import { remarkReadingTime } from './src/shared/utils/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://sergiobarria.com',
	markdown: {
		shikiConfig: { theme: 'css-variables' }, // css-variables tells shiki to read the theme from CSS variables
		rehypePlugins: [rehypePrettyCode],
		remarkPlugins: [remarkReadingTime, remarkCodeTitles],
	},
	integrations: [react(), mdx()],
	vite: {
		server: {
			open: true,
		},
		ssr: {
			// NOTE: This is needed to avoid vite issues with default exports
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
