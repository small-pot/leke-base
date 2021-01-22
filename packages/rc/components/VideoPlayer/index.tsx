import React, {useEffect, useRef, useMemo, forwardRef, useImperativeHandle} from "react";
import { IVideoProps } from "./type";
import {getVideoSize} from './utils';
import {VideoPlayer} from '@leke/AV';

const Video = (props:IVideoProps,ref) => {
    const {
        wrapClassName,
        src,
        width,
        height,
        autoplay,
        loop,
        poster,
        paused,
        volume,
        fullscreen,
        onPauseChange,
        onTimeChange,
        onVolumeChange,
        onFullscreenChange
    }=props;

    const [cWidth,cHeight]=useMemo(()=>{return getVideoSize(width,height);},[width,height]);
    const el=useRef(null);
    const player=useRef(null);

    useImperativeHandle(ref,()=>{
        return player.current
    },[ref])

    useEffect(() => {
        player.current= new VideoPlayer({
            el:el.current,
            src,
            width,
            height,
            autoplay:paused?false:autoplay,
            loop,
            poster,
            muted:volume===0
        });
        if(paused!==undefined){
            player.current.trigger('pausedState',onPauseChange);
        }
        player.current.on('timeupdate',(time)=>{
            onTimeChange&&onTimeChange(time);
        });
        if(volume!==undefined){
            player.current.trigger('volumeState',onVolumeChange);
        }
        player.current.on('volumeState',onVolumeChange);
        if(fullscreen!==undefined){
            player.current.trigger('fullscreenState',onFullscreenChange);
        }
        return ()=>{
            player.current.destory();
        };
    }, [player]);

    useEffect(() => {
        if(paused!==undefined){
            if(player.current.video.paused!==paused){
                paused?player.current.video.pause():player.current.video.play();
            }
        }
    }, [paused]);

    useEffect(() => {
        if(volume!==undefined){
            if(volume!==0)player.current.trigger('preVolume',volume);
            player.current.trigger('volumeChange',volume);
        }
    }, [volume]);

    useEffect(() => {
        if(fullscreen!==undefined){
            if(player.current.isFullscreen!==fullscreen){
                fullscreen?player.current.trigger('entryFullscreen'):player.current.trigger('exitFullscreen');
            }
        }
    }, [fullscreen,onFullscreenChange]);

    return <div ref={el} className={wrapClassName} style={{width:cWidth,height:cHeight}}></div>;
};

export default forwardRef(Video);