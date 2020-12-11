<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:26:24
 * @LastEditTime: 2020-12-11 11:42:16
-->
### 三种大小
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input size="large" placeholder="large" />
        <br/>
        <br/>
        <Input size="middle" placeholder="middle"/>
        <br/>
        <br/>
        <Input size="small" placeholder="small"/>
    </>;
}
```