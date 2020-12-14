## hover
```jsx
import React from 'react';
import {Trigger} from '@leke/rc';

export default function(){
    return(
        <Trigger 
            popup={<div style={{height:50,width:50}}>popup</div>}
            event={['focus']}
        >
            <a>focus me</a>
        </Trigger>
    );
}
```

