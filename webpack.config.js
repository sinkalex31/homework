const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const { ifProduction } = getIfUtils(process.env.NODE_ENV);
const hash = ifProduction() ? '[hash]' : 'dev';
const root = __dirname;
const PATHS = {
    dist: path.join(root, 'dist'),
    src: path.join(root, 'src'),
    scss: path.join(root, 'scss'),
};

module.exports = {
    entry: [
        `${PATHS.src}/index.js`,
    ],

    output: {
        path: PATHS.dist,
        publicPath: '/dist/',
        filename: `app.${hash}.js`,
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            store: path.resolve(root, 'src/store'),
            hocs: path.resolve(root, 'src/hocs'),
            components: path.resolve(root, 'src/components'),
            utils: path.resolve(root, 'src/utils'),
        },
    },

    devtool: 'source-map',

    mode: process.env.NODE_ENV,

    cache: true,

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                },
            },
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                canPrint: true,
            }),
        ],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        url: false,
                        name: `fonts/[name].${hash}.[ext]`,
                    },
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        url: false,
                        limit: 10000,
                        name: `fonts/[name].${hash}.[ext]`,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            url: false,
                            limit: 4000,
                            name: `images/[name].${hash}.[ext]`,
                        },
                    },
                ],
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true,
                        },
                    },
                    'resolve-url-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
        ],
    },

    plugins: removeEmpty([
        ifProduction(new CleanWebpackPlugin([PATHS.dist])),
        new SimpleProgressWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new MiniCssExtractPlugin({
            filename: `[name].${hash}.css`,
            chunkFilename: `[id].${hash}.css`,
        }),
        new HtmlWebpackPlugin({
            template: './index.template.html',
            filename: `${PATHS.dist}/index.html`,
            minify: {
                removeComments: true,
            },
        }),
    ]),

    devServer: {
        host: 'localhost',
        port: 3000,
        publicPath: '/dist/',
        historyApiFallback: {
            index: '/dist/index.html',
        },
        compress: true,
    },
};