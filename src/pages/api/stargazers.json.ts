import { getStargazersCount } from '~/lib/github';

export const prerender = false;

export async function GET() {
    const result = await getStargazersCount();

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    });
}
