## 3、常用尺寸
#### 尺寸：40px，32px，24px
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    return(
        <>
          <Radio.Group defaultValue="a" size="large">
            <Radio.Button value="a">选项一</Radio.Button>
            <Radio.Button value="b">选项一</Radio.Button>
            <Radio.Button value="c">选中状态</Radio.Button>
            <Radio.Button value="d">选项一</Radio.Button>
          </Radio.Group>
          <Radio.Group defaultValue="a" size="middle" style={{ marginTop: 16 }}>
            <Radio.Button value="a">选项一</Radio.Button>
            <Radio.Button value="b">选项一</Radio.Button>
            <Radio.Button value="c">选中状态</Radio.Button>
            <Radio.Button value="d">选项一</Radio.Button>
          </Radio.Group>
          <Radio.Group defaultValue="a" size="small" style={{ marginTop: 16 }}>
            <Radio.Button value="a">选项一</Radio.Button>
            <Radio.Button value="b">选项一</Radio.Button>
            <Radio.Button value="c">选中状态</Radio.Button>
            <Radio.Button value="d">选项一</Radio.Button>
          </Radio.Group>
        </>
    );
}
```

