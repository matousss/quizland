const path = require("path")
const Dotenv = require('dotenv-webpack')
//const webpack = require('webpack')

module.exports = {
    entry: './start.ts',
    mode: 'development',
    target: 'node',
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']/*,
        modules: [path.join(__dirname, './'), path.join(__dirname, 'node_modules') ]*/
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'server.bundle.cjs'
    }
};
