/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-01-19 17:37:35
 */
import React from 'react';
import AudioPlayerCls from '../../../AV/src/AudioPlayer';

interface AudioPlayerProps {
    id:string,
    src:string,
    autoPlay?:boolean,
    loop?:boolean,
    allowSeek?:boolean,
    preload?:'none' | 'metadata' | 'auto' | '',
    timeFormat?:(val:number)=>string
}
const AudioPlayer = (props:AudioPlayerProps,ref) => {
    React.useEffect(() => {
        const {id,src='',autoPlay=false,loop=false,preload='metadata',allowSeek=true,timeFormat} = props;
        console.log(props);
        const audioPlayer = new AudioPlayerCls({
            el:document.querySelector(`#${id}`),
            src:src,
            autoPlay:autoPlay,
            loop:loop,
            preload:preload,
            timeFormat:timeFormat,
            allowSeek,
        });
        if (ref) {
            ref.current = audioPlayer;
        }
    }, [props,ref]);
    return (
        <div id={props.id} />
    );
};

export default React.forwardRef(AudioPlayer);
