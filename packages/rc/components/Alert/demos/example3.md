<!--
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: 文件头部描述
 * @Date: 2020-12-04 11:26:25
 * @LastEditTime: 2020-12-07 13:37:01
-->

# 属性全部设置

```jsx
import React from "react";
import { Alert } from "@leke/rc";
import { Remove, DownFill } from "@leke/icons";
const onClickMessageBtn = () => {
    /* eslint-disable no-alert */
    alert('hello world');
};
const afterClose = () => {
    /* eslint-disable no-alert */
    alert('我关闭了');
};
export default function () {
    return (
        <div>
            <Alert
                title={`设置标题设置标题设置标题设置标题设置标题设置标题设置标题设置标题设置标题设置标题设置标题设置标题`}
                isShowIcon
                renderIcon={<DownFill />}
                isShowCloseIcon
                renderCloseIcon={<Remove />}
                type={`success`}
                isOmitTitle
                isOmitMessage={false}
                messageBtnText={'我的按钮'}
                onClickMessageBtn={onClickMessageBtn}
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
                    [
                        <button key={1}>12321312</button>,
                        <button key={2}>12321312</button>,
                        <button key={3}>12321312</button>,
                        <button key={4}>12321312</button>
                    ]
                }
            />
        </div>
    );
}
```
