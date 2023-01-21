import { useSWR } from 'sswr';

import { GET_USER_METRICS, gqlFetcher, User } from 'lib/gql';

export const useGithubUserData = () => {
	const { data, error } = useSWR<User>(GET_USER_METRICS, { fetcher: gqlFetcher });

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};
