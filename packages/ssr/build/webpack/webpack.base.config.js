const path=require('path');
const {alias,publicPath}=require('../resolveConfig');
module.exports={
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