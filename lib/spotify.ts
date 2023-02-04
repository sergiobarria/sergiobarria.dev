export interface SpotifyData {
	isPlaying: boolean;
	title: string;
	album: string;
	artist: string;
	albumImageUrl: string;
	songUrl: string;
}

export interface SpotifyResponse {
	is_playing: boolean;
	item: {
		name: string;
		album: {
			name: string;
			artists: Array<{ name: string }>;
			images: [{ url: string }];
		};
		external_urls: {
			spotify: string;
		};
	};
	currently_playing_type: string;
}

export interface SpotifyTrack {
	id: string;
	external_urls: { spotify: string };
	name: string;
	artists: Array<{ name: string }>;
	album: {
		images: Array<{ width: number; height: number; url: string }>;
	};
}

export interface Track {
	id: string;
	songUrl: string;
	artists: string;
	title: string;
	images: Array<{ width: number; height: number; url: string }>;
}

export interface TopSpotifyTracks {
	tracks: Track[];
}

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = import.meta.env;

const token = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
export const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
export const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async () => {
	const data = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: SPOTIFY_REFRESH_TOKEN!,
	}).toString();

	const res = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: data,
	});

	const json = (await res.json()) as { access_token: string };

	return json.access_token;
};
