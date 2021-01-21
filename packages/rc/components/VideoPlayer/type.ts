
export interface IVideoProps {
    // 给容器添加类名
    wrapClassName?: string;
    // 资源路径
    src:string;
    // 宽度
    width?:number;
    // 高度
    height?:number;
    // 自动播放
    autoplay?: boolean;
    // 循环播放
    loop?: boolean;
    // 视频封面
    poster?: string;
    // 暂停
    paused?:boolean
    // 音量
    volume?:number;
    // 全屏
    fullscreen?: boolean;
    // 播放状态
    onPauseChange?:(pasued:boolean)=>void;
    // 播放时间变更
    onTimeChange?:(time:number)=>void;
    // 音量变更
    onVolumeChange?:(volumn:number)=>void;
    // 进入全屏
    onFullscreenChange?:(isFullscreen:boolean)=>void;
  }