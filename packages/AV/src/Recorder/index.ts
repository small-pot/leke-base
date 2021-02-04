/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:31:05
 * @LastEditTime: 2021-02-04 16:31:19
 */
import AudioPlayer from "../AudioPlayer";
import AudioRecorder from "../AudioRecorder";
const AudioHtml = `
<div class='record-audio-wrap'>
    <div class='record-audio-container'>
    </div>
    <div class='record-reRecord'>重录</div>
</div>
`;

class Recorder {
  cfg: any;
  isViewAudio?: boolean; //是否展示录音音频
  duration?: number; //录音限时
  url?: number; //音频地址
  onStart?: () => void; //开始录音回调
  onStop?: (e: any) => void; //结束录音回调
  onReRecorder?: () => void; //重录回调
  reRecorder: any;
  recorderAudio: BlobPart;
  audioContainer: any;
  recorder: AudioRecorder;
  constructor(cfg) {
      this.cfg = arguments.length ? cfg : null;
      this.init();
  }
  init() {
      require("./index.less");
      if (this.cfg && this.cfg.url) {
          this.initAudio();
      } else {
          this.initRecorder(false);
      }
  }
  initEvent() {
      const self = this;
      this.reRecorder &&
      this.reRecorder.addEventListener("click", function () {
          const { el } = self.cfg;
          self.onReRecorder && self.onReRecorder();
          el.innerHTML = "";
          self.initRecorder(true);
      });
  }
  initAudio() {
      const { el, url } = this.cfg;
      const src = url
          ? url
          : window.URL.createObjectURL(
              new Blob([this.recorderAudio], { type: "audio/wav" })
          );
      el.innerHTML = AudioHtml;
      this.audioContainer = el.querySelector(".record-audio-container");
      this.reRecorder = el.querySelector(".record-reRecord");
      const audio = new AudioPlayer({
          el: this.audioContainer,
          src,
      });
      this.initEvent();
  }
  initRecorder(isPlay) {
      const self = this;
      this.recorder = new AudioRecorder({
          el: this.cfg.el,
          duration: this.cfg.duration,
      });
      this.recorder.onStart = this.cfg.onStart;
      this.recorder.onStop = function (e) {
          self.handleStop(e);
      };
      if (isPlay) {
          this.recorder.startRecord();
      }
  }
  handleStop(event) {
      this.cfg.onStop && this.cfg.onStop(event);
      this.recorderAudio = event;
      this.cfg.el.className += " exit";
      setTimeout(() => {
          this.cfg.el.innerHTML = "";
          this.initAudio();
      }, 500);
  }
}
export default Recorder;
