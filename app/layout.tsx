import type { Metadata } from 'next';
import { GeistMono, GeistSans } from 'geist/font';

import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/sidebar';
import { SpotifyCard } from '@/components/spotify-card';
import './globals.css';

export const metadata: Metadata = {
    title: 'Home | Sergio Barria',
    description: 'Engineer, developer, amateur writer'
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
            </body>
        </html>
    );
}
