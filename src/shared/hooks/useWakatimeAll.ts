import { useSWR } from 'sswr';

import { useServerFunctions } from './useServerFunctions';

interface WakatimeAllData {
	bestDay: {
		id: string;
		date: string;
		text: string;
		total_seconds: string;
	};
	dailyAvg: string;
	since: string;
	topLang: {
		name: string;
		percent: string;
		text: string;
		total_seconds: string;
	};
	otherLang: {
		name: string;
		percent: string;
		text: string;
		total_seconds: string;
	};
	os: {
		name: string;
	};
}

export const useWakatimeAll = () => {
	const { apiUrl } = useServerFunctions();
	const { data, error } = useSWR<WakatimeAllData>(`${apiUrl}/wakatime/all-time.json`);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};
