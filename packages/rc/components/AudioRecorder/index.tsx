/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:34:16
 * @LastEditTime: 2021-02-08 14:42:34
 */
import * as React from "react";
import {AudioRecorder as Recorder} from "@leke/AV";
import {AudioPlayerProps} from "../AudioPlayer";
import {httpRequest} from "@leke/http";

type Player = AudioPlayerProps;

interface AudioUpload extends httpRequest {
    success?: (res: any) => void;
    error?: (res: any) => void;
}

interface IProps {
    duration?: number; //录音限时
    audioPlayerVisible?: boolean; //是否展示音频
    player?: Player; //音频组件
    uploadParams?: AudioUpload; //音频上传
    onStart?: () => void; //开始录音回调
    onStop?: (e: any) => void; //结束录音回调
    onReRecorder?: () => void; //重录回调
}

interface IState {}
let recorder = null;
class AudioRecorder extends React.Component<IProps, IState> {
    recorderRef: React.RefObject<HTMLDivElement>;
    constructor(props) {
        super(props);
        this.recorderRef = React.createRef();
    }

    //初始化recorder
    startRecord = () => {
        if (this.recorderRef.current) {
            recorder = new Recorder({
                el: this.recorderRef.current,
                duration: this.props.duration,
            });
            recorder.onStart = this.props.onStart;
            recorder.onStop = (e) => this.handleStop(e);
        }
    };

    componentDidMount() {
        this.startRecord();
    }
    handleStop(e){
        this.props.onStop && this.props.onStop(e);
        if(this.props.uploadParams && recorder){
            recorder.recorderUpload(this.props.uploadParams);
        }
    }

    public render() {
        return <div ref={this.recorderRef}></div>;
    }
}

export default AudioRecorder;
