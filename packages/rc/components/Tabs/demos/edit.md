---    
title: 编辑卡片式
description: 编辑卡片式
---

```jsx
import React, { useState } from 'react';
import { Tabs, Radio, Switch } from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [state, setState] = useState('top');
    const [animated, setAnimated] = useState(false);
    const [activeKey, setActiveKey] = useState(3);
    const [data, setData] = useState(() => Array(30).fill('').map((_,i) => ({
        key: i+1,
        tab: `Tab ${i + 1}`,
        disabled: i===20,
        closable: i===14,
        content: `Content of Tab Pane ${i + 1}`
    })));
    const onChange = (key) => {
        // console.log(key);
        setActiveKey(key);
    };
    const onEdit = (key, action) => {
        if(action === 'add') {
            setData(d => d.concat({
                key: d[d.length - 1].key+1,
                tab: `Tab ${d[d.length - 1].key + 1}`,
                content: `Content of Tab Pane ${d[d.length - 1].key + 1}`
            }));
            // console.log(data[data.length - 1].key+1+'');
            // setTimeout(() => {
            setActiveKey(data[data.length - 1].key+1);
            // },1000);
        } else if(action === 'remove') {
            setData(d => d.filter(i => i.key != key));
        }
    };
    
    // const 
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
            <Tabs onEdit={onEdit} type="editable-card" animated={animated} tabPosition={state} activeKey={activeKey} onChange={onChange} style={{ height: 220 }}>
                {data.map((item) => (
                    <TabPane tab={item.tab} key={item.key} disabled={item.disabled} closable={item.closable}>
                        {item.content}
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
