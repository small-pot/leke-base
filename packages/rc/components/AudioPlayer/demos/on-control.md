---    
title: 受控组件
description: 提供受控的方法
---
```jsx
import React from 'react';
import {AudioPlayer,Button} from '@leke/rc';


export default function(){
    const audioPlayerRef = React.useRef(null);
    const options = {
        id: 'audio-player-control',
        source:'http://music.163.com/song/media/outer/url?id=493735012.mp3',
        loop:false,
        autoplay:false,
        allowSeek:true,
        preload:'metadata',
    };
    return <> 
        <AudioPlayer ref={audioPlayerRef} {...options}/>
        <br/>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.play();}}>play</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.pause();}}>pause</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.togglePlay();}}>toggle play</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.seek(20);}}>seek at 20s</Button>
    </>;
}
```
```css
.audio-button{
    margin-right: 8px;
}
```

