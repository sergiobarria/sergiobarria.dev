import { connect, Config } from '@planetscale/database';

const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
} satisfies Config;

export const conn = connect(config);

type Post = {
    id: number;
    slug: string;
    views: number;
};

export async function getTotalViews() {
    const rows = (await conn.execute('SELECT id, views FROM posts'))?.rows as Omit<Post, 'slug'>[];

    return rows.reduce((acc, { views }) => acc + views, 0);
}

export async function getViewsForSlug(slug: string) {
    const result = await conn.execute('SELECT views FROM posts WHERE slug = ?', [slug]);
    console.log(result);
}

export async function getAllPostViews() {
    const result = await conn.execute('SELECT id, slug, views FROM posts');
    return result?.rows as Post[];
}
