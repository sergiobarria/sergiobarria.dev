import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'
import svelte from '@astrojs/svelte'
import prefetch from '@astrojs/prefetch'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

const rehypePrettyCodeOptions = {
    theme: 'rose-pine',
    // theme: 'poimandres',
    tokensMap: {
        // VScode command palette: Inspect Editor Tokens and Scopes
        // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
        fn: 'entity.name.function',
        objKey: 'meta.object-literal.key'
    },
    onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [
                {
                    type: 'text',
                    value: ' '
                }
            ]
        }
        node.properties.className = ['']
    }
}
const rehypeAutolinkHeadingsOptions = {
    properties: {
        className: ['anchor']
    }
}

// https://astro.build/config
export default defineConfig({
    site: 'https://sergiobarria.dev',
    integrations: [tailwind(), svelte(), mdx(), prefetch(), partytown(), sitemap()],
    markdown: {
        extendDefaultPlugins: true,
        syntaxHighlight: false,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, rehypePrettyCodeOptions],
            [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]
        ]
    },
    experimental: {
        assets: true
    },
    output: 'hybrid',
    adapter: vercel({
        analytics: true
    })
})
