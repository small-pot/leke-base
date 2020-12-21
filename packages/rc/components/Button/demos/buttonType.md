## 按钮类型

```jsx
import React, {useRef} from 'react';
import {Button} from '@leke/rc';

export default function(){
    const myRef = useRef(null);

    return  <>
        <Button ref={myRef}  type='primary' className='leke-demo-container'>按钮</Button>
        <Button className='leke-demo-container'>按钮</Button>
        <Button type='normal' className='leke-demo-container'>按钮</Button>
        <Button type='dashed' className='leke-demo-container'>按钮</Button>
        <Button type='text' className='leke-demo-container'>按钮</Button>
    </>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
```