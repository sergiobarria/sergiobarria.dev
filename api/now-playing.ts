import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getNowPlaying, SpotifyData } from '../lib/spotify';

export default async (req: VercelRequest, res: VercelResponse) => {
	if (req.method === 'GET') {
		const response = await getNowPlaying();

		if (
			response.status === 204 ||
			response.status > 400 ||
			response.data?.currently_playing_type !== 'track'
		) {
			return res.status(200).json({ isPlaying: false });
		}

		const data: SpotifyData = {
			isPlaying: response.data?.is_playing,
			title: response.data?.item?.name,
			album: response.data?.item?.album?.name,
			artist: response.data?.item?.album?.artists?.map((artist) => artist.name).join(', '),
			albumImageUrl: response.data.item.album.images[0].url,
			songUrl: response.data.item.external_urls.spotify,
		};

		res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

		res.status(200).json(data);
	}
};
