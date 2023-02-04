import type { APIRoute } from 'astro';

import { prisma } from 'lib/prisma/client';

const responseError = {
	status: 500,
	body: JSON.stringify({ message: 'Error fetching data' }),
	headers: {
		'Content-Type': 'application/json',
	},
};

export const get: APIRoute = async ({ params }) => {
	const { slug } = params;

	try {
		const record = await prisma.post.findUnique({
			where: { slug },
		});

		if (!record) {
			return { ...responseError, body: JSON.stringify({ error: 'not found' }) };
		}

		return {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ total: record.views }),
		};
	} catch (error) {
		console.error(error);
		return responseError;
	}
};

export const post: APIRoute = async ({ params }) => {
	const { slug } = params as { slug: string };

	try {
		const record = await prisma.post.findUnique({
			where: { slug },
		});

		if (!record) {
			const newRecord = await prisma.post.create({
				data: {
					slug,
					views: 1,
				},
			});

			return {
				status: 201,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ total: newRecord.views }),
			};
		}

		const updatedRecord = await prisma.post.update({
			where: { slug },
			data: {
				views: record.views + 1,
			},
		});

		return {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ total: updatedRecord.views }),
		};
	} catch (error) {
		console.error(error);
		return responseError;
	}
};
