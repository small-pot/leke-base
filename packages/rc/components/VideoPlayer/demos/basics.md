---    
title: 基本用法
---
```jsx
import React from 'react';
import {VideoPlayer} from '@leke/rc';

export default function(){
    return <VideoPlayer 
        src='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' 
        autoplay
    />
    ;
}
```
