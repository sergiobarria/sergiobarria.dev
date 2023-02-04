import type { APIRoute } from 'astro';

const { WAKATIME_API_KEY, WAKATIME_USER } = import.meta.env;

export const get: APIRoute = async () => {
	const res = await fetch(
		`https://wakatime.com/api/v1/users/${WAKATIME_USER}/stats/all_time?api_key=${WAKATIME_API_KEY}`
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

	const obj = {
		bestDay: data?.best_day,
		dailyAvg: data?.human_readable_daily_average,
		since: data?.human_readable_range,
		topLang: data?.languages[0],
		otherLang: data?.languages[1],
		os: data?.operating_systems[0],
	};

	return {
		status: 200,
		body: JSON.stringify({ ...obj }),
		headers: {
			'content-type': 'application/json',
		},
	};
};
