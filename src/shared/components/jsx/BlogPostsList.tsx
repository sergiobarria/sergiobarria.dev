import { useState } from 'react';
import type { CollectionEntry } from 'astro:content';
import { ListBulletIcon, GridIcon } from '@radix-ui/react-icons';
import { Tooltip } from 'react-tooltip';
import clsx from 'clsx';

import { SearchBar } from './SearchBar';
import { PostsListView } from './PostsListView';
import { PostsGridView } from './PostsGridView';

interface BlogPostListProps {
	posts: CollectionEntry<'blog'>[];
}

export function BlogPostsList({ posts }: BlogPostListProps) {
	const [isListView, setIsListView] = useState<boolean>(true);
	const [query, setQuery] = useState<string>('');

	const searchPosts = posts
		.map((post) => ({
			...post,
			searchterms: `${post?.data?.title}`,
		}))
		.sort(
			(a, b) =>
				new Date(b.data?.publishedDate).getTime() - new Date(a.data?.publishedDate).getTime()
		);

	const filteredPosts = searchPosts.filter((post) => {
		return post.searchterms.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<>
			<div className="flex items-center gap-6">
				<div className="flex-1">
					<SearchBar label="Search posts..." setQuery={setQuery} />
				</div>

				<div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-600">
					<button
						id="list-btn"
						type="button"
						onClick={() => setIsListView(true)}
						className="p-3 rounded-full bg-zinc-200 dark:bg-zinc-800/90 focus:ring-0"
						data-tooltip-content="List View"
					>
						<ListBulletIcon
							width={24}
							height={24}
							className={clsx(isListView ? 'text-teal-500' : 'text-zinc-500 dark:text-zinc-600')}
						/>
					</button>
					<button
						id="grid-btn"
						type="button"
						onClick={() => setIsListView(false)}
						className="p-3 rounded-full bg-zinc-200 dark:bg-zinc-800/90 focus:ring-0"
						data-tooltip-content="Grid View"
					>
						<GridIcon
							width={24}
							height={24}
							className={clsx(!isListView ? 'text-teal-500' : 'text-zinc-500 dark:text-zinc-600')}
						/>
					</button>
				</div>
				<Tooltip anchorId="list-btn" />
				<Tooltip anchorId="grid-btn" />
			</div>

			{/* Render Posts */}
			{filteredPosts.length > 0 ? (
				isListView ? (
					<PostsListView posts={filteredPosts} />
				) : (
					<PostsGridView posts={filteredPosts} />
				)
			) : (
				<div className="text-center">
					<h2 className="text-2xl font-bold text-font-two">No posts found 🙁</h2>
					<p className="text-font-two">Oopps! Sorry, there are no results for: "{query}"</p>
					<p className="text-font-two">Try searching for something else</p>
				</div>
			)}
		</>
	);
}
