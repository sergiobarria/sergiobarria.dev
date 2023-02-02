import type { CollectionEntry } from 'astro:content';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface GridCardProps {
	post: CollectionEntry<'blog'>;
}

function GridCard({ post }: GridCardProps) {
	const { slug, data } = post;

	return (
		<div
			className={clsx(
				'max-w-sm p-6 bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700'
			)}
		>
			<a href={`/blog/${slug}`}>
				<h3 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
					{data?.title}
				</h3>
			</a>
			<p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
				{data?.summary.substring(0, 100)}...
			</p>
			<a
				href={`/blog/${slug}`}
				className={clsx(
					'inline-flex items-center px-2 py-1 text-xs font-medium text-center text-teal-500',
					'bg-zinc-700 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none',
					'focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800'
				)}
			>
				Read more
				<ArrowRightIcon className="ml-2" />
			</a>
		</div>
	);
}

interface PostsListViewProps {
	posts: CollectionEntry<'blog'>[];
}

export function PostsGridView({ posts }: PostsListViewProps) {
	return (
		<div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<GridCard key={post.id} post={post} />
			))}
		</div>
	);
}
