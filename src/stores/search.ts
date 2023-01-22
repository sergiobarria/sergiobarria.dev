import { writable } from 'svelte/store';

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
	data: T[];
	results: T[];
	query: string;
}

export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
	const { subscribe, set, update } = writable<SearchStoreModel<T>>({
		data,
		query: '',
		results: data,
	});

	return {
		subscribe,
		set,
		update,
	};
};

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
	const searchTerm = store.query.toLowerCase() || '';

	store.results = store.data.filter((item: T) => {
		return item.title.toLowerCase().includes(searchTerm);
	});
};
