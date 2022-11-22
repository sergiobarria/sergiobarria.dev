import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { useServerFunctions } from './useServerFunctions';

interface WakatimeData {
	decimal: string;
	digital: string;
	is_up_to_date: boolean;
	percent_calculated: number;
	range: {
		end: string;
		end_date: string;
		end_text: string;
		start: string;
		start_date: string;
		start_text: string;
		timezone: string;
	};
	text: string;
	timeout: number;
	total_seconds: number;
}

export const useWakatime = () => {
	const { apiUrl } = useServerFunctions();
	const { data, error } = useSWR<WakatimeData>(`${apiUrl}/wakatime`, fetcher);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};
