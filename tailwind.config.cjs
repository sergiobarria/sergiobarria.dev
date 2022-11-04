/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', ...defaultTheme.fontFamily.sans],
				code: ['IBM Plex Mono', 'Lato', ...defaultTheme.fontFamily.sans],
				marker: ['Permanent Marker', 'cursive', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				darker: 'var(--clr-darker)',
				lighter: 'var(--clr-lighter)',
				accent: 'var(--clr-accent)',
				typography: 'var(--clr-typography)',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'blockquote p:first-of-type::before': {
							content: 'none',
						},
						'blockquote p:first-of-type::after': { content: 'none' },
						'code::before': { content: 'none' },
						'code::after': { content: 'none' },
						code: {
							fontFamily: theme('...fontFamily.code') + ' !important',
							fontWeight: theme('fontWeight.normal'),
							backgroundColor: theme('colors.neutral.100'),
							// paddingBlock: theme('spacing')[1],
							// paddingInline: theme('spacing')[1.5],
							borderRadius: theme('borderRadius.DEFAULT'),
						},
						pre: {
							marginTop: 0,
							borderTopLeftRadius: 0,
						},
					},
				},
				invert: {
					css: {
						'blockquote p:first-of-type::before': {
							content: 'none',
						},
						'blockquote p:first-of-type::after': { content: 'none' },
						'code::before': { content: 'none' },
						'code::after': { content: 'none' },
						code: {
							fontWeight: theme('fontWeight.normal'),
							backgroundColor: theme('colors.neutral.700'),
							// paddingBlock: theme('spacing')[1],
							// paddingInline: theme('spacing')[1.5],
							borderRadius: theme('borderRadius.DEFAULT'),
						},
						'pre > code': {
							backgroundColor: 'transparent',
						},
					},
				},
			}),
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	variants: {
		typography: ['dark'],
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
};
