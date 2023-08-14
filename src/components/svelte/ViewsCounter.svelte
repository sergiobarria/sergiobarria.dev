<script lang="ts">
    import { onMount } from 'svelte'

    let count: number
    export let views: number
    export let slug: string

    onMount(async () => {
        const response = await fetch('/api/views/' + slug + '.json', {
            method: 'POST'
        })
        const data: { views: number } = await response.json()
        count = data.views
    })
</script>

<span>{count ?? views} views</span>
