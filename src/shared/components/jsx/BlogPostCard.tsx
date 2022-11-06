import { format } from 'date-fns';

import type { Post } from '~/pages/blog/_utils';
import { CalendarIcon, ReadingTimeIcon } from '~/shared/icons';
import { CloudinaryImage } from './CloudinaryImage';
import { Views } from './Views';

interface BlogPostCardProps {
	post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
	const { publishDate, url, coverImage, title, minutesRead } = post;
	const slug = url.split('/').pop();
	const formattedDate = format(new Date(publishDate), 'MMM dd, yyyy');

	return (
		<a href={url}>
			<article className="flex flex-col cursor-pointer hover:scale-[1.03] transition-all duration-300 h-full">
				<div className="relative">
					<CloudinaryImage
						publicId={`sergiobarria/banners/${coverImage}`}
						isThumbnail
						radius={30}
						alt={`thumbnail for ${title} frontmatter`}
					/>
					<Views slug={slug as string} />
				</div>
				<div className="flex flex-col justify-between flex-1">
					<h3 className="mt-1 hover:text-accent">{title}</h3>
					<div className="flex items-center text-neutral-400 dark:text-typography/80">
						<p className="flex items-center space-x-2">
							<CalendarIcon />
							<time dateTime={publishDate.toUTCString()}>{formattedDate}</time>
						</p>
						<span className="mx-2 text-3xl">·</span>
						<p className="flex items-center space-x-2">
							<ReadingTimeIcon />
							<span>{minutesRead}</span>
						</p>
					</div>
				</div>
			</article>
		</a>
	);
}
