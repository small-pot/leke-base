/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-01-19 15:52:51
 */
import React from 'react';
import AudioPlayerCls from '../../../AV/src/AudioPlayer';
const AudioPlayer = (props) => {
    React.useEffect(() => {
        const {source,autoplay,loop,preload,timeFormat,allowSeek} = props;
        const audioPlayer = new AudioPlayerCls({
            el:'#audio-player',
            source:source,
            autoplay:autoplay,
            loop:loop,
            preload:preload,
            timeFormat:timeFormat,
            allowSeek,
            
        });
    }, [props]);
    return (
        <div id="audio-player" />
    );
};
AudioPlayer.defaultProps = {
    source:'',
    loop:false,
    autoplay:false,
    allowSeek:true,
    preload:'metadata',
};

export default AudioPlayer;
