<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const count = ref(0);
const { views, slug } = defineProps<{
    views: number;
    slug: string;
}>();

onMounted(async () => {
    const res = await fetch('/api/views/' + slug + '.json', {
        method: 'POST'
    });
    const data: { views: number } = await res.json();
    count.value = data.views;
});
</script>

<template>
    <span>{{ count ?? views }} views</span>
</template>
