import { RecordHtml, AudioHtml, NoData } from "./html";
import { timeFormat, blobToDataURI } from "./utils";
import { AudioPlayer } from "@leke/AV";
import "./index.less";

declare let MediaRecorder: any;

// 构造函数参数格式
interface IRecorderConfig {
    elem: HTMLElement;
    duration?: number;
}

class AudioRecorder {
    [x: string]: any;
    private Recorder: any;
    private stop: any;
    private isRecord: boolean;
    private count: number = 0;
    private duration: number = 300; //录音限时时长，默认5分钟
    private recorderBold: any;
    private time: any;
    public onPlay: () => void;
    public onPause: () => void;
    public onStart: () => void;
    public onStop: () => void;

    /**
     *
     * @param cfg
     */
    constructor(cfg: IRecorderConfig) {
        this.cfg = arguments.length ? cfg : null;
        this.duration =
            this.cfg && this.cfg.duration ? this.cfg.duration : 3000;
        this.isRecord = false;
        this.init();
    }
    private init() {
        this.initHtml();
        this.initEvent();
    }
    //初始化页面
    private initHtml() {
        const { elem } = this.cfg;
        elem.innerHTML = this.isHasMedia() ? RecordHtml : NoData;
        this.record = elem.querySelector("#record");
        this.stop = elem.querySelector("#stop");
        this.play = elem.querySelector("#play");
        this.audio = elem.querySelector("#audio");
        this.recordContainer = elem.querySelector("#recordContainer");
        this.recordTime = elem.querySelector(".record-time");
    }
    private initEvent() {
        // 录制
        this.record.addEventListener("click", () => {
            const Recording = "recording";
            if (this.Recorder) {
                const state = this.getRecordState();
                if (state === Recording) {
                    this.stopRecord();
                } else {
                    this.startRecord();
                }
                return;
            }
            this.startRecord();
        });
    }
    /**
     * 初始化录音实例
     * @param stream
     */
    private initRecorder(stream): void {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
            this.recorderBold = event.data;
            this.audioUrl = window.URL.createObjectURL(
                new Blob([event.data], { type: "audio/mp3" })
            );
        };
        this.Recorder = recorder;
        this.Recorder.start();
        this.run();
    }
    //获取录音状态
    public getRecordState() {
        let state: string = this.Recorder.state;
        return state;
    }
    //开始录音
    public startRecord() {
        this.onStart && this.onStart();
        this.recordContainer.querySelector(".record-recording").style.display =
            "block";
        this.recordTime.style.display = "block";
        this.recordTime.querySelector("#recordDuration").innerHTML = timeFormat(
            this.duration
        );
        this.recordTime.querySelector("#recordUsetime").innerHTML = timeFormat(
            this.count
        );
        if (this.Recorder) {
            this.Recorder.start();
            this.run();
            return;
        }

        if (this.isHasMedia()) {
            this.getUserMedia({ audio: true });
        } else {
            const { elem } = this.cfg;
            elem.innerHTML = NoData;
        }
    }
    //获取录音权限
    private isHasMedia() {
        const n = <any>navigator;
        if (
            n.mediaDevices.getUserMedia ||
            n.getUserMedia ||
            n.webkitGetUserMedia ||
            n.mozGetUserMedia
        ) {
            return true;
        }
        return false;
    }
    /**
     * 录音兼容处理
     * @param constrains
     */
    public getUserMedia(constrains) {
        let that = this;
        const n = <any>navigator;
        if (n.mediaDevices.getUserMedia) {
            // 最新标准API、
            n.mediaDevices
                .getUserMedia(constrains)
                .then((stream) => {
                    that.success(stream);
                })
                .catch((err) => {
                    that.error(err);
                });
        } else if (n.webkitGetUserMedia || n.mozGetUserMedia) {
            // webkit内核浏览器
            if (n.mediaDevices === undefined) {
                n.mediaDevices = {};
            }

            // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
            // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function (constraints) {
                    // 首先，如果有getUserMedia的话，就获得它
                    const getUserMedia =
                        n.webkitGetUserMedia || n.mozGetUserMedia;

                    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
                    if (!getUserMedia) {
                        return Promise.reject(
                            new Error(
                                "getUserMedia is not implemented in this browser"
                            )
                        );
                    }

                    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(
                            navigator,
                            constraints,
                            resolve,
                            reject
                        );
                    });
                };
            }
            navigator.mediaDevices
                .getUserMedia(constrains)
                .then((stream) => {
                    that.success(stream);
                })
                .catch((err) => {
                    that.error(err);
                });
        } else if (navigator.getUserMedia) {
            // 旧版API
            n.getUserMedia(constrains)
                .then((stream) => {
                    that.success(stream);
                })
                .catch((err) => {
                    that.error(err);
                });
        }
    }
    // 成功的回调函数
    success(stream) {
        this.initRecorder(stream);
    }
    // 异常的回调函数
    error(error) {
        console.log("访问用户媒体设备失败：", error.name, error.message);
    }

    //结束录音
    public stopRecord() {
        this.onStop && this.onStop();
        this.count = 0;
        clearInterval(this.time);
        this.Recorder.stop();
        this.recordContainer.querySelector(".record-recording").style.display =
            "none";
        const { elem } = this.cfg;
        elem.querySelector(".record-wrap").setAttribute(
            "class",
            "record-wrap exit"
        );
        setTimeout(() => {
            elem.innerHTML = AudioHtml;
            const audioWrap = elem.querySelector(".record-audio-container");
            const reRecord = elem.querySelector(".record-reRecord");
            reRecord.addEventListener("click", () => {
                this.audioUrl = "";
                setTimeout(() => {
                    this.init();
                }, 500);
            });
            const audioPlayer = new AudioPlayer({
                el: audioWrap,
                src: this.audioUrl,
            });
        }, 500);
    }
    //获取音频
    public getAudioUrl = async (type?: string) => {
        if (type === "base") {
            const res = await blobToDataURI(this.recorderBold);
            return res;
        }
        return this.recorderBold;
    };

    //录音计时
    private run(): void {
        clearInterval(this.time);
        if (this.count >= this.duration) {
            this.Recorder.stop();
        }
        this.time = setInterval(() => {
            this.count++;

            this.recordTime.querySelector(
                "#recordUsetime"
            ).innerHTML = timeFormat(this.count);
        }, 1000);
    }
}

export default AudioRecorder;
