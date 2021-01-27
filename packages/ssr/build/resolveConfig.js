const fs=require('fs');
const path=require('path');
const rootDir=process.cwd();
const alias={};
const name=require(rootDir+'/package.json').name;

const configPath=path.resolve(rootDir, './leke.config.js');
let config={
    publicPath:'/lib/'+name,
    cssModules: false,
    port:9999,
    browsers:[
        "last 2 versions",
        "ie >= 11"
    ]
};
if(fs.existsSync(configPath)){
    const setting=require(configPath);
    Object.assign(alias,setting.alias);
    Object.assign(config,setting,{alias});
}
const {publicPath,entry}=config;
if(!/\/$/.test(publicPath)){
    config.publicPath=publicPath+'/';
}
config.resolveEntry=(...arg)=>{
    const absolute=path.isAbsolute(entry)?entry:path.join(rootDir,entry);
    return [absolute,...arg];
};
module.exports=config;