## 禁用
```jsx
import React,{useState} from 'react';
import {Switch} from '@leke/rc';

export default function(){
    const [disabled,setDisabled] = useState(true);
    const onToggle = () => {
        setDisabled(!disabled);
    };
    return(
        <>
            <Switch disabled={disabled} defaultChecked/>
            <br />
            <Switch disabled={disabled} size="small"/>
            <br />
            <br />
            <button onClick={onToggle}>toggle disabled</button>
        </>
    );
}
```


