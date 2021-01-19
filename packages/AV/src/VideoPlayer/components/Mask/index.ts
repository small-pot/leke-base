import Component from '../component';

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
            innerHTML: `<img class="paused-icon" src='https://static.leke.cn/images/videoPlayer/paused.png' />`
        }, { class: 'video-mask' });
        this.mask.addEventListener('click', () => {
            this.video.play();
        });
        this.el.appendChild(this.mask);
        return this.mask;
    }
}

export default Mask;