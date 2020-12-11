<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2020-12-11 15:40:15
-->
### 限制字数
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    const [value,SetValue] = React.useState('');
    return  <Input.TextArea className="outer" placeholder="最大字数" maxLength={20}/>;
}
```