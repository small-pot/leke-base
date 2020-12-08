## 下拉不同位置
```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <div className='dropdown-demo'>
            <div>
                <Dropdown 
                    trigger={<button>bottomLeft</button>}
                    popup={<div style={{height:200,width:150}}>popup</div>}
                    placement={'bottomLeft'}
                />
                <Dropdown 
                    trigger={<button>bottomCenter</button>}
                    popup={<div style={{height:200,width:150}}>popup</div>}
                    placement={'bottomCenter'}
                />
                <Dropdown 
                    trigger={<button>bottomRight</button>}
                    popup={<div style={{height:200,width:150}}>popup</div>}
                    placement={'bottomRight'}
                />
            </div>
            <div style={{marginTop:30}}>
                <Dropdown 
                    trigger={<button>topLeft</button>}
                    popup={<div style={{height:200,width:150}}>popup</div>}
                    placement={'topLeft'}
                />
                <Dropdown 
                    trigger={<button>topCenter</button>}
                    popup={<div style={{height:200,width:150}}>popup</div>}
                    placement={'topCenter'}
                />
                <Dropdown 
                    trigger={<button>topRight</button>}
                    popup={<div style={{height:200,width:150}}>popup</div>}
                    placement={'topRight'}
                />
            </div>
        </div>
    );
}
```
```css
.dropdown-demo .leke-trigger{
    margin-right: 25px;
}
```

