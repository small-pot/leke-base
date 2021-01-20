import Component from '../component';
import Slider from '../Slider';

class Control extends Component {
    control:any;
    container:any;
    iconWrap:any;
    icon:any;
    volumeNum:any;
    sliderContainer:any;
    slider:any;
    preVolume:number;
    prevState:number;
    flag:boolean;

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        this.preVolume = this.video.volume*100;
        const instance = this.render();
        this.subscription();
        return instance;
    }

    render() {
        this.control = this.createEl('div', {}, { class: 'video-volume-wrap' });
        this.container = this.createEl('div', {}, { class: 'video-volume-container' });
        this.iconWrap = this.createEl('div', {}, { class: `volume-icon` });
        this.icon = this.createEl('i', {}, { class: `video-icon ${!this.video.volume ? 'icon_jingyin' : 'icon_shengyin'}` });
        this.volumeNum = this.createEl('div', { innerText: this.video.volume * 100 }, { class: 'volume-num' });
        this.sliderContainer = this.createEl('div', {}, { class: 'volume-slider-container' });
        this.slider = this.getSlider();
        this.iconWrap.appendChild(this.icon);
        this.container.appendChild(this.volumeNum);
        this.container.appendChild(this.sliderContainer);
        this.control.appendChild(this.container);
        this.control.appendChild(this.iconWrap);
        this.el.appendChild(this.control);
        return this.control;
    }

    getSlider() {
        return new Slider(this.sliderContainer, {
            vertical: true,
            defaultValue: this.video.volume * 100,
            onMouseDown: () => {
                this.event.trigger('volumeDragStart');
            },
            onTouchMove: (step) => {
                this.event.trigger('volumeChange', parseInt(step));
            },
            onTouchEnd: (step) => {
                this.event.trigger('volumeChange', parseInt(step));
                this.event.trigger('volumeDragEnd');
            }
        });
    }

    subscription() {
        this.event.on('volumeState',(fn)=>{
            this.event.on('volumeStateCallback',fn);
        });
        this.iconWrap.addEventListener('click', () => {
            if (!this.video.volume) {
                this.event.trigger('volumeChange', this.preVolume);
            } else {
                this.event.trigger('volumeChange', 0);
            }
        });
        this.event.on('volumeChange', (step) => {
            this.volumeNum.innerText = step;
            this.video.volume = step / 100;
            this.updateSlider(step);
            if (Number(step) === 0) {
                this.video.muted = true;
                this.icon.className = 'video-icon icon_jingyin';
            } else {
                this.video.muted = false;
                this.icon.className = 'video-icon icon_shengyin';
            }
        });
        this.event.on('volumeDragStart', () => {
            this.container.style.display = 'flex';
        });
        this.event.on('volumeDragEnd', () => {
            this.container.style.display = '';
        });
        this.sliderContainer.addEventListener('click', (e) => {
            const height = this.slider.rail.clientHeight;
            const scaleY = this.slider.rail.getBoundingClientRect().bottom - e.clientY;
            let step;
            if (scaleY / height > 1) {
                step = 100;
            } else if (scaleY / height < 0) {
                step = 0;
            } else {
                step = (scaleY / height * 100).toFixed(0);
            }
            this.event.trigger('volumeChange',parseInt(step));
            this.preVolume=parseInt(step);
        });
    }
    shouldUpdate(step){
        return this.event.getListener('volumeStateCallback')?
            this.prevState===step:
            true;
    }
    updateSlider(step) {
        this.slider.track.style.height = `${step}%`;
        this.slider.step.style.height = `${step}%`;
        this.slider.handle.style.bottom = `${step}%`;
    }

}

export default Control;