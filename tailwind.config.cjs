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
			colors: {},
		},
		typography: (theme) => ({
			DEFAULT: {
				css: {},
			},
			inver: {},
		}),
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
