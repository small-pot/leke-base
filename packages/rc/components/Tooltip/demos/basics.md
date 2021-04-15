---    
title: 基本用法
description: 默认状态鼠标移入就会显示弹层,还有颜色换整套背景颜色和字体颜色
---

```jsx
import React from 'react';
import {Tooltip} from '@leke/rc';

export default function(){
    return(
        <>
            <Tooltip 
                popup={<div className="popup">popup</div>}
                // placement={"rightBottom"}
            >
                <span className="childrens">tooltip</span>
            </Tooltip>
        </>
    );
}
```

```css
.linksty{
    display: inline-block;
}
.childrens{
    display: inline-block;
    width: 200px;
    height: 200px;
}
.popup{
    display: inline-block;
    /* width: 200px; */
    height: 100px;
}
```