import useSWR from 'swr';
import clsx from 'clsx';

import { fetcher } from 'lib/fetcher';
import type { TopSpotifyTracks, Track } from 'lib/spotify';

export function TopTracks() {
	const { data } = useSWR<TopSpotifyTracks>('/api/top-tracks', fetcher);

	if (!data?.tracks) return <p className="text-center mt-8 opacity-70">No data available...</p>;

	return (
		<ul className="mt-4 md:columns-2 gap-x-10">
			{data?.tracks.map((track: Track, idx: number) => {
				const { id, artists, songUrl, title, images } = track;

				return (
					<li
						key={id}
						className={clsx('flex items-center justify-between border-b border-surface-four')}
					>
						<div className="first-of-type:flex first-of-type:items-baseline">
							<span className="text-sm font-medium text-font-two opacity-70">{idx + 1}</span>
							<div className="flex flex-col pl-3 p-5">
								<a
									href={songUrl}
									className={clsx(
										'overflow-hidden overflow-ellipsis whitespace-pre-wrap hover:underline',
										'underline-offset-2 hover:text-brand decoration-wavy'
									)}
									target="_blank"
									rel="noopener noreferrer"
								>
									{title}
								</a>
								<small className="opacity-70 overflow-hidden overflow-ellipsis whitespace-pre-wrap">
									{artists}
								</small>
							</div>
						</div>
						<div>
							<img src={images[0].url} width={40} height={40} />
						</div>
					</li>
				);
			})}
		</ul>
	);
}
