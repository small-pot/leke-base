import {initConfig} from './config';
export function getVideoSize(width,height){
    if(width&&height&&width>=initConfig.initWidth&&height>=initConfig.initHeight)return {width,height};
    if(width>=initConfig.initWidth&&height<initConfig.initHeight)return {width,height:initConfig.initHeight};
    if(height>=initConfig.initHeight&&width<initConfig.initWidth)return {width:initConfig.initWidth,height};
    return {width:initConfig.initWidth,height:initConfig.initHeight};
}

export function checkBrowser() {
    const userAgent = window.navigator.userAgent;
    const isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) {
        //判断是否Opera浏览器
        return 'Opera';
    }
    if (userAgent.indexOf('Firefox') > -1) {
        //判断是否Firefox浏览器
        return 'FF';
    }
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
        //判断是否Safari浏览器
        return 'Safari';
    }
    if (
        userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1 &&
        !isOpera
    ) {
        //判断是否IE浏览器
        return 'IE';
    }
    return null;
}

export const getTime = (seconds) => {
    if (!seconds) return '00:00';
    seconds = Math.ceil(seconds).toFixed(0);
    let hour:any = Math.floor(seconds / 3600);
    if (hour) {
        if (hour < 10) {
            hour = "0" + hour;
        }
    } else {
        hour = null;
    }

    let minute:any = Math.floor(seconds / 60);
    if (minute < 10) {
        minute = "0" + minute;
    }
    let second:any = seconds % 60;
    if (second < 10) {
        second = "0" + second;
    }
    return hour ? hour + ':' + minute + ":" + second : minute + ':' + second;
};

export function throttle(func, wait, options:any = {
    leading: false,
    trailing: false
}) {
    let args, context, result, prev = 0, timeout;
    let later = function () {
        prev = options.leading ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    let throttled = function (...arr) {
        let now = Date.now();
        if (!prev && options.leading) prev = now;
        let remaining = wait - (now - prev);
        context = this;
        args = arr;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            prev = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    return throttled;
}

export function entryFullscreen(ele:any) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    }
}

export function exitFullscreen() {
    const doc=document as any;
    if (doc.exitFullScreen) {
        doc.exitFullScreen();
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
    }
}

export function addFullscreenListener(listener) {
    document.addEventListener("webkitfullscreenchange", listener);
    document.addEventListener("mozfullscreenchange", listener);
    document.addEventListener("fullscreenchange", listener);
    document.addEventListener("MSFullscreenChange", listener);
}

export function removeFullscreenListener(listener) {
    document.removeEventListener("webkitfullscreenchange", listener);
    document.removeEventListener("mozfullscreenchange", listener);
    document.removeEventListener("fullscreenchange", listener);
    document.removeEventListener("MSFullscreenChange", listener);
}
