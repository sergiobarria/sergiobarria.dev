import type { APIRoute } from 'astro';

import { prisma } from 'lib/prisma/client';

export const get: APIRoute = async () => {
	try {
		const records = await prisma.post.findMany();
		const views = records.reduce((acc, { views }) => acc + views, 0);
		console.log('views', views);

		return {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ total: views }),
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Internal server error' }),
		};
	}
	// const totalViews = await getAllRecords();

	// if (!totalViews) {
	// 	return {
	// 		status: 500,
	// 		body: JSON.stringify({ message: 'Error fetching data' }),
	// 		headers: {
	// 			'content-type': 'application/json',
	// 		},
	// 	};
	// }

	// return {
	// 	status: 200,
	// 	headers: {
	// 		'content-type': 'application/json',
	// 	},
	// 	body: JSON.stringify({ total: totalViews }),
	// };
};
