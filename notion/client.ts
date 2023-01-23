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
	summary: string;
}

export function mapNotionObjToPost(obj: any): Post {
	return {
		id: obj.id,
		title: obj?.Title?.title[0]?.plain_text,
		slug: obj?.Slug?.rich_text[0]?.plain_text,
		views: obj?.Views?.number ?? 0,
		readingTime: obj['Reading Time']?.number ?? 0,
		publishedDate: obj['Published Date']?.date?.start,
		coverImage: obj['Cover Image']?.rich_text[0]?.plain_text,
		type: obj?.Type?.select?.name,
		summary: obj?.Summary?.rich_text[0]?.plain_text,
	};
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

	return posts.map((post) => ({
		id: post.id,
		title: post?.Title?.title[0]?.plain_text,
		slug: post?.Slug?.rich_text[0]?.plain_text,
		views: post?.Views?.number ?? 0,
		readingTime: post['Reading Time']?.number ?? 0,
		publishedDate: post['Published Date']?.date?.start,
		coverImage: post['Cover Image']?.rich_text[0]?.plain_text,
		type: post?.Type?.select?.name,
		summary: post?.Summary?.rich_text[0]?.plain_text,
	}));
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

	return posts.map((post) => ({
		id: post?.id,
		title: post?.Title?.title[0]?.plain_text,
		slug: post?.Slug?.rich_text[0]?.plain_text,
		views: post?.Views?.number ?? 0,
		readingTime: post['Reading Time']?.number,
	}));
}

export async function getPostBySlug(slug: string) {
	const response = await notion.databases.query({
		database_id: NOTION_POSTS_DATABASE_ID,
		filter: {
			and: [
				{
					property: 'Slug',
					rich_text: {
						equals: slug,
					},
				},
			],
		},
	});

	const pageId = response.results[0]?.id;

	const pageBlocks = await notion.blocks.children.list({
		block_id: pageId,
		// page_size: 10,
	});

	return {
		id: pageId,
		// @ts-ignore wrong type in @notionhq/client
		page: mapNotionObjToPost(response.results[0].properties),
		pageBlocks,
	};
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
