import type { APIRoute } from 'astro'

import { getTopTracks } from '@/lib/spotify'

export const prerender = false

export const get: APIRoute = async () => {
    const result = await getTopTracks()
    const data = result?.length ? result : null

    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=86400, stale-while-revalidate' // cache 1 day
        }
    })
}
