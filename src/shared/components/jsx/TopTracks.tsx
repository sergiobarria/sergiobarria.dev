import { useEffect } from 'react';
import clsx from 'clsx';
import useSWR from 'swr';
import { animate, stagger } from 'motion';

import { fetcher } from 'lib/fetcher';
import type { TopSpotifyTracks, Track } from 'lib/spotify';
import { Loader } from './Loader';

function TrackItem({ track, idx }: { track: Track; idx: number }) {
	useEffect(() => {
		animate('#track', { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: stagger(0.1) });
	}, []);

	return (
		<li
			id="track"
			key={track?.id}
			className={clsx(
				'flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/50 pawn'
			)}
		>
			<div id="pawn" className="first-of-type:flex first-of-type:items-baseline">
				<span className="text-sm font-medium text-font-two opacity-70">{idx + 1}</span>
				<div className="flex flex-col p-5 pl-3">
					<a
						href={track.songUrl}
						className={clsx(
							'overflow-hidden overflow-ellipsis whitespace-pre-wrap hover:underline',
							'underline-offset-2 hover:text-brand decoration-wavy'
						)}
						target="_blank"
						rel="noopener noreferrer"
					>
						{track.title}
					</a>
					<small className="overflow-hidden whitespace-pre-wrap opacity-70 overflow-ellipsis">
						{track.artists}
					</small>
				</div>
			</div>
			<div>
				<img src={track.images[0].url} width={40} height={40} alt={track.title} />
			</div>
		</li>
	);
}

export function TopTracks() {
	const { data, error } = useSWR<TopSpotifyTracks>('/api/spotify/top-tracks.json', fetcher);

	if (!data && !error) return <Loader />;

	if (error) return <p className="mt-8 text-center opacity-70">No data available...</p>;

	return (
		data && (
			<ul className="mt-4 md:columns-2 gap-x-10">
				{data.tracks.map((track, idx) => (
					<TrackItem key={track.id} track={track} idx={idx} />
				))}
			</ul>
		)
	);
}
