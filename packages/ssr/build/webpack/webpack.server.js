const baseWebpackConfig=require('./webpack.base.config');
const merge=require('webpack-merge');
const path=require('path');
const getRules=require('./getRules');
const {resolveEntry}=require('../resolveConfig');

const webpackConfig = merge(baseWebpackConfig,{
    mode:'production',
    entry: {
        app:resolveEntry()
    },
    output: {
        filename: "server-entry.js",
        libraryTarget: "commonjs2"  // 打包成commonjs2规范
    },
    node: {
        global:false,
        __dirname: true,
        __filename:true
    },
    module: {
        rules: getRules('server')
    },
    target: "node",  // 指定node运行环境
    externals: ['react','react-dom','axios','qs']
});
module.exports=webpackConfig;