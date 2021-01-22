import { RecordHtml, AudioHtml } from "./html";
import { timeFormat, blobToDataURI } from "./utils";
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
    public getBold: (bold) => void; //获取录音二进制文件
    public getBase: (audio) => void; //获取录音base64格式
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
        // this.initEvent();
    }
    //初始化页面
    private initHtml() {
        const { elem } = this.cfg;
        elem.innerHTML = RecordHtml;
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
                console.log(state);
                if (state === Recording) {
                    this.stopRecord();
                } else {
                    this.startRecord();
                }
                return;
            }
            this.startRecord();
        });

        // 播放
        this.audio.addEventListener("play", this.onPlay);
        this.audio.addEventListener("pause", this.onPause);
    }
    /**
     * 初始化录音实例
     * @param stream
     */
    private initRecorder(stream): void {
        const recorder = new MediaRecorder(stream);
        console.log("re", recorder);
        recorder.ondataavailable = (event) => {
            this.recorderBold = event.data;
            this.getBold && this.getBold(event.data);
            blobToDataURI(event.data, this.getBase);
            this.audio.src = window.URL.createObjectURL(
                new Blob([event.data], { type: "audio/wav" })
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
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                {
                    audio: true,
                },
                (stream) => {
                    this.initRecorder(stream);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            // eslint-disable-next-line no-alert
            alert("麦克风获取失败");
        }
    }
    //结束录音
    private stopRecord() {
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
        }, 500);
    }

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
