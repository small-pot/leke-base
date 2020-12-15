## 下拉不同位置
```jsx
import React from 'react';
import {Trigger} from '@leke/rc';

export default function(){
    return(
        <div className='trigger-demo'>
            <div>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomLeft'}
                >
                    <button>bottomLeft</button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomCenter'}
                >
                    <button>bottomCenter</button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomRight'}
                >
                    <button>bottomRight</button>
                </Trigger>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between'}}>
                <div className='trigger-demo-block'>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftTop'}
                    >
                        <button>leftTop</button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftCenter'}
                    >
                        <button>leftCenter</button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftBottom'}
                    >
                        <button>leftBottom</button>
                    </Trigger>                
                </div>
                <div className='trigger-demo-block'>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightTop'}
                    >
                        <button>rightTop</button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightCenter'}
                    >
                        <button>rightCenter</button>
                    </Trigger>
                    <Trigger 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightBottom'}
                    >
                        <button>rightBottom</button>
                    </Trigger>                
                </div>
            </div>
            <div>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topLeft'}
                >
                    <button>topLeft</button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topCenter'}
                >
                    <button>topCenter</button>
                </Trigger>
                <Trigger 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topRight'}
                >
                    <button>topRight</button>
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
.trigger-demo button{
    margin-right: 25px;
}
```

