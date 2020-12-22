## 可关闭标签
```jsx
import React from 'react';
import {Tag} from '@leke/rc';
import {Close} from '@leke/icons';
export default function(){
    return  (
        <>
            <Tag className='seablue' closeIcon={<Close/>} text='可关闭'/>
            <Tag className='seablue' closeIcon={<Close/>} text='可关闭带回调' onClose={()=>{console.log('已关勿扰')}}/>
        </>
    );
}
```