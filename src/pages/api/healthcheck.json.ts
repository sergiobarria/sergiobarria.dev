import type { APIRoute } from 'astro';

export const get: APIRoute = () => {
	const res = JSON.stringify({ status: 'ok' });

	return {
		body: res,
		headers: {
			'content-type': 'application/json',
		},
	};
};
