import { Client } from '@notionhq/client';

const NOTION_TOKEN = 'secret_O1CeDJ2LVZFBfYUdH5G3aAGbWwuEKdRyIYSJUfSbIce';
const NOTION_POSTS_DATABASE_ID = '48a9c40c3c19487dbb444fd00c3432f5';

const notion = new Client({
	auth: NOTION_TOKEN,
});

export const GET_FEATURED_POSTS_FILTER = {
	and: [
		{
			property: 'Status',
			status: {
				equals: 'Published',
			},
		},
		{
			property: 'Is Featured',
			checkbox: {
				equals: true,
			},
		},
	],
	sorts: [
		{
			property: 'Published Date',
			direction: 'descending',
		},
	],
};

export const GET_ALL_POSTS_FILTER = {
	property: 'Status',
	status: {
		equals: 'Published',
	},
};

export async function getAllPosts(filter: any) {
	const { results } = await notion.databases.query({
		database_id: NOTION_POSTS_DATABASE_ID,
		filter,
	});

	const posts = results.map((item) => {
		console.log('ITEM: ', item);
	});

	console.log('RESPONSE: ', results);
	console.log('POSTS: ', posts);

	return results;
}

export async function getFeaturedPosts() {
	const response = await notion.databases.query({
		database_id: NOTION_POSTS_DATABASE_ID,
		filter: GET_FEATURED_POSTS_FILTER,
	});

	const posts = response.results.map((item) => ({
		id: item?.id,
		// @ts-ignore wrong type in @notionhq/client
		// see: https://github.com/makenotion/notion-sdk-js/issues/380
		// TODO: remove ts-ignore when fixed in @notionhq/client
		...item?.properties,
	}));

	console.log('POSTS: ', posts);

	return posts.map((post) => ({
		id: post?.id,
		title: post?.Name?.title[0]?.plain_text,
		slug: post?.Slug?.rich_text[0]?.plain_text,
		views: post?.Views?.number ?? 0,
		readingTime: post['Reading Time']?.number,
	}));
}

export async function getPostById(id: string) {
	const post = await notion.pages.retrieve({
		page_id: id,
	});

	console.log('RESPONSE: ', post);

	return post;
}

export async function getPostsStats() {
	const response = await notion.databases.query({
		database_id: NOTION_POSTS_DATABASE_ID,
		filter: GET_ALL_POSTS_FILTER,
	});

	const totalViews = response.results.reduce((acc, item) => {
		// @ts-ignore wrong type in @notionhq/client
		return acc + item?.properties?.Views?.number;
	}, 0);

	return {
		total: response.results.length,
		views: totalViews,
	};
}
