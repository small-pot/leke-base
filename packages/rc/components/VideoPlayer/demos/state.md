---    
title: 受控组件
---
```jsx
import React,{useState} from 'react';
import {VideoPlayer} from '@leke/rc';

export default function(){
    const [paused,setPaused]=useState(true);
    const [time,setTime]=useState(0);
    const [volume,setVolume]=useState(60);
    const [full,setFull]=useState(false);
    React.useEffect(()=>{
        if(volume!==null && volume!==undefined){
            setVolume;
        }

    },[volume]);

    return <div>
        <VideoPlayer 
            src='https://file.leke.cn/group1/M00/1C/4C/wKgURF8D3rGAIVVHAAAEX_O0MzM97.m3u8' 
            paused={paused}
            fullscreen={full}
            onPauseChange={(paused)=>{
                setPaused(paused);
            }}
            onTimeChange={time=>{
                setTime(time);
            }}
            onVolumeChange={volume=>{
                setVolume(volume);
            }}
            onFullscreenChange={full=>{
                setFull(full);
            }}
        />
        <div style={{marginTop:12}}>
            <button onClick={()=>{
                paused?setPaused(false):setPaused(true);
            }}>暂停/播放</button>
        </div>
    </div>
    ;
}
```
