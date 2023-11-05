const ACCESS_TOKEN = import.meta.env.GITHUB_ACCESS_TOKEN;

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
`;

interface Node {
    id: string;
    stargazerCount: number;
    name: string;
}

export async function getStargazersCount() {
    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({ query: STARGAZERS_COUNT_QUERY })
        });

        const { data } = await response.json();

        return data?.user?.repositories?.edges?.reduce(
            (acc: number, { node }: { node: Node }) => acc + node?.stargazerCount,
            0
        );
    } catch (error: unknown) {
        console.error(error);
        return 0;
    }
}
