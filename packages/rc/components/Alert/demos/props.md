## props
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- |
| type | Alert的类型 | 枚举success,info,warning,error | success |
| isShowCloseIcon | 是否展示关闭icon | boolean | false |
| renderCloseIcon | 替换关闭icon | ReactNode | undefined |
| title | 标题 | string | undefined |
| isOmitTitle | 是否省略标题 | boolean | false |
| message | Alert消息 | string | undefined |
| action | 可扩展用户的自定义操作选项 | ReactNode | undefined |
| messageBtnText | 设置一个文本按钮在message后，注意：当isOmitMessage为true时，按钮可能会被隐藏 | string | undefined |
| isShowIcon | 是否展示icon | boolean | false |
| renderIcon | 替换icon | ReactNode | undefined
| isShowBorder | 是否展示边框 注意：不展示边框时，默认去掉圆角 | boolean | true |
| width | 设置Alert宽度 注：默认会根据父元素的宽度来适应 | 'fullScreen'\| number | fullScreen |
| afterClose | 关闭Alert后 | (e: React.MouseEvent\<HTMLButtonElement\>) => void | undefined |
| onClickMessageBtn | 点击messageBtn | (e: React.MouseEvent\<HTMLSpanElement, MouseEvent\>) => void; | undefined |