## props
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| visible | 是否显示弹层 | boolean | _ |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |
| trigger | 触发器 | ReactNode | _ |
| triggerStyle | 触发器样式 | CSSProperties | _ |
| triggerClassName | 触发器类名 | string | _ |
| popup | 弹层 | ReactNode | _ |
| popupStyle | 弹层样式 | CSSProperties | _ |
| popupClassName | 弹层类名 | string | _ |
| placement | 弹出位置 | "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight" | "bottomLeft" |
| triggeredEvent | 触发下拉的行为 | Array<"focus" \| "hover"> | \["focus"\] |
