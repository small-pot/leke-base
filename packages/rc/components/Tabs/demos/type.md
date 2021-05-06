---    
title: 卡片式
description: 另一种样式的页签，不提供对应的垂直样式。
---

```jsx
import React, { useState } from 'react';
import { Tabs, Radio, Switch } from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [state, setState] = useState('top');
    const [animated, setAnimated] = useState(false);
    const callback = (key) => {
        console.log(key);
    };
    return(
        <>
            <Radio.Group value={state} onChange={setState} style={{ marginTop: 16 }}>
                <Radio.Button value="top">top</Radio.Button>
                <Radio.Button value="bottom">bottom</Radio.Button>
                <Radio.Button value="left">left</Radio.Button>
                <Radio.Button value="right">right</Radio.Button>
            </Radio.Group>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                切换动画：<Switch onChange={setAnimated} />
            </div>
            <br />
            <Tabs type="card" animated={animated} tabPosition={state} defaultActiveKey="1" onChange={callback} style={{ height: 220 }}>
                {Array(30).fill('').map((_,i) => (
                    <TabPane tab={`Tab ${i + 1}`} key={i+1} disabled={i===20}>
                        Content of Tab Pane {i + 1}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
}
```

```css
.spin-basics {
  display: inline-flex;
  align-items: center;
}

.spin-basics .leke-spin-animation {
  margin-right: 20px;
}
```
