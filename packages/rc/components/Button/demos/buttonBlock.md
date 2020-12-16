## Block按钮

```jsx
import React, {useState} from 'react';
import {Button} from '@leke/rc';

export default function(){

    return  <div style={{width:'400px'}}>
        <Button type='primary' className='leke-demo-container leke-demo-block'>按钮</Button>
        <Button className='leke-demo-container leke-demo-block'>按钮</Button>
        <Button type='normal' className='leke-demo-container leke-demo-block'>按钮</Button>
        <Button type='dashed' className='leke-demo-container leke-demo-block'>按钮</Button>
        <Button type='text' className='leke-demo-container leke-demo-block'>按钮</Button>
    </div>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
.leke-demo-block{
    width:100%
}
```