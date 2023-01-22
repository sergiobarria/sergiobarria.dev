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
	and: [
		{
			property: 'Status',
			status: {
				equals: 'Published',
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

export interface Post {
	id: string;
	title: string;
	slug: string;
	views: number;
	coverImage: string;
	readingTime: number;
	publishedDate: string;
	type: string;
}

export async function getAllPosts() {
	const response = await notion.databases.query({
		database_id: NOTION_POSTS_DATABASE_ID,
		filter: GET_ALL_POSTS_FILTER,
	});

	const posts = response.results.map((item) => {
		return {
			id: item?.id,
			// @ts-ignore wrong type in @notionhq/client
			...item?.properties,
		};
	});

	// console.log('RESPONSE: ', response);
	// console.log('POSTS: ', posts[0]);

	return posts.map((post) => ({
		id: post.id,
		title: post?.Title?.title[0]?.plain_text,
		slug: post?.Slug?.rich_text[0]?.plain_text,
		views: post?.Views?.number ?? 0,
		readingTime: post['Reading Time']?.number ?? 0,
		publishedDate: post['Published Date']?.date?.start,
		coverImage: post['Cover Image']?.rich_text[0]?.plain_text,
		type: post?.Type?.select?.name,
	}));
}

// {
// 	id: '4020cf85-cb94-48c2-941d-f619d24f993b',
// 	'Published Date': { id: 'B_OZ', type: 'date', date: [Object] },
// 	Type: { id: 'Ouab', type: 'select', select: [Object] },
// 	Summary: { id: 'VS%60c', type: 'rich_text', rich_text: [Array] },
// 	Views: { id: 'VY%5E%5C', type: 'number', number: 0 },
// 	Number: { id: '%60%3ET%7C', type: 'number', number: 16 },
// 	Tags: { id: 'aq%5Cw', type: 'multi_select', multi_select: [] },
// 	'Updated Date': { id: 'eNfI', type: 'date', date: null },
// 	'Cover Image': { id: 'jvC%3F', type: 'rich_text', rich_text: [Array] },
// 	Keywords: { id: 'mv%3B%7C', type: 'multi_select', multi_select: [] },
// 	Status: { id: 'plAj', type: 'status', status: [Object] },
// 	'Reading Time': { id: 'wdUB', type: 'number', number: 13 },
// 	'Is Featured': { id: 'x%5DGo', type: 'checkbox', checkbox: false },
// 	Slug: { id: '~%7DfX', type: 'rich_text', rich_text: [Array] },
// 	Name: { id: 'title', type: 'title', title: [Array] }
// },

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
		title: post?.Title?.title[0]?.plain_text,
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
