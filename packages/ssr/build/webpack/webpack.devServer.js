const baseWebpackConfig=require('./webpack.base.config');
const merge=require('webpack-merge');
const path=require('path');
const nodeExternals=require("webpack-node-externals");
const getRules=require('./getRules');
const {resolveEntry}=require('../resolveConfig');

const webpackConfig = merge(baseWebpackConfig,{
    mode:'development',
    entry: {
        app: resolveEntry()
    },
    output: {
        filename: "server-entry.js",
        libraryTarget: "commonjs2"  // 打包成commonjs2规范
    },
    node: {
        __dirname: true,
    },
    optimization:{
        splitChunks: {
            chunks: "async" // 必须三选一： "initial" | "all"(默认就是all) | "async"
        }
    },
    target: "node",  // 指定node运行环境
    externals: [nodeExternals()],  // 不绑定node模块，保留为 require()
    module: {
        rules:getRules('server')
    }
});
module.exports=webpackConfig;