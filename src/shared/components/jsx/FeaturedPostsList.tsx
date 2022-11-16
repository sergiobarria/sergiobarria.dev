import { ClockIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { useViews } from '~/shared/hooks';

import type { Post } from '~/pages/blog/_utils';

import styles from './FeaturedPostCard.module.scss';

interface FeaturedPostCardProps {
	title: string;
	url: string;
	readingTime: string;
}

function FeaturedPostCard({ title, url, readingTime }: FeaturedPostCardProps) {
	const slug = url.split('/').pop();
	const { views } = useViews(slug as string);

	return (
		<div className={styles.card}>
			<a href={url}>
				<div className="">
					<h4 className="">{title}</h4>

					<div className={styles.statsContainer}>
						<div className={styles.stat}>
							<EyeOpenIcon width={24} height={24} />
							<p>{`${views ? new Number(views).toLocaleString() : '--'} views`}</p>
						</div>
						<div className={styles.stat}>
							<ClockIcon width={24} height={24} />
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
		<div className={styles.container}>
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
