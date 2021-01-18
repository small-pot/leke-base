import Component from '../component';
import { getTime } from '../../utils/share';

class TimeControl extends Component {
    control:any;
    current:any;
    duration:any;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        this.render();
        this.subscription();
    }
    render() {
        this.control = this.createEl('div', {
            innerHTML: `<span class="currentTime">${getTime(this.video.currentTime)}</span>/<span class="duration">${getTime(this.video.duration)}</span>`
        }, { class: 'video-time-wrap' });
        this.current = this.control.querySelector('.currentTime');
        this.duration = this.control.querySelector('.duration');
        this.el.appendChild(this.control);
        return this.control;
    }
    subscription() {
        this.event.on('startPlay', () => {
            this.current.innerText = getTime(0);
        });
        this.event.on('timeupdate', () => {
            this.updateCurrent();
        });
        this.event.on('ended', () => {
            this.updateCurrent();
        });
        this.event.on('loadedmetadata', () => {
            this.update();
        });
        this.event.on('timeChange', (time) => {
            this.current.innerText = getTime(time);
        });
    }
    updateCurrent() {
        this.current.innerText = getTime(this.video.currentTime);
    }
    update() {
        this.current.innerText = getTime(this.video.currentTime);
        this.duration.innerText = getTime(this.video.duration);
    }

}

export default TimeControl;