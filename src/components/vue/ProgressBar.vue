<script setup lang="ts">
import { onMounted } from 'vue';
import { animate, scroll } from 'motion';

onMounted(() => {
    scroll(animate('#progress-bar', { scaleX: [0, 1] }));
});
</script>

<template>
    <div
        id="progress-bar"
        class="fixed inset-x-0 top-0 h-1 origin-[0%] scale-x-0 transform bg-neutral-200"
    ></div>
</template>
