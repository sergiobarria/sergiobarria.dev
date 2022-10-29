import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Integrations
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import { remarkReadingTime } from './src/shared/utils/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		react(),
		mdx({
			remarkPlugins: [remarkReadingTime],
		}),
	],
});
