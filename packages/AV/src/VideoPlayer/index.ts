
import { newUID } from './utils/uid';
import Hls from 'hls.js';
import EventBase from './utils/event';
import * as Dom from './utils/dom';
import { initConfig, VIDEO_EVENTS } from './utils/config';
import Loading from './components/Loading';
import Mask from './components/Mask';
import ControlBar from './components/ControlBar';
import Unsupport from './components/Unsupport';
import Toast from './components/Toast';
import Error from './components/Error';
import { checkBrowser, throttle, entryFullscreen, exitFullscreen } from './utils/share';
class Player {
    uid: number;
    wrapId: string;
    options:any;
    browser:string;
    event:any;
    loading:boolean;
    loadingTimer:any;
    isFullscreen:boolean;
    el:any;
    mountedNode:any;
    video:any;
    input:any;
    mask:any;
    control:any;
    closeLoading:()=>void;
    addEventListener: (type: any, listener: any) => void;
    on: (type: any, listener: any) => void;
    addListener: (type: any, listener: any) => void;
    removeEventListener: (type: any, listener: any) => void;
    off: (type: any, listener: any) => void;
    removeListener: (type: any, listener: any) => void;
    getListener: (type: any) => void;
    trigger: (...args: any[]) => void;
    destory: () => void;

    constructor(id, options) {
        this.uid = newUID();
        this.wrapId = id;
        this.options = {
            width: options.width || initConfig.initWidth,
            height: options.height || initConfig.initHeight,
            ...options
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
        this.mountedNode.append(this.el);
        this.isHlsSupported();
    }

    validate() {
        if (!this.wrapId) return console.error('请传入挂载id');
        if (!this.options.src) return console.error('请传入视频路径');
        this.mountedNode = document.querySelector(`#${this.wrapId}`);
        if (!this.mountedNode) {
            this.mountedNode = null;
            return console.error('挂载点不存在');
        }
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
        this.input = this.createEl('input', {}, { id: 'video-input', class: 'video-input' });
        this.el.appendChild(this.input);
        this.el.appendChild(this.video);
        this.mask = new Mask(this.el, this.video, this.event).init();
        this.control = new ControlBar(this.el, this.video, this.event).init();
        this.subscription();
        this.event.trigger('ready');
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
        VIDEO_EVENTS.forEach(action => {
            this.video.addEventListener(action, () => {
                this.event.trigger(action);
            });
        });
        this.el.addEventListener('click', () => {
            this.event.trigger('containerClick');
        });
        this.video.addEventListener('play', () => {
            this.event.trigger('play');
            if (this.video.currentTime === 0) {
                this.event.trigger('startPlay');
            }
        });
        const fn = throttle(() => { this.event.trigger('timeupdate'); }, 1000, { leading: true });
        this.video.addEventListener('timeupdate', () => {
            fn();
        });

        this.event.on('click', () => {
            this.video.pause();
        });
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
        this.event.on('play', () => {
            this.input.focus();
        });
        this.event.on('pause', () => {
            this.input.focus();
        });
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            entryFullscreen(this.el);
            if (this.browser === 'IE') {
                this.renderToast();
            }
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            exitFullscreen();
        });
        // 空格符控制暂停/播放
        const keyDown = e => {
            if (e.keyCode === 32) {
                e.preventDefault();
                const activeId = document.activeElement.id;
                if (activeId === 'video-input') {
                    this.video.paused ? this.video.play() : this.video.pause();
                }
            }
        };
        document.body.addEventListener('keydown', keyDown);
        this.event.on('destory', () => {
            document.body.removeEventListener('keydown', keyDown);
        });
    }
}

Player.prototype.addEventListener = Player.prototype.on = Player.prototype.addListener = function (type , listener) {
    this.event.on(type , listener);
};

Player.prototype.removeEventListener = Player.prototype.off = Player.prototype.removeListener = function (type , listener) {
    this.event.off(type , listener);
};

Player.prototype.getListener = function (type ) {
    this.event.getListener(type );
};

Player.prototype.trigger = function (...args) {
    this.event.trigger(args);
};

Player.prototype.destory = function () {
    this.event.trigger('destory');
};

export default Player;