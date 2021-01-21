import * as Dom from '../utils/dom';

class Component {
    el: any;
    video: any;
    event: any;
    constructor(el, video, event) {
        this.el = el;
        this.video = video;
        this.event = event;
    }
    createEl = Dom.createEl
}

export default Component;