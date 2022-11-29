import clsx from 'clsx';
import { StarIcon, GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

import { usePinnedRepos, Repo } from '~/shared/hooks';

const languages = {
	JavaScript: 'border-[#f1e05a]',
	TypeScript: 'border-[#3572A5]',
	HTML: 'border-[#e34c26]',
	CSS: 'border-[#3178c6]',
	Python: 'border-[#3572A5]',
	Astro: 'border-[#e34c26]',
	Svelte: 'border-[#ff3e00]',
	Vue: 'border-[#41b883]',
	React: 'border-[#00ADD8]',
};

function LoadingCard() {
	return (
		<div className="bg-surface-two w-full h-[8rem] rounded-lg p-4 space-y-3">
			<span className="block w-full h-3 rounded-lg bg-surface-four animate-pulse"></span>
			<span className="block w-full h-10 rounded-lg bg-surface-four animate-pulse"></span>
			<span className="block w-full h-3 rounded-lg bg-surface-four animate-pulse"></span>
		</div>
	);
}

function RepoCard({ repo }: { repo: Repo }) {
	const { name, url, description, primaryLanguage, stargazerCount, homepageUrl } = repo;
	console.log('repo', repo);

	return (
		<div
			className={clsx(
				'flex flex-col gap-3 bg-surface-two rounded-lg p-4 border-t-2',
				`${languages[primaryLanguage?.name as keyof typeof languages] ?? 'border-brand'}`
			)}
		>
			<a href={url} className="inline-flex items-center gap-2" target="_blank" rel="noreferrer">
				<GitHubLogoIcon width={16} height={16} />
				<h5 className="inline hover:text-brand">{name}</h5>
			</a>
			<p className="text-sm">{description?.substring(0, 75) ?? 'No Description provided yet...'}</p>
			<div className="flex items-center justify-between text-xs gap-3">
				<span className="text-brand-accent">{primaryLanguage?.name}</span>
				<span className="flex items-center gap-3">
					<StarIcon width={16} height={16} />
					<span>{stargazerCount}</span>
				</span>
				{homepageUrl && (
					<a href={homepageUrl}>
						<ExternalLinkIcon
							width={16}
							height={16}
							className="cursor-pointer hover:text-brand-accent"
						/>
					</a>
				)}
			</div>
		</div>
	);
}

export function PinnedReposList() {
	const { repos, isLoading, error } = usePinnedRepos();

	if (isLoading || error) {
		return (
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[...Array(6)].map((_, i) => (
					<LoadingCard key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{repos.map((repo) => {
				return <RepoCard key={repo.id} repo={repo} />;
			})}
		</div>
	);
}
