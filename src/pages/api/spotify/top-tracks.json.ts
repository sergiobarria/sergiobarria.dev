import type { APIRoute } from 'astro';

import type { SpotifyTrack } from 'lib/spotify';
import { getAccessToken, TOP_TRACKS_ENDPOINT } from 'lib/spotify';

export const get: APIRoute = async () => {
	const access_token = await getAccessToken();

	const url = TOP_TRACKS_ENDPOINT + '?time_range=short_term&limit=10';

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (!res.ok) {
		return {
			status: 500,
			body: JSON.stringify({ message: 'Error fetching data' }),
			headers: {
				'content-type': 'application/json',
			},
		};
	}

	const data = await res.json();
	const tracks = data.items.map((track: SpotifyTrack) => ({
		artists: track.artists.map((_artist: any) => _artist.name).join(', '),
		songUrl: track.external_urls.spotify,
		title: track.name,
		id: track.id,
		images: track?.album?.images,
		// NOTE: return track to see all available data
		// track: track
	}));

	return {
		status: 200,
		body: JSON.stringify({ tracks }),
		headers: {
			'content-type': 'application/json',
			'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
		},
	};
};
