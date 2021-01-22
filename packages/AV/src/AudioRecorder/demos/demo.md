```jsx
import React, { useEffect } from "react";
import { AudioRecorder } from "@leke/AV";

export default function () {
    useEffect(() => {
        const recorder = new AudioRecorder({
            elem: document.getElementById("wrap"),
            duration: 120,
        });
        recorder.getBold = (bold) => {
            console.log(bold);
        };
        recorder.getBase = (bold) => {
            console.log(bold);
        };
        recorder.onPlay = () => {
            console.log("play");
        };
        console.log(recorder);
    }, []);
    return <div id="wrap"></div>;
}
```
