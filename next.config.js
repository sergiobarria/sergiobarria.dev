const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co'
                // pathname: '/**'
            }
        ]
    }
};

module.exports = withContentlayer(nextConfig);
