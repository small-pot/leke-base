## 滑动方向
```jsx
import React from 'react';
import {Carousel} from '@leke/rc';

export default function(){
    return(
        <div className='carousel-demo'>
            <Carousel style={{width:120,height:60}} dots={false}>
                <div style={{backgroundColor:'red'}}></div>
                <div style={{backgroundColor:'green'}}></div>
               
            </Carousel>   
            <Carousel style={{width:120,height:60}} vertical dots={false}>
                <div style={{backgroundColor:'red'}}></div>
                <div style={{backgroundColor:'green'}}></div>
                
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