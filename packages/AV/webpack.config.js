/*
 * @Descripttion: 
 * @Author: gulingxin
 * @Date: 2021-02-03 15:42:48
 * @LastEditTime: 2021-02-07 16:56:51
 */
const path = require('path');
module.exports={
    mode:'production',
    entry:{
        VideoPlayer:path.resolve('./src/VideoPlayer/index.ts'),
        AudioPlayer:path.resolve('./src/AudioPlayer/index.ts'),
        Recorder:path.resolve('./src/Recorder/index.ts')
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this'
    },
    target:['web','es5'],
    resolve: {
        extensions: ['.ts','.tsx','.js','.jsx','.html']
    },
    module: {
        rules:[
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins: [
                                    require('postcss-preset-env')({
                                        browsers:['last 2 versions'],
                                        autoprefixer:{}
                                    })
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    }
};