import useSWR from 'swr';
import clsx from 'clsx';

import { gqlFetcher, GET_PINNED_REPOSTS_QUERY } from 'lib/gql';

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

export type Repo = {
	node: {
		id: string;
		name: string;
		description: string;
		homepageUrl: string;
		url: string;
		stargazerCount: number;
		primaryLanguage: {
			id: string;
			name: string;
			color: string;
		};
	};
};

export type User = {
	user: {
		pinnedItems: {
			totalCount: number;
			edges: Repo[];
		};
	};
};

function LoadingCard() {
	return (
		<div className="flex flex-col justify-start border min-h-[8rem] p-4 rounded-lg animate-pulse">
			<div className="h-4 w-full bg-neutral-700 rounded-lg mb-3"></div>
			<div className="h-8 w-full bg-neutral-700 rounded-lg"></div>
			<div className="h-4 w-1/2 bg-neutral-700 rounded-lg mt-auto"></div>
		</div>
	);
}

export function FeaturedReposList() {
	const { data, error } = useSWR<User>(GET_PINNED_REPOSTS_QUERY, gqlFetcher);
	const isLoading = !data && !error;
	const repos = data?.user?.pinnedItems?.edges?.map(({ node }) => node) || [];

	const getLangColor = (lang: string) => {
		return languages.find((l) => l.includes(lang));
	};

	let content;

	if (isLoading || !repos.length) {
		content = Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />);
	}

	if (data) {
		content = repos.map((repo) => {
			const { id, name, url, description, primaryLanguage } = repo;

			return (
				<a
					key={id}
					href={url}
					className={clsx(
						'flex flex-col justify-start items-start border rounded-lg p-4',
						'transform transition-all duration-200 ease-in-out hover:scale-[1.03]',
						'shadow-lg shadow-accent/20 dark:shadow-accent/20',
						'hover:shadow-xl'
					)}
					target="_blank"
					rel="noreferrer"
				>
					<h5 className="text-transparent bg-clip-text bg-gradient-to-tr from-accent/70 to-yellow-600">
						{name}
					</h5>
					<p className="text-sm dark:text-typography mb-3">{description}</p>
					<span
						className={clsx(
							'inline-block mt-auto text-xs rounded-full px-2 py-1',
							primaryLanguage?.color && `${getLangColor(primaryLanguage.color)}`
						)}
					>
						{primaryLanguage?.name}
					</span>
				</a>
			);
		});
	}

	return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">{content}</div>;
}
