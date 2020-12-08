## 幽灵按钮

```jsx
import React, {useState} from 'react';
import {Button} from '@leke/rc';
import './index.less';

export default function(){

    return  <div style={{background:'#0ba29a'}}>
        <Button type='primary' className='leke-demo-container' ghost>按钮</Button>
        <Button className='leke-demo-container' ghost>按钮</Button>
        <Button type='dashed' className='leke-demo-container' ghost>按钮</Button>
    </div>;
}
```
