## 按钮类型

```jsx
import React from 'react';
import {Button} from '@leke/rc';
import './index.less';

export default function(){
    return  <>
        <Button type='primary' className='leke-demo-container'>按钮</Button>
        <Button className='leke-demo-container'>按钮</Button>
        <Button type='normal' className='leke-demo-container'>按钮</Button>
        <Button type='dashed' className='leke-demo-container'>按钮</Button>
        <Button type='link' className='leke-demo-container'>按钮</Button>
    </>;
}
```
