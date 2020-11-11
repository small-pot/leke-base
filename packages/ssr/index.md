## SSR脚手架
#### 使用 npm 或 yarn 安装
```
npm install @leke/ssr --save
yarn add @leke/ssr --save
```
## 启动
在package.json scripts中添加此配置
```
{
    "dev": "cross-env NODE_ENV=development leke dev",
    "build": "cross-env NODE_ENV=production leke build",
    "debug": "cross-env NODE_ENV=development leke debug"
}
```
## 配置
在nodejs运行目录下创建leke.config.js,配置大致如下：
```js
module.exports={
    cssModules:false,
    port:8888,
    entry:'./src/index.ts',
    proxy:{
        '/auth':{
            target:'https://webapp.leke.cn',
            changeOrigin:true
        }
    },
    browsers:[
        "last 2 versions",
        "ie >= 11"
    ],
    babel:function (env) {
        if(env==='client'){
            return {
                plugins:[
                    ["import",
                        {
                            libraryName: "@leke/rc",
                            libraryDirectory: "es",
                            camel2DashComponentName: false,
                            style(name) {
                                return `${name}/index.less`.replace('/es/','/style/');
                            }
                        }
                    ]
                ]
            };
        }
        return {};
    }
};
```

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| cssModules | 是否启用cssModules | boolean | false |
| port | 开发服务器端口号 | number | 8989 |
| entry | 入口文件路径| string | _ |
| proxy | 跨域代理配置，[配置详情](https://www.npmjs.com/package/http-proxy-middleware)| object | _ |
| browsers | 根据提供的浏览器进行js补丁与css前缀补全| Array | \[ "last 2 versions","ie >= 11" \] |
| babel | 额外增加的babel配置，例如按需加载插件| object \| (env:"client" \| "server")=>object | _ |
|postcssConfig| 自定义postcss-loader的配置，[配置详情](https://www.npmjs.com/package/postcss-loader)|object|css前缀补全|

## entry
```js
import start from "@leke/ssr";
export default start({
    publicPath:'/test',
    routes:[
        {
            path:'/demo',
            getComponent(){
                return import('./demo');
            }
        }
    ]
});
```
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| publicPath | 访问路径公共前缀 | string | _ |
| path | 访问的路径应为publicPath+path | string | _ |
| getComponent | 按需加载PageComponent | ()=>Promise<SSRpage> | _ |

## PageComponent
```js
import React from "react";

const PageComponent=function(props){
    return (
        <div>{props.text}</div> // hello
    );
};
PageComponent.getInitialData=async function (http,req,res) {
    return {
        text:'hello'
    };
};
export default PageComponent;
```

