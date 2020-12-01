const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const resolePaths=require('../../resolvPaths');

const env=process.env.NODE_ENV;
const handleStyleLoader=env==='production'?MiniCssExtractPlugin.loader:'style-loader';

module.exports ={
    entry:{
        app:path.resolve(__dirname, '../src/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        fallback: { "path": false },
        extensions: ['.ts','.tsx','.js','.jsx'],
        alias: {
            ...resolePaths(path.resolve(__dirname,'../../')),
            "@leke/rc":path.resolve(__dirname,'../../packages/rc')
        }
    },
    module: {
        rules:[
            {
                test: /node_modules\/vfile\/core\.js/,
                use: [{
                    loader: 'imports-loader',
                    options: {
                        type: 'commonjs',
                        imports: ['single process/browser process'],
                    },
                }],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: [
                    handleStyleLoader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    handleStyleLoader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.md$/,
                loader: path.resolve(__dirname,'./markdown-loader.js')
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'../index.html')
        })
    ]
};