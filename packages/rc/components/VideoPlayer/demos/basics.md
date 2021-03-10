---    
title: 基本用法
---
```jsx
import React from 'react';
import {VideoPlayer} from '@leke/rc';

export default function(){
    return <VideoPlayer 
        src='https://hls.cntv.kcdnvip.com/asp/hls/1200/0303000a/3/default/c9d6fcb3ff7e42f6b6db4199768ff249/1200.m3u8?maxbr=2048' 
        autoplay
    />
    ;
}
```
