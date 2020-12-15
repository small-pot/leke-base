# Dropdown 下拉菜单
## 基本用法
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

