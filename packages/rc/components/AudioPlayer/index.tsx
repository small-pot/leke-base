/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-01-20 17:42:22
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
}

const AudioPlayer = (props:AudioPlayerProps,ref) => {
    const {className,style,src='',autoplay=false,paused,loop=false,preload='metadata',allowSeek=true,timeFormat} = props;
    const audioRef = React.useRef<AudioPlayerCls>(null);
    const $audioContainer = React.useRef<HTMLDivElement>(null);
    React.useEffect(()=>{
        if (audioRef.current) {
            audioRef.current.configOptions({
                src,autoplay,loop,preload,allowSeek
            });
        }else{
            init();
        }
    },[src,autoplay,loop,preload,allowSeek]);
    React.useEffect(()=>{
        if (paused!==null && paused!==undefined) {
            if (audioRef.current) {
                paused?audioRef.current.pause():audioRef.current.play();
            }
        }
    },[paused]);

    const init = () => {
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
        audioPlayer.on('audioprocess',props.onAudioProcess || noop);
        audioPlayer.on('canplay',props.onCanplay || noop);
        audioPlayer.on('canplaythrough',props.onCanplayThrough || noop);
        audioPlayer.on('durationchange',props.onDurationChange || noop);
        audioPlayer.on('emptied',props.onEmptied || noop);
        audioPlayer.on('ended',props.onEnded || noop);
        audioPlayer.on('loadeddata',props.onLoadedData || noop);
        audioPlayer.on('loadedmetadata',props.onLoadedMetaData || noop);
        audioPlayer.on('pause',props.onPause || noop);
        audioPlayer.on('play',props.onPlay || noop);
        audioPlayer.on('playing',props.onPlaying || noop);
        audioPlayer.on('ratechange',props.onRateChange || noop);
        audioPlayer.on('seeked',props.onSeeked || noop);
        audioPlayer.on('seeking',props.onSeeking || noop);
        audioPlayer.on('stalled',props.onStalled || noop);
        audioPlayer.on('suspend',props.onSuspend || noop);
        audioPlayer.on('timeupdate',props.onTimeUpdate || noop);
        audioPlayer.on('volumechange',props.onVolumeChange || noop);
        audioPlayer.on('waiting',props.onWaiting || noop);
        if (ref) {
            ref.current = audioPlayer;
        }
        audioRef.current = audioPlayer;

    };
    return (
        <div ref={$audioContainer} className={className} style={style}/>
    );
};

export default React.forwardRef(AudioPlayer);
