---    
title: 包裹内容
description: 包裹内容
---

```jsx
import React, { useState } from 'react';
import { Spin, Alert, Switch } from '@leke/rc';

export default function(){
    const [spinning,setSpinning] = useState(false);
    return(
        <div>
            <Spin spinning={spinning} size="small" delay={1000}>
                <Alert style={{ margin: 0 }} closeIcon={null} icon={null} type={'info'} message={'这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息'} />
            </Spin>
            <Switch checked={spinning} onChange={setSpinning} />
        </div>
    );
}
```