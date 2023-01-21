import { useSWR } from 'sswr';

import { useServerFunctions } from './useServerFunctions';

type Views = {
	total: string;
};

export const useTotalViews = () => {
	const { apiUrl } = useServerFunctions();
	const { data, error } = useSWR<Views>(`${apiUrl}/posts/views.json`);

	return {
		views: data,
		isLoading: !error && !data,
		isError: error,
	};
};
