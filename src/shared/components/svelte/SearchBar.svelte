<script lang="ts">
	import clsx from 'clsx';

	export let label: string;
	export let query: string;
</script>

<form>
	<label for="posts-search-bar" class="sr-only"> {label} </label>
	<div class="relative mb-7">
		<div class="absolute top-0 bottom-0 left-0 flex items-center pl-6">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</div>
		<input
			id="posts-search-bar"
			type="text"
			placeholder="Search posts..."
			aria-label="Search posts"
			class={clsx(
				'block w-full mt-6 pl-14 pr-4 py-3 bg-surface-two',
				'text-font-two rounded-lg',
				'focus:ring-brand-accent focus:border-none'
			)}
			bind:value={query}
		/>
	</div>
</form>
