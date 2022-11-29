import { Fragment, useEffect } from 'react';
import useSWR from 'swr';
import { animate } from 'motion';
import clsx from 'clsx';

import type { SpotifyData } from 'lib/spotify';
import { fetcher } from 'lib/fetcher';

function SpotifyIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1333.33 1333.3"
			shapeRendering="geometricPrecision"
			textRendering="geometricPrecision"
			imageRendering="optimizeQuality"
			fillRule="evenodd"
			clipRule="evenodd"
			className="w-8 h-8"
		>
			<path
				d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z"
				fill="#1ed760"
				fillRule="nonzero"
			></path>
		</svg>
	);
}

function AnimatedBars() {
	useEffect(() => {
		animate(
			'#bar1',
			{
				transform: [
					'scaleY(1.0) translateY(0rem)',
					'scaleY(1.5) translateY(-0.082rem)',
					'scaleY(1.0) translateY(0rem)',
				],
			},
			{
				duration: 0.5,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
		animate(
			'#bar2',
			{
				transform: [
					'scaleY(1.0) translateY(0rem)',
					'scaleY(3) translateY(-0.083rem)',
					'scaleY(1.0) translateY(0rem)',
				],
			},
			{
				delay: 0.2,
				duration: 0.75,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
		animate(
			'#bar3',
			{
				transform: [
					'scaleY(1.0)  translateY(0rem)',
					'scaleY(0.5) translateY(0.37rem)',
					'scaleY(1.0)  translateY(0rem)',
				],
			},
			{
				delay: 0.3,
				duration: 0.75,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
		animate(
			'#bar4',
			{
				transform: [
					'scaleY(1.0)  translateY(0rem)',
					'scaleY(0.5) translateY(0.37rem)',
					'scaleY(1.0)  translateY(0rem)',
				],
			},
			{
				delay: 0.4,
				duration: 0.75,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
	}, []);

	return (
		<div className="flex items-end w-auto gap-0.5 overflow-hidden">
			<span id="bar1" className="w-[2px] h-[6px] bg-green-500" />
			<span id="bar2" className="w-[2px] h-[8px] bg-green-500" />
			<span id="bar3" className="w-[2px] h-[10px] bg-green-500" />
			<span id="bar4" className="w-[2px] h-[12px] bg-green-500" />
		</div>
	);
}

export function SpotifyCard() {
	const { data } = useSWR<SpotifyData>('/api/now-playing', fetcher);

	return (
		<div
			className={clsx(
				'flex items-center gap-3 text-sm border border-surface-three',
				'rounded-md p-2 min-w-[250px]'
			)}
		>
			{data?.isPlaying ? (
				<img src={data?.albumImageUrl} alt="album cover" width={40} height={40} />
			) : (
				<SpotifyIcon />
			)}
			<div className="flex flex-col w-full gap-1">
				<a href={data?.songUrl} className="text-sm font-semibold">
					{data?.isPlaying ? <span>{data?.title}</span> : <span>Not Listening</span>}
				</a>

				{data?.isPlaying ? (
					<div className="flex items-baseline justify-between w-full">
						<span className="text-xs text-font-two opacity-80">{data?.artist}</span>

						<span>
							<AnimatedBars />
						</span>
					</div>
				) : (
					<span className="text-xs text-font-two opacity-80">Spotify</span>
				)}
			</div>
		</div>
	);
}
