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
    onStop?: () => void;
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

    startRecord = () => {
        if (!recorder && this.recorderRef.current) {
            recorder = new Recorder({
                elem: this.recorderRef.current,
                duration: this.props.duration,
            });
            recorder.onStart = this.props.onStart;
            recorder.onStop = () => this.handleStop();
            recorder.ondataavailable = (event) => this.ondataavailable(event);
        }
    };

    componentDidMount() {
        this.startRecord();
    }

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
    blobToDataURI = (blob) => {
        return new Promise(function (reolove, reject) {
            const reader = new FileReader();
            reader.onload = function (e) {
                reolove(e.target.result);
            };
            reader.readAsDataURL(blob);
        });
    };

    ondataavailable = async (event) => {
        this.setState({
            audioUrl: event.data,
        });
        const res = await this.blobToDataURI(event.data);
        this.props.onAudioUpdate({ boldFile: event.data, baseFile: res });
    };

    handleStop = async () => {
        const { onStop, isViewAudio } = this.props;
        onStop && onStop();
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
        console.log(this.state);
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
