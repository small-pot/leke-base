import Hls from 'hls.js';
import { newUID } from './utils/uid';
import EventBase from './utils/event';
import * as Dom from './utils/dom';
import { VIDEO_EVENTS } from './utils/config';
import { getVideoSize, checkBrowser,getResourceType, throttle, entryFullscreen, exitFullscreen } from './utils/share';
import Control from './components/ControlBar';
import txt from 'raw-loader!./template.html';

class Player {
    private uid: number;
    private width: number;
    private height: number;
    private options: any;
    private browser: string;
    private event: any;
    private template: string;
    private loadingFlag: boolean;
    private loadingTimer: any;
    private isFullscreen: boolean;
    private mountNode: any;
    private el: any;
    private input: any;
    private video: any;
    private loading: any;
    private mask: any;
    private control: any;
    private toast: any;
    private error: any;
    private proxyPausedChange:(boolean)=>void

    constructor(options) {
        const { el, ...opts } = options;
        this.uid = newUID();
        this.mountNode = el;
        const { width, height } = getVideoSize(options.width, options.height);
        this.width = width;
        this.height = height;
        this.options = {
            ...opts,
        };
        this.browser = checkBrowser();
        this.event = new EventBase();
        this.loadingFlag = false;
        this.loadingTimer = null;
        this.isFullscreen = false;
        this.template = txt;
        this.init();
    }

    init() {
        require('./index.less');
        this.validate();
        this.isSupported();
    }

    validate() {
        if (!this.mountNode) return console.error('请传入挂载实例');
        if (!this.options.src) return console.error('请传入视频路径');
    }

    isSupported() {
        const type=getResourceType(this.options.src);
        if(['M3U8','MP4','WEBM','OGG'].includes(type)){
            if(type==='M3U8'&&!Hls.isSupported()){
                this.mountNode.innerHTML = `<div class="video-unsupport" style="width:${this.width}px;height:${this.height}px;"><img src="https://static.leke.cn/scripts/common/player/images/upgrade.png"/><p>视频播放暂不支持ie10及以下版本，请升级或用其他浏览器打开</p></div>`;
            }else{
                this.mountNode.innerHTML=this.template.replace('<div class="video-root-container">',`<div class="video-root-container" style="width:${this.width}px;height:${this.height}px;">`);
                this.el = this.mountNode.querySelector('.video-root-container');
                this.input = this.el.querySelector(`.video-input`);
                this.input.id = `video-input-${this.uid}`;
                this.video = this.el.querySelector(`video`);
                this.video.id=`video-${this.uid}`;
                this.mask = this.el.querySelector(`.video-mask`);
                this.control = this.el.querySelector(`.video-control-bar`);
                this.loading = this.el.querySelector(`.loading-container`);
                this.error = this.el.querySelector(`.error-wrap`);
                this.toast = this.el.querySelector(`.video-fullscreen-toast`);
                new Control(this.control,this.video,this.event);
                this.initConfig();
                type==='M3U8'?this.hlsHandle():this.video.src=this.options.src;
            }
        }else{
            this.mountNode.innerHTML = `<div class="video-unsupport" style="width:${this.width}px;height:${this.height}px;"><img src="https://static.leke.cn/scripts/common/player/images/upgrade.png"/><p>不支持的视频格式，请转化为Mp4、WebM、Ogg、M3u8等格式</p></div>`;
        }
    }

    hlsHandle() {
        const hls = new Hls();
        hls.loadSource(this.options.src);
        hls.attachMedia(this.video);
        hls.on(Hls.Events.MEDIA_ATTACHED,()=>{
            this.event.trigger('ready');
        });
        hls.on(Hls.Events.FRAG_PARSING_INIT_SEGMENT,()=>{
            this.event.trigger('fragInit');
        });
        hls.on(Hls.Events.ERROR, (err) => {
            console.error(err);
            if(!this.loadingFlag)this.showLoading();
        });
        hls.on(Hls.Events.FRAG_LOADING, () => {
            this.loadingTimer = setTimeout(() => {
                clearTimeout(this.loadingTimer);
                this.showLoading();
            }, 1000);
        });
        hls.on(Hls.Events.BUFFER_CREATED, () => {
            if(!this.loadingFlag)this.showLoading();
        });
        hls.on(Hls.Events.FRAG_BUFFERED, () => {
            this.closeLoading();
        });
        hls.on(Hls.Events.BUFFER_APPENDED, () => {
            this.closeLoading();
        });
    }

    initConfig() {
        this.subscription();
        const config: any = {};
        if (this.options.autoplay) {
            config.autoplay = 'autoplay';
        }
        if (this.options.loop) {
            config.loop = 'loop';
        }
        if(this.options.poster){
            config.poster=this.options.poster;
        }
        if(this.options.onReady){
            this.on('ready',this.options.onReady);
        }
        if(this.options.onLoad){
            this.on('loadedmetadata',this.options.onLoad);
        }
        if(this.options.onStart){
            this.on('start',this.options.onStart);
        }
        if(this.options.onPausedChange){
            this.trigger('proxyPausedChange',this.options.onPausedChange);
        }
        if(this.options.onVolumeChange){
            this.trigger('proxyVolumeChange',this.options.onVolumeChange);
        }
        if(this.options.onFullscreenChange){
            this.trigger('proxyFullscreenChange',this.options.onFullscreenChange);
        }
        Dom.setProps(this.video, {}, config);
    }

    subscription() {
        this.event.on('proxyPausedChange', (fn) => {
            this.proxyPausedChange=fn;
        });
        VIDEO_EVENTS.forEach(action => {
            this.video.addEventListener(action, () => {
                this.event.trigger(action);
            });
        });
        this.video.addEventListener('click', () => {
            this.event.trigger('click',this.video.paused);
        });
        this.mask.addEventListener('click', () => {
            this.event.trigger('click',this.video.paused);
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
        // const fn = throttle((time) => { this.event.trigger('timeupdate', time); }, 1000, { leading: true });
        this.video.addEventListener('timeupdate', () => {
            this.event.trigger('timeupdate', this.video.currentTime);
        });
        // this.video.addEventListener('loadeddata', ()=> {
        //     if(!this.options.poster){
        //         const canvas = document.createElement('canvas');
        //         canvas.width = this.width;
        //         canvas.height = this.height;
        //         canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
        //         const src = canvas.toDataURL('image/png');
        //         this.video.setAttribute('poster', src);
        //     }
        // });
        this.event.on('click', (paused) => {
            if (!this.proxyPausedChange) {
                paused ? this.video.play() : this.video.pause();
            } else {
                this.proxyPausedChange(!paused);
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
            this.event.on('error', (err) => {
                console.error(err);
                this.error.style.display='block';
            });
        });
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            entryFullscreen(this.el);
            Dom.addClass(this.el, 'full-video-container');
            if (this.browser === 'IE') {
                this.toast.style.display='block';
                setTimeout(()=>{this.toast.style.display='';},2000);
            }
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            exitFullscreen();
            Dom.removeClass(this.el, 'full-video-container');
        });
        this.event.on('play', () => {
            this.mask.style.display='';
        });        
        this.event.on('pause', () => {
            this.mask.style.display='block';
        });
        this.event.on('ended', () => {
            this.closeLoading();
            this.mask.style.display='block';
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

    showLoading(){
        this.loadingFlag=true;
        this.loading.style.display='block';
    }

    closeLoading(){
        this.loadingTimer && clearTimeout(this.loadingTimer);
        this.loadingFlag=false;
        this.loading.style.display='';
    }

    addEventListener(type, listener) {
        this.event.on(type, listener);
    }
    on(type, listener) {
        this.event.on(type, listener);
    }
    addListener(type, listener) {
        this.event.on(type, listener);
    }
    removeEventListener(type, listener) {
        this.event.off(type, listener);
    }
    off(type, listener) {
        this.event.off(type, listener);
    }
    removeListener(type, listener) {
        this.event.off(type, listener);
    }
    getListener(type) {
        return this.event.getListener(type);
    }
    trigger(...args) {
        this.event.trigger(...args);
    }
    destory() {
        this.event.trigger('destory');
    }
}

export default Player;
