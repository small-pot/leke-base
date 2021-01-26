import * as React from "react";
import { AudioRecorder as Recorder, AudioPlayer } from "@leke/AV";

type AudioElement = {
    boldFile: any;
    baseFile: any;
};
interface IProps {
    isViewAudio?: boolean;  //是否展示录音音频
    duration?: number;  //录音限时
    onStart?: () => void;   //开始录音回调
    onStop?: (e: any) => void;  //结束录音回调
    onDataAvailable?: (e: AudioElement) => void;
    onReRecorder?:() => void;   //重录回调
}
interface IState {
    isSwitch: boolean;
    audioUrl: any;
}

class AudioRecorder extends React.Component<IProps, IState> {
    recorderRef: React.RefObject<HTMLDivElement>;
    audioRef: React.RefObject<HTMLDivElement>;
    constructor(props) {
        super(props);
        this.recorderRef = React.createRef();
        this.audioRef = React.createRef();
        this.state = {
            isSwitch: false,
            audioUrl: "",
        };
    }
    //初始化recorder
    startRecord = () => {
        if (this.recorderRef.current) {
            const recorder = new Recorder({
                elem: this.recorderRef.current,
                duration: this.props.duration,
            });
            recorder.onStart = this.props.onStart;
            recorder.onStop = (e) => this.handleStop(e);
            recorder.ondataavailable = (event) => this.ondataavailable(event);
        }
    };

    componentDidMount() {
        this.startRecord();
    }
    //录音音频查看
    componentDidUpdate(preProps: IProps, preState: IState) {
        if(this.props.isViewAudio){
            if (!this.state.isSwitch) {
                this.startRecord();
            } else {
                const src = this.state.audioUrl;
                const el = this.audioRef.current;
                const audio = new AudioPlayer({
                    el,
                    src: window.URL.createObjectURL(
                        new Blob([src], { type: "audio/wav" })
                    ),
                });
            }
        } 
    }
    //录音结束回调监听
    ondataavailable(event) {
        this.setState({
            audioUrl: event.data,
        });
        this.props.onDataAvailable && this.props.onDataAvailable(event);
    }
    //停止录音
    handleStop = (e) => {
        const { onStop, isViewAudio } = this.props;
        onStop && onStop(e);
        if (isViewAudio) {
            this.recorderRef.current.className = " exit";
            setTimeout(() => {
                this.recorderRef.current.innerHTML = "";
                this.setState({
                    isSwitch: true,
                });
            }, 500);
        }
    };

    public render() {
        const { isSwitch } = this.state;
        return (
            <div>
                {isSwitch ? (
                    <div className="record-audio-wrap">
                        <div
                            ref={this.audioRef}
                            className="record-audio-container"
                        ></div>
                        <div
                            className="record-reRecord"
                            onClick={() => {
                                this.props.onReRecorder && this.props.onReRecorder();
                                this.setState({ isSwitch: false });
                            }}
                        >
                            重录
                        </div>
                    </div>
                ) : (
                    <div ref={this.recorderRef}></div>
                )}
            </div>
        );
    }
}

export default AudioRecorder;
