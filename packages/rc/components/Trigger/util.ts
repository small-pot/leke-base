export type placementType=
    'topLeft'|
    'topCenter'|
    'topRight'|
    'bottomLeft'|
    'bottomCenter'|
    'bottomRight'|
    'leftTop'|
    'leftCenter'|
    'leftBottom'|
    'rightTop'|
    'rightCenter'|
    'rightBottom'

function getPosition(trigger:HTMLElement,container:HTMLElement) {
    let left=0,top=0;
    let offsetElement=trigger;
    while (offsetElement&&offsetElement!==container){
        left+=offsetElement.offsetLeft;
        top+=offsetElement.offsetTop;
        offsetElement=offsetElement.offsetParent as HTMLElement;
    }
    return {
        left,
        top,
        bottom:top+trigger.offsetHeight,
        right:left+trigger.offsetWidth
    };
}
export function setPopupPosition(popup:HTMLElement,trigger:HTMLElement,container:HTMLElement,placement:placementType) {
    const {top,bottom,left,right}=getPosition(trigger,container);
    switch (placement) {
    case "topLeft":
        popup.style.top = top  - popup.offsetHeight + 'px';
        popup.style.left = left + 'px';
        break;
    case "topRight":
        popup.style.top = top  - popup.offsetHeight + 'px';
        popup.style.left=left+trigger.offsetWidth-popup.offsetWidth + 'px';
        break;
    case "topCenter":
        popup.style.top = top  - popup.offsetHeight + 'px';
        popup.style.left = (trigger.offsetWidth-popup.offsetWidth)/2+left + 'px';
        break;
    case "bottomLeft":
        popup.style.top = bottom + 'px';
        popup.style.left = left + 'px';
        break;
    case "bottomRight":
        popup.style.top = bottom + 'px';
        popup.style.left=left+trigger.offsetWidth-popup.offsetWidth + 'px';
        break;
    case "bottomCenter":
        popup.style.top = bottom + 'px';
        popup.style.left = (trigger.offsetWidth-popup.offsetWidth)/2+left + 'px';
        break;
    case "leftTop":
        popup.style.top = top + 'px';
        popup.style.left = left-popup.offsetWidth + 'px';
        break;
    case "leftCenter":
        popup.style.top = (trigger.offsetHeight-popup.offsetHeight)/2+top + 'px';
        popup.style.left = left-popup.offsetWidth + 'px';
        break;
    case "leftBottom":
        popup.style.top = bottom  - popup.offsetHeight + 'px';
        popup.style.left = left-popup.offsetWidth + 'px';
        break;
    case "rightTop":
        popup.style.top = top + 'px';
        popup.style.left = right + 'px';
        break;
    case "rightCenter":
        popup.style.top = (trigger.offsetHeight-popup.offsetHeight)/2+top + 'px';
        popup.style.left = right + 'px';
        break;
    case "rightBottom":
        popup.style.top = bottom  - popup.offsetHeight + 'px';
        popup.style.left = right + 'px';
        break;
    }
}