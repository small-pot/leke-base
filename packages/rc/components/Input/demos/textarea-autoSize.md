<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2020-12-14 09:44:21
-->
### 自适应高度
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    const [value,SetValue] = React.useState('');
    return  <Input.TextArea className="outer" placeholder="自适应高度" autoSize />;
}
```