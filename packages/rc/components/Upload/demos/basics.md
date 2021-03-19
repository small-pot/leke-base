---    
title: 基本用法
---

```jsx
import React from 'react';
import {Upload,Button} from '@leke/rc';

export default function(){
    return(
        <Upload 
            action={'/a'}
            onFail={e=>console.log(e)}
        >
            <Button>上传文件</Button>
        </Upload>
    );
}
```

