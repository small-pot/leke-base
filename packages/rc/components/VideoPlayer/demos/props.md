---    
title: Props
description: 实列会暴露挂载的Video Element，可以取到所有的原生属性。之外，提供额外的属性
---
## 属性

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| video | Video Element | element | - |
| isFullscreen | 是否处于全屏 | boolean | false |


```jsx
import React,{useRef} from 'react';
import {VideoPlayer} from '@leke/rc';

export default function(){
    const ref=useRef();
    return <div>
        <VideoPlayer src='https://file.leke.cn/group1/M00/1C/4C/wKgURF8D3rGAIVVHAAAEX_O0MzM97.m3u8' autoplay ref={ref} />
        <button onClick={()=>{
            const player=ref.current;
            console.log('isFullscreen,',player.isFullscreen);
            console.log('Video Element,',player.video);
        }}>点我查看属性</button>
    </div>
    ;
}
```
