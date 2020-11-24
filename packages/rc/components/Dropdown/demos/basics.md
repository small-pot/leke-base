## 基本用法
```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <Dropdown 
            trigger={<p>focus me</p>}
            popup={<div style={{width:200,height:200,border:'1px solid #ccc',background:'#fff'}}>popup</div>}
        />
    );
}
```

