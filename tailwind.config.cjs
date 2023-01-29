/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				sans: ['ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
				marker: ['Permanent Marker', 'cursive', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				// brand: {
				// 	50: 'rgba(var(--color-primary-50) / <alpha-value>)',
				// 	100: 'rgba(var(--color-primary-100) / <alpha-value>)',
				// 	200: 'rgba(var(--color-primary-200) / <alpha-value>)',
				// 	300: 'rgba(var(--color-primary-300) / <alpha-value>)',
				// 	400: 'rgba(var(--color-primary-400) / <alpha-value> )',
				// 	500: 'rgba(var(--color-primary-500) / <alpha-value>)',
				// 	600: 'rgba(var(--color-primary-600) / <alpha-value>)',
				// 	700: 'rgba(var(--color-primary-700) / <alpha-value>)',
				// 	800: 'rgba(var(--color-primary-800) / <alpha-value>)',
				// 	900: 'rgba(var(--color-primary-900) / <alpha-value>)',
				// },
			},
			// colors: {
			// 	brand: 'rgba(var(--tw-brand) / <alpha-value>)',
			// 	'brand-accent': 'rgba(var(--tw-brand-accent) / <alpha-value>)',
			// 	'font-one': 'rgba(var(--tw-text1) / <alpha-value>)',
			// 	'font-two': 'rgba(var(--tw-text2) / <alpha-value>)',
			// 	'font-three': 'rgba(var(--tw-text3) / <alpha-value>)',
			// 	'font-four': 'rgba(var(--tw-text4) / <alpha-value>)',
			// 	selection: 'rgba(var(--tw-selection-text) / <alpha-value>)',
			// 	'surface-one': 'rgba(var(--tw-surface1) / <alpha-value>)',
			// 	'surface-two': 'rgba(var(--tw-surface2) / <alpha-value>)',
			// 	'surface-three': 'rgba(var(--tw-surface3) / <alpha-value>)',
			// 	'surface-four': 'rgba(var(--tw-surface4) / <alpha-value>)',
			// },
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
