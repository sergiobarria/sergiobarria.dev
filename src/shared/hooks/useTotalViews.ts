import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';

type Views = {
	total: string;
};

export const useTotalViews = () => {
	const { data: views, error } = useSWR<{ total: string }>('/api/views/all.json', fetcher);

	return {
		views,
		isLoading: !error && !views,
		isError: error,
	};
};
