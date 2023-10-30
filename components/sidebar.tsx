'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const links = [
    { label: 'home', href: '/' },
    { label: 'about', href: '/about' },
    { label: 'blog', href: '/blog' }
];

export function Sidebar() {
    const path = usePathname().split('/')[1];

    return (
        <aside className="top-10 md:sticky md:h-screen">
            <div className="h-auto w-[35px]">
                <Image
                    src="/images/logo.png"
                    width={225}
                    height={346}
                    alt="logo"
                    className="-pl-2.5"
                />
            </div>

            <nav className="-ml-2.5 mt-6 flex min-w-[100px] md:flex-col">
                {links.map(link => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                            'top-0 inline-block max-w-fit px-2.5 py-1.5 font-light text-neutral-400 hover:text-neutral-50',
                            'transition-colors duration-200 ease-in-out',
                            {
                                'rounded-md bg-neutral-700 text-neutral-50':
                                    path === link.href.slice(1)
                            }
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
