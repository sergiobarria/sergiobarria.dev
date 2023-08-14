<script lang="ts">
    import { onMount } from 'svelte'

    import config from '@/config'

    const { mode, site } = config

    let count: number
    export let views: number
    export let slug: string

    onMount(async () => {
        const baseUrl = mode === 'development' ? 'http://localhost:3000' : site
        const response = await fetch(baseUrl + '/api/views/' + slug + '.json', {
            method: 'POST'
        })
        const data: { views: number } = await response.json()
        count = data.views
    })
</script>

<span>{count ?? views} views</span>
