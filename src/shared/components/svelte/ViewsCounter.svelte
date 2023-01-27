<script lang="ts">
	import { onMount } from 'svelte';
	import { BASE_URL } from '~/shared/constants';

	let views = 0;
	export let slug = '';

	onMount(async () => {
		const res = await fetch(`${BASE_URL}/api/views/${slug}.json`, {
			method: 'POST',
		});
		const data: { total: number } = await res.json();

		views = data.total;
	});
</script>

<span>{`${views} views` ?? '--'}</span>
