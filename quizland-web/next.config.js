/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns:
            [
                {
                    hostname: '*googleusercontent.com',
                    protocol: 'https',
                }
            ]

    },
    output: 'standalone',
    webpack: (config) => {
        config.experiments = {...config.experiments, topLevelAwait: true};
        config.module.rules.push({
            test: /\.graphql$/,
            exclude: /node_modules/,
            use: [{loader: 'graphql-tag/loader'}]
        })
        return config;
    },
    transpilePackages: ['quizland-gql']
}

module.exports = nextConfig
