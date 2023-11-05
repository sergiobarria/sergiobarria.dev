import { XataClient } from './generated';

const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH
});

export async function getAllPosts() {
    return await xata.db.posts.getAll();
}

export async function getTotalPostViews() {
    const total = await xata.db.posts.aggregate({
        totalViews: {
            sum: {
                column: 'views'
            }
        }
    });
    return total.aggs.totalViews;
}

export async function increment(slug: string) {
    try {
        const post = await xata.db.posts.filter({ slug }).getFirst();
        const currentViews = post?.views ?? 0;
        const updatedPost = await xata.db.posts.createOrUpdate(post?.id, {
            slug,
            views: currentViews + 1
        });
        return updatedPost?.views;
    } catch (error: unknown) {
        console.error(error);
        return 0;
    }
}

export async function getViewsForSlug(slug: string) {
    const post = await xata.db.posts.filter({ slug }).getFirst();
    return post?.views ?? 0;
}
