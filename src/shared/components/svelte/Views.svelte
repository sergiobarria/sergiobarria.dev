<script lang="ts">
	import { onMount } from 'svelte';
	import clsx from 'clsx';

	import { BASE_URL } from '~/shared/constants';

	let views = 0;
	export let slug = '';
	export let styles = '';
	export let iconStyles = '';

	onMount(async () => {
		const res = await fetch(`${BASE_URL}/api/views/${slug}.json`);
		const data: { total: number } = await res.json();

		views = data.total;
	});
</script>

<span class={clsx('flex items-center gap-2', styles)}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={clsx('w-4 h-4', iconStyles)}
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
		/>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
	</svg>
	<span>{`${views} views` ?? '--'}</span>
</span>
