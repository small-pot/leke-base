---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | ------- | --- | --- | 
| visible | 是否显示弹层 | boolean | false |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |
| popup | 弹层 | ReactNode \| string | _ |
| popupStyle | 弹层样式 | CSSProperties | _ |
| popupClassName | 弹层类名 | string | _ |
| placement | 弹出位置 | 'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight' \| 'leftCenter' \| 'leftTop' \| 'leftBottom' \| 'rightCenter' \| 'rightTop' \| 'rightBottom' | bottomLeft |
| color | 背景颜色，已有部分预设样式 | 'white' \| 'green'\| 'red'\| 'orange'\| 'purple'\| 'yellow'\| 'blue'\| 'geekblue'\| 'purple'\| 'magenta'\| 'volcano'\| 'gold'\| 'lime'\| 'polargreen' \| string |  _  |
| eventType | 触发下拉的行为 | Array<"focus" \| "hover"> | \["focus"\] |
