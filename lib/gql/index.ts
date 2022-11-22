import { GraphQLClient } from 'graphql-request';

// The var should start with PUBLIC prefix to be available in the browser (React)
const GITHUB_ACCESS_TOKEN = import.meta.env.PUBLIC_APP_GITHUB_ACCESS_TOKEN;

export const gqlClient = new GraphQLClient('https://api.github.com/graphql', {
	headers: {
		authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
	},
});

export const gqlFetcher = (query: string, variables?: any) => gqlClient.request(query, variables);

export const PINNED_REPOST_FRAGMENT = `
  fragment RepoFragment on User {
    pinnedItems(first: 6) {
      totalCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            homepageUrl
            url
            stargazerCount
            primaryLanguage {
              id
              name
              color
            }
          }
        }
      }
    }
  }
`;

export const GET_PINNED_REPOSTS_QUERY = `
  query getPinnedRepos {
    user(login: "sergiobarria") {
      ...RepoFragment
    }
  }
  ${PINNED_REPOST_FRAGMENT}
`;

export type User = {
	user: {
		followers: {
			totalCount: number;
		};
		pullRequests: {
			totalCount: number;
		};
		starredRepositories: {
			totalCount: number;
		};
		repositories: {
			totalCount: number;
			edges: {
				node: {
					id: string;
					name: string;
					stargazerCount: number;
				};
			}[];
		};
	};
};

export const GET_USER_METRICS = `
	query getUserMetrics {
		user(login: "sergiobarria") {
			followers {
				totalCount
			}
			pullRequests {
				totalCount
			}
			starredRepositories {
				totalCount
			}
			repositories(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {
				totalCount
				edges {
					node {
						stargazerCount
						id
						name
					}
				}
			}
		}
	}
`;
