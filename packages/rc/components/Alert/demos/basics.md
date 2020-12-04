<!--
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert基础使用案例
 * @Date: 2020-12-04 11:13:51
 * @LastEditTime: 2020-12-04 11:25:17
-->

# 基本使用用法

```jsx
import React from "react";
import { Alert } from "@leke/rc";

export default function () {
    return (
        <div>
            <Alert type={"success"} message={"这是一个很短的提示"} />
            <Alert type={"info"} message={"这是一个很短的提示"} />
            <Alert type={"error"} message={"这是一个很短的提示"} />
            <Alert type={"warning"} message={"这是一个很短的提示"} />
        </div>
    );
}
```
