---    
title: 多选
---

```jsx
import React from 'react';
import {Select} from '@leke/rc';

export default function(){
    const options=new Array(10000).fill('').map((item,index)=>({label:""+index+index,value:index}));
    return(
        <Select showSearch options={options} multiple style={{width:400}} placeholder='请选择' />
    );
}
```

