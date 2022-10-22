/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				darker: 'var(--clr-darker)',
				lighter: 'var(--clr-lighter)',
				accent: 'var(--clr-accent)',
				typography: 'var(--clr-typography)',
			}
		},
	},
	plugins: [],
}
