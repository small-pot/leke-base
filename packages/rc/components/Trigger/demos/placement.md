---    
title: 弹出位置
description: 支持 12 个弹出位置
---
```jsx
import React from 'react';
import {Trigger,Button} from '@leke/rc';

export default function(){
    return(
        <div className='trigger-demo'>
            <div>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomLeft'}
                >
                    <Button>bottomLeft</Button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomCenter'}
                >
                    <Button>bottomCenter</Button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomRight'}
                >
                    <Button>bottomRight</Button>
                </Trigger>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between'}}>
                <div className='trigger-demo-block'>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftTop'}
                    >
                        <Button>leftTop</Button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftCenter'}
                    >
                        <Button>leftCenter</Button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftBottom'}
                    >
                        <Button>leftBottom</Button>
                    </Trigger>                
                </div>
                <div className='trigger-demo-block'>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightTop'}
                    >
                        <Button>rightTop</Button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightCenter'}
                    >
                        <Button>rightCenter</Button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightBottom'}
                    >
                        <Button>rightBottom</Button>
                    </Trigger>                
                </div>
            </div>
            <div>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topLeft'}
                >
                    <Button>topLeft</Button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topCenter'}
                >
                    <Button>topCenter</Button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topRight'}
                >
                    <Button>topRight</Button>
                </Trigger>
            </div>
        </div>
    );
}
```
```css
.trigger-demo{
    width:400px;
    text-align: center;
}
.trigger-demo>div+div{
    margin-top: 40px
}
.trigger-demo .trigger-demo-block{
    display: flex;
    flex-direction: column;
}
.trigger-demo .trigger-demo-block button+button{
     margin-top: 20px;
}
.trigger-demo Button{
    margin-right: 25px;
}
```

