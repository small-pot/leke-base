---
title: 构造函数配置项
---

| 属性          | 说明                   | 类型        | 默认值                    |
| ------------- | ---------------------- | ----------- | ------------------------- |
| el            | 需要放置录音的外部元素 | HTMLElement | -                         |
| duration      | 录音限时时长           | number      | 默认 500s                 |
| onStart       | 开始录音回调           | boolean     | -                         |
| onStop        | 停止录音回调           | function    | -                         |
| onAudioUpdate | 录音文件更新           | function    | event:{boldFile,baseFile} |
