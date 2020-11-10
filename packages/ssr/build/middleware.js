const cookieParser=require('cookie-parser');
const { createProxyMiddleware }=require('http-proxy-middleware');
const {proxy={}}=require('./resolveConfig');
module.exports=function (app) {
    app.use(cookieParser());
    for(let key in proxy){
        app.use(createProxyMiddleware(key,proxy[key]));
    }
};