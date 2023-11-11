import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import robotsTxt from 'astro-robots-txt';

const rehypePrettyCodeOptions = {
    theme: 'one-dark-pro'
};
const rehypeAutolinkHeadingsOptions = {
    properties: {
        className: ['anchor']
    }
};

// https://astro.build/config
export default defineConfig({
    site: 'https://sergiobarria.dev',
    integrations: [tailwind(), mdx(), partytown(), sitemap(), robotsTxt()],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, rehypePrettyCodeOptions],
            [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]
        ]
    },
    output: 'hybrid',
    adapter: vercel({
        speedInsights: { enabled: true }
    }),
    experimental: {
        devOverlay: false, // can use import.meta.env.DEV
        contentCollectionCache: true
    }
});
