
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
    // 组件SourceBuffer加载完成后的回调
    onReady?:()=>void;
    // 组件媒体信息获取完毕后的回调
    onLoad?:()=>void;
    // 视频开始播放的回调
    onStart?:()=>void;
    // 播放状态
    onPausedChange?:(pasued:boolean)=>void;
    // 播放时间变更
    onTimeChange?:(time:number)=>void;
    // 音量变更
    onVolumeChange?:(volumn:number)=>void;
    // 进入全屏
    onFullscreenChange?:(isFullscreen:boolean)=>void;
  }