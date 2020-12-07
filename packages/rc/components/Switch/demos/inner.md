## 文本和图标
```jsx
import React,{useState} from 'react';
import {Switch} from '@leke/rc';
import { Check } from "@leke/icons";

export default function(){
    return(
        <div>
            <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭"/>
            <br />
            <Switch size="small" checkedChildren={<Check className="anticon" />} unCheckedChildren="X" />
        </div>
    );
}
```


