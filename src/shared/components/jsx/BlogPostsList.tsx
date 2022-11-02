import { Fragment, useState, useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';

import { Pagination } from './Pagination';
import type { Post } from '~/shared/utils/blogPostsHelpers';
import { BlogPostCard } from './BlogPostCard';
import { posts as nPosts, searchQuery as nSearchQuery } from '~/stores';

interface BlogPostsListProps {
	className?: string;
	pageSize?: number;
	posts: Post[];
}

export const BlogPostsList = ({ posts, pageSize = 9 }: BlogPostsListProps) => {
	const $storePosts = useStore(nPosts);
	const $storeSearchQuery = useStore(nSearchQuery);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

	useEffect(() => {
		nPosts.set(posts);
	}, []);

	useEffect(() => {
		const filteredPosts = posts.filter((post) => {
			return post.title.toLowerCase().includes($storeSearchQuery.toLowerCase());
		});

		setFilteredPosts(filteredPosts);
	}, [$storeSearchQuery]);

	const currentData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;

		return filteredPosts.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filteredPosts]);

	if (!filteredPosts.length) {
		return (
			<div className="flex items-center justify-center">
				<p className="text-neutral-500">No posts found for your search...</p>
			</div>
		);
	}

	return (
		<Fragment>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 lg:gap-6 my-4">
				{currentData.map((post) => {
					const slug = post.url.split('/').pop();

					return (
						<li id="post-item" key={slug}>
							<BlogPostCard post={post} />
						</li>
					);
				})}
			</ul>

			{filteredPosts.length > pageSize && (
				<Pagination
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={(page) => setCurrentPage(page)}
					total={posts.length}
					className=""
				/>
			)}
		</Fragment>
	);
};
