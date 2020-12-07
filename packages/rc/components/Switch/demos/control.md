## 受控组件
```jsx
import React,{useState} from 'react';
import {Switch} from '@leke/rc';

export default function(){
    const [checked, setChecked] = useState(true);
    const onClick = (ret, e) => {
        console.log("onClick =>", ret, e);
    };
    return(
        <>
            <Switch checked={checked} onChange={setChecked} onClick={onClick} />
        </>
    );
}
```


