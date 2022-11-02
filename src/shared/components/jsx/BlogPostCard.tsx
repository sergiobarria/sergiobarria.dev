import { format } from 'date-fns';

import type { Post } from '~/shared/utils/blogPostsHelpers';
import { CloudinaryImage } from './CloudinaryImage';
import { Views } from './Views';

const CalendarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
		/>
	</svg>
);

const ReadingTimeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);

interface BlogPostCardProps {
	post: Post;
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
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
};
