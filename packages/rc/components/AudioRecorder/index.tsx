import * as React from "react";
import { AudioRecorder as Recorder, AudioPlayer } from "@leke/AV";

let recorder = null;
type AudioElement = {
    boldFile: any;
    baseFile: any;
};
interface IProps {
    isViewAudio?: boolean;
    duration?: number;
    onStart?: () => void;
    onStop?: (e: any) => void;
    onAudioUpdate?: (e: AudioElement) => void;
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
        if (!recorder && this.recorderRef.current) {
            recorder = new Recorder({
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
    //base64文件转化
    blobToDataURI = (blob) => {
        return new Promise(function (reolove, reject) {
            const reader = new FileReader();
            reader.onload = function (e) {
                reolove(e.target.result);
            };
            reader.readAsDataURL(blob);
        });
    };
    //录音结束回调监听
    ondataavailable = async (event) => {
        this.setState({
            audioUrl: event.data,
        });
        const res = await this.blobToDataURI(event.data);
        this.props.onAudioUpdate &&
            this.props.onAudioUpdate({ boldFile: event.data, baseFile: res });
    };
    //停止录音
    handleStop = (e) => {
        const { onStop, isViewAudio } = this.props;
        onStop && onStop(e);
        if (isViewAudio) {
            this.recorderRef.current.className = " exit";
            setTimeout(() => {
                recorder = null;
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
                                this.setState({ isSwitch: false });
                            }}
                        >
                            重录
                        </div>
                    </div>
                ) : (
                    <div id="recorder" ref={this.recorderRef}></div>
                )}
            </div>
        );
    }
}

export default AudioRecorder;
