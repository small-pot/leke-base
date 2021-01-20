
export interface IVideoProps {
    // 给容器添加类名
    wrapClassName?: string;
    // 宽度
    width?:number;
    // 高度
    height?:number;
    // 资源路径
    src:string;
    // 自动播放
    autoPlay?: boolean;
    // 循环播放
    loop?: boolean;
    // 视频封面
    poster?: string;
    // 静音
    muted?: boolean;
    // 视频挂载完成
    onReady?:()=>void;
    // 单击视频
    onClick?:()=>void;
    // 双击视频
    onDblclick?:()=>void;
    // 视频开始播放触发
    onStart?:()=>void;
    // 播放时间变更
    onTimeChange?:(time:number)=>void;
    // 音量变更
    onVolumeChange?:(volumn:number)=>void;
    //  进入全屏
    onEntryFullscreen?:()=>void;
    //  退出全屏
    onExitFullscreen?:()=>void;
  }