import { BASE_URL } from '~/shared/constants';
import { gqlClient, GET_USER_METRICS, User } from 'lib/gql';
import type { Wakatime, WakatimeAllTime } from '~/shared/types';

export async function getTotalViews(): Promise<number> {
	const res = await fetch(`${BASE_URL}/api/views/all.json`);
	const { total } = await res.json();

	return total;
}

export async function getWakatimeStats(): Promise<Wakatime> {
	const res = await fetch(`${BASE_URL}/api/wakatime/stats.json`);
	const stats = await res.json();

	return stats as Wakatime;
}

export async function getWakatimeAllTimeStats(): Promise<WakatimeAllTime> {
	const res = await fetch(`${BASE_URL}/api/wakatime/all-time.json`);
	const allTimeStats = await res.json();

	return allTimeStats as WakatimeAllTime;
}

export async function getGithubUserData(): Promise<User> {
	const res = await gqlClient.request<User>(GET_USER_METRICS);

	return res;
}
