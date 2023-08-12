import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
    site: 'https://sergiobarria.dev',
    integrations: [tailwind(), mdx(), svelte()],
    experimental: {
        assets: true
    },
    output: 'hybrid',
    adapter: vercel({
        analytics: true,
        imageService: true,
        imagesConfig: {
            sizes: [320, 640, 1280]
        }
    })
})
