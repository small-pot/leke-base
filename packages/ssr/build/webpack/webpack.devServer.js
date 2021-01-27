const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');

const config = merge(baseWebpackConfig,{
    name:'server',
    mode:'development',
    entry: resolveEntry(),
    output: {
        filename: "server-entry.js",
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
    webpackConfig(config);
}
module.exports=config;