import type { APIRoute } from 'astro';

import { getAllPostsViews } from '~/lib/planetscale';

export const prerender = false;

export const GET: APIRoute = async () => {
    const views = await getAllPostsViews();

    return new Response(JSON.stringify(views), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate' // 1 second
        }
    });
};
