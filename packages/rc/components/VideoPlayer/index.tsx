import React, { useEffect, useRef,useMemo, forwardRef } from "react";
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
    const player=useRef({});

    const init=()=>{
        const instance=player.current= new VideoPlayer({
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
            instance.trigger('pausedState',onPauseChange);
        }
        instance.on('timeupdate',(time)=>{
            onTimeChange&&onTimeChange(time);
        });
        if(volume!==undefined){
            instance.trigger('volumeState',onVolumeChange);
        }
        instance.on('volumeState',onVolumeChange);
        if(fullscreen!==undefined){
            instance.trigger('fullscreenState',onFullscreenChange);
        }
        if(ref)ref.current=player.current;
    };

    useEffect(() => {
        init();
        return ()=>{
            const instance=player.current as any;
            instance.destory();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(paused!==undefined){
            const instance=player.current as any;
            if(instance.video.paused!==paused){
                paused?instance.video.pause():instance.video.play();
            }
        }
    }, [paused]);

    useEffect(() => {
        if(volume!==undefined){
            const instance=player.current as any;
            if(volume!==0)instance.trigger('preVolume',volume);
            instance.trigger('volumeChange',volume);
        }
    }, [volume]);

    useEffect(() => {
        if(fullscreen!==undefined){
            const instance=player.current as any;
            if(instance.isFullscreen!==fullscreen){
                fullscreen?instance.trigger('entryFullscreen'):instance.trigger('exitFullscreen');
            }
        }
    }, [fullscreen,onFullscreenChange]);

    return <div ref={el} className={wrapClassName} style={{width:cWidth,height:cHeight}}></div>;
};

export default forwardRef(Video);