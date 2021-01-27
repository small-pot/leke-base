---    
title: API
description: 可以用ref获取到实例
---
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| wrapClassName | 容器类命 | string | - |
| src | 资源路径 | string | - |
| width | 宽度 | number | 638 |
| height | 高度 | number | 358 |
| autoplay | 自动播放 | boolean | false |
| loop | 循环播放 | boolean | false |
| poster | 视频封面 | string | - |
| paused | 是否暂停 | boolean | false |
| volume | 音量 | number | 100 |
| fullscreen | 是否全屏(不支持初始化为true) | boolean | false |
| onReady | 切换暂停/组件SourceBuffer加载完成后的回调 | function | - |
| onLoad | 组件媒体信息获取完毕后的回调 | function | - |
| onStart | 视频开始播放的回调 | function | - |
| onPausedChange | 切换暂停/播放时触发 | function | - |
| onTimeChange | 播放时间变更 | function | - |
| onVolumeChange | 音量变更 | function | - |
| onFullscreenChange | 进入/退出全屏 | function | - |
| ref | 获取挂载实例,实例的属性video可以获取到Video Element对象 | ref | - |