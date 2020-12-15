<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2020-12-14 20:06:12
-->
### 数字输入框-三种大小
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input.InputNumber size='large' />
        <br/>
        <br/>
        <Input.InputNumber />
        <br/>
        <br/>
        <Input.InputNumber size='small' />
    </>;
}
```