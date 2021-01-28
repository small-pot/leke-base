import { Alert } from '@leke/rc';
import { RecordHtml, AudioHtml, NoData } from "./html";
import { timeFormat, blobToDataURI } from "./utils";

declare let MediaRecorder: any;
declare let window: any;

// 构造函数参数格式
interface IRecorderConfig {
    elem: HTMLElement;
    duration?: number;
}

class AudioRecorder {
    private cfg: IRecorderConfig;
    private Recorder: any;
    private count: number = 0; //录音用时
    private duration: number = 300; //录音限时时长，默认5分钟
    private recorderBold: any; //录音二进制文件
    private time: any;
    private record: HTMLElement;
    private recordTime: HTMLElement;
    private recordContainer: HTMLElement;
    public onStart: () => void; //开始录音回调
    public onStop: (bold: any) => void; //结束录音回调
    public ondataavailable: (event) => void;

    /**
     *
     * @param cfg
     */
    constructor(cfg: IRecorderConfig) {
        this.cfg = arguments.length ? cfg : null;
        this.duration =
            this.cfg && this.cfg.duration ? this.cfg.duration : 3000;
        this.init();
    }
    recorderList:[];
    private init() {
        require('./index.less');
        if(!window.MediaRecorder){
            const { elem } = this.cfg;
            elem.innerHTML =  NoData;
            return;
        }
        this.initHtml();
        this.initEvent();
    }
    //初始化页面
    private initHtml() {
        const { elem } = this.cfg;
        elem.innerHTML = this.isHasMedia() ? RecordHtml : NoData;
        this.record = elem.querySelector("#record");
        this.recordContainer = elem.querySelector("#recordContainer");
        this.recordTime = elem.querySelector(".record-time");
        if (this.isHasMedia()) {
            this.getUserMedia({ audio: true });
        }
    }
    private initEvent() {
        // 录制
        this.record &&
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
            this.ondataavailable && this.ondataavailable(event);
            this.recorderBold = event.data;
        };
        this.Recorder = recorder;
        this.run();
    }
    //获取录音状态
    public getRecordState() {
        let state: string = this.Recorder.state;
        return state;
    }
    //开始录音
    public startRecord() {
        this.count = 0;
        this.onStart && this.onStart();
        if (this.Recorder) {
            this.run();
            return;
        }

        if (this.isHasMedia()) {
            this.getUserMedia({ audio: true },true);
        } else {
            const { elem } = this.cfg;
            elem.innerHTML = NoData;
        }
    }
    //初始化录音样式
    private initStartRecorderHtml(){
        const {elem} = this.cfg;
        const recordIng: HTMLElement = this.recordContainer.querySelector(
            ".record-recording"
        );
        recordIng.style.display = "block";
        this.recordTime.style.display = "block";
        this.recordTime.querySelector("#recordDuration").innerHTML = timeFormat(
            this.duration
        );
        this.recordTime.querySelector("#recordUsetime").innerHTML = timeFormat(
            this.count
        );
        //没有麦克风设备提示
        const recordError:HTMLElement = elem.querySelector('.record-error');
        recordError.style.display = 'none';
    }
    //获取录音权限
    private isHasMedia() {
        const n = <any>navigator;
        if (
            (n.mediaDevices && n.mediaDevices.getUserMedia) ||
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
     * @param isInitRecorder
     */
    public getUserMedia(constrains,isInitRecorder?:boolean) {
        let that = this;
        const n = <any>navigator;
        if (n.mediaDevices.getUserMedia) {
            // 最新标准API、
            n.mediaDevices
                .getUserMedia(constrains)
                .then((stream) => {
                    that.success(stream,isInitRecorder);
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
                    that.success(stream,isInitRecorder);
                })
                .catch((err) => {
                    that.error(err);
                });
        } else if (navigator.getUserMedia) {
            // 旧版API
            n.getUserMedia(constrains)
                .then((stream) => {
                    that.success(stream,isInitRecorder);
                })
                .catch((err) => {
                    that.error(err);
                });
        }
    }
    // 成功的回调函数
    private success(stream,isInitRecorder?:boolean) {
        if(isInitRecorder){
            this.initStartRecorderHtml();  
            this.initRecorder(stream);
        } else {

        }
    }
    // 异常的回调函数
    private error(error) {
        console.log("访问用户媒体设备失败：", error.name, error.message);
        const { elem } = this.cfg;
        const recordError:HTMLElement = elem.querySelector('.record-error');
        recordError.style.display = 'block';
        clearInterval(this.time);
        const recording: HTMLElement = this.recordContainer.querySelector(
            ".record-recording"
        );
        recording.style.display = "none";
        this.recordTime.style.display = "none";
    }

    //结束录音
    public stopRecord = async () => {
        clearInterval(this.time);
        this.Recorder.stop();
        const recording: HTMLElement = this.recordContainer.querySelector(
            ".record-recording"
        );
        recording.style.display = "none";
        const req = await this.getRecorderAudio();
        this.onStop && this.onStop(req);
    };
    //获取音频
    public getRecorderAudio = (type?: string) => {
        return new Promise((resolve) =>
            setTimeout(async () => {
                if (!this.recorderBold) {
                    resolve("暂无音频文件，请先录音");
                }
                if (type === "base64") {
                    const res = await blobToDataURI(this.recorderBold);
                    resolve(res);
                }
                resolve(this.recorderBold);
            }, 0)
        );
    };

    //录音计时
    private run(): void {
        this.Recorder && this.Recorder.start();
        clearInterval(this.time);
        this.initStartRecorderHtml();
        this.time = setInterval(() => {
            if (this.count >= this.duration) {
                this.stopRecord();
                clearInterval(this.time);
                return;
            }
            this.count++;

            this.recordTime.querySelector(
                "#recordUsetime"
            ).innerHTML = timeFormat(this.count);
        }, 1000);
    }
}

export default AudioRecorder;
