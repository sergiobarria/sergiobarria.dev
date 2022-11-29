import { ClockIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { useViews } from '~/shared/hooks';

import type { Post } from '~/pages/blog/_utils';

import clsx from 'clsx';

interface FeaturedPostCardProps {
	title: string;
	url: string;
	readingTime: string;
}

function FeaturedPostCard({ title, url, readingTime }: FeaturedPostCardProps) {
	const slug = url.split('/').pop();
	const { views } = useViews(slug as string);

	return (
		<div
			className={clsx(
				'bg-surface-two p-3 rounded-lg transition-colors',
				'duration-200 ease-in-out shadow-lg border-t-2 border-brand'
			)}
		>
			<a href={url}>
				<div className="flex flex-col h-full">
					<h3 className="hover:text-brand">{title}</h3>

					<div className="flex items-center justify-between pt-2 mt-auto">
						<div className="flex items-center gap-2 text-font-two">
							<EyeOpenIcon width={18} height={18} />
							<p>{`${views ? new Number(views).toLocaleString() : '--'} views`}</p>
						</div>
						<div className="flex items-center gap-2 text-font-two">
							<ClockIcon width={18} height={18} />
							<p>{readingTime}</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
}

interface FeaturedPostsListProps {
	posts: Post[];
}

export function FeaturedPostsList({ posts }: FeaturedPostsListProps) {
	return (
		<div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map((post) => {
				const { title, url, minutesRead, number } = post;

				return (
					<FeaturedPostCard
						key={number}
						title={title}
						url={url}
						readingTime={minutesRead as string}
					/>
				);
			})}
		</div>
	);
}
