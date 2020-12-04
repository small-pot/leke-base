<!--
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: 文件头部描述
 * @Date: 2020-12-04 11:25:06
 * @LastEditTime: 2020-12-04 11:25:07
-->
# 展示icon与关闭按钮
```jsx
import React from "react";
import { Alert } from "@leke/rc";

export default function () {
    return (
        <div>
            <Alert isShowIcon isShowCloseIcon type={"success"} message={"这是一个很短的提示"} />
            <Alert isShowIcon isShowCloseIcon type={"info"} message={"这是一个很短的提示"} />
            <Alert isShowIcon isShowCloseIcon type={"error"} message={"这是一个很短的提示"} />
            <Alert isShowIcon isShowCloseIcon type={"warning"} message={"这是一个很短的提示"} />
        </div>
    );
}
```
