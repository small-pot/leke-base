const path=require('path');
const {cssModules,browsers,babelConfig}=require('../resolveConfig');

module.exports= function (target='web') {
    const presets=["@babel/preset-react","@babel/preset-typescript"];
    const plugins=[
        "@babel/plugin-proposal-class-properties"
    ];
    if(target==='web'){
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
    const config={
        cacheDirectory:true,
        babelrc:false,
        presets,
        plugins
    };
    if(typeof babelConfig==='function'){
        babelConfig(config,target);
    }
    return config;
};