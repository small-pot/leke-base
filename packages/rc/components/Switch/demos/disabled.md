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
            <Switch disabled={disabled}/>
            <div>
                <button onClick={onToggle}>toggle disabled</button>
            </div>
        </>
    );
}
```


