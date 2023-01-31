<script lang="ts">
	import { fade } from 'svelte/transition';
	import clsx from 'clsx';

	import type { TopSpotifyTracks } from 'lib/spotify';
	import { BASE_URL, MODE } from '~/shared/constants';
	import Loader from './Loader.svelte';

	$: topTracks = getSpotifyTopTracks();

	async function getSpotifyTopTracks() {
		const res = await fetch(`${BASE_URL}/api/spotify/top-tracks.json`);
		const data = await res.json();

		return data as TopSpotifyTracks;
	}
</script>

{#await topTracks}
	<Loader />
{:then data}
	{#if data?.tracks?.length > 0}
		<ul class="mt-4 md:columns-2 gap-x-10">
			{#each data?.tracks as track, idx (track.id)}
				<li
					class={clsx('flex items-center justify-between border-b border-surface-four')}
					transition:fade={{
						duration: 500,
						delay: idx * 100,
					}}
				>
					<div class="first-of-type:flex first-of-type:items-baseline">
						<span class="text-sm font-medium text-font-two opacity-70">{idx + 1}</span>
						<div class="flex flex-col p-5 pl-3">
							<a
								href={track.songUrl}
								class={clsx(
									'overflow-hidden overflow-ellipsis whitespace-pre-wrap hover:underline',
									'underline-offset-2 hover:text-brand decoration-wavy'
								)}
								target="_blank"
								rel="noopener noreferrer"
							>
								{track.title}
							</a>
							<small class="overflow-hidden whitespace-pre-wrap opacity-70 overflow-ellipsis">
								{track.artists}
							</small>
						</div>
					</div>
					<div>
						<img src={track.images[0].url} width={40} height={40} alt={track.title} />
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="flex items-center justify-center">
			<p class="mt-8 text-center opacity-70">No data available...</p>
		</div>
	{/if}
{:catch error}
	{#if MODE === 'development'}
		<pre class="mt-8 text-center opacity-70">{error.message}</pre>
	{:else}
		<p class="mt-8 text-center opacity-70">No data available...</p>
	{/if}
{/await}
