import Pocketbase from 'pocketbase';

const PB_URL = import.meta.env.PB_URL ?? 'http://127.0.0.1:8090';
const { PB_USER_EMAIL, PB_USER_PASSWORD } = import.meta.env;
const COLLECTION = 'posts';

export const pb = new Pocketbase(PB_URL);

// This is required to be able to make multiple requests
// see: https://github.com/pocketbase/js-sdk#auto-cancellation
pb.autoCancellation(false);

export const login = async () => {
	const auth = await pb.admins.authWithPassword(PB_USER_EMAIL, PB_USER_PASSWORD);

	return auth;
};

export const getAllRecords = async () => {
	const records = await pb.collection(COLLECTION).getFullList(200, { sort: '-created' });
	const totalViews = records.reduce((acc, record) => {
		return acc + record.views;
	}, 0);

	return totalViews;
};

export const getSingleRecord = async (slug: string) => {
	if (!slug) return;

	console.log('slug', slug);
	const record = await pb.collection(COLLECTION).getFirstListItem(`slug="${slug}"`, {
		expand: 'views',
	});

	return record?.views;
};

export const updateRecord = async (slug: string) => {
	if (!slug) return;

	try {
		const record = await pb.collection(COLLECTION).getFirstListItem(`slug="${slug}"`, {
			expand: 'views',
		});

		const updatedRecord = await pb.collection(COLLECTION).update(record.id, {
			views: record.views + 1,
		});

		return updatedRecord.views;
	} catch (error) {
		console.error(error);
	}

	const createRecord = await pb.collection(COLLECTION).create({
		slug,
		views: 1,
	});

	return createRecord.views;
};
