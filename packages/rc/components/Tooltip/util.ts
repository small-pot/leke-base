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

export function setPopupPosition(popup:HTMLElement, trigger:HTMLElement, placement:placementType) {
    const top = popup.offsetTop;
    const left = popup.offsetLeft;
    const triggerWidth = trigger.offsetWidth;
    const triggerHeight = trigger.offsetHeight;
    const topAndBottom = triggerWidth / 2 - 24;
    const leftAndRight = triggerHeight / 2 - 16;
    switch (placement) {
    case "topLeft":
        popup.style.left = left + topAndBottom + 'px';
        break;
    case "topRight":
        popup.style.left = left - topAndBottom + 'px';
        break;
    case "bottomLeft":
        popup.style.left = left + topAndBottom + 'px';
        break;
    case "bottomRight":
        popup.style.left = left - topAndBottom + 'px';
        break;
    case "leftTop":
        popup.style.top = top + leftAndRight + 'px';
        break;
    case "leftBottom":
        popup.style.top = top - leftAndRight + 'px';
        break;
    case "rightTop":
        popup.style.top = top + leftAndRight + 'px';
        break;
    case "rightBottom":
        popup.style.top = top - leftAndRight + 'px';
        break;
    }
}