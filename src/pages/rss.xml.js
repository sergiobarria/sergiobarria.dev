import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

import config from '~/config';

export async function GET() {
    const postsEntries = await getCollection('posts', ({ data }) => {
        return !data.draft && !data.archived;
    });
    const posts = postsEntries.sort(
        (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
    );
    const items = posts.map(post => ({
        title: post.data.title,
        pubDate: post.data.publishedAt.toUTCString(),
        description: post.data.description,
        link: `/blog/${post.slug}/`
    }));

    return rss({
        title: config.title,
        description: config.description,
        site: config.site,
        items
    });
}
