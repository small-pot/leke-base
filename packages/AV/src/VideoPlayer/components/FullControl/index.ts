import Component from '../component';
import { addFullscreenListener,removeFullscreenListener } from '../../utils/share';

class FullControl extends Component {
    control: any; 
    icon: any; 
    isFullscreen: boolean; 
    stateCallback:(isFullscreen:boolean)=>void;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        this.render();
        this.subscription();
    }

    render() {
        this.control = this.createEl('div', {}, { class: 'video-fullscreen-container' });
        this.icon = this.createEl('i', {}, { class: 'video-icon icon_quanping' });
        this.control.appendChild(this.icon);
        this.el.appendChild(this.control);
        return this.control;
    }
    
    subscription() {
        this.control.addEventListener('click', () => {
            if(!this.event.getListener('fullscreenStateCallback').length){
                this.isFullscreen?this.event.trigger('exitFullscreen'):this.event.trigger('entryFullscreen');
            }else{
                this.event.trigger('fullscreenStateCallback',!this.isFullscreen);
            }
        });
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            this.icon.className = 'video-icon icon_tuichuquanping';
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            this.icon.className = 'video-icon icon_quanping';
        });

        // 监听退出
        const fullListener = () => {
            const doc=document as any;
            if (
                !doc.webkitIsFullScreen &&
                !doc.mozFullScreen &&
                !doc.msFullscreenElement
            ) {
                if(!this.event.getListener('fullscreenStateCallback').length){
                    this.event.trigger('exitFullscreen');
                }else{
                    this.isFullscreen&&this.event.trigger('fullscreenStateCallback',!this.isFullscreen);
                }
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