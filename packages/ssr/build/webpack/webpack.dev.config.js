const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin=require('case-sensitive-paths-webpack-plugin');
const ResourcePlugin=require('./resource-plugin');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');
const {clientName,serverName}=require('../static')

const clientConfig =merge(baseWebpackConfig,{
    mode:'development',
    entry: {[clientName]:resolveEntry('core-js')},
    module: {
        rules: getRules()
    },
    optimization: {
        minimize:false,
        moduleIds:'deterministic',
        chunkIds:'deterministic'
    },
    plugins: [
        new ResourcePlugin(),
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

const serverConfig = merge(baseWebpackConfig,{
    mode:'development',
    entry: {[serverName]:resolveEntry()},
    output: {
        filename: `${serverName}.js`,
        libraryTarget: "commonjs2"  // 打包成commonjs2规范
    },
    node: {
        __dirname: true,
        __filename:true
    },
    optimization: {
        minimize:false
    },
    target: "node",  // 指定node运行环境
    ///externals: [nodeExternals()],  // 不绑定node模块，保留为 require()
    module: {
        rules:getRules('node')
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify('development'),
            "process.env.WEB": JSON.stringify(false)
        }),
    ]
});

if(typeof webpackConfig==='function'){
    webpackConfig(clientConfig);
    webpackConfig(serverConfig);
}
exports.clientConfig=clientConfig
exports.serverConfig=serverConfig