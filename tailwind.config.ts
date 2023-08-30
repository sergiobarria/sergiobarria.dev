import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Readex Pro Variable', ...defaultTheme.fontFamily.sans]
            },
            typography: {
                quoteless: {
                    css: {
                        'blockquote p:first-of-type::before': {
                            content: 'none'
                        },
                        'blockquote p:first-of-type::after': { content: 'none' }
                    }
                }
            }
        }
    },
    plugins: [require('@tailwindcss/typography')]
} satisfies Config;
