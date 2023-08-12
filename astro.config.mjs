import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
    site: 'https://sergiobarria.dev',
    integrations: [tailwind(), mdx()],
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
