---    
title: 基本用法
description: 默认状态鼠标移入就会显示弹层
---

```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <Dropdown 
            popup={<div style={{width:150,height:100}}>popup</div>}
        ><a>hover me</a></Dropdown>
    );
}
```

