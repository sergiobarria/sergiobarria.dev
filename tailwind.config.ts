import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)']
            },
            typography: {
                quoteless: {
                    css: {
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:first-of-type::after': { content: 'none' }
                    }
                }
            }
        }
    },
    plugins: [typography]
} satisfies Config;
