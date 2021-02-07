/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:34:16
 * @LastEditTime: 2021-02-07 13:53:32
 */
import * as React from "react";
import { AudioRecorder as Recorder } from "@leke/AV";
import AudioPlayer,{ AudioPlayerProps }  from "../AudioPlayer";
import { RecordLoading } from "@leke/icons";

type Player = {
    onSrcChange:any;    //音频上传
    onAudioPlayerVisible:boolean; //是否展示音频
} & AudioPlayerProps;
interface IProps {
  duration?: number; //录音限时
  player?: Player; //音频组件
  onStart?: () => void; //开始录音回调
  onStop?: (e: any) => void; //结束录音回调
  onReRecorder?: () => void; //重录回调
}
interface IState {
  audioVisible: boolean;    //是否切换
  audioSrc: any;    //音频地址
  loading: boolean;   //是否上传中
  boldFile: any;    //音频文件二进制流
  success: boolean;   //是否上传成功
}

class AudioRecorder extends React.Component<IProps, IState> {
  recorderRef: React.RefObject<HTMLDivElement>;
  audioRef: React.RefObject<HTMLDivElement>;
  constructor(props) {
      super(props);
      this.recorderRef = React.createRef();
      this.audioRef = React.createRef();
      this.state = {
          audioVisible: this.props.player && this.props.player.src ? true : false,
          audioSrc: this.props.player ? this.props.player.src : "",
          loading: false,
          boldFile: null,
          success: true,
      };
  }
  //初始化recorder
  startRecord = (isStart?: boolean) => {
      if (this.recorderRef.current) {
          const recorder = new Recorder({
              el: this.recorderRef.current,
              duration: this.props.duration,
          });
          recorder.onStart = this.props.onStart;
          recorder.onStop = (e) => this.handleStop(e);
          if (isStart) {
              recorder.startRecord();
          }
      }
  };

  componentDidMount() {
      if (!this.state.audioVisible) {
          this.startRecord();
      }
  }
  //录音音频查看
  componentDidUpdate(preProps: IProps, preState: IState) {
      if (
          this.props.player && this.props.player.onAudioPlayerVisible &&
      this.state.audioVisible !== preState.audioVisible &&
      !this.state.audioVisible
      ) {
          this.startRecord(true);
      }
  }

  //停止录音
  handleStop = (e) => {
      const { onStop, player } = this.props;
      onStop && onStop(e);
      this.showAudio();
      if (player && player.onSrcChange) {
          this.recordUpload(e);
      } else {
          this.setState({
              audioSrc: window.URL.createObjectURL(
                  new Blob([e], { type: "audio/mp3" })
              ),
              loading: false,
              success: true,
              boldFile: e,
          });
      }
  };

  showAudio = () => {
      const { player } = this.props;
      if (player.onAudioPlayerVisible) {
          this.recorderRef.current.className = " exit";
          setTimeout(() => {
              this.recorderRef.current.innerHTML = "";
              this.setState({
                  audioVisible: true,
              });
          }, 500);
      }
  };

  recordUpload = (e) => {
      const { onSrcChange } = this.props.player;
      this.setState({
          loading: true,
      });
      onSrcChange(e)
          .then((src) => {
              this.setState({
                  audioSrc: src,
                  loading: false,
                  success: true,
                  boldFile: e,
              });
          })
          .catch((error) => {
              this.setState({
                  audioSrc: window.URL.createObjectURL(
                      new Blob([e], { type: "audio/mp3" })
                  ),
                  loading: false,
                  success: false,
                  boldFile: e,
              });
          });
  };

  reRender = () => {
      const { loading, success, boldFile } = this.state;
      if (loading) {
          return (
              <div className="leke-record-loading">
                  <RecordLoading />
              </div>
          );
      }
      if (!success) {
          return (
              <div className="leke-record-reUpload">
          上传失败，点击
                  <span
                      className="reUpload"
                      onClick={() => this.recordUpload(boldFile)}
                  >
            重新上传
                  </span>
              </div>
          );
      }
      return (
          <div
              className="leke-record-reRecord"
              onClick={() => {
                  this.props.onReRecorder && this.props.onReRecorder();
                  this.setState({
                      audioVisible: false,
                      audioSrc: "",
                  });
              }}
          >
        重录
          </div>
      );
  };

  getAudioProps = () => {
      const { player } = this.props;
      if(!player){
          return {};
      }
      const { onSrcChange,onAudioPlayerVisible,src,...audioProps} = player;
      return audioProps;
  }

  public render() {
      const { audioVisible, audioSrc, loading } = this.state;
      return (
          <div className="leke-record-container">
              {audioVisible ? (
                  <div className="leke-record-audio-wrap">
                      <div className="leke-record-audio-container">
                          {audioSrc ? <AudioPlayer src={audioSrc} {...this.getAudioProps.bind(this)} /> : null}
                      </div>
                      {this.reRender()}
                  </div>
              ) : (
                  <div ref={this.recorderRef}></div>
              )}
          </div>
      );
  }
}

export default AudioRecorder;
