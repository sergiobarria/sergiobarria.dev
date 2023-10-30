import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import GithubSlugger from 'github-slugger';

const rehypePrettyCodeOptions = {
    theme: 'vitesse-dark',
    // theme: 'poimandres',
    tokensMap: {
        // VScode command palette: Inspect Editor Tokens and Scopes
        // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
        fn: 'entity.name.function',
        objKey: 'meta.object-literal.key'
    },
    onVisitLine(node: any) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [
                {
                    type: 'text',
                    value: ' '
                }
            ];
        }
        node.properties.className = [''];
    }
};

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: '**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        publishedAt: { type: 'string', required: true },
        description: { type: 'string', required: false },
        draft: { type: 'boolean', default: true },
        archived: { type: 'boolean', default: false },
        keywords: { type: 'list', of: { type: 'string' }, required: false }
    },
    computedFields: {
        headings: {
            type: 'json',
            resolve: async doc => {
                const slugger = new GithubSlugger();
                const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;

                // @ts-ignore
                const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(({ groups }) => {
                    const flag = groups?.flag;
                    const content = groups?.content;
                    return {
                        heading: flag?.length,
                        text: content,
                        slug: content ? slugger.slug(content) : undefined
                    };
                });

                return headings;
            }
        },
        slug: {
            type: 'string',
            resolve: doc => doc._raw.sourceFileName.replace(/\.mdx$/, '')
        },
        locale: {
            type: 'string',
            resolve: doc => doc._raw.sourceFileDir.split('/')?.at(0)
        }
    }
}));

const rehypeAutolinkHeadingsOptions = {
    properties: {
        className: ['anchor']
    }
};

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [[remarkGfm]],
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, rehypePrettyCodeOptions],
            [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]
        ]
    }
});
