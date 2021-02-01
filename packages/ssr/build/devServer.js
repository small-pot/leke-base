const path=require('path');
const express=require('express');
const webpack=require('webpack');
const serverConfig=require('./webpack/webpack.devServer');
const MFS=require('memory-fs');
const vm=require('vm');
const webpackDevMiddleware=require("webpack-dev-middleware");
const webpackHotMiddleware=require("webpack-hot-middleware");
const clientConfig=require('./webpack/webpack.dev.js');
const middleware=require('./middleware');
const cluster=require('cluster');
const {port}=require('./resolveConfig');
if (cluster.isMaster){
    cluster.fork();
    const app = express();
    let resource,render;
    const clientCompiler = webpack(clientConfig);
    clientCompiler.hooks.done.tap("done", stats => {
        const info = stats.toJson();
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        if (stats.hasErrors()) {
            return console.error(info.errors);
        }
        resource=JSON.parse(clientCompiler.outputFileSystem.readFileSync(path.join(clientCompiler.outputPath,'resource.json'),'utf-8'));
    });
    app.use(webpackDevMiddleware(clientCompiler, {
        logLevel:'error',
        publicPath: clientConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(clientCompiler, {
        path:'/ssr/__hot',
        publicPath: clientConfig.output.publicPath,
        reload:true,
        noInfo:true
    }));
    middleware(app);
    app.use((req, res,next) => {
        resource&&render&&render(req, res,next, resource);
    });
    app.use(function(err, req, res, next) {
        console.log(err);
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        let {status,config,headers}=err;
        if(config&&headers){ //接口请求失败
            return res.status(500).end(`request failed to ${config.url}`);
        }
        if(status===404){
            return res.status(404).end('匹配不到路由');
        }
        res.status(500).end(err.toString());
    });
    app.listen(port, function () {
        console.log("成功启动：localhost:" + port);
    });
    process.on('uncaughtException', function (err) {
        console.log(err);
    });
    cluster.on('message', (worker, renderStr, handle) => {
        const sandbox = {
            console,
            module,
            require
        };
        vm.runInNewContext(renderStr, sandbox);
        render = sandbox.module.exports.default;
    });
}else{
    const mfs = new MFS();
    const serverCompiler = webpack(serverConfig);
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) return console.error(err);
        const renderStr = mfs.readFileSync(path.join(serverConfig.output.path, serverConfig.output.filename), 'utf-8');
        process.send(renderStr);
    });
}