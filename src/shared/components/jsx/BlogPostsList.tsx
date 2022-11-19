import { Fragment, useState, useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';

import { Pagination } from './Pagination';
import type { Post } from '~/pages/blog/_utils';
import { BlogPostCard } from './BlogPostCard';
import { posts as nPosts, searchQuery as nSearchQuery } from '~/stores';

import styles from './BlogPostsList.module.scss';

interface BlogPostsListProps {
	className?: string;
	pageSize?: number;
	posts: Post[];
}

export const BlogPostsList = ({ posts, pageSize = 9 }: BlogPostsListProps) => {
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
			<div className={styles.noPostFoundContainer}>
				<p>No posts found for your search...</p>
			</div>
		);
	}

	return (
		<Fragment>
			<div className={styles.gridContainer}>
				{currentData.map((post) => {
					const slug = post.url.split('/').pop();

					return <BlogPostCard key={slug} post={post} />;
				})}
			</div>

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
