import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import type { WakatimeAllTime } from '../types';

export const useWakaAllTime = () => {
	const { data: wakaAllTime, error } = useSWR<WakatimeAllTime>(
		'/api/wakatime/all-time.json',
		fetcher
	);

	return {
		wakaAllTime,
		isLoading: !error && !wakaAllTime,
		isError: error,
	};
};
