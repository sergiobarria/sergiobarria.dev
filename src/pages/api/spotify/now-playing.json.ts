import type { APIRoute } from 'astro';

import type { SpotifyData, SpotifyResponse } from 'lib/spotify';
import { getAccessToken, NOW_PLAYING_ENDPOINT } from 'lib/spotify';

export const get: APIRoute = async () => {
	const access_token = await getAccessToken();

	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (!response.ok) {
		return {
			status: 500,
			body: JSON.stringify({ message: 'Error fetching data' }),
			headers: {
				'content-type': 'application/json',
			},
		};
	}

	if (response.status === 204 || response.status > 400) {
		return {
			status: 500,
			body: JSON.stringify({ message: 'Error fetching data' }),
			headers: {
				'content-type': 'application/json',
			},
		};
	}

	const data: SpotifyResponse = await response.json();
	const spotifyData: SpotifyData = {
		isPlaying: data?.is_playing,
		title: data?.item?.name,
		album: data?.item?.album?.name,
		artist: data?.item?.album?.artists?.map((artist) => artist.name).join(', '),
		albumImageUrl: data.item.album.images[0].url,
		songUrl: data.item.external_urls.spotify,
	};

	return {
		status: 200,
		body: JSON.stringify(spotifyData),
		headers: {
			'content-type': 'application/json',
			'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
		},
	};
};
