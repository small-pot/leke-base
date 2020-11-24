## 基本用法
```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <Dropdown 
            trigger={<p>focus me</p>}
            popup={<div style={{height:200}}>popup</div>}
        />
    );
}
```

