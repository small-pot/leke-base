/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-01-19 17:56:16
 */
import React from 'react';
import AudioPlayerCls from '../../../AV/src/AudioPlayer';

const noop = ()=>{};
interface AudioPlayerProps {
    id:string,
    src:string,
    autoplay?:boolean,
    loop?:boolean,
    allowSeek?:boolean,
    preload?:'none' | 'metadata' | 'auto' | '',
    timeFormat?:(val:number)=>string,
    onAudioProcess:(e:Event)=>void,
    onCanplay:(e:Event)=>void,
    onCanplayThrough:(e:Event)=>void,
    onDurationChange:(e:Event)=>void,
    onEmptied:(e:Event)=>void,
    onEnded:(e:Event)=>void,
    onLoadedData:(e:Event)=>void,
    onLoadedMetaData:(e:Event)=>void,
    onPause:(e:Event)=>void,
    onPlay:(e:Event)=>void,
    onPlaying:(e:Event)=>void,
    onRateChange:(e:Event)=>void,
    onSeeked:(e:Event)=>void,
    onSeeking:(e:Event)=>void,
    onStalled:(e:Event)=>void,
    onSuspend:(e:Event)=>void,
    onTimeUpdate:(e:Event)=>void,
    onVolumeChange:(e:Event)=>void,
    onWaiting:(e:Event)=>void,
}
const AudioPlayer = (props:AudioPlayerProps,ref) => {
    React.useEffect(() => {
        const {id,src='',autoplay=false,loop=false,preload='metadata',allowSeek=true,timeFormat} = props;
        console.log(props);
        const audioPlayer = new AudioPlayerCls({
            el:document.querySelector(`#${id}`),
            src:src,
            autoplay:autoplay,
            loop:loop,
            preload:preload,
            timeFormat:timeFormat,
            allowSeek,
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
    }, [props,ref]);
    return (
        <div id={props.id} />
    );
};

export default React.forwardRef(AudioPlayer);
