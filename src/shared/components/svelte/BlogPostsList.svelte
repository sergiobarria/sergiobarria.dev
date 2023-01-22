<script lang="ts">
	import { onDestroy } from 'svelte';

	import BlogPostCard from './BlogPostCard.svelte';
	import SearchBar from './SearchBar.svelte';
	import { createSearchStore, searchHandler } from '~/stores/search';
	import type { Post } from 'notion/client';

	export let posts: Post[];

	const searchPosts = posts
		.map((post) => ({
			...post,
			searchTerms: `${post.title}`,
		}))
		.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

	const searchStore = createSearchStore(searchPosts);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	// unsubscribe from searchStore when component is destroyed
	onDestroy(() => {
		unsubscribe();
	});
</script>

<SearchBar label="Search Posts" bind:query={$searchStore.query} />

{#if $searchStore.results.length > 0}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
		{#each $searchStore.results as post}
			<BlogPostCard {post} />
		{/each}
	</div>
{:else}
	<div class="text-center">
		<h2 class="text-2xl font-bold text-font-two">No posts found 🙁</h2>
		<p class="text-font-two">Oopps! Sorry, there are no results for: "{$searchStore.query}"</p>
		<p class="text-font-two">Try searching for something else</p>
	</div>
{/if}
