import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, TrendingUpIcon, ArrowUpRightIcon, Code2Icon } from 'lucide-react';

import { HomeIcons } from '@/components/home-icons';
import { getStargazersCount } from '@/lib/github';
import { getAllPostViews } from '@/lib/planetscale';
import { getFavoriteLanguages } from '@/lib/wakatime';
import { allPosts } from 'contentlayer/generated';

export default async function Home() {
    const startgazers = await getStargazersCount();
    const allPostViews = await getAllPostViews();
    const favLanguages = await getFavoriteLanguages();
    const totalViews = allPostViews.reduce((acc, { views }) => acc + views, 0);

    const latestPosts = allPosts
        .filter(post => !post.draft && !post.archived)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3);

    const posts = latestPosts.map(post => ({
        ...post,
        views: allPostViews.find(p => p.slug === post.slug)?.views ?? 0
    }));

    return (
        <>
            <section id="hero">
                <h1 className="text-2xl font-bold md:text-3xl">Sergio Barria</h1>
                <p className="text-sm text-neutral-400">developer, engineer and amateur writer</p>
                <p className="prose prose-invert mt-3 ">
                    Hey there!, I&apos;m Sergio, a civil engineer from Panama turn into web
                    developer. I work as a full stack developer building web and mobile apps, mostly
                    around the <strong>JavaScript</strong> ecosystem.
                </p>

                <div className="flex-center my-6 flex gap-6 md:flex-row">
                    <Image
                        src="/images/profile-4.png"
                        width={100}
                        height={100}
                        alt="profile"
                        className="rounded-full"
                    />

                    <div className="space-y-2 text-neutral-400">
                        <a
                            href="https://github.com/sergiobarria"
                            className="flex items-center gap-3 hover:text-neutral-50"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon />
                            <Suspense
                                fallback={
                                    <span className="h-3 w-4 animate-pulse rounded bg-neutral-500" />
                                }
                            >
                                <span>{startgazers} GitHub stars</span>
                            </Suspense>
                        </a>

                        <Link
                            href="/blog"
                            className="flex items-center gap-3 hover:text-neutral-50"
                        >
                            <TrendingUpIcon />
                            <Suspense
                                fallback={
                                    <span className="h-3 w-4 animate-pulse rounded bg-neutral-500" />
                                }
                            >
                                <span>{totalViews} total posts views</span>
                            </Suspense>
                        </Link>

                        <p className="flex items-center gap-3 hover:text-neutral-50">
                            <Code2Icon />
                            <Suspense
                                fallback={
                                    <span className="h-3 w-4 animate-pulse rounded bg-neutral-500" />
                                }
                            >
                                <span>
                                    Most used language: {favLanguages.languages.at(0)?.name}
                                </span>
                            </Suspense>
                        </p>
                    </div>
                </div>

                <HomeIcons />

                <div className="prose prose-invert mt-3">
                    <p>
                        Welcome to my small space of the internet, where I write and share about
                        different topics related to the web. I&apos;m constantly exploring new
                        technologies.
                    </p>

                    <p>
                        Currently I&apos;m working on improving my knowledge with:{' '}
                        <strong>.NET</strong>, <strong>MySQL</strong>, and other tools for web
                        development.
                    </p>
                </div>
            </section>

            <section id="latest-articles" className="my-8">
                <h2 className="mb-4 text-xl font-semibold md:text-2xl lg:text-3xl">
                    Latest Articles
                </h2>

                <ul className="space-y-3">
                    {posts.map(post => (
                        <li key={post._id} className="border-b border-neutral-600 pb-2">
                            <Link
                                href={'/blog/' + post.slug}
                                className="flex justify-between hover:text-neutral-300"
                            >
                                <h2 className="font-light tracking-tighter">{post.title}</h2>
                                <ArrowUpRightIcon className="h-4 w-4 text-neutral-500" />
                            </Link>
                            <p className="text-sm text-neutral-400">{post.views} views</p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
