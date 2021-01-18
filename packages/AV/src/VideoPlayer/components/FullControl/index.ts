import Component from '../component';
import { addFullscreenListener,removeFullscreenListener } from '../../utils/share';
import './index.less';

class FullControl extends Component {
    control: any; 
    icon: any; 
    isFullscreen: boolean; 

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        this.render();
        this.subscription();
    }

    render() {
        this.control = this.createEl('div', {}, { class: 'video-fullscreen-container' });
        this.icon = this.createEl('i', {}, { class: 'resource-iconfont icon-icon_quanping' });
        this.control.appendChild(this.icon);
        this.el.appendChild(this.control);
        return this.control;
    }
    subscription() {
        this.control.addEventListener('click', () => {
            if (this.isFullscreen === true) {
                this.event.trigger('exitFullscreen');
            } else {
                this.event.trigger('entryFullscreen');
            }
        });
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            this.icon.className = 'resource-iconfont icon-icon_tuichuquanping';
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            this.icon.className = 'resource-iconfont icon-icon_quanping';
        });

        // 监听退出
        const fullListener = () => {
            const doc=document as any;
            if (
                !doc.webkitIsFullScreen &&
                !doc.mozFullScreen &&
                !doc.msFullscreenElement
            ) {
                this.event.trigger('exitFullscreen');
            }
        };
        addFullscreenListener(fullListener);
        this.event.on('destory', () => {
            removeFullscreenListener(fullListener);
        });
    }
    update() {

    }

}

export default FullControl;