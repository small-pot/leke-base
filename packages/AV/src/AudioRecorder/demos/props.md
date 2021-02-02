<!--
 * @Descripttion: 
 * @Author: gulingxin
 * @Date: 2021-01-25 11:11:57
 * @LastEditTime: 2021-01-29 11:10:12
-->
---    
title: API
description: 可以用ref获取到实例
---
为录音组件设定个性化配置

| 属性            | 说明                                                                                                    | 类型     | 默认值    |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------- | --------- |
| url        | 录音音频                                                                                            | number   | - |
| duration        | 录音限时时长                                                                                            | number   | 默认 500s |
| isViewAudio     | 是否查看音频                                                                                            | boolean  | false     |
| onStart         | 开始录音回调                                                                                            | boolean  | -         |
| onStop          | 停止录音回调                                                                                            | function | bold      |
| onDataAvailable | 当 MediaRecorder 将媒体数据传递到您的应用程序以供使用时，将触发该事件。数据在包含数据的 Blob 对象中提供 | function | event     |
| onReRecorder | 重新录音回调| function | -     |
