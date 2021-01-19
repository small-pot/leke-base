import * as Dom from '../../utils/dom';
declare class Slider {
    el: any;
    options: any;
    container: any;
    rail: any;
    buffer: any;
    track: any;
    step: any;
    handle: any;
    isDrag: boolean;
    onMouseDown: () => void;
    onTouchMove?: (step: number) => void;
    onTouchEnd: (step: number) => void;
    constructor(el: any, options: any);
    createEl: typeof Dom.createEl;
    init(): any;
    render(): any;
    subscription(): void;
}
export default Slider;
