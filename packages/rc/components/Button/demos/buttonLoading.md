## 加载中状态

```jsx
import React, {useState} from 'react';
import {Button} from '@leke/rc';
import './index.less';
import DownloadOutlined from '../downloadOutlined';

export default function(){
    const [loadings,setLoadings] = useState([false,false]);


    const handleClick = (index) => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;
        setLoadings(newLoadings);
        setTimeout(()=>{
            setLoadings(data => {
                const newLoadings = [...data];
                newLoadings[index] = false;
                return newLoadings;
            });
        },6000);
    };

    return  <>
        <Button type='primary' className='leke-demo-container' loading>按钮</Button>
        <Button 
            type='primary' 
            className='leke-demo-container' 
            shape='circle' 
            loading={loadings[0]}
            onClick={() => handleClick(0)} 
            icon={<DownloadOutlined />} />
        <Button type='primary' className='leke-demo-container' loading={loadings[1]} onClick={() => handleClick(1)}>按钮</Button>
    </>;
}
```
