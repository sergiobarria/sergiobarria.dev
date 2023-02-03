import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import type { Wakatime } from '../types';

export const useWakaStats = () => {
	const { data: wakaStats, error } = useSWR<Wakatime>('/api/wakatime/stats.json', fetcher);

	return {
		wakaStats,
		isLoading: !error && !wakaStats,
		isError: error,
	};
};
