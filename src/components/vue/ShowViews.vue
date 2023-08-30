<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { DBPost } from '~/lib/schema';

const totalViews = ref<number>(0);
const { showTotal, slug } = defineProps<{
    slug?: string;
    showTotal?: boolean;
}>();

onMounted(async () => {
    const res = await fetch('/api/all-views.json');
    const data = (await res.json()) as DBPost[];

    if (showTotal) {
        totalViews.value = data.reduce((acc, post) => acc + post.views, 0);
    } else {
        totalViews.value = data.find(post => post.slug === slug)?.views ?? 0;
    }
});
</script>

<template>
    <span v-if="totalViews">{{ totalViews }}</span>
    <span v-else>--</span>
</template>
