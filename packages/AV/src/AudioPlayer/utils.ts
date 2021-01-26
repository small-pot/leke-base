/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-14 14:08:52
 * @LastEditTime: 2021-01-26 11:28:26
 */

export const str2dom =(str:string)=>{
    const $outer = document.createElement('div');
    $outer.innerHTML=str;
    return $outer.children;
};

export const formatTime =(duration:number,formatFn?:(duration:number)=>string)=>{
    if (formatFn) {
        return formatFn(duration);
    }
    if (duration===Infinity || !duration) {
        duration = 0;
    }
    const minutes =Math.floor(duration/60); 
    const seconds = Math.floor(duration%60);
    return minutes +'\''+(seconds<10?`0${seconds}`:seconds)+'"';
};


// Hack 解决谷歌下部分音频长度为 Infinity 的情况 
// https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
export const getDuration = function (url, cb) {
    const tempPlayer = new Audio(url);
    tempPlayer.addEventListener("durationchange", function (e) {
        if (this.duration!=Infinity) {
            const duration = this.duration;
            tempPlayer.remove();
            cb(duration);
        };
    }, false);      
    tempPlayer.load();
    tempPlayer.currentTime = 24*60*60; //fake big time
    tempPlayer.volume = 0;
    // 兼容FF
    tempPlayer.play().catch(()=>{});
};