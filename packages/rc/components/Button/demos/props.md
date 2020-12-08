## props
通过设置Button的属性来产生不同的按钮样式，推荐顺序微：type -> shape -> size -> loading -> disabled.  
按钮的属性说明如下：  
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| block | 将按钮宽度调整微其付款度的选项 | boolean | false |
| danger | 设置危险按钮 | boolean | false |
| warning | 设置提醒按钮 | boolean | false |
| disabled | 按钮失效状态 | boolean | false |
| lekeDisabled | 乐课定制按钮失效状态 | boolean | false |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |
| icon | 设置按钮的图标组件 | ReactNode | - |
| loading | 设置按钮载入状态 | boolean | false |
| shape | 设置按钮形状 | circle \| round | - |
| size | 设置按钮大小 | large \| middle \| small | middle |
| type | 设置按钮类型 | primary \| dashed \| link \| default \| normal | default |
| onClick | 点击按钮时的回调 | (event)=>void | false |
