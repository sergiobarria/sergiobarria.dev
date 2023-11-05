const { SPOTIFY_REFRESH_TOKEN, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = import.meta.env;

const token = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
// const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// interface Track {
//     id: string;
//     external_urls: { spotify: string };
//     name: string;
//     artists: Array<{ name: string }>;
//     album: {
//         images: Array<{ width: number; height: number; url: string }>;
//     };
// }

export interface TrackData {
    name: string;
    album: {
        name: string;
        artists: Array<{ name: string }>;
        images: [{ url: string }];
    };
    external_urls: {
        spotify: string;
    };
}

export interface NowPlayingResponse {
    is_playing: boolean;
    item: TrackData;
}

async function getAccessToken() {
    const data = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN as string
    }).toString();

    const res = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
    const json: { access_token: string } = await res.json();
    return json.access_token;
}

export async function getNowPlaying() {
    const accessToken = await getAccessToken();
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!res.ok || res.status === 204 || res.status > 400) {
        return { is_playing: false, song: null };
    }
    const json: NowPlayingResponse = await res.json();

    return {
        is_playing: json.is_playing,
        song: {
            title: json.item?.name,
            album: json.item?.album.name,
            artist: json?.item?.album?.artists?.map(artist => artist.name).join(', '),
            albumImageUrl: json.item?.album.images[0].url,
            songUrl: json.item?.external_urls.spotify
        }
    };
}
