import config from '~/config';

const { refreshToken, clientId, clientSecret } = config.spotify;
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

interface SpotifyTrack {
    id: string;
    external_urls: { spotify: string };
    name: string;
    artists: Array<{ name: string }>;
    album: {
        images: Array<{ width: number; height: number; url: string }>;
    };
}

interface SpotifyResponse {
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

export async function getAccessToken() {
    const data = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
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

export async function getTopTracks() {
    const accessToken = await getAccessToken();
    const url = TOP_TRACKS_ENDPOINT + '?time_range=short_term&limit=10';

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!res.ok) return null;

    const { items }: { items: SpotifyTrack[] } = await res.json();
    const tracks = items.map(track => ({
        artists: track.artists.map((_artist: any) => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        id: track.id,
        images: track?.album?.images
        // NOTE: return track to see all available data
        // track: track
    }));

    return tracks;
}

export async function getNowPlaying() {
    const accessToken = await getAccessToken();
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!res.ok || res.status === 204 || res.status > 400) return null;

    const json: SpotifyResponse = await res.json();
    const data = {
        isPlaying: json.is_playing,
        song: {
            title: json.item.name,
            album: json.item.album.name,
            artist: json?.item?.album?.artists?.map(artist => artist.name).join(', '),
            albumImageUrl: json.item.album.images[0].url,
            songUrl: json.item.external_urls.spotify
        }
    };

    return data;
}
