import type { SelectedPick } from '@xata.io/client';
import { getXataClient, PostsViewsRecord } from './__codegen__';

const xata = getXataClient();

export async function getAllRecords() {
	const records = await xata.db.posts_views.getAll();
	const total = records.reduce(
		(acc: number, record: Readonly<SelectedPick<PostsViewsRecord, ['*']>>) => {
			return acc + Number(record.views);
		},
		0
	);

	return total;
}

export async function getPostViews(slug: string) {
	const record = await xata.db.posts_views.filter({ slug }).getFirst();

	return record?.views;
}

export async function updatePostViews(slug: string) {
	const record = await xata.db.posts_views.filter({ slug }).getFirst();

	if (!record) {
		const createdRecord = await xata.db.posts_views.create({
			slug,
			views: 1,
		});

		return createdRecord.views;
	}

	const updatedRecord = await xata.db.posts_views.update({
		id: record.id,
		views: record?.views! + 1,
	});

	return updatedRecord?.views;
}
