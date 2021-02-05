/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:34:16
 * @LastEditTime: 2021-02-05 11:02:28
 */
import * as React from "react";
import { AudioRecorder as Recorder } from "@leke/AV";
import AudioPlayer,{ AudioPlayerProps }  from "../AudioPlayer";
import { RecordLoading } from "@leke/icons";

type AudioElement = {
  boldFile: any;
  baseFile: any;
};
interface IProps {
  isViewAudio?: boolean; //是否展示录音音频
  duration?: number; //录音限时
  player?: AudioPlayerProps; //音频组件
  onStart?: () => void; //开始录音回调
  onStop?: (e: any) => void; //结束录音回调
  onReRecorder?: () => void; //重录回调
  loadSrc?: any; //音频上传
}
interface IState {
  isSwitch: boolean;
  audioSrc: any;
  isLoading: boolean;
  boldFile: any;
  isSuccess: boolean;
}

class AudioRecorder extends React.Component<IProps, IState> {
  recorderRef: React.RefObject<HTMLDivElement>;
  audioRef: React.RefObject<HTMLDivElement>;
  constructor(props) {
      super(props);
      this.recorderRef = React.createRef();
      this.audioRef = React.createRef();
      this.state = {
          isSwitch: this.props.player ? true : false,
          audioSrc: this.props.player ? this.props.player.src : "",
          isLoading: false,
          boldFile: null,
          isSuccess: true,
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
      if (!this.props.player) {
          this.startRecord();
      }
  }
  //录音音频查看
  componentDidUpdate(preProps: IProps, preState: IState) {
      if (
          this.props.isViewAudio &&
      this.state.isSwitch !== preState.isSwitch &&
      !this.state.isSwitch
      ) {
          this.startRecord(true);
      }
  }

  //停止录音
  handleStop = (e) => {
      const { onStop, loadSrc } = this.props;
      onStop && onStop(e);
      this.showAudio();
      if (loadSrc) {
          this.recordUpload(e);
      } else {
          this.setState({
              audioSrc: window.URL.createObjectURL(
                  new Blob([e], { type: "audio/mp3" })
              ),
              isLoading: false,
              isSuccess: true,
              boldFile: e,
          });
      }
  };

  showAudio = () => {
      const { isViewAudio } = this.props;
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

  recordUpload = (e) => {
      const { loadSrc } = this.props;
      this.setState({
          isLoading: true,
      });
      loadSrc(e)
          .then((src) => {
              this.setState({
                  audioSrc: src,
                  isLoading: false,
                  isSuccess: true,
                  boldFile: e,
              });
          })
          .catch((error) => {
              this.setState({
                  audioSrc: window.URL.createObjectURL(
                      new Blob([e], { type: "audio/mp3" })
                  ),
                  isLoading: false,
                  isSuccess: false,
                  boldFile: e,
              });
          });
  };

  reRender = () => {
      const { isLoading, isSuccess, boldFile } = this.state;
      if (isLoading) {
          return (
              <div className="record-loading">
                  <RecordLoading />
              </div>
          );
      }
      if (!isSuccess) {
          return (
              <div className="record-reUpload">
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
              className="record-reRecord"
              onClick={() => {
                  this.props.onReRecorder && this.props.onReRecorder();
                  this.setState({
                      isSwitch: false,
                      audioSrc: "",
                  });
              }}
          >
        重录
          </div>
      );
  };

  public render() {
      const { isSwitch, audioSrc, isLoading } = this.state;
      const { player } = this.props;
      return (
          <div className="record-container">
              {isSwitch ? (
                  <div className="record-audio-wrap">
                      <div className="record-audio-container">
                          {audioSrc ? <AudioPlayer src={audioSrc} {...player} /> : null}
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
