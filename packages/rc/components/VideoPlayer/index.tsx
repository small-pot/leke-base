import React, { useEffect, useRef, forwardRef } from "react";
import { IVideoProps } from "./type";
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

    const el=useRef(null);
    const player=useRef({});

    const init=()=>{
        const instance=player.current= new VideoPlayer({
            el:el.current,
            src,
            width,
            height,
            autoplay,
            loop,
            poster,
            muted:volume===0
        });
        if(paused!==undefined){
            instance.trigger('pausedState',onPauseChange);
        }
        instance.on('timeupdate',time=>{
            onTimeChange&&onTimeChange(time);
        });
        instance.on('volumeChange',volume=>{
            onVolumeChange&&onVolumeChange(volume);
        });
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
            if(instance.paused!==paused){
                paused?instance.video.pause():instance.video.play();
            }
        }
    }, [paused]);

    useEffect(() => {
        if(fullscreen!==undefined){
            const instance=player.current as any;
            if(instance.isFullscreen!==fullscreen){
                fullscreen?instance.trigger('entryFullscreen'):instance.trigger('exitFullscreen');
            }
        }
    }, [fullscreen,onFullscreenChange]);

    return <div ref={el} className={wrapClassName}></div>;
};

export default forwardRef(Video);