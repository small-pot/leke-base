/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-12 18:51:00
 * @LastEditTime: 2021-01-18 17:33:13
 */

import EventEmitter from './EventEmitter';
import { str2dom,formatTime } from './utils';
import './index.less';

interface AudioPlayerOptions{
  el: string,
  source:string,
  loop:boolean,
  autoplay:boolean,
  allowSeek:boolean,
  preload:'none' | 'metadata' | 'auto' | ''
  timeFormat?:(val:number)=>string
}

const defaultOps: AudioPlayerOptions = {
    el: 'body',
    source:'',
    loop:false,
    autoplay:true,
    allowSeek:true,
    preload:'metadata',
};

class AudioPlayer extends EventEmitter  {
  private options: AudioPlayerOptions
  private $audio!:HTMLAudioElement
  private $playBtn!:HTMLDivElement
  private $innerProgress!:HTMLDivElement
  private $outerProgress!:HTMLDivElement
  private $progressBtn!:HTMLDivElement
  private $timeText!:HTMLSpanElement
  private $container!:HTMLElement
  private template=`<div class="audio-container">
    <audio id="audio"></audio>
    <div class="button"></div>
    <div class="progress-outer">
      <div class="progress-inner">
        <div class="progress-button"></div>
      </div>
    </div>
    <span class="duration-text">0'00"</span>
  </div>`
  private playing:boolean = false
  private canplay:boolean = false
  private dragging:boolean = false
  
  currentTime:number = 0
  duration:number = 0
  currentPercent:number = 0
  
  constructor(ops: Partial<AudioPlayerOptions> = {}) {
      super();
      this.options = {
          ...defaultOps,
          ...ops
      };
      this.init();
  }

  static canplay(mime_type){
      const audio = document.createElement('audio');
      let mime_str;
      switch (mime_type) {
      case 'mp3':
          mime_str = 'audio/mpeg';
          break;
      case 'aac':
          mime_str = 'audio/aac';
          break;
      case 'ogg':
          mime_str = 'audio/ogg';
          break;
      case 'flac':
          mime_str = 'audio/flac';
          break;
      case 'wav':
          mime_str = 'audio/wav';
          break;
      }
      if (mime_str !== undefined) {
          if (mime_type === 'mp3' && navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Firefox/i)) {
              return true;
          }
          try {
              return !!audio.canPlayType && audio.canPlayType(mime_str) !== '';
          } catch (e) {
              return false;
          }
      }
      return false;
  }

  private init(){
      const {el,source,autoplay,loop,preload} = this.options;
      const $audioContainer = str2dom(this.template)[0] as HTMLElement;
      this.$container = $audioContainer;
      this.$audio = $audioContainer.querySelector<HTMLAudioElement>('#audio')!;
      this.$playBtn = $audioContainer.querySelector<HTMLDivElement>('.button')!;
      this.$timeText = $audioContainer.querySelector<HTMLSpanElement>('.duration-text')!;
      this.$innerProgress = $audioContainer.querySelector<HTMLDivElement>('.progress-inner')!;
      this.$outerProgress = $audioContainer.querySelector<HTMLDivElement>('.progress-outer')!;
      this.$progressBtn = $audioContainer.querySelector<HTMLDivElement>('.progress-button')!;
      if (autoplay) {
          this.playing = true;
          this.$audio.autoplay = true;
          this.$playBtn.classList.add('button-pause');
      }else{
          this.playing = false;
          this.$playBtn.classList.add('button-start');
      }

      if (source) {
          this.load(source);
      }
      this.$audio.loop=loop;
      this.$audio.preload=preload;
      this.bindEvent();
    
      const $outerContainer = document.querySelector(el);
      if ($outerContainer) {
          $outerContainer.appendChild($audioContainer);
      }
    
  }

  private bindEvent(){
      this.$outerProgress.addEventListener('click',this.onProgressClk.bind(this));
      this.$playBtn.addEventListener('click',this.togglePlay.bind(this));
      this.$progressBtn.addEventListener('mousedown',this.onDragStart.bind(this));
      this.$progressBtn.addEventListener('touchstart',this.onDragStart.bind(this));

      // 音频事件
      this.$audio.addEventListener('audioprocess',this.onAudioProcess.bind(this));
      this.$audio.addEventListener('canplay',this.onCanplay.bind(this));
      this.$audio.addEventListener('canplaythrough',this.onCanplayThrough.bind(this));
      this.$audio.addEventListener('durationchange',this.onDurationChange.bind(this));
      this.$audio.addEventListener('emptied',this.onEmptied.bind(this));
      this.$audio.addEventListener('ended',this.onEnded.bind(this));
      this.$audio.addEventListener('loadeddata',this.onLoadedData.bind(this));
      this.$audio.addEventListener('loadedmetadata',this.onLoadedMetaData.bind(this));
      this.$audio.addEventListener('pause',this.onPause.bind(this));
      this.$audio.addEventListener('play',this.onPlay.bind(this));
      this.$audio.addEventListener('playing',this.onPlaying.bind(this));
      this.$audio.addEventListener('ratechange',this.onRateChange.bind(this));
      this.$audio.addEventListener('seeked',this.onSeeked.bind(this));
      this.$audio.addEventListener('seeking',this.onSeeking.bind(this));
      this.$audio.addEventListener('stalled',this.onStalled.bind(this));
      this.$audio.addEventListener('suspend',this.onSuspend.bind(this));
      this.$audio.addEventListener('timeupdate',this.onTimeUpdate.bind(this));
      this.$audio.addEventListener('volumechange',this.onVolumeChange.bind(this));
      this.$audio.addEventListener('waiting',this.onWaiting.bind(this));
  }

  private addPlayStyle() {
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      this.$playBtn.classList.remove(playBtnClass);
      this.$playBtn.classList.add(pauseBtnClass);
  }

  private addPauseStyle() {
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      this.$playBtn.classList.remove(pauseBtnClass);
      this.$playBtn.classList.add(playBtnClass);
  }

  private onProgressClk(e){
      if (!this.canplay) return;
      if (!this.options.allowSeek) return;
      const outerProgressRect = this.$outerProgress.getBoundingClientRect();
      const seekPercent = parseFloat(((e.clientX-outerProgressRect.left)/outerProgressRect.width).toFixed(4));
      this.seek(this.duration*seekPercent);
  }
  private onDragStart(e) {
      let seekPercent;
      this.dragging = true;
      this.$progressBtn.classList.add('progress-button-dragging');

      const onDragMove = (e)=>{
          const x = e.touches?e.touches[0].clientX:e.clientX;
          const outerProgressRect = this.$outerProgress.getBoundingClientRect();
          seekPercent = parseFloat(((x-outerProgressRect.left)/outerProgressRect.width).toFixed(4));
      
          // 考虑拖拽边界条件
          if (seekPercent<0) {
              seekPercent = 0;
          }
          if (seekPercent>1) {
              seekPercent = 1;
          }
          this.$innerProgress.style.width=seekPercent*100+'%';
      };

      const onDragEnd = () => {
          this.dragging = false;
          if (seekPercent) {
              this.seek(this.duration*seekPercent);
          }
          this.$progressBtn.classList.remove('progress-button-dragging');
          document.removeEventListener('mousemove',onDragMove);
          document.removeEventListener('mouseup',onDragEnd);
      };
    
      document.addEventListener('mouseup',onDragEnd);
      document.addEventListener('touchend',onDragEnd);

      document.addEventListener('mousemove',onDragMove);
      document.addEventListener('touchmove',onDragMove);
  }

  private onDurationChange(e:Event){
    
      const {timeFormat:customFormat} = this.options;
      this.$timeText.innerHTML = formatTime(this.$audio.duration || 0,customFormat);
      this.duration = this.$audio.duration;
      this.emit('durationchange',e);
  }

  private onEmptied(e:Event) {
      this.emit('emptied',e);
  }

  private onEnded(e:Event){
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      this.playing = false;
      this.$playBtn.classList.remove(pauseBtnClass);
      this.$playBtn.classList.add(playBtnClass);
      this.emit('ended',e);
  }

  private onAudioProcess(e:Event) {
      this.emit('audioprocess',e);
  }

  private onCanplay(e:Event) {
      this.emit('canplay',e);
  }

  private onCanplayThrough(e:Event) {
      this.emit('canplaythrough',e);
  }

  private onLoadedData(e:Event) {
      this.emit('loadeddata',e);
  }

  private onLoadedMetaData(e:Event) {
      this.emit('loadedmetadata',e);
  }

  private onPause(e:Event) {
      this.addPauseStyle();
      this.playing = false;
      this.emit('pause',e);
  }

  private onPlay(e:Event) {
      this.addPlayStyle();
      this.playing = true;
      this.emit('play',e);
  }

  private onPlaying(e:Event) {
      this.emit('playing',e);
  }

  private onRateChange(e:Event) {
      this.emit('ratechange',e);
  }

  private onSeeked(e:Event) {
      this.emit('seeked',e);
  }

  private onSeeking(e:Event) {
      this.emit('seeking',e);
  }

  private onStalled(e:Event) {
      this.emit('stalled',e);
  }

  private onSuspend(e:Event) {
      this.emit('suspend',e);
  }

  private onTimeUpdate(e:Event){
      this.emit('timeupdate',e);
    
      if (this.dragging) return;
      this.currentTime = this.$audio.currentTime;
      this.currentPercent = parseFloat((this.currentTime/this.duration).toFixed(4));
      this.$innerProgress.style.width=this.currentPercent*100+'%';
    
  }

  private onVolumeChange(e:Event) {
      this.emit('volumechange',e);
  }

  private onWaiting(e:Event) {
      this.emit('waiting',e);
  }

  private reset() {
      // this.currentTime = this.$audio.currentTime = 0
  }

  /**
   * @description: 开始播放音频
   * @return {*} void
   */
  play() {
      // if (!this.canplay) return
      this.$audio.play();
  }

  /**
   * @description: 暂停播放音频
   * @return {*} void
   */
  pause(){
      // if (!this.canplay) return
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      this.playing = false;
      this.$audio.pause();
      this.$playBtn.classList.remove(pauseBtnClass);
      this.$playBtn.classList.add(playBtnClass);
  }

  /**
   * @description: 切换音频播放状态 开始 => 暂停 || 暂停 => 开始
   * @return {*} void
   */
  togglePlay(){
      if (this.playing) {
          this.pause();
      }else{
          this.play();
      }
  }

  /**
   * @description: 加载音频资源
   * @param {string} url 音频链接
   * @return {Promise} promise
   */
  load(url:string){
      this.canplay = false;
      this.playing = false;
      this.$audio.setAttribute('src',url);
      this.addPauseStyle();
      return new Promise((resolve, reject) => {
          const warpFn = () => {
              this.canplay = true;
              resolve(null);
              this.$audio.removeEventListener('canplay',warpFn);
          };
          this.$audio.addEventListener('canplay',warpFn);
      });
  }

  /**
   * @description: 跳转到指定时间播放
   * @param {number} time 指定时间（秒）
   * @return {*} void
   */
  seek(time:number){
      if (time < 0) {
          time = 0;
      }
      if (time>this.duration) {
          time = this.duration;
      }
      console.log(time);
      this.$audio.currentTime = Math.floor(time);
  }

  on(event:string,fn:Function){
      this.addListener(event,fn,false);
  }

  once(event:string,fn:Function){
      this.addListener(event,fn,true);
  }

  off(event:string,fn?:Function){
      this.removeListener(event,fn);
  }

  getAllListener(){
      return this.getListener();
  }

}

export default AudioPlayer;
