import Component from '../component';

class Tooltip extends Component { 
    control:any;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        return this.render();
    }
    render() {
        this.control = this.createEl('div', { innerHTML: '<span></span>' }, { class: 'video-tooltip' });
        this.el.appendChild(this.control);
        return this.control;
    }
}

export default Tooltip;