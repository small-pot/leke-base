const path=require('path');
const {alias}=require('../resolveConfig');

module.exports=function (url,filePath) {
    let pathname=(()=>{
        for(let key in alias){
            if(url.indexOf(key+'/')===0){
                return alias[key]+url.replace(key,'');
            }
        }
        return path.resolve(path.dirname(filePath),url);
    })();
    return path.relative(process.cwd(),pathname)
        .replace(/(\/index)?(\.(jsx|tsx|js|ts))?$/,'')
        .replace(/(\\|\/)/g,'-');
};