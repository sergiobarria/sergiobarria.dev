import { Field, FieldHook } from 'payload/types';

type Slug = (fieldToUseAsSlug: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUseAsSlug = 'title') => {
	return {
		name: 'slug',
		label: 'Slug',
		type: 'text',
		index: true,
		admin: {
			position: 'sidebar',
		},
		hooks: {
			beforeValidate: [formatSlug(fieldToUseAsSlug)],
		},
	};
};

export const format = (val: string): string =>
	val
		.replace(/ /g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.toLowerCase();

export const formatSlug =
	(fallback: string): FieldHook =>
	({ operation, value, originalDoc, data }) => {
		if (typeof value === 'string') {
			return format(value);
		}

		if (operation === 'create') {
			const fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

			if (fallbackData && typeof fallbackData === 'string') {
				return format(fallbackData);
			}
		}

		return value;
	};
