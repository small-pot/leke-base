import Component from '../component';
import * as Dom from '../../utils/dom';
class Mask extends Component {
    mask:any;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        const instance = this.render();
        this.subscription();
        return instance;
    }
    subscription() {
        this.event.on('play', () => {
            if (this.mask) {
                this.el.removeChild(this.mask);
                this.mask = null;
            }
        });
        this.event.on('pause', () => {
            this.render();
        });
        this.event.on('ended', () => {
            if (!this.mask) {
                this.render();
            }
        });
    }
    render() {
        this.mask = this.createEl('div', {
            innerHTML: `<img class="paused-icon" src='https://static.leke.cn/scripts/AV/images/paused.png' />`
        }, { class: 'video-mask' });
        this.mask.addEventListener('click', () => {
            this.event.trigger('click',true);
        });        
        this.mask.addEventListener('dblclick', () => {
            this.event.trigger('dblclick');
        });
        this.el.appendChild(this.mask);
        return this.mask;
    }
}

export default Mask;