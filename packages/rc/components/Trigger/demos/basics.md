---    
title: 基本用法
description: 默认状态鼠标移入就会显示弹层
---

```jsx
import React from 'react';
import {Trigger} from '@leke/rc';

export default function(){
    return(
        <Trigger 
            popup={<div style={{height:30}}>popup</div>}
        >
            <a>default hover me</a>
        </Trigger>
    );
}
```

