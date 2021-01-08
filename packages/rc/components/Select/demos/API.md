---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| visible | 是否显示弹层 | boolean | _ |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |
| style | 选择器样式 | CSSProperties | _ |
| className | 选择器类名 | string | _ |
| popup | 弹层 | ReactNode | _ |
| popupStyle | 弹层样式 | CSSProperties | _ |
| popupClassName | 弹层类名 | string | _ |
| placement | 弹出位置 | "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight" | "bottomLeft" |
| defaultValue | 指定默认选中的条目 | string \| string[] | number \| number[] | _ |
| value | 指定当前选中的条目 | string \| string[] | number \| number[] | _ |
| onChange | value变化时的回调 | (value,selectedOption)=>void  | _ |
| placeholder | 选择框默认文本 | string  | _ |
| multiple | 是否多选 | false | _ |
| disabled | 是否禁用 | false | _ |
| options | 选择器条目列表 | object[] | _ |
| fieldNames | 指定条目中的value,label,disabled对应的key | {label?:string,value?:string,disabled?:string} | {label:label,value:value,disabled:disabled} |
| renderOption | 自定义渲染条目内容 | (opt,searchValue)=>React.ReactNode | _ |
| listHeight | 指定options渲染的最大高度 | number | 256 |
| itemHeight | 指定单个条目的高度 | number | 32 |
| showSearch | 是否支持搜索 | boolean | false |
| searchValue | 搜索的值 | string | '' |
| onSearch | searchValue变化时的回调 | (searchValue)=>void  | _ |
| filter | options过滤器 | (opt,searchValue)=>void | _ | 
| empty | 当list为空时的内容 | React.ReactNode | _ |
| icon | 定义选择器icon | React.ReactNode | _ |



