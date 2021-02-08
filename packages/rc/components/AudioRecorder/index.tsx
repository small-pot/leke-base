/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:34:16
 * @LastEditTime: 2021-02-08 11:42:46
 */
import * as React from "react";
import { AudioRecorder as Recorder } from "@leke/AV";
import AudioPlayer,{ AudioPlayerProps }  from "../AudioPlayer";
import { RecordLoading } from "@leke/icons";
import {AxiosRequestConfig,AxiosResponse} from 'axios';
import http from '@leke/http';
export interface httpRequest extends AxiosRequestConfig{
    reset?:boolean,
}
export interface createOption extends AxiosRequestConfig{
    requestInterceptor?:(config:httpRequest)=>httpRequest,
    responseInterceptor?:<T=any>(res:AxiosResponse)=>T
}
type Player = {
    onAudioPlayerVisible?:boolean; //是否展示音频
} & AudioPlayerProps;
interface IProps {
  duration?: number; //录音限时
  player?: Player; //音频组件
  httpOption?:createOption; //http上传数据
  onHttpChange?:({success,res}:{success:boolean,res:any}) => void;    //音频上传
  onStart?: () => void; //开始录音回调
  onStop?: (e: any) => void; //结束录音回调
  onReRecorder?: () => void; //重录回调
}
interface IState {
  recorderStatus: boolean;    //录音状态
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
      console.log('httpOption',this.props.httpOption);
      if(this.props.httpOption !== preProps.httpOption){
          this.recordUpload();
      }
      if (
          this.props.player && this.props.player.onAudioPlayerVisible &&
        this.state.recorderStatus !== preState.recorderStatus &&
        !this.state.recorderStatus
      ) {
          this.startRecord(true);
      }
  }

  //停止录音
  handleStop = (e) => {
      const { onStop, player,httpOption } = this.props;
      onStop && onStop(e);
      const stateParams = {
          audioSrc: window.URL.createObjectURL(
              new Blob([e], { type: "audio/wav" })
          ),
          boldFile: e,
      };
      this.showAudio();
      if (httpOption) {
          this.setState({
              ...stateParams
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
      const { player } = this.props;
      if (player.onAudioPlayerVisible) {
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
      const { httpOption,onHttpChange } = this.props;
      this.setState({
          loading: true,
      });
      if(!Object.keys(httpOption).length){
          return;
      }
      http(httpOption).then((res)=>{
          this.setState({
              loading: false,
              success: true,
          });
          onHttpChange && onHttpChange({success:true,res});
      }).catch((error)=>{
          this.setState({
              loading: false,
              success: false,
          });
          onHttpChange && onHttpChange({success:false,res:error});
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
                  <span
                      className="reUpload"
                      onClick={() => this.recordUpload()}
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
                      recorderStatus: false,
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
      const { onAudioPlayerVisible,src,...audioProps} = player;
      return audioProps;
  }

  public render() {
      const { recorderStatus, audioSrc, loading } = this.state;
      return (
          <div className="leke-record-container">
              {recorderStatus ? (
                  <div className="leke-record-audio-wrap">
                      <div className="leke-record-audio-container">
                          {audioSrc && !loading ? <AudioPlayer src={audioSrc} {...this.getAudioProps.bind(this)} /> : null}
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
