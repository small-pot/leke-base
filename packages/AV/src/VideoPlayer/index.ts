
import { newUID } from './utils/uid';
import Hls from 'hls.js';
import EventBase from './utils/event';
import * as Dom from './utils/dom';
import { VIDEO_EVENTS } from './utils/config';
import Loading from './components/Loading';
import Mask from './components/Mask';
import ControlBar from './components/ControlBar';
import Unsupport from './components/Unsupport';
import Toast from './components/Toast';
import Error from './components/Error';
import { getVideoSize,checkBrowser, throttle, entryFullscreen, exitFullscreen } from './utils/share';

class Player {
    uid: number;
    options:any;
    browser:string;
    event:any;
    loading:boolean;
    loadingTimer:any;
    isFullscreen:boolean;
    el:any;
    mountNode:any;
    video:any;
    input:any;
    mask:any;
    control:any;
    closeLoading:()=>void;

    constructor(options) {
        const {el,...opts}=options;
        this.uid = newUID();
        this.mountNode=el;
        const {width,height}=getVideoSize(options.width,options.height);
        this.options = {
            ...opts,
            width,
            height
        };
        this.browser = checkBrowser();
        this.event = new EventBase();
        this.loading = false;
        this.loadingTimer = null;
        this.closeLoading = () => { };
        this.isFullscreen =false;
        this.init();
    }

    createEl = Dom.createEl

    init() {
        this.validate();
        this.el = this.createEl('div', {}, { class: 'video-root-container', style: `width:${this.options.width}px;height:${this.options.height}px;` });
        this.mountNode.appendChild(this.el);
        this.isHlsSupported();
    }

    validate() {
        if (!this.mountNode) return console.error('请传入挂载实例');
        if (!this.options.src) return console.error('请传入视频路径');
    }

    isHlsSupported() {
        if (Hls.isSupported()) {
            this.renderVideo();
            const hls = new Hls();
            hls.loadSource(this.options.src);
            hls.attachMedia(this.video);
            hls.on(Hls.Events.ERROR, (err) => {
                if (!this.loading) {
                    this.loading = true;
                    this.closeLoading = this.renderLoading();
                    console.error(err);
                }
            });
            hls.on(Hls.Events.FRAG_LOADING, () => {
                if (!this.loading) {
                    this.loadingTimer = setTimeout(() => {
                        clearTimeout(this.loadingTimer);
                        this.loading = true;
                        this.closeLoading = this.renderLoading();
                    }, 1000);
                }
            });
            hls.on(Hls.Events.BUFFER_CREATED, () => {
                if (!this.loading) {
                    this.loading = true;
                    this.closeLoading = this.renderLoading();
                }
            });
            hls.on(Hls.Events.FRAG_BUFFERED, () => {
                this.loadingTimer && clearTimeout(this.loadingTimer);
                this.unLoading();
            });
            hls.on(Hls.Events.BUFFER_APPENDED, () => {
                this.loadingTimer && clearTimeout(this.loadingTimer);
                this.unLoading();
            });
        } else {
            this.renderUnsupport();
        }
    }

    renderVideo() {
        const autoplay = this.options.autoplay ? this.browser === 'FF' ? false : true : false; // 火狐无法自动播放
        const config:any = {
            src: this.options.src
        };
        if (autoplay) {
            config.autoplay = 'autoplay';
        }
        if (this.options.loop) {
            config.loop = 'loop';
        }
        this.video = this.createEl('video', {}, config);
        this.input = this.createEl('input', {}, { id: `video-input-${this.uid}`, class: 'video-input' });
        this.el.appendChild(this.input);
        this.el.appendChild(this.video);
        this.subscription();
        this.mask = new Mask(this.el, this.video, this.event).init();
        this.control = new ControlBar(this.el, this.video, this.event).init();
        setTimeout(()=>{
            this.event.trigger('ready');
        });
    }

    renderUnsupport() {
        new Unsupport(this.el,this.video,this.event).init();
    }

    renderError() {
        new Error(this.el,this.video,this.event).init();
    }


    renderToast() {
        new Toast(this.el,this.video,this.event).init();
    }

    renderLoading() {
        let loading = new Loading(this.el,this.video,this.event).init();
        return () => {
            this.el.removeChild(loading);
            loading = null;
        };
    }

    unLoading() {
        if (this.loading) {
            this.loading = false;
            this.closeLoading();
            this.closeLoading = () => { };
        }
    }

    subscription() {
        this.event.on('pausedState',(fn)=>{
            this.event.on('pausedStateCallback',fn);
        });
        this.event.on('fullscreenState',(fn)=>{
            this.event.on('fullscreenStateCallback',fn);
        });
        VIDEO_EVENTS.forEach(action => {
            this.video.addEventListener(action, () => {
                this.event.trigger(action);
            });
        });
        this.video.addEventListener('click', () => {
            this.event.trigger('click',true);
        });
        this.el.addEventListener('click', () => {
            this.event.trigger('containerClick');
        });
        this.video.addEventListener('play', () => {
            this.event.trigger('play');
            if (this.video.currentTime === 0) {
                this.event.trigger('start');
            }
        });
        this.video.addEventListener('pause', () => {
            this.event.trigger('pause');
        });
        const fn = throttle((time) => { this.event.trigger('timeupdate',time); }, 1000, { leading: true });
        this.video.addEventListener('timeupdate', () => {
            fn(this.video.currentTime);
        });

        this.event.on('click', (paused) => {
            if(!this.event.getListener('pausedStateCallback')){
                paused?this.event.trigger('pause'):this.event.trigger('play');
            }else{
                this.event.trigger('pausedStateCallback',paused);
            }
        });
        // this.event.on('dblclick', () => {
        //     if(this.isFullscreen){
        //         this.event.trigger('exitFullscreen');
        //     }else{
        //         this.event.trigger('entryFullscreen');
        //     }
        // });
        this.event.on('containerClick', () => {
            this.input.focus();
        });
        this.event.on('ready', () => {
            if (this.options.muted) {
                this.video.defaultMuted = true;
                this.event.trigger('volumeChange', 0);
            }
        });
        this.event.on('error', (err) => {
            console.error(err);
            this.renderError();
        });
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            entryFullscreen(this.el);
            Dom.addClass(this.el, 'full-video-container');
            if (this.browser === 'IE') {
                this.renderToast();
            }
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            exitFullscreen();
            Dom.removeClass(this.el, 'full-video-container');
        });
        // 空格符控制暂停/播放
        const keyDown = e => {
            if (e.keyCode === 32) {
                e.preventDefault();
                const activeId = document.activeElement.id;
                if (activeId === `video-input-${this.uid}`) {
                    this.video.paused ? this.video.play() : this.video.pause();
                }
            }
        };
        document.body.addEventListener('keydown', keyDown);
        this.event.on('destory', () => {
            document.body.removeEventListener('keydown', keyDown);
        });
    }

    addEventListener(type , listener){
        this.event.on(type , listener);
    }
    on(type , listener){
        this.event.on(type , listener);
    }
    addListener(type , listener){
        this.event.on(type , listener);
    }
    removeEventListener(type , listener){
        this.event.off(type , listener);
    }
    off(type , listener){
        this.event.off(type , listener);
    }
    removeListener(type , listener){
        this.event.off(type , listener);
    }
    getListener(type){
        return this.event.getListener(type);
    }
    trigger(...args){
        this.event.trigger(...args);
    }
    destory(){
        this.event.trigger('destory');
    }
}

export default Player;