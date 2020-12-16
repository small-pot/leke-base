<!--
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: 文件头部描述
 * @Date: 2020-12-04 11:26:25
 * @LastEditTime: 2020-12-07 16:17:27
-->

## 传入自定义的className或者style

```jsx
import React from "react";
import { Alert } from "@leke/rc";
export default function () {
    return (
        <div>
            <Alert
                type={'success'}
                style={{border: 'none', borderRadius: '0'}}
                message={ `这是一个很短的提示这是一个很短的提示这是一个很短的提示这是一个很短的提示`}
            />
            <Alert
                type={'warning'}
                style={{border: 'none', borderRadius: '0'}}
                message={ `这是一个很短的提示这是一个很短的提示这是一个很短的提示这是一个很短的提示`}
            />
            <Alert
                type={'info'}
                style={{border: 'none', borderRadius: '0'}}
                message={ `这是一个很短的提示这是一个很短的提示这是一个很短的提示这是一个很短的提示`}
            />
            <Alert
                type={'error'}
                style={{border: 'none', borderRadius: '0'}}
                message={ `这是一个很短的提示这是一个很短的提示这是一个很短的提示这是一个很短的提示`}
            />
        </div>
    );
}
```
