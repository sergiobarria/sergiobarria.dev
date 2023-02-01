<script lang="ts">
	import clsx from 'clsx';

	import MagnifyingGlassIcon from '~/shared/icons/MagnifyingGlassIcon.svelte';

	export let label: string;
	export let query: string;
</script>

<form>
	<label for="posts-search-bar" class="sr-only"> {label} </label>
	<div class="relative mb-7">
		<div class="absolute top-0 bottom-0 left-0 flex items-center pl-6">
			<MagnifyingGlassIcon />
		</div>
		<input
			id="posts-search-bar"
			type="text"
			placeholder="Search posts..."
			aria-label="Search posts"
			class={clsx(
				'block w-full mt-6 pl-14 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800',
				'text-font-two rounded-full',
				'focus:ring-teal-500 focus:border-none'
			)}
			bind:value={query}
		/>
	</div>
</form>
