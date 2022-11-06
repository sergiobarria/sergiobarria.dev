import type { MDXInstance } from 'astro';

import { urlFromContentUrl } from '~/shared/utils/helpers';

export type PostFrontmatter = {
	title: string;
	summary: string;
	publishDate: Date;
	coverImage: string;
	isFeatured: boolean;
	minutesRead?: string;
};

export type Post = {
	url: string;
} & PostFrontmatter;

export async function parseBlogPost({
	url,
	frontmatter,
}: MDXInstance<Record<string, any>>): Promise<Post> {
	const { title, summary, publishDate, coverImage, isFeatured, minutesRead } = frontmatter;

	return {
		url: urlFromContentUrl(url as string),
		title,
		summary,
		publishDate: new Date(publishDate),
		coverImage,
		isFeatured,
		minutesRead: minutesRead,
	};
}

export function sortPosts(a: Post, b: Post) {
	return b.publishDate.getTime() - a.publishDate.getTime();
}
