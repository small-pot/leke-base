## fade
```jsx
import React from 'react';
import {Carousel} from '@leke/rc';

export default function(){
    return(
        <Carousel style={{width:500,height:300}} type='fade'>
            <div style={{backgroundColor:'red'}}></div>
            <div style={{backgroundColor:'green'}}></div>
            <div style={{backgroundColor:'blue'}}></div>
        </Carousel>
    );
}
```

