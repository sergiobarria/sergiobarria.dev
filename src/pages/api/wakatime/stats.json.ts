import type { APIRoute } from 'astro';

const { WAKATIME_API_KEY, WAKATIME_USER } = import.meta.env;

export const get: APIRoute = async () => {
	const res = await fetch(
		`https://wakatime.com/api/v1/users/${WAKATIME_USER}/all_time_since_today?api_key=${WAKATIME_API_KEY}`
	);

	if (!res.ok) {
		return {
			status: 500,
			body: JSON.stringify({ message: 'Error fetching data' }),
			headers: {
				'content-type': 'application/json',
			},
		};
	}

	const { data } = await res.json();

	return {
		status: 200,
		body: JSON.stringify({ ...data }),
		headers: {
			'content-type': 'application/json',
		},
	};
};
