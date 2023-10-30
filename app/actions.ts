'use server';

import { revalidatePath } from 'next/cache';

import { conn } from '@/lib/planetscale';

export async function increment(slug: string) {
    const post = await conn.execute('SELECT id FROM posts WHERE slug = ?', [slug]);
    const pathToRevalidate = '/blog/' + slug;

    if (post.rows.length === 0) {
        await conn.execute('INSERT INTO posts (`slug`, `views`) VALUES (?, ?)', [slug, 1]);
        return revalidatePath(pathToRevalidate);
    }

    await conn.execute('UPDATE posts SET views = views + 1 WHERE slug = ?', [slug]);
    return revalidatePath(pathToRevalidate);
}
