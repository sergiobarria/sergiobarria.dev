import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET() {
    const postsEntries = await getCollection('posts', ({ data }) => {
        return !data.draft && !data.archived;
    });
    const posts = postsEntries.sort(
        (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime()
    );
    const items = posts.map(post => ({
        title: post.data.title,
        pubDate: new Date(post.data.publishedAt)?.toUTCString(),
        description: post.data.description,
        link: `/blog/${post.slug}/`
    }));

    return rss({
        title: "Sergio's personal website",
        description: 'Engineer, developer, amateur writer',
        site: import.meta.env.SITE,
        items
    });
}
