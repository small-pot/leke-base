## 按钮类型

```jsx
import React, {useRef} from 'react';
import {Button} from '@leke/rc';

export default function(){
    const myRef = useRef(null);

    return  <>
        <Button ref={myRef}  type='main' className='leke-demo-container'>按钮</Button>
        <Button className='leke-demo-container'>按钮</Button>
        <Button type='secondary' className='leke-demo-container'>按钮</Button>
        <Button type='dashed' className='leke-demo-container'>按钮</Button>
        <Button type='link' className='leke-demo-container'>按钮</Button>
    </>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
```
