const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin=require('case-sensitive-paths-webpack-plugin');
const ResourcePlugin=require('./resource-plugin');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');

const entry=resolveEntry('webpack-hot-middleware/client?path=/ssr/__hot&reload=true&noInfo=true');
entry.unshift('core-js');
const config =merge(baseWebpackConfig,{
    mode:'development',
    entry: {app:entry},
    module: {
        rules: getRules()
    },
    optimization: {
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
        }
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
        new ResourcePlugin(),
        new CaseSensitivePathsPlugin()//强制检验路径,防止大小写路径名报错
    ]
});
if(typeof webpackConfig==='function'){
    webpackConfig(config);
}
module.exports=config;
