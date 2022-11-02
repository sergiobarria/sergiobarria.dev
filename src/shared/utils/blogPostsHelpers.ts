import path from 'node:path';
import type { MDXInstance } from 'astro';

export type Post = {
	url: string;
	title: string;
	summary: string;
	publishDate: Date;
	coverImage: string;
	isFeatured: boolean;
	minutesRead: string;
};

export interface PostFrontmatter {
	title: string;
	summary: string;
	publishDate: Date;
	coverImage: string;
	isFeatured: boolean;
	minutesRead?: string;
}

export const getSlugFromFilePath = (file: string) => path.parse(file).name;
export const urlFromContentUrl = (url: string) => {
	const { dir, name } = path.parse(url);
	return path.join(dir.replace('src/content', ''), name);
};

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
