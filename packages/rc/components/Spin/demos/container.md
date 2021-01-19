---    
title: 容器
description: 在容器中展示
---

```jsx
import React from 'react';
import {Spin} from '@leke/rc';

export default function(){
    return(
        <div className="spin-container">
            <Spin />
        </div>
    );
}
```

```css
.spin-container {
  text-align: center;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
```