<script lang="ts">
	import { paginate, LightPaginationNav } from 'svelte-paginate';

	import type { Post } from 'notion/client';

	export let posts: Post[];
	let currentPage = 1;
	let pageSize = 9;
	let limit = 1;

	$: paginatedPosts = paginate({ items: posts, pageSize, currentPage });
</script>

<LightPaginationNav
	totalItems={posts.length}
	{currentPage}
	{pageSize}
	{limit}
	showStepOptions={true}
	on:setPage={(e) => (currentPage = e.detail.page)}
/>
