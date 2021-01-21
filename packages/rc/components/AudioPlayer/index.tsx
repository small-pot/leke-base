/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-01-21 15:08:38
 */
import React from 'react';
import {AudioPlayer as AudioPlayerCls,AudioPlayerNativeEvent} from '@leke/AV';

const noop = ()=>{};
interface AudioPlayerProps extends Partial<AudioPlayerNativeEvent> {
    className?:string,
    style?:object,
    src?:string,
    paused?:boolean,
    autoplay?:boolean,
    loop?:boolean,
    allowSeek?:boolean,
    preload?:'none' | 'metadata' | 'auto' | '',
    timeFormat?:(num:number)=>string
}

const AudioPlayer = (props:AudioPlayerProps,ref) => {
    const {className,style,src='',autoplay=false,paused,loop=false,preload='metadata',allowSeek=true,timeFormat,...eventProps} = props;
    const audioRef = React.useRef<AudioPlayerCls>(null);
    const $audioContainer = React.useRef<HTMLDivElement>(null);
    const init = React.useCallback(
        () => {
            const audioPlayer = new AudioPlayerCls({
                el:$audioContainer.current,
                src:src,
                autoplay:autoplay,
                loop:loop,
                preload:preload,
                timeFormat:timeFormat,
                allowSeek,
                allowPlayControl:!(paused!==null && paused!==undefined),
            });
            Object.keys(eventProps).forEach((key)=>{
                if(/^on/.test(key)){
                    const eventName=key.replace(/^on([A-Z])/,($0,$1)=>{
                        return $1.toLowerCase();
                    });
                    audioPlayer.on(eventName,eventProps[key] || noop);
                }
            });
            if (ref) {
                ref.current = audioPlayer;
            }
            audioRef.current = audioPlayer;
    
        },[allowSeek, autoplay, eventProps, loop, paused, preload, ref, src, timeFormat]
    ); 
    React.useEffect(()=>{
        if (audioRef.current) {
            audioRef.current.configOptions({
                src,autoplay,loop,preload,allowSeek
            });
        }else{
            init();
        }
    },[src,autoplay,loop,preload,allowSeek,init]);
    
    React.useEffect(()=>{
        if (paused!==null && paused!==undefined) {
            if (audioRef.current) {
                paused?audioRef.current.pause():audioRef.current.play();
            }
        }
    },[paused]);


    return (
        <div ref={$audioContainer} className={className} style={style}/>
    );
};

export default React.forwardRef(AudioPlayer);
