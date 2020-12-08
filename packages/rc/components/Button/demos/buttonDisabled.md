## 不可用状态

```jsx
import React from 'react';
import {Button} from '@leke/rc';
import './index.less';

export default function(){
    return  <div>
        <div>
            <Button type='primary' className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button type='normal' className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button type='dashed' className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button type='link' className='leke-demo-container' disabled>按钮(disabled)</Button>
        </div>
        <div>
            <Button type='primary' className='leke-demo-container' lekeDisabled>按钮(lekeDisabled)</Button>
            <Button className='leke-demo-container' lekeDisabled>按钮(lekeDisabled)</Button>
            <Button type='dashed' className='leke-demo-container' lekeDisabled>按钮(lekeDisabled)</Button>
            <Button type='link' className='leke-demo-container' lekeDisabled>按钮(lekeDisabled)</Button>
        </div>
    </div>;
}
```
