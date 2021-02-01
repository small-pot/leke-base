const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const ResourcePlugin=require('./resource-plugin');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');

const entry=resolveEntry();
entry.unshift('core-js');
const config = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {app:entry},
    output: {
        filename: 'js/[name].[chunkhash].js'
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "async",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 3,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer:[
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
    module: {
        rules: getRules()
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify('production'),
            "process.env.WEB": JSON.stringify(true)
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            ignoreOrder: true
        }),
        new ResourcePlugin()
    ]
});
if(typeof webpackConfig==='function'){
    webpackConfig(config);
}
module.exports=config;