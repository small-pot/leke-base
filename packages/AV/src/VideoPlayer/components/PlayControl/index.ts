import Component from '../component';
import './index.less';

class PlayerControl extends Component {
    control:any;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        this.render();
        this.subscription();
    }
    render() {
        this.control = this.createEl('div', {
            innerHTML: `<i class="resource-iconfont ${this.video.paused ? 'icon-icon_weikebofang' : 'icon-icon_weikezanting'}" />`
        }, { class: 'video-play-wrap' });
        this.el.appendChild(this.control);
        return this.control;
    }
    subscription() {
        this.control.addEventListener('click', () => {
            if (this.video.paused) {
                this.video.play();
            } else {
                this.video.pause();
            }
        });
        this.event.on('play', () => {
            this.update();
        });
        this.event.on('pause', () => {
            this.update();
        });
    }
    update() {
        this.control.querySelector('i').className = `resource-iconfont ${this.video.paused ? 'icon-icon_weikebofang' : 'icon-icon_weikezanting'}`;
    }

}

export default PlayerControl;