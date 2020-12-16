## hover
```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <Dropdown 
            popup={<div style={{height:200}}>popup</div>}
            event={['hover']}
        ><a >hover me</a></Dropdown>
    );
}
```

