import Component from '../component';
import PlayerControl from '../PlayControl';
import TimerControl from '../TimeControl';
import ProcessControl from '../ProcessControl';
import VolumeControl from '../VolumeControl';
import FullControl from '../FullControl';
import * as Dom from '../../utils/dom';
import './index.less';

class Control extends Component {
    control: any; 

    constructor(el,video,event){
        super(el,video,event);
    }
    
    init() {
        const instance = this.render();
        this.subscription();
        return instance;
    }

    render() {
        this.control = this.createEl('div', {}, { class: 'video-control-bar' });
        new PlayerControl(this.control, this.video, this.event).init();
        new TimerControl(this.control, this.video, this.event).init();
        new ProcessControl(this.control, this.video, this.event).init();
        new VolumeControl(this.control, this.video, this.event).init();
        new FullControl(this.control, this.video, this.event).init();
        this.el.appendChild(this.control);
        return this.control;
    }

    subscription() {
        this.event.on('play', () => {
            this.control.style.opacity = '';
        });
        this.event.on('pause', () => {
            this.control.style.opacity = 1;
        });
        this.event.on('entryFullscreen', () => {
            Dom.addClass(this.control, 'full-video-control-bar');
        });
        this.event.on('exitFullscreen', () => {
            Dom.removeClass(this.control, 'full-video-control-bar');
        });
    }
}

export default Control;