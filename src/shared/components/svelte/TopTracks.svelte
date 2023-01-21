<script lang="ts">
	import clsx from 'clsx';
	import { useSWR } from 'sswr';

	import type { TopSpotifyTracks, Track } from 'lib/spotify';

	const { data } = useSWR<TopSpotifyTracks>('/api/spotify/top-tracks.json');
</script>

{#if !$data?.tracks}
	<p class="mt-8 text-center opacity-70">No data available...</p>
{:else}
	<ul class="mt-4 md:columns-2 gap-x-10">
		{#each $data?.tracks as track, idx (track.id)}
			<li class={clsx('flex items-center justify-between border-b border-surface-four')}>
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
{/if}
