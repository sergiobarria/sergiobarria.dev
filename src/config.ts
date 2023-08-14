export default {
    title: 'Home | Sergio Barria',
    description: 'Engineer, developer, amateur writer',
    socials: [
        {
            name: 'github',
            url: 'https://github.com/sergiobarria'
        },
        {
            name: 'linkedin',
            url: 'https://www.linkedin.com/in/sergiobarria/'
        },
        {
            name: 'email',
            url: 'mailto:sbarria.dev@gmail.com'
        }
    ],
    database: {
        host: import.meta.env.DATABASE_HOST,
        username: import.meta.env.DATABASE_USERNAME,
        password: import.meta.env.DATABASE_PASSWORD
    },
    spotify: {
        refreshToken: import.meta.env.SPOTIFY_REFRESH_TOKEN,
        clientId: import.meta.env.SPOTIFY_CLIENT_ID,
        clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET
    },
    github: {
        accessToken: import.meta.env.GITHUB_ACCESS_TOKEN
    },
    wakatime: {
        apiKey: import.meta.env.WAKATIME_API_KEY,
        username: import.meta.env.WAKATIME_USER
    },
    mode: import.meta.env.MODE,
    site: import.meta.env.SITE,
    baseUrl:
        import.meta.env.MODE === 'development'
            ? 'http://localhost:3000'
            : import.meta.env.SITE
}
