import Component from '../component';
import Tooltip from './tooltip';
import Slider from '../Slider';
import { getTime } from '../../utils/share';

class PlayerControl extends Component {
    tooltip:any;
    slider:any;
    control:any;
    isDrag:boolean;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        this.render();
        this.subscription();
    }
    render() {
        this.control = this.createEl('div', {}, { class: 'video-progress-wrap' });
        this.tooltip = new Tooltip(this.control, this.video, this.event).init();
        this.slider = new Slider(this.control, {
            onMouseDown: () => {
                this.event.trigger('processDragStart');
            },
            onTouchEnd: (step) => {
                this.event.trigger('processDragEnd');
                this.event.trigger('timeChange', step);
            }
        });
        this.el.appendChild(this.control);
        return this.control;
    }
    subscription() {
        this.event.on('timeupdate', () => {
            this.update();
        });
        this.event.on('ended', () => {
            this.update();
        });
        this.event.on('start', () => {
            this.updateSlider(0);
        });
        this.event.on('processDragStart', () => {
            this.isDrag = true;
            this.slider.track.style.display = 'none';
            this.slider.step.style.display = 'block';
        });
        this.event.on('processDragEnd', () => {
            this.isDrag = false;
            this.slider.track.style.display = 'block';
            this.slider.step.style.display = 'none';
        });
        this.event.on('timeChange', (step) => {
            this.updateSlider(step);
            this.video.currentTime = step / 100 * this.video.duration;
        });
        // 点击进度条进度跳转
        this.control.addEventListener('click', (e) => {
            const scaleX = e.clientX - this.slider.rail.getBoundingClientRect().left;
            const width = this.slider.rail.clientWidth;
            if (scaleX / width > 1) return;
            const step = (scaleX / width * 100).toFixed(2);
            this.event.trigger('timeChange', step);
        });

        // tooltip  mouseEnter mouseMove mouseLeave监听
        const mouseMove = e => {
            const scaleX = e.clientX - this.control.getBoundingClientRect().left;
            const width = this.control.clientWidth;
            if (scaleX / width <= 1 && scaleX / width >= 0) {
                if (this.tooltip.style.display !== `block`)
                    this.tooltip.style.display = `block`;
                this.tooltip.style.left = `${scaleX}px`;
                this.tooltip.querySelector('span').innerText = getTime((scaleX / width) * this.video.duration);
            } else {
                if (this.tooltip.style.display !== `none`) {
                    this.tooltip.style.display = `none`;
                }
            }
        };
        this.control.addEventListener('mouseenter', () => {
            if (this.tooltip.style.display !== 'block') {
                this.tooltip.style.display = 'block';
            }
            this.control.addEventListener('mousemove', mouseMove);
        });
        this.control.addEventListener('mouseleave', () => {
            if (this.tooltip.style.display !== 'none') {
                this.tooltip.style.display = 'none';
            }
            this.control.removeEventListener('mousemove', mouseMove);
        });
    }
    update() {
        const { buffered, duration, currentTime } = this.video;
        if (buffered.length) {
            this.slider.buffer.style.width = `${(buffered.end(buffered.length - 1) / duration) * 100}%`;
        }
        if (this.isDrag === true) return;
        const step = (currentTime / duration * 100).toFixed(2);
        this.updateSlider(step);
    }
    updateSlider(step) {
        this.slider.track.style.width = `${step}%`;
        this.slider.step.style.width = `${step}%`;
        this.slider.handle.style.left = `${step}%`;
    }

}

export default PlayerControl;