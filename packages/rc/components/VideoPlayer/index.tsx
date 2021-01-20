import React, { useEffect, useRef, forwardRef } from "react";
import { IVideoProps } from "./type";
import {VideoPlayer} from '@leke/AV';
import {newUID} from './uid';

const prefixCls = "leke-video";
const EVENTS=['click','dblclick','start','timeChange','volumeChange','entryFullscreen','exitFullscreen'];

const Video = (props:IVideoProps,ref) => {
    const {
        wrapClassName,
        onReady,
        onClick,
        onDblclick,
        onStart,
        onTimeChange,
        onVolumeChange,
        onEntryFullscreen,
        onExitFullscreen,
        ...config
    }=props;

    const space=useRef({
        uid:`${prefixCls}-${newUID()}`
    });

    const initEvents=(player)=>{
        const reg=/([a-z]?)(\w+)/;
        EVENTS.forEach(action=>{
            const actName=action.replace(reg,(...args)=>`on${args[1].toUpperCase()}${args[2]}`);
            if(props[actName]){
                player.on(action,props[actName]);
            }
        });
    };

    useEffect(() => {
        const player=new VideoPlayer({
            el:document.querySelector(`#${space.current.uid}`),
            ...config
        });
        initEvents(player);
        if(ref)ref.current=player;

        return ()=>{
            player.destory();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id={space.current.uid} key={space.current.uid} className={wrapClassName}></div>;
};

export default forwardRef(Video);