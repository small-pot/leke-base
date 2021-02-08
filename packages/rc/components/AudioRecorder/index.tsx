/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:34:16
 * @LastEditTime: 2021-02-08 14:42:34
 */
import * as React from "react";
import { AudioRecorder as Recorder } from "@leke/AV";
import AudioPlayer, { AudioPlayerProps } from "../AudioPlayer";
import { RecordLoading } from "@leke/icons";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "@leke/http";
type Player = AudioPlayerProps;
interface AudioUpload extends AxiosRequestConfig {
  success?: (res: any) => void;
  error?: (res: any) => void;
}
interface IProps {
  duration?: number; //录音限时
  audioPlayerVisible?: boolean; //是否展示音频
  player?: Player; //音频组件
  audioUpload?: AudioUpload; //音频上传
  onStart?: () => void; //开始录音回调
  onStop?: (e: any) => void; //结束录音回调
  onReRecorder?: () => void; //重录回调
}
interface IState {
  recorderStatus: boolean; //录音状态
  audioSrc: any; //音频地址
  loading: boolean; //是否上传中
  boldFile: any; //音频文件二进制流
  success: boolean; //是否上传成功
}

class AudioRecorder extends React.Component<IProps, IState> {
  recorderRef: React.RefObject<HTMLDivElement>;
  audioRef: React.RefObject<HTMLDivElement>;
  constructor(props) {
      super(props);
      this.recorderRef = React.createRef();
      this.audioRef = React.createRef();
      this.state = {
          recorderStatus: this.props.player && this.props.player.src ? true : false,
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
      if (!this.state.recorderStatus) {
          this.startRecord();
      }
  }
  //录音音频查看
  componentDidUpdate(preProps: IProps, preState: IState) {
      if (
          this.props.audioUpload &&
      this.props.audioUpload.url !== preProps.audioUpload.url
      ) {
          this.recordUpload();
      }
      if (
          this.state.recorderStatus !== preState.recorderStatus &&
      !this.state.recorderStatus
      ) {
          this.startRecord(true);
      }
  }

  //停止录音
  handleStop = (e) => {
      const { onStop, audioUpload } = this.props;
      onStop && onStop(e);
      const stateParams = {
          audioSrc: window.URL.createObjectURL(
              new Blob([e], { type: "audio/wav" })
          ),
          boldFile: e,
      };
      this.showAudio();
      if (audioUpload) {
          this.setState({
              ...stateParams,
          });
          this.recordUpload();
      } else {
          this.setState({
              ...stateParams,
              loading: false,
              success: true,
          });
      }
  };

  showAudio = () => {
      const { audioPlayerVisible } = this.props;
      if (audioPlayerVisible) {
          this.recorderRef.current.className = " exit";
          setTimeout(() => {
              this.recorderRef.current.innerHTML = "";
              this.setState({
                  recorderStatus: true,
              });
          }, 500);
      }
  };

  recordUpload = () => {
      const { audioUpload } = this.props;
      this.setState({
          loading: true,
      });
      console.log("audioUpload", audioUpload);
      if (!audioUpload.url) {
          return;
      }
      http({ ...audioUpload })
          .then((res) => {
              this.setState({
                  loading: false,
                  success: true,
              });
              audioUpload.success && audioUpload.success(res);
          })
          .catch((error) => {
              this.setState({
                  loading: false,
                  success: false,
              });
              audioUpload.error && audioUpload.error(error);
          });
  };

  reRender = () => {
      const { loading, success } = this.state;
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
                  <span className="reUpload" onClick={() => this.recordUpload()}>
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
                      recorderStatus: false,
                      audioSrc: "",
                  });
              }}
          >
        重录
          </div>
      );
  };

  public render() {
      const { recorderStatus, audioSrc, loading } = this.state;
      console.log(recorderStatus);
      return (
          <div className="leke-record-container">
              {recorderStatus ? (
                  <div className="leke-record-audio-wrap">
                      <div className="leke-record-audio-container">
                          {audioSrc && !loading ? (
                              <AudioPlayer src={audioSrc} {...this.props.player} />
                          ) : null}
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
