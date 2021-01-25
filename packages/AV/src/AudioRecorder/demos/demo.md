```jsx
import React, { useEffect } from "react";
import { AudioRecorder } from "@leke/AV";

export default function () {
    let recorder;
    useEffect(() => {
        recorder = new AudioRecorder({
            elem: document.getElementById("wrap"),
            duration: 120,
        });
        // recorder.getAudioUrl = (bold) => {
        //     console.log(bold);
        // };
        recorder.onStart = () => {
            console.log("start");
        };
        recorder.onStop = () => {
            console.log("stop");
        };
        console.log(recorder);
    }, []);
    const handleClick = () => {
        if (recorder) {
            recorder.getAudioUrl().then((res) => console.log(res));
        }
    };
    const handleClick1 = () => {
        if (recorder) {
            recorder.getAudioUrl("base").then((res) => console.log(res));
        }
    };
    return (
        <>
            <div id="wrap"></div>
            <div onClick={handleClick}>getAudioUrl</div>
            <div onClick={handleClick1}>getAudioUrl</div>
        </>
    );
}
```
