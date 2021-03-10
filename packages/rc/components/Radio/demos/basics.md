## 1、基础
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    const [value, setValue] = React.useState(3);

    const onChange = e => {
        console.log(e)
        setValue(e.target.value);
    };
    return(
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>常态</Radio>
            <Radio value={2}>悬停</Radio>
            <Radio value={3}>选中</Radio>
        </Radio.Group>
    );
}
```

