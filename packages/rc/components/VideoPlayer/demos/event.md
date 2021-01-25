---    
title: 事件
description: 支持原有Video Element的原生事件。之外，提供额外的事件
---
## 事件

| 事件 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| onClick | 单击视频 | function | - |
| onDblclick | 双击视频 | function | - |
| onStart | 视频开始播放触发 | function | - |
| onTimeChange | 播放时间变更 | function | - |
| onVolumeChange | 音量变更 | function | - |
| onEntryFullscreen | 进入全屏 | function | - |
| onExitFullscreen | 退出全屏 | function | - |

```jsx
import React from 'react';
import {VideoPlayer} from '@leke/rc';

export default function(){
    return <div>
        <VideoPlayer 
            src='https://hls.cntv.kcdnvip.com/asp/hls/1200/0303000a/3/default/c9d6fcb3ff7e42f6b6db4199768ff249/1200.m3u8?maxbr=2048' 
            autoplay 
            onClick={()=>{
                console.log('%c 🍓 click: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', 'click');
            }}
            onEntryFullscreen={()=>{
                console.log('%c 🍱 onEntryFullscreen: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', 'onEntryFullscreen');
            }}
        />
            
    </div>
    ;
}
```