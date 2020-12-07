## 加载中
```jsx
import React,{useState} from 'react';
import {Switch} from '@leke/rc';

export default function(){
    const [loading,setLoading] = useState(true);
    const onToggle = () => {
        setLoading(!loading);
    };
    return(
        <>
            <Switch defaultChecked loading={loading}/>
            <br />
            <Switch size="small" loading={loading}/>
            <br />
            <br />
            <button onClick={onToggle}>toggle loading</button>
        </>
    );
}
```