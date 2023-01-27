import type { APIRoute } from 'astro';

import { getSingleRecord, updateRecord } from 'lib/pocketbase/pb';

const responseError = {
	status: 500,
	body: JSON.stringify({ message: 'Error fetching data' }),
	headers: {
		'content-type': 'application/json',
	},
};

export const get: APIRoute = async ({ params }) => {
	const { slug } = params;
	const views = await getSingleRecord(slug as string);

	if (!views) return responseError;

	return {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ total: views }),
	};
};

export const post: APIRoute = async ({ params }) => {
	const { slug } = params;

	const views = await updateRecord(slug as string);

	if (!views) return responseError;

	return {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ total: views }),
	};
};
