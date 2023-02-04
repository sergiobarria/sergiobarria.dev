import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		publishedDate: z.string(),
		updatedDate: z.date().optional(),
		summary: z.string(),
		coverImage: z.string(),
		isFeatured: z.boolean(),
		isDraft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		type: z.enum(['guides & tutorials', 'general']).optional(),
		readingTime: z.number().optional(),
		keywords: z.array(z.string()).optional(),
	}),
});

const projectsCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		description: z.string(),
		stack: z.array(z.string()),
		image: z.string().optional(),
		liveUrl: z.string().optional(),
		repo: z.string().optional(),
		tags: z.array(z.string()).optional(),
		isFeatured: z.boolean().optional(),
		isCompleted: z.boolean().optional(),
		draft: z.boolean().optional(),
	}),
});

const snippetsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	blog: blogCollection,
	projects: projectsCollection,
	snippets: snippetsCollection,
};
