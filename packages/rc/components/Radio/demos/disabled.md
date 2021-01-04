## 2、不可用
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    const [disabled, setDisabled] = React.useState(true);
    const onToggle = () => {
        setDisabled(!disabled)
    }
    const style={
        width:'80px',
        height:'30px',
        marginTop:'20px',
        lineHeight:'30px',
        textAlign:'center',
        background:'#1FB5AB',
        color:'#fff'
    }
    return(
        <>
          <Radio disabled={disabled}>未选禁用</Radio>
          <Radio disabled={disabled}>选中后禁用</Radio>
          <div onClick={onToggle} style={style}>切换禁用</div>
        </>
    );
}
```

