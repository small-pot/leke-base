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
    //     console.log("base", baseFile);
    //     return new Promise((reolove, reject) => {
    //         http({
    //             method: "post",
    //             url:
    //                 "https://webapp.leke.cn/auth/global/fs/upload/audio/base64.htm",
    //             // data: { file: baseFile, ext: "mp3", type: "audio" },
    //             data:`file=${baseFile}&ext=mp3&type=audio`
    //         })
    //             .then((res) => {
    //                 const SUCCESS = 200;
    //                 if (res.status === SUCCESS && res.data.success) {
    //                     reolove(res.data.datas.url)
    //                     return;
    //                 }
    //                 reject("音频上传失败")
    //             })
    //             .catch((error) => reject(error))
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
    return (
        <>
            <AudioRecorder
                // loadSrc={loadSrc}
                duration="5"
                onStart={onStart}
                onStop={onStop}
                isViewAudio
                onReRecorder={onReRecorder}
            />
        </>
    );
}
```

```css

```
