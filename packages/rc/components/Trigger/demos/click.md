---    
title: 点击时弹出下拉菜单
---
```jsx
import React from 'react';
import {Trigger} from '@leke/rc';

export default function(){
    return(
        <Trigger 
            popup={<div style={{height:50,width:50}}>popup</div>}
            eventType={['click']}
        >
            <a>click me</a>
        </Trigger>
    );
}
```

