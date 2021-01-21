const initConfig = {
    initWidth: 638,
    initHeight: 358
};
export function getVideoSize(width,height){
    if(width&&height&&width>=initConfig.initWidth&&height>=initConfig.initHeight)return [width,height];
    if(width>=initConfig.initWidth&&height<initConfig.initHeight)return [width,initConfig.initHeight];
    if(height>=initConfig.initHeight&&width<initConfig.initWidth)return [initConfig.initWidth,height];
    return [initConfig.initWidth,initConfig.initHeight];
}