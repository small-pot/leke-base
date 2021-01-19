
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
  }