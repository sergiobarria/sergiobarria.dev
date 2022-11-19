import type { MDXInstance } from 'astro';

import { urlFromContentUrl } from '~/shared/utils/helpers';

export type ProjectFrontmatter = {
	name: string;
	order: number;
	description: string;
	stack: string;
	image: string;
	liveUrl: string;
	repo: string;
	featured: boolean;
	completed: boolean;
	draft: boolean;
};

export type Project = {
	url: string;
} & ProjectFrontmatter;

export async function parseProject({
	url,
	frontmatter,
}: MDXInstance<Record<string, any>>): Promise<Project> {
	const { name, description, stack, image, liveUrl, repo, completed, featured, draft, order } =
		frontmatter;

	return {
		url: urlFromContentUrl(url as string),
		name,
		description,
		stack,
		image,
		liveUrl,
		repo,
		completed,
		featured,
		draft,
		order,
	};
}
