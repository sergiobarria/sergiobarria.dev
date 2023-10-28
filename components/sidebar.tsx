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
    const path = usePathname();

    return (
        <aside className="sticky">
            <Image src="/logo.png" alt="logo" width={40} height={40} />

            <nav className="mt-6 flex min-w-[100px] md:flex-col">
                {links.map(link => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                            'top-0 inline-block max-w-fit px-2.5 py-1.5 font-light text-neutral-400 hover:text-neutral-50',
                            'transition-colors duration-200 ease-in-out',
                            {
                                'rounded-md bg-neutral-700 text-neutral-50': path === link.href
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
