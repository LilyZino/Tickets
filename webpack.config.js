require('@babel/polyfill');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv-extended').load();


const serverHost = `http://${process.env.SERVER_HOST}:${process.env.HOST_PORT}`;

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
                use: {
                    loader:'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /'.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(mp4|png|jpg|pdf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimtetype: ['video/mp4', 'image/png', 'image/jpg'],
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'client/src'),
        proxy: {
            '/api': serverHost,
            '/socket.io': serverHost,
            '/sockjs-node': serverHost
        },
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/src/index.html'
        }),
    ],
};