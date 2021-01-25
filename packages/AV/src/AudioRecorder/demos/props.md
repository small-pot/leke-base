---
title: 构造函数配置项
---

| 属性             | 说明                                                                                                      | 类型        | 默认值                        |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------- |
| el               | 需要放置录音的外部元素                                                                                    | HTMLElement | -                             |
| duration         | 录音限时时长                                                                                              | number      | 默认 500s                     |
| onStart          | 开始录音回调                                                                                              | boolean     | -                             |
| onStop           | 停止录音回调                                                                                              | function    | -                             |
| getRecorderAudio | 获取录音文件                                                                                              | function    | 默认 'bold' 'base64' \|'bold' |
| ondataavailable  | 当 MediaRecorder 将媒体数据传递到您的应用程序以供使用时，将触发该事件。数据在包含数据的 Blob 对象中提供。 | function    | bold                          |
