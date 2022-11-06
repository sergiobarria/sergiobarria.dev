import clsx from 'clsx';

import { useViews } from '~/shared/hooks';
import { ViewsIcon, ReadingTimeIcon } from '~/shared/icons';

interface FeaturedPostCardProps {
	title: string;
	url: string;
	gradient?: string;
	readingTime: string;
}

export function FeaturedPostCard({ title, url, gradient, readingTime }: FeaturedPostCardProps) {
	const slug = url.split('/').pop();
	const { views } = useViews(slug as string);

	return (
		<a
			href={url}
			className={clsx(
				'transform transition-all ease-out hover:scale-[1.02]',
				'w-full rounded-lg bg-gradient-to-r p-1 md:w-1/3',
				'col-span-3 md:col-span-1',
				gradient ? gradient : 'from-purple-500 via-pink-500 to-red-500'
			)}
		>
			<div className="flex h-full flex-col justify-between rounded-md bg-white p-4 dark:bg-gray-700">
				{/* <div className="flex h-full flex-col justify-between rounded-md"> */}
				<div className="flex flex-col justify-between sm:flex-row">
					<h4 className="mb-6 w-full text-lg tracking-tight sm:mb-10 md:text-xl">{title}</h4>
				</div>
				<div className="flex items-center justify-around text-sm text-gray-700 dark:text-gray-200">
					<div className="flex items-center space-x-1">
						<ViewsIcon />
						<p>{`${views ? new Number(views).toLocaleString() : '---'} views`}</p>
					</div>
					<div className="flex items-center space-x-1">
						<ReadingTimeIcon />
						<p>{readingTime}</p>
					</div>
				</div>
			</div>
		</a>
	);
}
