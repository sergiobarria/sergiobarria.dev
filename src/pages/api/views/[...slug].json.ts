import { increment, getPostViewsBySlug } from '~/lib/xata';

export const prerender = false;

export async function POST({ params }: { params: Record<string, string> }) {
    const { slug } = params as { slug: string };
    const views = await increment(slug);

    return new Response(JSON.stringify(views), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    });
}

export async function GET({ params }: { params: Record<string, string> }) {
    const { slug } = params as { slug: string };
    const views = await getPostViewsBySlug(slug);

    return new Response(JSON.stringify(views), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    });
}
