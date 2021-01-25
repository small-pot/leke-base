```jsx
import React from "react";
import { AudioRecorder } from "@leke/rc";

export default function () {
    const onStart = () => {
        console.log("start");
    };
    return (
        <>
            <AudioRecorder onStart={onStart} />
        </>
    );
}
```

```css

```
