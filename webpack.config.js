require('@babel/polyfill');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ['@babel/polyfill', './client/src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /'.html$/,
                use: 'html-loader'
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'client/src'),
        proxy: {
            '/api': 'http://localhost:9000',
        },
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/src/index.html'
        }),
    ],
};