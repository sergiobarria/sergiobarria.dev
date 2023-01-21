<script lang="ts">
	import MetricCard from './MetricCard.svelte';
	import { useWakatime, useWakatimeAll, useGithubUserData, useTotalViews } from '~/shared/hooks';
	import { socialLinks } from '../../../../site.json';

	export let totalPosts: number;

	const githubUrl = socialLinks.find((link) => link.name === 'gitHub')?.url || '/blog';

	const { views, isError: totalViewsIsError } = useTotalViews();
	const { data: wakatime, isLoading: wakaIsLoading, isError: wakaIsError } = useWakatime();
	const { data: allWakaStats, isError: allWakaIsError } = useWakatimeAll();
	const { data: githubData, isError: githubIsError } = useGithubUserData();
	$: totalStarts =
		$githubData?.user?.repositories?.edges?.reduce(
			(acc, curr) => acc + curr.node.stargazerCount,
			0
		) || 0;

	function convertTimeToDecimal(time: string) {
		const hours = time.split(' ')[0];
		const minutes = time.split(' ')[2];

		const hoursToDecimal = parseInt(hours) + parseInt(minutes) / 60;

		return Math.round(hoursToDecimal * 5) / 5 + ' hrs';
	}

	const isError = $totalViewsIsError || $wakaIsError || $allWakaIsError || $githubIsError;
</script>

<div>
	<div class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<MetricCard
			title="Total Posts"
			value={totalPosts ? totalPosts.toString() : '--'}
			link="/blog"
		/>
		<MetricCard title="Total Views" value={$views ? $views.total?.toString() : '--'} link="/blog" />

		<MetricCard
			title="Total Github Followers"
			value={$githubData ? $githubData?.user?.followers?.totalCount : '--'}
			link={githubUrl}
		/>
		<MetricCard
			title="Total Github Pull Requests"
			value={$githubData ? $githubData?.user?.pullRequests?.totalCount : '--'}
			link={githubUrl}
		/>
		<MetricCard
			title="Total Github Stars"
			value={totalStarts ? totalStarts : '--'}
			link={githubUrl}
		/>

		<MetricCard
			title="Wakatime*"
			value={!wakaIsLoading && $wakatime ? $wakatime?.text?.split(' ').slice(0, 2).join(' ') : '--'}
			link={githubUrl}
		/>
		<MetricCard
			title="Daily Coding Average*"
			value={$allWakaStats ? convertTimeToDecimal($allWakaStats?.dailyAvg) : '--'}
			link={githubUrl}
		/>
		<MetricCard
			title="Top Language*"
			value={$allWakaStats ? $allWakaStats?.topLang?.name : '--'}
			link={githubUrl}
		/>
		<MetricCard
			title="Other Languages*"
			value={$allWakaStats ? $allWakaStats?.otherLang?.name : '--'}
			link={githubUrl}
		/>

		<small>*Wakatime stats {$allWakaStats?.since ?? '--'}</small>

		{#if isError}
			<p class="text-center text-red-500">
				There was an error fetching one or more stats, please try again later
			</p>
		{/if}
	</div>
</div>
