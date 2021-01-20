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
    const space=useRef({
        prev:volume
    });

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
        if(volume!==undefined){
            instance.trigger('volumeState',onVolumeChange,volume);
        }
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
        if(volume!==undefined){
            const instance=player.current as any;
            if(volume!==(Number(instance.video.volume)*100)){
                let vol=volume;
                if(vol<=0)vol=0;
                if(vol>=100)vol=100;
                space.current.prev=vol;
                instance.trigger('volumeChange',vol);
            }
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

    return <div ref={el} className={wrapClassName}></div>;
};

export default forwardRef(Video);