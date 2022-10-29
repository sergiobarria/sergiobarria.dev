import React from 'react';
import ReactTooltip from 'react-tooltip';
import clsx from 'clsx';

import { useIsDarkMode, useIsMounted } from '~/shared/hooks';

interface TechCardProps {
	title: string;
	icon: string;
	learning?: boolean;
}

export function TechCard({ icon, title, learning }: TechCardProps) {
	const isMounted = useIsMounted();
	const isDarkMode = useIsDarkMode();

	if (!isMounted()) return null;

	return (
		<React.Fragment>
			<div
				data-tip={`${title} ${learning ? '👨‍🎓' : '👌'}`}
				data-for="tooltip"
				className="inline-flex flex-col items-center justify-center space-y-1 rounded-xl m-3"
			>
				<div className="relative">
					<div
						className={clsx(
							'absolute inset-0 rounded-full bg-accent blur-sm dark:bg-accent hover:blur-lg'
						)}
					></div>
					<div className="relative w-8 rounded-full p-4 shadow-md dark:bg-neutral-300">
						<img
							src={`/icons/${icon}.svg`}
							width={50}
							className="absolute inset-0 rounded-full text-orange-500"
						/>
					</div>
				</div>
			</div>
			{isMounted() && (
				<ReactTooltip
					id="tooltip"
					place="top"
					effect="solid"
					type={isDarkMode ? 'light' : 'dark'}
				/>
			)}
		</React.Fragment>
	);
}
