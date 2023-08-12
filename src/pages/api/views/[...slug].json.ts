import type { APIRoute } from 'astro'

import { getViewsBySlug, increment } from '@/lib/planetscale'

export const prerender = false

export const post: APIRoute = async ({ params }) => {
    const { slug } = params as { slug: string }
    await increment(slug)
    const views = await getViewsBySlug(slug) // Get updated views

    return new Response(JSON.stringify({ views: views[0]?.views ?? 0 }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=3600'
        }
    })
}
