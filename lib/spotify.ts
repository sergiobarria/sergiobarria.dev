import axios from 'axios';

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

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
	const data = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refresh_token!,
	}).toString();

	const res = await axios.post<{ access_token: string }>(TOKEN_ENDPOINT, data, {
		headers: {
			Authorization: `Basic ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	return res.data.access_token;
};

export const getNowPlaying = async () => {
	const access_token = await getAccessToken();

	return axios.get<SpotifyResponse>(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export const getTopTracks = async () => {
	const access_token = await getAccessToken();

	return axios.get<any>(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		params: {
			time_range: 'short_term',
			limit: 10,
		},
	});
};
