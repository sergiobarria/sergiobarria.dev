import type { APIRoute } from 'astro';

import { getAllRecords } from 'lib/pocketbase/pb';

export const get: APIRoute = async () => {
	const totalViews = await getAllRecords();

	if (!totalViews) {
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
			'content-type': 'application/json',
		},
		body: JSON.stringify({ total: totalViews }),
	};
};
