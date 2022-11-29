import clsx from 'clsx';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';

import type { Post } from '~/pages/blog/_utils';
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
			<article
				className={clsx(
					'flex flex-col cursor-pointer h-full bg-surface-two rounded-lg',
					'transition-all duration-200 ease-in-out hover:scale-105'
				)}
			>
				<div className="relative rounded-tl-lg rounded-tr-lg">
					<CloudinaryImage
						publicId={`sergiobarria/banners/${coverImage}`}
						isThumbnail
						radius={30}
						alt={`thumbnail for ${title} frontmatter`}
					/>
					<Views slug={slug as string} />
				</div>
				<div className="flex flex-col justify-between h-full p-3">
					<h3 className="hover:text-brand-accent">{title}</h3>
					<div className="flex items-center mt-2 text-font-two">
						<p className="flex items-center gap-3 mr-4 pr-4 border-r-[1px] border-font-two">
							<CalendarIcon width={24} height={24} />
							<time dateTime={publishDate.toUTCString()}>{formattedDate}</time>
						</p>
						<p className="flex items-center gap-3">
							<ClockIcon width={24} height={24} />
							<span>{minutesRead}</span>
						</p>
					</div>
				</div>
			</article>
		</a>
	);
}
