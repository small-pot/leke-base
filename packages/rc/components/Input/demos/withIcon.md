<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2020-12-10 17:51:53
-->
### 配合icon使用
```jsx
import React from 'react';
import {Input} from '@leke/rc';
import {Down} from "@leke/icons";

export default function(){
    return  <>
        <Input className="outer" prefix={<Down />} placeholder="prefix-icon"/>
        <br/>
        <br/>
        <Input className="outer" suffix={<Down />} placeholder="suffix-icon"/>
        <br/>
        <br/>
    </>;
}
```