---    
title: 使用聚焦状态
description: 当元素获取焦点时显示弹层
---
```jsx
import React from 'react';
import {Trigger} from '@leke/rc';

export default function(){
    return(
        <Trigger 
            popup={<div style={{height:50,width:50}}>popup</div>}
            eventType={['focus']}
        >
            <a>focus me</a>
        </Trigger>
    );
}
```

