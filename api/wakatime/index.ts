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
			`https://wakatime.com/api/v1/users/${WAKATIME_USER}/all_time_since_today?api_key=${WAKATIME_API_KEY}`
		);

		if (status !== 200) {
			return res.status(500).json({ message: 'Error fetching data' });
		}

		return res.status(200).json({ ...data });
	}
};
