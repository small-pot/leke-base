# Dropdown 下拉菜单
## 基本用法
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

