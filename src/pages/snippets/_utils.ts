import type { MDXInstance } from 'astro';

import { urlFromContentUrl } from '~/shared/utils/helpers';

export type SnippetFrontmatter = {
	title: string;
	description: string;
	tags: string;
	order: number;
};

export type Snippet = {
	url: string;
} & SnippetFrontmatter;

export async function parseSnippet({
	url,
	frontmatter,
}: MDXInstance<Record<string, any>>): Promise<Snippet> {
	const { title, description, tags, order } = frontmatter;

	return {
		url: urlFromContentUrl(url as string),
		title,
		tags,
		description,
		order,
	};
}
