---    
title: 基本用法
description: 标签页切换
---

```jsx
import React from 'react';
import {Tabs} from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const callback = (key) => {
        console.log(key);
    };
    return(
        <Tabs onChange={callback}>
            <TabPane tab="Tab 1 long" key="1">
      Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
            </TabPane>
            <div>22312312312</div>
        </Tabs>
    );
}
```
