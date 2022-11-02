import { Client, Entity, Schema, Repository } from 'redis-om';

const REDIS_URL = process.env.REDIS_URL;

interface Post {
	slug: string;
	views: number;
}

class Post extends Entity {}
const postSchema = new Schema(
	Post,
	{
		slug: { type: 'string' },
		views: { type: 'number' },
	},
	{
		dataStructure: 'JSON',
	}
);

let client;
let postRepository: Repository<Post>;

async function connectToRedis() {
	client = await new Client().open(REDIS_URL);
	postRepository = client.fetchRepository(postSchema);
	await postRepository.createIndex();
}

export async function getAllPostsViews() {
	await connectToRedis();

	const allPosts = await postRepository.search().all();

	return allPosts.reduce((acc, post) => {
		return acc + Number(post.views);
	}, 0);
}

export async function getPostViews(slug: string) {
	await connectToRedis();
	const post = await postRepository.search().where('slug').eq(slug).first();

	return post?.views;
}

export async function updatePostViews(slug: string) {
	await connectToRedis();

	const post = await postRepository.search().where('slug').eq(slug).first();

	if (!post) {
		const createdPost = await postRepository.createAndSave({
			slug,
			views: 1,
		});

		return createdPost;
	}

	post.views += 1;
	await postRepository.save(post);

	return post?.views;
}
