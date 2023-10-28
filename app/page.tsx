import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, TrendingUpIcon } from 'lucide-react';

import { HomeIcons } from '@/components/home-icons';

export default function Home() {
    return (
        <>
            <section id="hero">
                <h1 className="text-2xl font-bold md:text-3xl">Sergio Barria</h1>
                <p className="text-sm text-neutral-400">developer, engineer and amateur writer</p>
                <p className="mt-3">
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
                            <span>0 GitHub Stars</span>
                        </a>

                        <Link
                            href="/blog"
                            className="flex items-center gap-3 hover:text-neutral-50"
                        >
                            <TrendingUpIcon />
                            <span>0 total posts views</span>
                        </Link>
                    </div>
                </div>

                <HomeIcons />

                <p className="mt-3">
                    Welcome to my small space of the internet, where I write and share about
                    different topics related to the web. I&apos;m constantly exploring new
                    technologies.
                </p>
                <p>
                    Currently I&apos;m working on improving my knowledge with: <strong>.NET</strong>
                    , <strong>MySQL</strong>, and other tools for web development.
                </p>
            </section>

            <section id="latest-articles" className="my-6">
                <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">Latest Articles</h2>
            </section>
        </>
    );
}
