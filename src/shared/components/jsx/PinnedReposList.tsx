import clsx from 'clsx';
import { StarIcon, GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

import { usePinnedRepos, Repo, User } from '~/shared/hooks';

import styles from './PinnedReposList.module.scss';

const languages = [
	'bg-[#563d7c]',
	'bg-[#f1e05a]',
	'bg-[#3572A5]',
	'bg-[#e34c26]',
	'bg-[#3178c6]',
	'bg-[#41b883]',
	'bg-[#c6538c]',
	'bg-[#a91e50]',
	'bg-[#DA5B0B]',
	'bg-[#00ADD8]',
	'bg-[#ff5a03]',
];

function LoadingCard() {
	return (
		<div className={styles.loadingCard}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}

function RepoCard({ repo }: { repo: Repo }) {
	const { name, url, description, primaryLanguage, stargazerCount } = repo;

	return (
		<div className={styles.card}>
			<a href={url} target="_blank" rel="noreferrer">
				<GitHubLogoIcon width={16} height={16} />
				<h5>{name}</h5>
			</a>
			<p>{description.substring(0, 75)}</p>
			<div className={styles.stats}>
				<span>{primaryLanguage?.name}</span>
				<span className={styles.stars}>
					<StarIcon width={16} height={16} />
					<span>{stargazerCount}</span>
				</span>
				<ExternalLinkIcon width={16} height={16} className={styles.extLink} />
			</div>
		</div>
	);
}

export function PinnedReposList() {
	const { repos, isLoading, error } = usePinnedRepos();

	if (isLoading || error) {
		return (
			<div className={styles.cardsContainer}>
				{[...Array(6)].map((_, i) => (
					<LoadingCard key={i} />
				))}
			</div>
		);
	}

	return (
		<div className={styles.cardsContainer}>
			{repos.map((repo) => {
				return <RepoCard key={repo.id} repo={repo} />;
			})}
		</div>
	);
}
