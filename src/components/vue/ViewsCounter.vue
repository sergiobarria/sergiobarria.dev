<script setup lang="ts">
import { onMounted, ref } from 'vue';

const count = ref<number>();
const { slug, views } = defineProps<{ slug: string; views: number }>();

onMounted(async () => {
    const res = await fetch(`/api/views/${slug}.json`, {
        method: 'POST'
    });
    const data: { views: number } = await res.json();

    count.value = data.views;
});
</script>

<template>
    <div>{{ count ?? views }} views</div>
</template>
