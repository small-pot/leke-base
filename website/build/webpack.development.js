const webpack=require('webpack');
const baseConfig=require('./webpack.base');
const {merge}=require('webpack-merge');

module.exports=merge(baseConfig,{
    mode:'development',
    devtool: '#cheap-module-eval-source-map',
    output: {
        filename:'js/[name].js',
        publicPath:'/'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port:3333,
        host: '0.0.0.0',
        hot:true,
        compress:true,
        historyApiFallback:true,
        disableHostCheck: true,
        proxy: {
            context: ['/auth', '/proxy'],
            target: 'https://webapp.leke.cn',
            changeOrigin: true
        }
        // proxy:{
        //     '/auth':{
        //         target: 'https://webapp.leke.cn',
        //         changeOrigin: true,
        //         secure: false
        //     }
        // }
    }
});