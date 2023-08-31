<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { DBPost } from '~/lib/schema';

const totalViews = ref(0);
const { showTotal = false, slug } = defineProps<{
    showTotal?: boolean;
    slug?: string;
}>();

onMounted(async () => {
    const res = await fetch('/api/all-views.json');
    const data = (await res.json()) as DBPost[];

    if (showTotal) {
        totalViews.value = data.reduce((acc, curr) => acc + curr.views, 0);
    } else {
        totalViews.value = data.find(post => post.slug === slug)?.views ?? 0;
    }
});
</script>

<template>
    <span v-if="totalViews">{{ totalViews }}</span>
    <span v-if="!totalViews">--</span>
</template>
