const path=require('path');
const express=require('express');
const webpack=require('webpack');
const serverConfig=require('./webpack/webpack.devServer');
const vm=require('vm');
const webpackDevMiddleware=require("webpack-dev-middleware");
const webpackHotMiddleware=require("webpack-hot-middleware");
const clientConfig=require('./webpack/webpack.dev.js');
const middleware=require('./middleware');
const {port}=require('./resolveConfig');

const app = express();
const compiler = webpack([clientConfig,serverConfig]);

compiler.hooks.done.tap("done", stats => {
    const info = stats.toJson();
    if (stats.hasErrors()) {
        return console.error(info.errors);
    }
});
app.use(webpackDevMiddleware(compiler, {
    serverSideRender:true
}));
app.use(webpackHotMiddleware(compiler.compilers.find(item => item.name === 'client'), {
    path:'/ssr/__hot',
    reload:true,
    noInfo:true
}));
middleware(app);
app.use((req, res,next) => {
    const { devMiddleware } = res.locals.webpack;
    const outputFileSystem = devMiddleware.outputFileSystem;
    const [clientStats,serverStats] = devMiddleware.stats.toJson().children;
    const { namedChunkGroups, publicPath } = clientStats;
    const renderStr=outputFileSystem.readFileSync(path.join(serverStats.outputPath,'server-entry.js'))
    const sandbox = {
        console,
        module,
        require
    };
    vm.runInNewContext(renderStr, sandbox);
    sandbox.module.exports.default(req, res,next, { namedChunkGroups, publicPath });
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