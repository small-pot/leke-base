<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-02 16:53:43
-->
### 数字输入框-前置或者后置标签
```jsx
import React from 'react';
import {Input} from '@leke/rc';
import {Warn} from "@leke/icons";

export default function(){
    return  <>
        <Input.InputNumber prefix={`￥`} className="outer-number" />
        <br />
        <br />
        <Input.InputNumber suffix={`%`} className="outer-number" />
    </>;
}
```
```css
.outer-number{
    width:100px
}
```