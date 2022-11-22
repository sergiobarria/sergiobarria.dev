import useSWR from 'swr';

import { gqlFetcher, GET_PINNED_REPOSTS_QUERY } from 'lib/gql';

export type Repo = {
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

export type Node = {
	node: Repo;
};

export type User = {
	user: {
		pinnedItems: {
			totalCount: number;
			edges: Node[];
		};
	};
};

export const usePinnedRepos = () => {
	const { data, error } = useSWR<User>(GET_PINNED_REPOSTS_QUERY, gqlFetcher);
	const isLoading = !data && !error;
	const repos = data?.user?.pinnedItems?.edges?.map(({ node }) => node) || [];

	return { repos, isLoading, error };
};
