import { Fragment } from 'react';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

import { useTotalViews, useGithubUserData, useWakatime, useWakatimeAll } from '~/shared/hooks';

import { socialLinks } from '../../../../site.json';

interface MetricsCardProps {
	title: string;
	value: string | number;
	link: string;
}

function MetricCard({ title, value, link }: MetricsCardProps) {
	return (
		<div className="flex flex-col p-4 rounded-lg shadow-md bg-surface-two">
			<div className="flex items-center justify-between">
				<h3>{title}</h3>
				<span>
					<a href={link} className="hover:text-brand">
						<ExternalLinkIcon width={24} height={24} />
					</a>
				</span>
			</div>
			<span className="mt-auto text-2xl font-semibold md:text-3xl lg:text-4xl">{value}</span>
		</div>
	);
}

interface MetricsProps {
	totalPosts: number;
}

export function Metrics({ totalPosts }: MetricsProps) {
	const { user, totalStars, isLoading, isError: githubIsError } = useGithubUserData();
	const { data: wakatimeData, isLoading: wakaIsLoading, isError: wakaIsError } = useWakatime();
	const { data: allWakaStats, isError: allWakaIsError } = useWakatimeAll();
	const { views } = useTotalViews();

	const githubUrl = socialLinks.find((link) => link.name === 'gitHub')?.url || '';

	const convertTimeToDecimal = (time: string) => {
		const hours = time.split(' ')[0];
		const minutes = time.split(' ')[2];

		const hoursToDecimal = parseInt(hours) + parseInt(minutes) / 60;

		return Math.round(hoursToDecimal * 5) / 5;
	};

	const isError = githubIsError || wakaIsError || allWakaIsError;

	return (
		<Fragment>
			<div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<MetricCard
					title="Total Posts"
					value={totalPosts ? totalPosts.toString() : '--'}
					link="/posts"
				/>
				<MetricCard title="Total Posts Views" value={views ? views : '--'} link="/posts" />
				<MetricCard
					title="Total Github Followers"
					value={!isLoading && user ? user?.followers?.totalCount : '--'}
					link={githubUrl}
				/>
				<MetricCard
					title="Total Github Pull Requests"
					value={!isLoading && user ? user?.pullRequests?.totalCount : '--'}
					link=""
				/>
				<MetricCard title="Total Github Stars" value={totalStars ? totalStars : '--'} link="" />
				<MetricCard
					title="Wakatime*"
					value={
						!wakaIsLoading && wakatimeData
							? wakatimeData.text.split(' ').slice(0, 2).join(' ')
							: '--'
					}
					link={githubUrl}
				/>
				<MetricCard
					title="Daily Coding Average*"
					value={allWakaStats ? convertTimeToDecimal(allWakaStats?.dailyAvg) : '--'}
					link={githubUrl}
				/>
				<MetricCard
					title="Top Language*"
					value={allWakaStats?.topLang?.name ?? '--'}
					link={githubUrl}
				/>
				<MetricCard
					title="Other Language*"
					value={allWakaStats?.otherLang?.name ?? '--'}
					link={githubUrl}
				/>
			</div>
			<small>*Wakatime stats {allWakaStats?.since ?? '--'}</small>
			{isError && (
				<p className="text-center text-red-500">
					There was an error fetching one or more stats, please try again later
				</p>
			)}
		</Fragment>
	);
}
