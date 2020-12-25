---    
title: 滑动方向
description: vertical为true时，卡片将在垂直方向滑动
---

```jsx
import React from 'react';
import {Carousel} from '@leke/rc';

export default function(){
    return(
        <div className='carousel-demo'>
            <Carousel style={{width:120,height:60}} dots={false}>
                <div style={{backgroundColor:'red'}}></div>
                <div style={{backgroundColor:'green'}}></div>
                <div style={{backgroundColor:'blue'}}></div>
            </Carousel>   
            <Carousel style={{width:120,height:60}} vertical dots={false}>
                <div style={{backgroundColor:'red'}}></div>
                <div style={{backgroundColor:'green'}}></div>
                <div style={{backgroundColor:'blue'}}></div>
            </Carousel> 
        </div>
    );
}
```
```css
.carousel-demo{
    display: flex;
}
.carousel-demo .leke-carousel+.leke-carousel{
    margin-left:30px;
}
```