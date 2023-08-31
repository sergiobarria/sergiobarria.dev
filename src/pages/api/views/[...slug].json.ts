import { increment } from '~/lib/planetscale';

export const prerender = false;

export async function POST({ params }: { params: Record<string, string> }) {
    const { slug } = params as { slug: string };
    const views = await increment(slug);

    return new Response(JSON.stringify({ views }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    });
}
