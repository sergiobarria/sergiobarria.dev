<script lang="ts">
    import type { DBPost } from '@/lib/schema';

    export let showTotal: boolean = false;
    export let slug: string = '';

    async function fetchViews() {
        const res = await fetch('/api/all-views.json');
        const data = (await res.json()) as DBPost[];

        if (showTotal) {
            return data.reduce((acc, curr) => acc + curr.views, 0);
        } else {
            return data.find(post => post.slug === slug)?.views ?? 0;
        }
    }
</script>

{#await fetchViews()}
    <span>--</span>
{:then totalViews}
    <span>{totalViews}</span>
{/await}
