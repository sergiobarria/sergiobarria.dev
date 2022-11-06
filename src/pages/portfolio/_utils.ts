import type { MDXInstance } from 'astro';

import { urlFromContentUrl } from '~/shared/utils/helpers';

export type ProjectFrontmatter = {
	title: string;
	order: number;
	description: string;
	coverImage: string;
	liveUrl: string;
	repo: string;
	status: boolean;
};

export interface Project extends ProjectFrontmatter {
	url: string;
}

export async function parseProject({
	url,
	frontmatter,
}: MDXInstance<ProjectFrontmatter>): Promise<Project> {
	return {
		url: urlFromContentUrl(url as string),
		...frontmatter,
	};
}

export function sortProjects(a: Project, b: Project) {
	return a.order - b.order;
}
