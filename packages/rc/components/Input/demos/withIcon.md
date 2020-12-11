<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2020-12-11 11:06:09
-->
### 配合icon使用
```jsx
import React from 'react';
import {Input} from '@leke/rc';
import {Notice} from "@leke/icons";

export default function(){
    return  <>
        <Input className="outer" prefix={<Notice />} type='password' placeholder="prefix-icon"/>
        <br/>
        <br/>
        <Input className="outer" suffix={<Notice />} placeholder="suffix-icon"/>
        <br/>
        <br/>
    </>;
}
```