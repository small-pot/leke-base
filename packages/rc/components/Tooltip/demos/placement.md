---    
popup: 弹出内容，支持纯文本或dom
placement: 支持 12 个弹出位置
---
```jsx
import React from 'react';
import {Tooltip, Button} from '@leke/rc';

export default function(){
    return(
        <div className='Tooltip-demo'>
            <div>
                <Tooltip 
                    popup={"啊哈哈哈哈哈哈哈"}
                    placement={'topLeft'}
                >
                    <Button>topLeft</Button>
                </Tooltip>
                <Tooltip 
                    popup={"啊哈哈哈哈哈哈哈"}
                    placement={'topCenter'}
                >
                    <Button>topCenter</Button>
                </Tooltip>
                <Tooltip 
                    popup={"啊哈哈哈哈哈哈哈"}
                    placement={'topRight'}
                >
                    <Button>topRight</Button>
                </Tooltip>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between'}}>
                <div className='Tooltip-demo-block'>
                    <Tooltip 
                        popup={"啊哈哈哈哈哈哈哈"}
                        placement={'leftTop'}
                    >
                        <Button>leftTop</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={"啊哈哈哈哈哈哈哈"}
                        placement={'leftCenter'}
                    >
                        <Button>leftCenter</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={"啊哈哈哈哈哈哈哈"}
                        placement={'leftBottom'}
                    >
                        <Button>leftBottom</Button>
                    </Tooltip>                
                </div>
                <div className='Tooltip-demo-block'>
                    <Tooltip 
                        popup={"啊哈哈哈哈哈哈哈"}
                        placement={'rightTop'}
                    >
                        <Button>rightTop</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={"啊哈哈哈哈哈哈哈"}
                        placement={'rightCenter'}
                    >
                        <Button>rightCenter</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={"啊哈哈哈哈哈哈哈"}
                        placement={'rightBottom'}
                    >
                        <Button>rightBottom</Button>
                    </Tooltip>                
                </div>
            </div>
            <div>
                <Tooltip 
                    popup={"啊哈哈哈哈哈哈哈"}
                    placement={'bottomLeft'}
                >
                    <Button>bottomLeft</Button>
                </Tooltip>
                <Tooltip 
                    popup={"啊哈哈哈哈哈哈哈"}
                    placement={'bottomCenter'}
                >
                    <Button>bottomCenter</Button>
                </Tooltip>
                <Tooltip 
                    popup={"啊哈哈哈哈哈哈哈"}
                    placement={'bottomRight'}
                >
                    <Button>bottomRight</Button>
                </Tooltip>
            </div>
        </div>
    );
}
```
```css
.Tooltip-demo{
    width:600px;
    text-align: center;
}
.Tooltip-demo>div+div{
    margin-top: 40px
}
.Tooltip-demo .Tooltip-demo-block{
    display: flex;
    flex-direction: column;
}
.Tooltip-demo .Tooltip-demo-block button+button{
     margin-top: 20px;
}
.Tooltip-demo Button{
    margin-right: 50px;
    height: 100px;
    width: 100px;
}
```

