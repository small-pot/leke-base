import * as React from "react";
import { AudioRecorder as Recorder } from "@leke/AV";

let recorder = null;

interface IProps {
    onStart?: () => void;
    onStop?: () => void;
    getAudioUrl?: (type?: string) => void;
}
interface IState {}

class AudioRecorder extends React.Component<IProps, IState> {
    myRef: React.RefObject<HTMLDivElement>;
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    startRecord = () => {};

    componentDidMount() {
        if (!recorder) {
            recorder = new Recorder({ elem: this.myRef.current });
            recorder.onStart = this.props.onStart;
            recorder.onStop = this.props.onStop;
            recorder.getAudioUrl = this.props.getAudioUrl;
        }
    }

    public render() {
        return <div ref={this.myRef}></div>;
    }
}

export default AudioRecorder;
