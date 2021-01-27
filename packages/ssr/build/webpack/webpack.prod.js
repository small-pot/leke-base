const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');
const ResourcePlugin=require('./resource-plugin');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');

const entry=resolveEntry();
entry.unshift('core-js');
const config = merge(baseWebpackConfig, {
    name:'client',
    mode: 'production',
    entry: {app:entry},
    output: {
        filename: 'js/[name].[chunkhash].js'
    },
    target:['web','es5'],
    optimization: {
        minimize:true,
        runtimeChunk: "single",
        moduleIds:'deterministic',
        chunkIds:'deterministic',
        minimizer:[
            new CssMinimizerPlugin()
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