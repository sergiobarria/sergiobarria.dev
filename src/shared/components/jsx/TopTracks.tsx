import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import type { TopSpotifyTracks, Track } from 'lib/spotify';

import styles from './TopTracks.module.scss';

export function TopTracks() {
	const { data } = useSWR<TopSpotifyTracks>('/api/top-tracks', fetcher);

	if (!data?.tracks) return <p>No data available...</p>;

	return (
		<ul className={styles.tracksList}>
			{data?.tracks.map((track: Track, idx: number) => {
				const { id, artists, songUrl, title, images } = track;

				return (
					<li key={id} className={styles.row}>
						<div>
							<span>{idx + 1}</span>
							<div className={styles.item}>
								<a href={songUrl} target="_blank" rel="noopener noreferrer">
									{title}
								</a>
								<p>{artists}</p>
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
