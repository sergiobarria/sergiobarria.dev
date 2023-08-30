import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        publishedAt: z.date(),
        summary: z.string().optional(),
        isArchived: z.boolean().optional().default(false),
        keywords: z.array(z.string()).optional(),
        toc: z.boolean().optional().default(true),
        draft: z.boolean().optional().default(false)
    })
});

const snippetCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional().default(false)
    })
});

const projectCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        stack: z.array(z.string()),
        cover: z.string(),
        isArchived: z.boolean().optional().default(false),
        draft: z.boolean().optional().default(false),
        live: z.string().optional(),
        source: z.string().optional()
    })
});

export const collections = {
    posts: postCollection,
    snippets: snippetCollection,
    projects: projectCollection
};
