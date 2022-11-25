/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				sans: ['system-ui', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				brand: 'rgba(var(--tw-brand) / <alpha-value>)',
				'brand-accent': 'rgba(var(--tw-brand-accent) / <alpha-value>)',
				'font-one': 'rgba(var(--tw-text1) / <alpha-value>)',
				'font-two': 'rgba(var(--tw-text2) / <alpha-value>)',
				'font-three': 'rgba(var(--tw-text3) / <alpha-value>)',
				'font-four': 'rgba(var(--tw-text4) / <alpha-value>)',
				selection: 'rgba(var(--tw-selection-text) / <alpha-value>)',
				'surface-one': 'rgba(var(--tw-surface1) / <alpha-value>)',
				'surface-two': 'rgba(var(--tw-surface2) / <alpha-value>)',
				'surface-three': 'rgba(var(--tw-surface3) / <alpha-value>)',
				'surface-four': 'rgba(var(--tw-surface4) / <alpha-value>)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
