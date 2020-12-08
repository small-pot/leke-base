## 按钮大小

```jsx
import React,{useState} from 'react';
import {Button} from '@leke/rc';

export default function(){
    const [size,setSize] = useState('middle');

    return  <>
        <div>
            <Button className='leke-demo-container' onClick={()=> setSize('large')}>large</Button>
            <Button className='leke-demo-container' onClick={()=> setSize('middle')}>middle</Button>
            <Button className='leke-demo-container' onClick={()=> setSize('small')}>small</Button>
        </div>
        <div>
            <Button type='primary' className='leke-demo-container' size={size}>按钮</Button>
            <Button className='leke-demo-container' size={size}>按钮</Button>
            <Button type='normal' className='leke-demo-container' size={size}>按钮</Button>
            <Button type='dashed' className='leke-demo-container' size={size}>按钮</Button>
            <Button type='text' className='leke-demo-container' size={size}>按钮</Button>
        </div>
    </>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
```