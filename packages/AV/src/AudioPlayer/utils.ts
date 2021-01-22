/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-14 14:08:52
 * @LastEditTime: 2021-01-18 17:33:37
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
    duration = duration || 0;
    const minutes =Math.floor(duration/60); 
    const seconds = Math.floor(duration%60);
    return minutes +'\''+(seconds<10?`0${seconds}`:seconds)+'"';
};