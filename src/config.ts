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
    baseUrl: import.meta.env.PROD
        ? import.meta.env.SITE
        : 'http://localhost:3000',
    mode: import.meta.env.MODE,
    database: {
        host: import.meta.env.DATABASE_HOST,
        username: import.meta.env.DATABASE_USERNAME,
        password: import.meta.env.DATABASE_PASSWORD
    }
}
