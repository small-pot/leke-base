## 预设状态标签
```jsx
import React from 'react';
import {Tag} from '@leke/rc';
import {Stop, Warn, Fail, Success} from '@leke/icons';
export default function(){
    return  (
        <>
            纯文字：
            <br/><br/>
            <Tag className='seablue' text='进行中'/>
            <Tag className='lekegreen' text='已完成'/>
            <Tag className='brighteyes' text='警告'/>
            <Tag className='hotred' text='失败'/>
            <Tag className='default' text='未完成'/>
            <br/><br/>
            图标+文字：
            <br/><br/>
            <Tag className='seablue' icon={<Stop/>} text='进行中'/>
            <Tag className='lekegreen' icon={<Success/>} text='已完成'/>
            <Tag className='brighteyes' icon={<Warn/>} text='警告'/>
            <Tag className='hotred' icon={<Fail/>} text='失败'/>
            <Tag className='default' icon={<Stop/>} text='未完成'/>

        </>
    );
}
```