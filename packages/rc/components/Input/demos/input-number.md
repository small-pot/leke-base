<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-02-08 16:05:24
-->
### 数字输入框-三种大小
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input.InputNumber value={333} className="outer" size='large' />
        <br/>
        <Input.InputNumber className="outer" />
        <br/>
        <Input.InputNumber className="outer" size='small' />
    </>;
}
```