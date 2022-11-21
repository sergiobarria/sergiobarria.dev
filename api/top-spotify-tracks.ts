import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getTopTracks, SpotifyTrack } from '../lib/spotify';

export default async (req: VercelRequest, res: VercelResponse) => {
	if (req.method === 'GET') {
		const response = await getTopTracks();
		const { items } = response.data;

		const tracks = items.map((track: SpotifyTrack) => ({
			artists: track.artists.map((_artist: any) => _artist.name).join(', '),
			songUrl: track.external_urls.spotify,
			title: track.name,
			id: track.id,
		}));

		res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');

		return res.status(200).json({ tracks });
	}
};
