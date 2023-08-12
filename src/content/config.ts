import { z, defineCollection } from 'astro:content'

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
})

export const collections = {
    posts: postCollection
}
