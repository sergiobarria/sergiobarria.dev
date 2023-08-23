import type { APIRoute } from 'astro'

import { getAllPostsViews } from '@/lib/planetscale'

export const prerender = false

export const get: APIRoute = async () => {
    const views = await getAllPostsViews()

    return new Response(JSON.stringify(views), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=60, stale-while-revalidate' // 1 minute cache
        }
    })
}
