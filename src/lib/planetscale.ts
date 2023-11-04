import { connect, type Config } from '@planetscale/database';

const config = {
    host: import.meta.env.DATABASE_HOST,
    username: import.meta.env.DATABASE_USERNAME,
    password: import.meta.env.DATABASE_PASSWORD
} satisfies Config;

const conn = connect(config);

type DBPost = {
    id: number;
    slug: string;
    views: number;
};

export const getTotalViews = async () => {
    const rows = (await conn.execute('SELECT id, views FROM posts'))?.rows as Omit<
        DBPost,
        'slug'
    >[];

    return rows.reduce((acc, { views }) => acc + views, 0);
};

export const getAllPostViews = async () => {
    console.info('FUNCTION CALLED!');
    const result = await conn.execute('SELECT id, slug, views FROM posts');
    return result?.rows as DBPost[];
};

export async function increment(slug: string) {
    const post = await conn.execute('SELECT id FROM posts WHERE slug = ?', [slug]);

    if (post.rows.length === 0) {
        await conn.execute('INSERT INTO posts (`slug`, `views`) VALUES (?, ?)', [slug, 1]);
    }

    await conn.execute('UPDATE posts SET views = views + 1 WHERE slug = ?', [slug]);
}

export async function getViewsForSlug(slug: string) {
    const rows = (await conn.execute('SELECT views FROM posts WHERE slug = ?', [slug]))
        ?.rows as Pick<DBPost, 'views'>[];

    return rows?.at(0)?.views;
}
