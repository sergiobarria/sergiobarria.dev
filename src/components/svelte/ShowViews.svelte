<script lang="ts">
    import { onMount } from 'svelte';

    import type { DBPost } from '@/lib/schema';

    export let showTotal: boolean = false;
    export let slug: string = '';
    let totalViews: number | undefined = 0;

    onMount(async () => {
        const res = await fetch('/api/all-views.json');
        const data = (await res.json()) as DBPost[];
        console.log('DATA: ', data);

        if (showTotal) {
            totalViews = data.reduce((acc, curr) => acc + curr.views, 0);
        } else {
            totalViews = data.find(post => post.slug === slug)?.views ?? 0;
        }
    });
    console.log('totalViews: ', totalViews);
</script>

{#if totalViews}
    <span>{totalViews}</span>
{:else}
    <span>--</span>
{/if}
