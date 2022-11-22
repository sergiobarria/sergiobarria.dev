import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { useServerFunctions } from './useServerFunctions';

type Views = {
	total: string;
};

export const useTotalViews = () => {
	const { apiUrl } = useServerFunctions();
	const { data, error } = useSWR<Views>(`${apiUrl}/views`, fetcher);

	return {
		views: data?.total,
		isLoading: !error && !data,
		isError: error,
	};
};
