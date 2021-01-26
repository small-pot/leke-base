---
title: 功能拓展
description: 展示录音音频
---

```jsx
import React from "react";
import { AudioRecorder } from "@leke/rc";

export default function () {
    const onStart = () => {
        console.log("start");
    };
    const onStop = (e) => {
        console.log(e);
    };
    const handleAudioUpdate = (e) => {
        console.log(e);
    };
    const onReRecorder = () => {
        console.log('重新录音');
    };
    return (
        <>
            <AudioRecorder onStart={onStart} onStop={onStop} isViewAudio onReRecorder={onReRecorder} />
        </>
    );
}
```

```css

```
