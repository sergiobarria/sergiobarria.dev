import type { APIRoute } from 'astro'

import { getAllPostsViews } from '@/lib/planetscale'

export const get: APIRoute = async () => {
    const result = await getAllPostsViews()

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
