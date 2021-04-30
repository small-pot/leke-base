export const addMouseWheel = (ele,cb) => {
    ele.addEventListener('mousewheel',cb);
    ele.addEventListener('DOMMouseScroll', cb);
};

export const removeMouseWheel = (ele,cb) => {
    ele.removeEventListener('mousewheel',cb);
    ele.removeEventListener('DOMMouseScroll', cb);
};

/**返回根据tab方向的字段配置 */
export const returnTabPositionAttribute = (tabPosition) => {
    switch (tabPosition) {
    case 'top':
        return {
            length: 'clientWidth',
            start: 'offsetLeft',
            barStyle: (length, postion) => ({ width: length, left: postion }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    case 'bottom':
        return {
            length: 'clientWidth',
            start: 'offsetLeft',
            barStyle: (length, postion) => ({ width: length, left: postion }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    case 'left':
        return {
            length: 'clientHeight',
            start: 'offsetTop',
            barStyle: (length, postion) => ({ height: length, top: postion }),
            scroll: 'scrollHeight',
            transform: (scrollLength) => `translateY(${scrollLength}px)`
        };
    case 'right':
        return {
            length: 'clientHeight',
            start: 'offsetTop',
            barStyle: (length, postion) => ({ height: length, top: postion }),
            scroll: 'scrollHeight',
            transform: (scrollLength) => `translateY(${scrollLength}px)`
        };
    default:
        return {
            length: 'clientWidth',
            start: 'offsetLeft',
            barStyle: (length, postion) => ({ width: length, left: postion }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    }
};