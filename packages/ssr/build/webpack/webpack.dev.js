const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin=require('case-sensitive-paths-webpack-plugin');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');

const entry=resolveEntry('webpack-hot-middleware/client?path=/ssr/__hot&reload=true&noInfo=true');
entry.unshift('core-js');
const config =merge(baseWebpackConfig,{
    name:'client',
    mode:'development',
    entry: {app:entry},
    module: {
        rules: getRules()
    },
    optimization: {
        minimize:false,
        moduleIds:'deterministic',
        chunkIds:'deterministic'
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify('development'),
            "process.env.WEB": JSON.stringify(true)
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            ignoreOrder: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin()//强制检验路径,防止大小写路径名报错
    ]
});
if(typeof webpackConfig==='function'){
    webpackConfig(config);
}
module.exports=config;
