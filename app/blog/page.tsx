import type { Metadata } from 'next';
import Link from 'next/link';

import { allPosts } from 'contentlayer/generated';
import { getAllPostViews } from '@/lib/planetscale';

export const metadata: Metadata = {
    title: 'Blog | Sergio Barria',
    description: 'Read my thoughts on different topics related to the web.'
};

export default async function Blog() {
    const allViews = await getAllPostViews();

    const posts = allPosts
        .filter(post => !post.draft && !post.archived)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const postsList = posts.map(post => ({
        ...post,
        views: allViews.find(p => p.slug === post.slug)?.views ?? 0
    }));

    return (
        <>
            <h1 className="mb-6 text-2xl font-bold md:text-3xl">My Blog</h1>

            <ul className="space-y-3">
                {postsList.map(post => {
                    return (
                        <li key={post._id}>
                            <Link href={'/blog/' + post.slug} className="hover:text-neutral-300">
                                <h2 className="font-light tracking-tighter">{post.title}</h2>
                            </Link>
                            <p className="text-sm text-neutral-400">{post.views} views</p>
                        </li>
                    );
                })}
            </ul>

            <hr className="my-8 border-neutral-500/50" />
        </>
    );
}
