<!--
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: 文件头部描述
 * @Date: 2020-12-04 11:26:25
 * @LastEditTime: 2020-12-07 16:13:48
-->

## 配置action

```jsx
import React from "react";
import { Alert } from "@leke/rc";
import { Remove, DownFill } from "@leke/icons";
const afterClose = () => {
    /* eslint-disable no-alert */
    alert('我关闭了');
};
export default function () {
    return (
        <div>
            <Alert
                title={'这是一个标题'}
                type={`success`}
                afterClose={afterClose}
                message={
                    `这是一个很短的提示这是一个很短的提示这是一个很短的提示这是一
                    个很短的提示这是一个很短的提示这是一个很短的提示这是一个很短
                    的提示这是一个很短的提示这是一个很短的提示这是一个很短的提示
                    这是一个很短的提示这是一个很短的提示这是一个很短的提示这是
                    一个很短的提示这是一个很短的提示这是一个很短的提示这是一个
                    很短的提示这是一个很短的提示这是一个很短的提示这是一个很
                    短的提示这是一个很短的提示`
                }
                action={
                    <>
                        <button key={1}>12321312</button>
                        <button key={2}>12321312</button>
                        <button key={3}>12321312</button>
                        <button key={4}>12321312</button>
                    </>
                }
            />
            <Alert
                title={'这是一个标题'}
                afterClose={afterClose}
                message={`这是一个很短的提示`}
                action={
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <button key={1}>12321312</button>
                        <button key={2}>12321312</button>
                        <button key={3}>12321312</button>
                        <button key={4}>12321312</button>
                    </div>
                }
            />
            <Alert
                message={`这是一个很短的提示`}
                action={
                    <button key={4}>12321312</button>
                }
            />
        </div>
    );
}
```
