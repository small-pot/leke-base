---
title: API
---

为录音组件设定个性化配置

| 属性         | 说明         | 类型     | 默认值    |
| ------------ | ------------ | -------- | --------- |
| el       | 需要放置播放器的外部元素 | HTMLElement   | -          |
| player          | 音频组件     |   {onAudioVisible://是否展示音频,onSrcChange://业务方音频地址发生变化,...audioProps} | -         |
| duration     | 录音限时时长 | number   | 默认 500s |
| onStart      | 开始录音回调 | boolean  | -         |
| onStop       | 停止录音回调 | function | bold      |
| onReRecorder | 重新录音回调 | function | -         |
