const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require('path');
const resolePaths=require('../../resolvPaths');

const env=process.env.NODE_ENV;

module.exports ={
    entry:path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    //target:['web','es5'],
    resolve: {
        fallback: { "path": false },
        extensions: ['.ts','.tsx','.js','.jsx'],
        alias: {
            ...resolePaths(path.resolve(__dirname,'../../')),
            '../../node_modules/@leke':path.resolve(__dirname,'../../packages'),
            "@leke/rc":path.resolve(__dirname,'../../packages/rc')
        }
    },
    module: {
        rules:[
            {
                test: /node_modules(\/|\\)vfile(\/|\\)core\.js/,
                use: [{
                    loader: 'imports-loader',
                    options: {
                        type: 'commonjs',
                        imports: ['single process/browser process'],
                    },
                }],
            },
            // {
            //     test: /\.tsx?$/,
            //     loader: 'ts-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.j|tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
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