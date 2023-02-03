import { useEffect } from 'react';
import useSWR from 'swr';
import { animate, stagger } from 'motion';

import { gqlFetcher, GET_USER_METRICS, User } from 'lib/gql';

import { useTotalViews, useWakaStats, useWakaAllTime } from '~/shared/hooks';

interface MetricsCardProps {
	title: string;
	value?: string | number;
	index: number;
}

export function MetricsCard({ title, value, index }: MetricsCardProps) {
	useEffect(() => {
		animate(
			'#metrics-card',
			{ opacity: [0, 1], x: [index % 2 === 0 ? -10 : 10, 0], y: [-10, 0] },
			{ duration: 0.5, delay: stagger(0.2) }
		);
	}, []);

	return (
		<div
			id="metrics-card"
			className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p6 dark:bg-zinc-800"
		>
			<dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</dt>
			<dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-200">
				{value}
			</dd>
		</div>
	);
}

interface MetricsProps {
	totalPosts: number;
}

export function Metrics({ totalPosts }: MetricsProps) {
	const { views, isError: isViewsError } = useTotalViews();
	const { wakaStats, isError: isWakaStatsError } = useWakaStats();
	const { wakaAllTime, isError: isWakaAllTimeError } = useWakaAllTime();

	const { data: githubUser, error: isGithubError } = useSWR<User>(GET_USER_METRICS, gqlFetcher);

	const totalGithubStarts =
		githubUser?.user?.repositories?.edges?.reduce(
			(acc, { node }) => acc + node?.stargazerCount,
			0
		) || 0;

	const isError = isViewsError || isWakaStatsError || isWakaAllTimeError || isGithubError;

	const convertTimeToDecimal = (time?: string) => {
		if (!time) return 0;

		const hours = time.split(' ')[0];
		const minutes = time.split(' ')[2];

		const hoursToDecimal = parseInt(hours) + parseInt(minutes) / 60;

		return Math.round(hoursToDecimal * 5) / 5 + ' hrs';
	};

	return (
		<section id="stats" className="my-16">
			<h2 className="text-2xl font-bold text-font-two">Metrics</h2>
			<div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<MetricsCard title="Total Posts" value={totalPosts} index={1} />

				<MetricsCard title="Total Posts Views" value={views?.total ?? '--'} index={2} />

				<MetricsCard
					title="Total Github Followers"
					value={githubUser?.user?.followers?.totalCount ?? '--'}
					index={3}
				/>

				<MetricsCard
					title="Total Github Pull Request"
					value={githubUser?.user?.pullRequests?.totalCount ?? '--'}
					index={4}
				/>

				<MetricsCard title="Total Github Stars" value={totalGithubStarts ?? '--'} index={5} />

				<MetricsCard
					title="Wakatime*"
					value={wakaStats?.text?.split(' ').slice(0, 2).join(' ') ?? '--'}
					index={6}
				/>

				<MetricsCard
					title="Daily Coding Average*"
					value={convertTimeToDecimal(wakaAllTime?.dailyAvg) ?? '--'}
					index={7}
				/>

				<MetricsCard title="Top Language*" value={wakaAllTime?.topLang?.name ?? '--'} index={8} />

				<MetricsCard
					title="Other Languages*"
					value={wakaAllTime?.otherLang?.name ?? '--'}
					index={9}
				/>
			</div>
			<small>*Wakatime stats {wakaAllTime?.since ?? '--'}</small>
			{isError && (
				<p className="text-center text-red-500">
					There was an error fetching one or more stats, please try again later
				</p>
			)}
		</section>
	);
}
