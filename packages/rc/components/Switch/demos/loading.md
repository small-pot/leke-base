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
            <div>
                <Switch loading={loading}/>
            </div>
            <div>
                <button onClick={onToggle}>toggle loading</button>
            </div>
        </>
    );
}
```