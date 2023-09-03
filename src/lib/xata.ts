import { XataClient } from './generated';

const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH
});

export async function getAllPostsViews() {
    return xata.db.posts.select(['id', 'slug', 'views']).getAll();
}

export async function increment(slug: string) {
    const post = await xata.db.posts.filter({ slug }).getFirst();
    const views = post?.views ?? 0;

    const updatedPost = await xata.db.posts.createOrUpdate(post?.id, {
        slug,
        views: views + 1
    });

    return updatedPost?.views ?? 0;
}

export async function getPostViewsBySlug(slug: string) {
    const post = await xata.db.posts.filter({ slug }).getFirst();
    if (!post) return 0;

    return post.views;
}
