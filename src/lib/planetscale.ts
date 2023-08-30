import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

import config from '~/config';
import { posts, type DBPost } from './schema';
import { eq } from 'drizzle-orm';

// ===== DATABASE CONNECTION CONFIG =====
const connection = connect({
    host: config.database.host,
    username: config.database.username,
    password: config.database.password
});

export const db = drizzle(connection); // Drizzle instance with Planetscale connection

// ===== DATABASE QUERIES =====
export async function increment(slug: string) {
    const result = await db.select().from(posts).where(eq(posts.slug, slug));
    const views = result.length ? result[0].views : 0;

    await db
        .insert(posts)
        .values({ slug, views: 1 })
        .onDuplicateKeyUpdate({ set: { views: views + 1 } });

    const updatedViews = await db
        .select({ views: posts.views })
        .from(posts)
        .where(eq(posts.slug, slug));

    return updatedViews.length ? updatedViews[0].views : 0;
}

export async function getAllPostsViews(): Promise<DBPost[]> {
    return await db.select().from(posts);
}

export async function getViewsBySlug(slug: string) {
    const result = await db.select({ views: posts.views }).from(posts).where(eq(posts.slug, slug));
    return result.length ? result[0].views : 0;
}
