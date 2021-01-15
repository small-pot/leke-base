---    
title: 使用聚焦状态
description: 当元素获取焦点时显示菜单
---

```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <Dropdown 
            popup={<div style={{height:200}}>popup</div>}
            event={['focus']}
        ><a >focus me</a></Dropdown>
    );
}
```

