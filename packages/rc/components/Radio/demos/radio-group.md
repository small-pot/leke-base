## 4、Radio group
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    const [value, setValue] = React.useState(1);
    const onChange = e => {
        setValue(e.target.value)
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return(
        <Radio.Group onChange={onChange} value={value}>
            <Radio style={radioStyle} value={1}>常态</Radio>
            <Radio style={radioStyle} value={2}>常态</Radio>
            <Radio style={radioStyle} value={3}>常态</Radio>
            <Radio style={radioStyle} value={4}>更多
              {value === 4 ? <input style={{ width: 100, marginLeft: 10 }} /> : null}
            </Radio>
        </Radio.Group>
    );
}
```

