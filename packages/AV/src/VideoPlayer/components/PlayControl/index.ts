import Component from '../component';

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
            innerHTML: `<i class="video-icon ${this.video.paused ? 'icon_weikebofang' : 'icon_weikezanting'}" />`
        }, { class: 'video-play-wrap' });
        this.el.appendChild(this.control);
        return this.control;
    }
    subscription() {
        this.control.addEventListener('click', () => {
            if(!this.event.getListener('pausedStateCallback').length){
                this.video.paused?this.video.play():this.video.pause();
            }else{
                this.event.trigger('pausedStateCallback',!this.video.paused);
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
        this.control.querySelector('i').className = `video-icon ${this.video.paused ? 'icon_weikebofang' : 'icon_weikezanting'}`;
    }

}

export default PlayerControl;