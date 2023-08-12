import { z, defineCollection } from 'astro:content'

const postCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        publishedAt: z.date().optional(),
        summary: z.string().optional(),
        isArchived: z.boolean().optional().default(false),
        keywords: z.array(z.string()).optional(),
        toc: z.boolean().optional().default(true)
    })
})

export const collections = {
    posts: postCollection
}
