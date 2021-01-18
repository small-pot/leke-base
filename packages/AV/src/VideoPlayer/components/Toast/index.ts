import Component from '../component';
import './index.less';

class Toast extends Component {
    constructor(el,video,event){
        super(el,video,event);
    }
    
    init() {
        return this.render();
    }
    render() {
        const toast = this.createEl('div', {
            innerHTML: `按<span>Esc</span>即可退出全屏模式`
        }, { class: 'video-fullscreen-toast' });
        this.el.appendChild(toast);
        setTimeout(() => {
            this.el.removeChild(toast);
        }, 2000);
        return toast;
    }
}

export default Toast;