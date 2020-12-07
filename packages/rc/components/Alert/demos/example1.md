<!--
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: 文件头部描述
 * @Date: 2020-12-04 11:25:06
 * @LastEditTime: 2020-12-07 15:45:30
-->
## 清除closeIcon,icon；替换closeIcon,icon
```jsx
import React from 'react';
import { Alert } from '@leke/rc';
import { Remove, Notice } from "@leke/icons";
export default function() {
    return (
        <div>
            <Alert closeIcon={null} type={'success'} message={'这是一个很短的提示'} />
            <Alert closeIcon={null} type={'info'} message={'这是一个很短的提示'} />
            <Alert closeIcon={null} type={'error'} message={'这是一个很短的提示'} />
            <Alert closeIcon={null} type={'warning'} message={'这是一个很短的提示'} />

            <br />

            <Alert icon={null} type={'success'} message={'这是一个很短的提示'} />
            <Alert icon={null} type={'info'} message={'这是一个很短的提示'} />
            <Alert icon={null} type={'error'} message={'这是一个很短的提示'} />
            <Alert icon={null} type={'warning'} message={'这是一个很短的提示'} />

            <br />

            <Alert icon={<Notice />} closeIcon={<Remove />} type={'success'} message={'这是一个很短的提示'} />
            <Alert icon={<Notice />} closeIcon={<Remove />} type={'info'} message={'这是一个很短的提示'} />
            <Alert icon={<Notice />} closeIcon={<Remove />} type={'error'} message={'这是一个很短的提示'} />
            <Alert icon={<Notice />} closeIcon={<Remove />} type={'warning'} message={'这是一个很短的提示'} />
        </div>
        
    );
}
```
