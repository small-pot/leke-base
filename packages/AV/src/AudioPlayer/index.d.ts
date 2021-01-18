import EventEmitter from './EventEmitter';
interface AudioPlayerOptions {
    el: string;
    source: string;
    loop: boolean;
    autoplay: boolean;
    allowSeek: boolean;
    preload: 'none' | 'metadata' | 'auto' | '';
    timeFormat?: (val: number) => string;
}
declare class AudioPlayer extends EventEmitter {
    private options;
    private $audio;
    private $playBtn;
    private $innerProgress;
    private $outerProgress;
    private $progressBtn;
    private $timeText;
    private $container;
    private template;
    private playing;
    private canplay;
    private dragging;
    currentTime: number;
    duration: number;
    currentPercent: number;
    constructor(ops?: Partial<AudioPlayerOptions>);
    static canplay(mime_type: any): boolean;
    private init;
    private bindEvent;
    private addPlayStyle;
    private addPauseStyle;
    private onProgressClk;
    private onDragStart;
    private onDurationChange;
    private onEmptied;
    private onEnded;
    private onAudioProcess;
    private onCanplay;
    private onCanplayThrough;
    private onLoadedData;
    private onLoadedMetaData;
    private onPause;
    private onPlay;
    private onPlaying;
    private onRateChange;
    private onSeeked;
    private onSeeking;
    private onStalled;
    private onSuspend;
    private onTimeUpdate;
    private onVolumeChange;
    private onWaiting;
    private reset;
    /**
     * @description: 开始播放音频
     * @return {*} void
     */
    play(): void;
    /**
     * @description: 暂停播放音频
     * @return {*} void
     */
    pause(): void;
    /**
     * @description: 切换音频播放状态 开始 => 暂停 || 暂停 => 开始
     * @return {*} void
     */
    togglePlay(): void;
    /**
     * @description: 加载音频资源
     * @param {string} url 音频链接
     * @return {Promise} promise
     */
    load(url: string): Promise<unknown>;
    /**
     * @description: 跳转到指定时间播放
     * @param {number} time 指定时间（秒）
     * @return {*} void
     */
    seek(time: number): void;
    on(event: string, fn: Function): void;
    once(event: string, fn: Function): void;
    off(event: string, fn?: Function): void;
    getAllListener(): {};
}
export default AudioPlayer;
