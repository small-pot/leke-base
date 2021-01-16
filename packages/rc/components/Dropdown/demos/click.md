---    
title: 点击时弹出下拉菜单
---

```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <Dropdown 
            popup={<div style={{height:200}}>popup</div>}
            eventType={['click']}
        ><a >focus me</a></Dropdown>
    );
}
```

