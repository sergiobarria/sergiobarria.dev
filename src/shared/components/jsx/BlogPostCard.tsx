import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';

import type { Post } from '~/pages/blog/_utils';
import { CloudinaryImage } from './CloudinaryImage';
import { Views } from './Views';

import styles from './BlogPostCard.module.scss';

interface BlogPostCardProps {
	post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
	const { publishDate, url, coverImage, title, minutesRead } = post;
	const slug = url.split('/').pop();
	const formattedDate = format(new Date(publishDate), 'MMM dd, yyyy');

	return (
		<a href={url}>
			<article className={styles.article}>
				<div className={styles.imgContainer}>
					<CloudinaryImage
						publicId={`sergiobarria/banners/${coverImage}`}
						isThumbnail
						radius={30}
						alt={`thumbnail for ${title} frontmatter`}
					/>
					<Views slug={slug as string} />
				</div>
				<div className={styles.cardContent}>
					<h3>{title}</h3>
					<div className={styles.content}>
						<p>
							<CalendarIcon width={24} height={24} />
							<time dateTime={publishDate.toUTCString()}>{formattedDate}</time>
						</p>
						<p>
							<ClockIcon width={24} height={24} />
							<span>{minutesRead}</span>
						</p>
					</div>
				</div>
			</article>
		</a>
	);
}
