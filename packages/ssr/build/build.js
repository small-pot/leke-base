const webpack=require('webpack');
const clientWebpackConfig=require('./webpack/webpack.prod');
const serverWebpackConfig=require('./webpack/webpack.server');
const cluster=require('cluster');
const rimraf=require('rimraf');
rimraf.sync(clientWebpackConfig.output.path);
if (cluster.isMaster){
    const workerClient=cluster.fork();
    const workerServer=cluster.fork();
    workerClient.send('client');
    workerServer.send('server');
    let n=0;
    cluster.on('message', (worker, message, handle) => {
        n++;
        n===2&&cluster.disconnect();
    });
}else{
    process.on('message', msg => {
        if(msg==='client'){
            webpack(clientWebpackConfig,(err,stats)=>{
                if(err){
                    console.log(err);
                }else{
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n\n');
                }
                process.send('end');
            });
        }else{
            webpack(serverWebpackConfig,(err,stats)=>{
                if(err){
                    console.log(err);
                }else{
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n\n');
                }
                process.send('end');
            });
        }
    });
}