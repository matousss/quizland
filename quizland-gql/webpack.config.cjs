const path = require("path");
module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'server.bundle.js'
    }
};