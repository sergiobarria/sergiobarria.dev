import type { Metadata } from 'next';
import { GeistMono, GeistSans } from 'geist/font';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';

import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/sidebar';
import { SpotifyCard } from '@/components/spotify-card';
import './globals.css';

export const metadata: Metadata = {
    description: 'Engineer, developer, amateur writer',
    metadataBase: new URL('https://sergiobarria.dev'),
    title: {
        default: 'Home | Sergio Barria',
        template: '%s | Sergio Barria'
    },
    openGraph: {
        title: 'Sergio Barria',
        description: 'Engineer, developer, amateur writer',
        url: 'https://sergiobarria.dev',
        siteName: 'Sergio Barria',
        locale: 'en_US',
        type: 'website'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    twitter: {
        title: 'Sergio Barria',
        card: 'summary_large_image'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(
                'scroll-smooth bg-[#111010] text-neutral-100',
                GeistSans.variable,
                GeistMono.variable
            )}
        >
            <head>
                <PlausibleProvider domain="sergiobarria.dev" />
            </head>
            <body
                className={cn(
                    'flex min-h-screen max-w-screen-md flex-col gap-6 px-5 pt-10 antialiased',
                    'md:mx-auto md:flex-row md:space-y-0 md:px-0 md:pt-24'
                )}
            >
                <Sidebar />

                <main className="max-w-[600px] flex-1 pb-8">
                    {children}

                    <footer className="mt-7">
                        <div className="flex justify-between">
                            <SpotifyCard />
                        </div>
                    </footer>
                </main>

                <Analytics />
            </body>
        </html>
    );
}
