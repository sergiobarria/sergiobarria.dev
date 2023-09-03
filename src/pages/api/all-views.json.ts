import { getAllPostsViews } from '~/lib/xata';

export const prerender = false;

export async function GET() {
    const allPosts = await getAllPostsViews();
    const views = allPosts.reduce((acc, curr) => acc + curr.views, 0);

    return new Response(JSON.stringify(views), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=1, stale-while-revalidate' // 1 second cache
        }
    });
}
