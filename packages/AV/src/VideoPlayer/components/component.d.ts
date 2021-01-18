import * as Dom from '../utils/dom';
declare class Component {
    el: any;
    video: any;
    event: any;
    constructor(el: any, video: any, event: any);
    createEl: typeof Dom.createEl;
}
export default Component;
