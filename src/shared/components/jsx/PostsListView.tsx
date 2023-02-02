import type { CollectionEntry } from 'astro:content';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface ListCardProps {
	post: CollectionEntry<'blog'>;
}

function ListCard({ post }: ListCardProps) {
	const { slug, data } = post;

	const formattedDate = format(new Date(data.publishedDate), 'MMMM dd, yyyy');

	return (
		<article id="card" className="md:grid md:grid-cols-4 md:items-baseline">
			<div className="group relative flex flex-col items-start md:col-span-3">
				<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
					<div
						className={clsx(
							'absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4',
							'bg-zinc-50 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50',
							'sm:-inset-x-6 sm:rounded-2xl'
						)}
					/>
					<a href={`/blog/${slug}`}>
						<span className="absolute z-20 -inset-y-6 -inset-x-4 sm:-inset-x-6 sm:rounded-2xl" />
						<span className="relative z-10">{data?.title}</span>
					</a>
				</h2>

				<time
					className={clsx(
						'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
						'md:hidden pl-3.5'
					)}
				>
					<span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
						<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
					</span>
					{formattedDate}
				</time>

				<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					{data?.summary}
				</p>

				<div
					aria-hidden="true"
					className="relative z-10 flex items-center mt-4 text-sm font-medium text-teal-500"
				>
					<span>Read article</span>
					<ChevronRightIcon className="w-4 h-4 ml-1" />
				</div>
			</div>

			<time
				className={clsx(
					'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
					'mt-1 hidden md:block'
				)}
			>
				{formattedDate}
			</time>
		</article>
	);
}

interface PostsListViewProps {
	posts: CollectionEntry<'blog'>[];
}

export function PostsListView({ posts }: PostsListViewProps) {
	return (
		<div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
			<div className="flex max-w-3xl flex-col space-y-16 mt-16">
				{posts.map((post) => (
					<ListCard key={post?.id} post={post} />
				))}
			</div>
		</div>
	);
}
