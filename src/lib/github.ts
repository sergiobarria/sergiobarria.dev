import config from '@/config'

const { accessToken } = config.github

const STARGAZERS_COUNT_QUERY = `
    query getStargazersCount {
        user(login: "sergiobarria") {
            repositories(first: 100, orderBy: { field: STARGAZERS, direction: DESC}) {
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
`

interface Node {
    id: string
    stargazerCount: number
    name: string
}

export async function getStargazersCount() {
    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ query: STARGAZERS_COUNT_QUERY })
        })
        const { data } = await response.json()
        const stargazerCount = data?.user?.repositories?.edges?.reduce(
            (acc: number, { node }: { node: Node }) =>
                acc + node?.stargazerCount,
            0
        )

        return stargazerCount
    } catch (error) {
        console.error(error)
        return 0
    }
}

const PINNED_REPOST_FRAGMENT = `
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
`

const GET_PINNED_REPOSTS_QUERY = `
  query getPinnedRepos {
    user(login: "sergiobarria") {
      ...RepoFragment
    }
  }
  ${PINNED_REPOST_FRAGMENT}
`

type User = {
    user: {
        followers: {
            totalCount: number
        }
        pullRequests: {
            totalCount: number
        }
        starredRepositories: {
            totalCount: number
        }
        repositories: {
            totalCount: number
            edges: {
                node: {
                    id: string
                    name: string
                    stargazerCount: number
                }
            }[]
        }
    }
}

const GET_USER_METRICS = `
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
`

export async function getGithubUserMetrics() {
    try {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ query: GET_USER_METRICS })
        })
        const { data } = await res.json()
        return data as User
    } catch (err: unknown) {
        console.error(err)
        return null
    }
}
