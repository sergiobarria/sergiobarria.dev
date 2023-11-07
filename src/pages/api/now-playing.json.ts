import { getNowPlaying } from '~/lib/spotify';

export const prerender = false;

export async function GET() {
    const result = await getNowPlaying();
    const isPlaying = result?.is_playing || false;
    const song = result?.song || {};

    return new Response(JSON.stringify({ isPlaying, data: song }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    });
}
