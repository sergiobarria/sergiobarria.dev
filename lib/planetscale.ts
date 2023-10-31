import 'server-only';

import { connect, Config } from '@planetscale/database';
import { unstable_cache } from 'next/cache';

const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
} satisfies Config;

export const conn = connect(config);

type DBPost = {
    id: number;
    slug: string;
    views: number;
};

export const getTotalViews = unstable_cache(
    async () => {
        const rows = (await conn.execute('SELECT id, views FROM posts'))?.rows as Omit<
            DBPost,
            'slug'
        >[];

        return rows.reduce((acc, { views }) => acc + views, 0);
    },
    ['posts-views-total'],
    { revalidate: 5 }
);

export const getAllPostViews = unstable_cache(
    async () => {
        const result = await conn.execute('SELECT id, slug, views FROM posts');
        return result?.rows as DBPost[];
    },
    ['single-post-views'],
    { revalidate: 5 }
);
