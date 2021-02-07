<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-02-07 14:43:06
-->
---
title: 限制字数的文本域
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <Input.TextArea className="outer" placeholder="限制最大字数" maxLength={120}/>;
}
```