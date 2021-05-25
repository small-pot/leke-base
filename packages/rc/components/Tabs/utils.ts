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
            length: 'offsetWidth',
            start: 'offsetLeft',
            barStyle: (length, postion) => ({ left: postion + length / 2 - 14 }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    case 'bottom':
        return {
            length: 'offsetWidth',
            start: 'offsetLeft',
            barStyle: (length, postion) => ({ left: postion + length / 2 - 14 }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    case 'left':
        return {
            length: 'offsetHeight',
            start: 'offsetTop',
            barStyle: (length, postion) => ({ top: postion + length / 2 - 14 }),
            scroll: 'scrollHeight',
            transform: (scrollLength) => `translateY(${scrollLength}px)`
        };
    case 'right':
        return {
            length: 'offsetHeight',
            start: 'offsetTop',
            barStyle: (length, postion) => ({ top: postion + length / 2 - 14 }),
            scroll: 'scrollHeight',
            transform: (scrollLength) => `translateY(${scrollLength}px)`
        };
    default:
        return {
            length: 'offsetWidth',
            start: 'offsetLeft',
            barStyle: (length, postion) => ({ left: postion + length / 2 - 14 }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    }
};