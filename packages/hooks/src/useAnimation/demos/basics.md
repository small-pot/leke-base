## 事例1

```jsx
import React, {useRef, useState} from 'react';
import {useAnimation} from '@leke/hooks';
import './index.less';

export default function() {
    const ref = useRef(null)
    const [visible,setVisible] = useState(true)
    let time=null
    useAnimation({//加入资料袋动画
        ref:ref,
        visible:visible,
        timeout:2000,
        enterClass: 'rotate-box',
        onBeforeEnter(node){
            const start=ref.current
            if(!start){
                return
            }
            start.style['left'] = 0
            start.style['top'] = 0
        },
        onEnter(node){
            const start=ref.current
            let deg = 0
            time = setInterval(()=>{
                const left=node.style.left
                const top=node.style.top
                deg+=20
                node.style['left'] = parseInt(left)+2+'px'
                node.style['top'] = Math.sin(deg*Math.PI/360)*10+'px'
            },20)
        },
        onAfterEnter(){
            time&&clearInterval(time)
            setVisible(false)
        },
        onLeave(node){
            setVisible(true)
        },
    })
    return (
        <div className='leke-ball-box'>
            <figure ref={ref} className='leke-ball' ><span className="shadow"></span></figure>    
        </div>
    );
}
```