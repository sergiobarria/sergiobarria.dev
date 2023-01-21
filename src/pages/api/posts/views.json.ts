import type { APIRoute } from 'astro';

import { getPostsStats } from 'notion/client';

export const get: APIRoute = async () => {
	const { views } = await getPostsStats();

	if (!views) {
		return {
			status: 500,
			body: JSON.stringify({ message: 'Error fetching data' }),
			headers: {
				'content-type': 'application/json',
			},
		};
	}

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ total: views.toString() }),
	};
};
