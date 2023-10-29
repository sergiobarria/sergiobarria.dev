import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

import { RenderMDXContent } from '@/components/render-mdx';
import { allPosts } from 'contentlayer/generated';
import { cn, formatDate } from '@/lib/utils';
import { ViewCounter } from '@/components/view-counter';
import { getAllPostViews } from '@/lib/planetscale';

interface Heading {
    heading: number;
    text: string;
    slug: string;
}

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return allPosts.map(post => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
    const post = allPosts.find(post => post.slug === params.slug);

    if (!post) notFound();

    const allViews = await getAllPostViews();
    const views = allViews.find(p => p.slug === params.slug)?.views ?? 0;

    return (
        <>
            <h1 className="text-2xl font-semibold tracking-tighter">
                <Balancer>{post.title}</Balancer>
            </h1>

            <div className="mb-8 mt-2 flex items-center justify-between text-sm text-neutral-400">
                <p className="text-sm">{formatDate(post.publishedAt)}</p>

                <ViewCounter views={views} slug={post.slug} />
            </div>

            <h2 className="text-lg font-semibold tracking-tighter">Table of Contents</h2>
            <ul className="mb-6">
                {post.headings.map(({ heading, slug, text }: Heading) => (
                    <li
                        key={slug}
                        className={cn({
                            'ml-0': heading === 2,
                            'ml-4': heading === 3,
                            'ml-8': heading === 4
                        })}
                    >
                        <Link
                            href={`#${slug}`}
                            className="py-1 font-light text-neutral-400 transition duration-200 hover:text-white"
                        >
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>

            <RenderMDXContent code={post.body.code} />

            <hr className="my-8 border-neutral-500/50" />
        </>
    );
}
