import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_USER = process.env.WAKATIME_USER;

export default async (req: VercelRequest, res: VercelResponse) => {
	if (req.method === 'GET') {
		const {
			data: { data },
			status,
		} = await axios.get(
			`https://wakatime.com/api/v1/users/${WAKATIME_USER}/stats/all_time?api_key=${WAKATIME_API_KEY}`
		);

		if (status !== 200) {
			return res.status(500).json({ message: 'Error fetching data' });
		}

		const obj = {
			bestDay: data?.best_day,
			dailyAvg: data?.human_readable_daily_average,
			since: data?.human_readable_range,
			topLang: data?.languages[0],
			otherLang: data?.languages[1],
			os: data?.operating_systems[0],
		};

		return res.status(200).json({ ...obj });
	}
};
