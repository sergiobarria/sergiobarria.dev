import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { useServerFunctions } from './useServerFunctions';

type Views = {
	total: string;
};

export const useViews = (slug: string) => {
	const { apiUrl } = useServerFunctions();
	const { data, error } = useSWR<Views>(`${apiUrl}/views/${slug}`, fetcher);

	return {
		views: data?.total,
		isLoading: !error && !data,
		isError: error,
	};
};
