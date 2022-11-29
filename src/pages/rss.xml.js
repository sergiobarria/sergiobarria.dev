import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('../content/blog/**/*.mdx', { eager: true });
const posts = Object.values(postImportResult);

export const get = () =>
	rss({
		title: "Sergio Barria's Website RSS Feed",
		description: 'This is the RSS Feed generated for my personal website and blog portfolio',
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			link: post.url,
			title: post.frontmatter.title,
			pubDate: post.frontmatter.publishedDate,
		})),
		stylesheet: '/rss/styles.xsl',
	});
