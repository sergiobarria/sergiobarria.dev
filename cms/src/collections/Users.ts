import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		useAPIKey: true,
	},
	admin: {
		useAsTitle: 'email',
	},
	access: {
		read: () => true,
	},
	fields: [
		// Email added by default
		{
			name: 'name',
			type: 'text',
		},
	],
};
