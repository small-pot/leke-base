---    
title: 基本用法
description: options,placeholder,showSearch,disabled等参数使用说明
---

```jsx
import React from 'react';
import {Select} from '@leke/rc';

const options1=[
    {label:'1-1',value:'1-1'},
    {label:'1-2',value:'1-2'},
    {label:'1-3',value:'1-3'},
];
const options2=[
    {label:'2-1',value:'2-1'},
    {label:'2-2',value:'2-2',disabled:true},
    {label:'2-3',value:'2-3'},
];

export default function(){
    return(
        <>
            <Select options={options1} placeholder='请选择' style={{marginRight:20}} />
            <Select disabled options={options2} placeholder='disabled' style={{marginRight:20}} />
            <Select options={options2} placeholder='option disabled' style={{marginRight:20,width:160}} />
            <Select showSearch options={options1} placeholder='input text' style={{width:180}}/>
        </>
    );
}
```

