import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';

type Views = {
	total: string;
};

export const useViews = (slug: string) => {
	const { data, error } = useSWR<Views>(`/api/views/${slug}.json`, fetcher);

	return {
		views: data?.total,
		isLoading: !error && !data,
		isError: error,
	};
};
