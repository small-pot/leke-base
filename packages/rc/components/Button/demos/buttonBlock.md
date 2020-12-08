## Block按钮

```jsx
import React, {useState} from 'react';
import {Button} from '@leke/rc';
import './index.less';

export default function(){

    return  <div style={{width:'400px'}}>
        <Button type='primary' className='leke-demo-container' block>按钮</Button>
        <Button className='leke-demo-container' block>按钮</Button>
        <Button type='normal' className='leke-demo-container' block>按钮</Button>
        <Button type='dashed' className='leke-demo-container' block>按钮</Button>
        <Button type='link' className='leke-demo-container' block>按钮</Button>
    </div>;
}
```
