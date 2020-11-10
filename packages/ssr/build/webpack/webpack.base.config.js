const webpack=require("webpack");
const path=require('path');
const isPro=process.env.NODE_ENV==='production';
const {alias,publicPath,NODE_ENV}=require('../resolveConfig');
module.exports={
    devtool:isPro?false:'#cheap-module-eval-source-map',
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: 'js/[name].js',
        publicPath
    },
    resolve: {
        extensions: [".js", ".jsx",".ts",".tsx", ".json"],
        alias
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
        })
    ]
};