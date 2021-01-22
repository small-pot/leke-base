const path = require('path');
module.exports={
    entry:{
        VideoPlayer:path.resolve('./src/VideoPlayer/index.ts'),
        AudioPlayer:path.resolve('./src/AudioPlayer/index.ts'),
        AudioRecorder:path.resolve('./src/AudioRecorder/index.ts')
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
        extensions: ['.ts','.tsx','.js','.jsx']
    },
    module: {
        rules:[
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    }
}