<script lang="ts">
    import { onMount } from 'svelte';
    import { animate, scroll } from 'motion';

    onMount(() => {
        scroll(animate('#progress-bar', { scaleX: [0, 1] }));
    });
</script>

<div
    id="progress-bar"
    class="fixed inset-x-0 top-0 h-1 origin-[0%] scale-x-0 transform bg-neutral-200"
></div>
