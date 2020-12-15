## 下拉不同位置
```jsx
import React from 'react';
import {Dropdown} from '@leke/rc';

export default function(){
    return(
        <div className='dropdown-demo'>
            <div>
                <Dropdown 
                    popup={<div style={{height:150,width:100}}>popup</div>}
                    placement={'bottomLeft'}
                >
                    <button>bottomLeft</button>
                </Dropdown>
                <Dropdown 
                    popup={<div style={{height:150,width:100}}>popup</div>}
                    placement={'bottomCenter'}
                >
                    <button>bottomCenter</button>
                </Dropdown>
                <Dropdown 
                    popup={<div style={{height:150,width:100}}>popup</div>}
                    placement={'bottomRight'}
                >
                    <button>bottomRight</button>
                </Dropdown>
            </div>
            <div style={{marginTop:30}}>
                <Dropdown 
                    popup={<div style={{height:150,width:100}}>popup</div>}
                    placement={'topLeft'}
                >
                    <button>topLeft</button>
                </Dropdown>
                <Dropdown 
                    popup={<div style={{height:150,width:100}}>popup</div>}
                    placement={'topCenter'}
                >
                    <button>topCenter</button>
                </Dropdown>
                <Dropdown 
                    popup={<div style={{height:150,width:100}}>popup</div>}
                    placement={'topRight'}
                >
                    <button>topRight</button>
                </Dropdown>
            </div>
        </div>
    );
}
```
```css
.dropdown-demo button{
    margin-right: 25px;
}
```

