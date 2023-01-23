import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
	slug: 'media',
	upload: {
		staticURL: '/media',
		staticDir: 'media',
		adminThumbnail: 'thumbnail',
		mimeTypes: ['image/*'],
	},
	fields: [],
	hooks: {},
};
