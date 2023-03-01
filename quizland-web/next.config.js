/** @type {import('next').NextConfig} */
const token_cookie = [
    {
        type: 'cookie',
        key: 'token',
    }
]


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
    transpilePackages: ['quizland-gql'],
    redirects: async () => {
        return [
            {
                source: '/signout',
                destination: '/auth/signout',
                permanent: false,
            },
            {
                source: '/',
                has: token_cookie,
                destination: '/home',
                permanent: false,
            }, {
                source: '/',
                destination: '/about',
                permanent: false,
            },
            {
                source: '/auth',
                has: token_cookie,
                destination: '/home',
                permanent: false,
            },
            {
                source: '/library',
                has: token_cookie,
                destination: '/auth',
                permanent: false,
            },
            {
                source: '/cardset/create',
                has: token_cookie,
                destination: '/auth',
                permanent: false,
            },
            {
                source: '/cardset/edit/:id',
                has: token_cookie,
                destination: '/auth',
                permanent: false,
            }
        ]
    },
}

module.exports = nextConfig
