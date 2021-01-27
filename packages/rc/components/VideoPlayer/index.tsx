import React, {useImperativeHandle,createRef} from "react";
import { IVideoProps } from "./type";
import {getVideoSize} from './utils';
import {VideoPlayer} from '@leke/AV';

class Video extends React.PureComponent<IVideoProps>{
    ref =createRef<HTMLDivElement>()
    instance: any;
    componentDidMount(){
        const {
            src,
            autoplay,
            width,
            height,
            loop,
            poster,
            paused,
            volume,
            fullscreen,
            onReady,
            onLoad,
            onStart,
            onPausedChange,
            onTimeChange,
            onVolumeChange,
            onFullscreenChange
        }=this.props;

        this.instance=new VideoPlayer({
            el:this.ref.current,
            src,
            width,
            height,
            autoplay:paused?false:autoplay,
            loop,
            poster,
            muted:volume===0,
            onReady,
            onLoad,
            onStart,
            onPausedChange:paused?onPausedChange:null,
            onVolumeChange:volume?onVolumeChange:null,
            onFullscreenChange:fullscreen?onFullscreenChange:null,
        });

        !paused&&onPausedChange&&this.instance.on('click',(status)=>{
            onPausedChange(status);
        });

        !volume&&onVolumeChange&&this.instance.on('volumeChange',(step)=>{
            onVolumeChange(step);
        });
        
        !fullscreen&&onFullscreenChange&&this.instance.on('fullscreenChange',(status)=>{
            onFullscreenChange(status);
        });

        onTimeChange&&this.instance.on('timeupdate',(time)=>{
            onTimeChange(time);
        });
    }
    
    componentDidUpdate(prevProps){
        const {paused,volume,fullscreen}=this.props;
        if(prevProps.paused!==paused){
            paused?this.instance.video.pause():this.instance.video.play();
        }
        if(prevProps.paused!==volume){
            if(volume!==0)this.instance.trigger('preVolume',volume);
            this.instance.trigger('volumeChange',volume);
        }
        if(prevProps.fullscreen!==fullscreen){
            fullscreen?this.instance.trigger('entryFullscreen'):this.instance.trigger('exitFullscreen');
        }
    }

    render(){
        const {wrapClassName}=this.props;
        const [width,height]=getVideoSize(this.props.width,this.props.height);
        return <div ref={this.ref} className={wrapClassName} style={{width,height}}></div>;
    }
}


export default React.forwardRef((props:IVideoProps,ref:any)=>{
    useImperativeHandle(ref, ()=>{
        return ref.current.instance;
    }, [ref]);
    return (<Video {...props} ref={ref}/>);
});
