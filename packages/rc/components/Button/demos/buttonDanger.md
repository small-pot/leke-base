## 定制按钮

```jsx
import React from 'react';
import {Button} from '@leke/rc';

export default function(){
    return  <div>
        <div>危险/失败按钮</div>
        <div>
            <Button type='primary' className='leke-demo-container' danger>按钮</Button>
            <Button type='primary' className='leke-demo-container' danger disabled>按钮</Button>
            <Button type='primary' className='leke-demo-container' danger lekeDisabled>按钮</Button>
        </div>
        <div>
            <Button className='leke-demo-container' danger>按钮</Button>
            <Button className='leke-demo-container' danger disabled>按钮</Button>
            <Button className='leke-demo-container' danger lekeDisabled>按钮</Button>
        </div>
        <div>
            <Button type='dashed' className='leke-demo-container' danger>按钮</Button>
            <Button type='dashed' className='leke-demo-container' danger disabled>按钮</Button>
            <Button type='dashed' className='leke-demo-container' danger lekeDisabled>按钮</Button>
        </div>
        <div>
            <Button type='link' className='leke-demo-container' danger>按钮</Button>
            <Button type='link' className='leke-demo-container' danger disabled>按钮</Button>
            <Button type='link' className='leke-demo-container' danger lekeDisabled>按钮</Button>
        </div>
        <div>警示/提醒按钮</div>
        <div>
            <Button type='primary' className='leke-demo-container' warning>按钮</Button>
            <Button type='primary' className='leke-demo-container' warning disabled>按钮</Button>
            <Button type='primary' className='leke-demo-container' warning lekeDisabled>按钮</Button>
        </div>
        <div>
            <Button className='leke-demo-container' warning>按钮</Button>
            <Button className='leke-demo-container' warning disabled>按钮</Button>
            <Button className='leke-demo-container' warning lekeDisabled>按钮</Button>
        </div>
        <div>
            <Button type='dashed' className='leke-demo-container' warning>按钮</Button>
            <Button type='dashed' className='leke-demo-container' warning disabled>按钮</Button>
            <Button type='dashed' className='leke-demo-container' warning lekeDisabled>按钮</Button>
        </div>
        <div>
            <Button type='link' className='leke-demo-container' warning>按钮</Button>
            <Button type='link' className='leke-demo-container' warning disabled>按钮</Button>
            <Button type='link' className='leke-demo-container' warning lekeDisabled>按钮</Button>
        </div>
    </div>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
```