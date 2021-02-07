<!--
 * @Descripttion: 
 * @Author: gulingxin
 * @Date: 2021-02-07 17:23:06
 * @LastEditTime: 2021-02-07 18:06:09
-->
---

title: 功能拓展
description: 展示录音音频
---

```jsx
import React, { useState, useCallback, useEffect } from "react";
import { AudioRecorder } from "@leke/rc";
import http from "@leke/http";

export default function () {
    // const [boldFile, setBoldFile] = useState("");

    const onStart = () => {
        console.log("start");
    };
    const onStop = (e) => {
        // setBoldFile(e);
    };

    // const loadSrc = async (boldFile) => {
    //     if (!boldFile) {
    //         return;
    //     }
    //     let baseFile = await blobToDataURI(boldFile);

    //     const number = 8;
    //     //检索头部关键词位置
    //     const pos = baseFile.search(";base64,");
    //     //去头部
    //     baseFile = baseFile.slice(pos + number, baseFile.length);
    //     return new Promise((reslove) => {
    //         setTimeout(()=>{
    //             reslove('111');
    //         },3000)
    //     });
    // };
    const onReRecorder = () => {
        console.log("重新录音");
    };
    const blobToDataURI = (blob) => {
        return new Promise(function (reolove, reject) {
            const reader = new FileReader();
            reader.onload = function (e) {
                reolove(e.target.result);
            };
            reader.readAsDataURL(blob);
        });
    };
    const player = {
        onAudioPlayerVisible:true,
        // onSrcChange:loadSrc
    };
    return (
        <>
            <AudioRecorder
                // loadSrc={loadSrc}
                duration="5"
                onStart={onStart}
                onStop={onStop}
                player={player}
                onReRecorder={onReRecorder}
            />
        </>
    );
}
```

```css

```
