/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-01-19 16:23:10
 */
import React from 'react';
import AudioPlayerCls from '../../../AV/src/AudioPlayer';

interface AudioPlayerProps {
    id:string,
    source:string,
    autoplay?:boolean,
    loop?:boolean,
    allowSeek?:boolean,
    preload?:'none' | 'metadata' | 'auto' | '',
    timeFormat?:(val:number)=>string
}
const AudioPlayer = (props:AudioPlayerProps,ref) => {
    React.useEffect(() => {
        const {id,source='',autoplay=false,loop=false,preload='metadata',allowSeek=true,timeFormat} = props;
        console.log(props);
        const audioPlayer = new AudioPlayerCls({
            el:`#${id}`,
            source:source,
            autoplay:autoplay,
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
