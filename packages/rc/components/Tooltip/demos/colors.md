---    
title: 多种颜色
description: 默认状态鼠标移入就会显示弹层,还有颜色换整套背景颜色和字体颜色
---

```jsx
import React from 'react';
import {Tooltip, Button} from '@leke/rc';

export default function(){
    return(
        <div className="buttons-style">  
            <div>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'red'}>
                    <Button>red</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'white'}>
                    <Button>white</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'cyan'}>
                    <Button>cyan</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'orange'}>
                    <Button>orange</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'purple'}>
                    <Button>purple</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'yellow'}>
                    <Button>yellow</Button>
                </Tooltip>
            </div>
            <div>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#f50'}>
                    <Button>#f50</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#2db7f5'}>
                    <Button>#2db7f5</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#87d068'}>
                    <Button>#87d068</Button>
                </Tooltip>
                <Tooltip popup={'啊哈哈哈哈哈哈哈'} color={'#108ee9'}>
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