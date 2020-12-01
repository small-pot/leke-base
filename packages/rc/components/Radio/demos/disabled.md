## 2、不可用
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    const [disabled, setDisabled] = React.useState(false);
    const onChange = e => {
        console.log(e)
        // setValue(e.target.value);
    };
    return(
        <>
          <Radio disabled={disabled} onChange={onChange}>
            未选禁用
          </Radio>
          <Radio checked disabled={disabled}>
            选中后禁用
          </Radio>
        </>
    );
}
```

