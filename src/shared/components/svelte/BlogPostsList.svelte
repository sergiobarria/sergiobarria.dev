<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { CollectionEntry } from 'astro:content';
	import { Tooltip, Button } from 'flowbite-svelte';
	import clsx from 'clsx';

	import BlogPostGridCard from './BlogPostGridCard.svelte';
	import BlogPostListCard from './BlogPostListCard.svelte';
	import SearchBar from './SearchBar.svelte';
	import { createSearchStore, searchHandler } from '~/stores/search';

	type PostView = 'grid' | 'list';

	export let posts: CollectionEntry<'blog'>[];
	let view: PostView = 'list';

	const searchPosts = posts
		.map((post) => ({
			...post,
			searchTerms: `${post?.data?.title}`,
		}))
		.sort(
			(a, b) =>
				new Date(b.data?.publishedDate).getTime() - new Date(a.data?.publishedDate).getTime()
		);

	const searchStore = createSearchStore(searchPosts);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	// unsubscribe from searchStore when component is destroyed
	onDestroy(() => {
		unsubscribe();
	});
</script>

<!-- Filter Options: Searck, toggle grid and list view  -->
<div class="flex items-center gap-6">
	<div class="flex-1">
		<SearchBar label="Search Posts" bind:query={$searchStore.query} />
	</div>
	<span class="flex items-center gap-4 text-zinc-500 dark:text-zinc-600">
		<Button
			id="toggle-view-list"
			type="button"
			class="p-3 rounded-2xl bg-zinc-200 dark:bg-zinc-800/90 focus:ring-0"
			on:click={() => (view = 'list')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class={clsx(
					'w-6 h-6',
					view === 'list' ? 'text-teal-500' : 'text-zinc-500 dark:text-zinc-600'
				)}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
				/>
			</svg>
		</Button>
		<Button
			id="toggle-view-grid"
			type="button"
			on:click={() => (view = 'grid')}
			class="p-3 rounded-2xl bg-zinc-200 dark:bg-zinc-800/90 focus:ring-0"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class={clsx(
					'w-6 h-6',
					view === 'grid' ? 'text-teal-500' : 'text-zinc-500 dark:text-zinc-600'
				)}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
				/>
			</svg>
		</Button>
		<Tooltip
			triggeredBy="#toggle-view-list"
			class="text-xs bg-zinc-200 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-100"
			>Toggle List View</Tooltip
		>
		<Tooltip
			triggeredBy="#toggle-view-grid"
			class="text-xs bg-zinc-200 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-100"
			>Toggle Grid View</Tooltip
		>
	</span>
</div>

{#if $searchStore.results.length > 0}
	{#if view === 'list'}
		<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
			<div class="flex max-w-3xl flex-col space-y-16 mt-16">
				{#each $searchStore.results as post (post.id)}
					<BlogPostListCard {post} />
				{/each}
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each $searchStore.results as post (post.id)}
				<BlogPostGridCard {post} />
			{/each}
		</div>
	{/if}
{:else}
	<div class="text-center">
		<h2 class="text-2xl font-bold text-font-two">No posts found 🙁</h2>
		<p class="text-font-two">Oopps! Sorry, there are no results for: "{$searchStore.query}"</p>
		<p class="text-font-two">Try searching for something else</p>
	</div>
{/if}
