## props
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- |
| type | Alert的类型 | 枚举success,info,warning,error | success |
| isShowCloseIcon | 是否展示关闭icon | boolean | false |
| renderCloseIcon | 替换关闭icon | ReactNode | undefined |
| title | 标题 | string | undefined |
| isOmitTitle | 是否缩略标题 | boolean | false |
| message | Alert消息 | string | undefined |
| isOmitMessage | 是否缩略message | string\|ReactNode | undefined |
| action | 可扩展用户的自定义操作选项 | ReactNode | undefined |
| isShowIcon | 是否展示icon | boolean | false |
| renderIcon | 替换icon | ReactNode | undefined
| isShowBorder | 是否展示边框 注意：不展示边框时，默认去掉圆角 | boolean | true |
| afterClose | 关闭Alert后 | () => void | undefined |