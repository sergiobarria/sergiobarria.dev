import { buildConfig } from 'payload/config';
import path from 'path';

// Import collections
import { Categories, Media, Posts, Tags, Users } from './collections';

// Import Plugins
import imagekitPlugin from 'payloadcms-plugin-imagekit';

// Import Mocks
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject');

export default buildConfig({
	serverURL: process.env.PAYLOAD_SERVER_URL,
	admin: {
		user: Users.slug,
		webpack: (config) => {
			// NOTE: fix for error: "Can't resolve process/browser"
			// Also needed to install 'process' as a dev dependency
			config.resolve.fullySpecified = false;

			// other webpack config here 👇🏼...

			return config;
		},
	},
	collections: [Categories, Media, Posts, Tags, Users],
	typescript: {
		outputFile: path.resolve(__dirname, '__generated__/payload-types.ts'),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, '__generated__/schema.graphql'),
	},
	plugins: [
		imagekitPlugin({
			config: {
				publicKey: process.env.IK_PUBLIC_KEY,
				privateKey: process.env.IK_PRIVATE_KEY,
				endpoint: process.env.IK_ENDPOINT,
			},
			collections: {
				media: {
					uploadOption: {
						folder: 'payload-cms',
					},
					savedProperties: ['url'],
				},
			},
		}),
	],
});
