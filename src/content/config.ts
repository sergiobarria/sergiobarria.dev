import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        description: z.string().optional(),
        draft: z.boolean().default(true),
        archived: z.boolean().default(false)
    })
});

export const collections = {
    posts: postCollection
};
