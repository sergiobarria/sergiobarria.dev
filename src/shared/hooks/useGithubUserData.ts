import useSWR from 'swr';

import { GET_USER_METRICS, gqlFetcher, User } from 'lib/gql';

export const useGithubUserData = () => {
	const { data, error } = useSWR<User>(GET_USER_METRICS, gqlFetcher);

	const totalStars = data?.user?.repositories?.edges?.reduce((acc, curr) => {
		return acc + curr.node.stargazerCount;
	}, 0);

	return {
		user: data?.user,
		totalStars,
		isLoading: !error && !data,
		isError: error,
	};
};
