<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-02 16:41:33
-->
### 数字输入框-横置操作
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input.InputNumber handleType="row" className="outer-number" size="small"/>
        <br/>
        <br/>
        <Input.InputNumber handleType="row" className="outer-number" />
        <br/>
        <br/>
        <Input.InputNumber handleType="row" className="outer-number" size="large"/>
    </>;
}
```
```css
.outer-number{
    width:100px
}
```