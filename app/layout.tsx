import type { Metadata } from 'next';
import { Readex_Pro, Nunito_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/sidebar';
import './globals.css';

const font = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Home | Sergio Barria',
    description: 'Engineer, developer, amateur writer'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth bg-black text-neutral-100">
            <body
                className={cn(
                    font.className,
                    'mt-10 flex max-w-screen-md flex-col gap-6 px-4 antialiased',
                    'md:mx-auto md:mt-24 md:flex-row md:space-y-0 md:px-0'
                )}
            >
                <Sidebar />

                <main className="flex-1 border">{children}</main>
            </body>
        </html>
    );
}
