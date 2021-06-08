---    
title: 基本用法
description: 标签页切换
---

```jsx
import React from 'react';
import {Tabs} from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const onChange = (key) => {
        console.log('onChange =>',key);
    };

    const onTabClick = (key) => {
        console.log('onTabClick =>',key);
    };
    return(
        <Tabs onChange={onChange} onTabClick={onTabClick}>
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
