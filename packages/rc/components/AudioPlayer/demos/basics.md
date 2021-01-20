---    
title: 基本用法
description: 音频基本使用
---
```jsx
import React from 'react';
import {AudioPlayer} from '@leke/rc';

export default function(){
    const options = {
        id: 'audio-player',
        src:'http://music.163.com/song/media/outer/url?id=493735012.mp3',
        loop:false,
        autoplay:false,
        allowSeek:true,
        preload:'metadata',
        onPlay:()=>{  //注册事件
            console.log('play');
        }
    };
    return <AudioPlayer {...options}/>;
}
```

