const path=require('path');
const {cssModules,browsers,babel}=require('../resolveConfig');

function merge (opt1,opt2){
    const keys={};
    opt1.forEach(item=>{
        const key=Array.isArray(item)?item[0]:item;
        if(!keys[key]){
            keys[key]=true;
        }
    });
    opt2.forEach(item=>{
        const key=Array.isArray(item)?item[0]:item;
        if(!keys[key]){
            keys[key]=true;
            opt1.push(item);
        }
    });
}
module.exports= function (env='client', isTs=false) {
    const presets=["@babel/preset-react"];
    const plugins=[
        "@babel/plugin-proposal-class-properties"
    ];
    if(env==='client'){
        presets.push([
            "@babel/preset-env",
            {
                targets:{
                    browsers
                },
                useBuiltIns:'entry',
                corejs:3
            }
        ]);
        plugins.push(
            "@babel/plugin-transform-runtime",
            [path.resolve(__dirname,'./plugin-dynamic-import.js')]
        );
    }else{
        presets.push([
            "@babel/preset-env",
            {
                loose: true,
                targets:{
                    node:'current'
                }
            }
        ]);
        plugins.push([path.resolve(__dirname,'./plugin-dynamic-import-node.js')]);
        !cssModules&&plugins.push([path.resolve(__dirname,'./plugin-node-style.js')]);
    }
    if(process.env.NODE_ENV==='production'){
        plugins.push("babel-plugin-transform-react-remove-prop-types");
    }
    if(isTs){
        presets.push('@babel/preset-typescript');
    }
    const resolveConfig=typeof babel==='function'?babel(env):babel;
    if(Object.prototype.toString.call(resolveConfig)==="[object Object]"){
        merge(presets,resolveConfig.presets||[]);
        merge(plugins,resolveConfig.plugins||[]);
    }
    return Object.assign({cacheDirectory:true},resolveConfig,{babelrc:false,presets,plugins});
};