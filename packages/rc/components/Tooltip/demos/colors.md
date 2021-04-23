---    
title: 多种颜色
description: 默认状态鼠标移入就会显示弹层,还有颜色换整套背景颜色和字体颜色
---

```jsx
import React from 'react';
import {Tooltip, Button} from '@leke/rc';

export default function(){
    const colorList = ['white', 'green', 'red', 'orange', 'purple', 'yellow', 'blue', 'geekblue', 'purple', 'magenta', 'volcano', 'gold', 'lime', 'polargreen'];
    return(
        <div className="buttons-style">  
            <div>
                {colorList.map((item, index) => (
                    <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={item} key={index} placement={'topLeft'}>
                        <Button>{item}</Button>
                    </Tooltip>
                ))}
            </div>
            <div>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#f50'} placement={'topLeft'}>
                    <Button>#f50</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#2db7f5'} placement={'topLeft'}>
                    <Button>#2db7f5</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#87d068'} placement={'topLeft'}>
                    <Button>#87d068</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#108ee9'} placement={'topLeft'}>
                    <Button>#108ee9</Button>
                </Tooltip>
            </div>
        </div>
    );
}
```

```css
.buttons-style Button{
    margin-bottom: 10px;
    margin-right: 20px;
}
```