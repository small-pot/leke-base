const path=require('path');
const isPro=process.env.NODE_ENV==='production';
const {alias,publicPath}=require('../resolveConfig');
module.exports={
    devtool:isPro?false:'eval-source-map',
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: 'js/[name].js',
        publicPath
    },
    resolve: {
        extensions: [".js", ".jsx",".ts",".tsx", ".json"],
        alias
    },
};