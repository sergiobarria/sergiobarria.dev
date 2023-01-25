import { CollectionConfig } from 'payload/types';

import { slugField } from '../fields/slug';

export const Posts: CollectionConfig = {
	slug: 'posts',
	admin: {
		defaultColumns: ['_id', 'title', 'author', 'category', 'tags', 'status'],
		useAsTitle: 'title',
	},
	access: {
		// read: () => true, // Everyone can read
	},
	hooks: {},
	fields: [
		{
			type: 'row',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					unique: true,
				},
			],
		},
		slugField('title'),
		{
			type: 'row',
			fields: [
				{
					name: 'author',
					type: 'relationship',
					relationTo: 'users',
				},
				{
					name: 'publishedDate',
					type: 'date',
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'category',
					type: 'relationship',
					relationTo: 'categories',
				},
				{
					name: 'views',
					type: 'number',
					defaultValue: 0,
				},
			],
		},
		{
			name: 'tags',
			type: 'relationship',
			relationTo: 'tags',
			hasMany: true,
		},
		{
			name: 'coverImage',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'excerpt',
			type: 'textarea',
		},
		{
			name: 'keywords',
			type: 'text',
		},
		{
			name: 'content',
			type: 'richText',
		},
		{
			name: 'status',
			type: 'select',
			options: [
				{
					value: 'draft',
					label: 'Draft',
				},
				{
					value: 'published',
					label: 'Published',
				},
			],
			defaultValue: 'draft',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'isFeatured',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				position: 'sidebar',
			},
		},
	],
};
