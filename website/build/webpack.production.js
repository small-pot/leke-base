const baseWebpackConfig=require('./webpack.base');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');

const buildConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename:'js/[name].[chunkhash].js',
        publicPath:'/leke-base'
    },
    optimization: {
        minimize:true,
        runtimeChunk: "single"
    },
    plugins: [
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            ignoreOrder: true
        })
    ]
});
module.exports=buildConfig;