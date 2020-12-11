# API
```
const countRef = useRef(null)

useAnimation({
    ref:countRef,
    visible:visible,
    classNames:{
        enter:'enter-className',
        enterEnd:'enterEnd-className',
        leave:'leave-className',
        leaveEnd:'leaveEdn-className'
    }
})

```
## params
| 属性 | 说明 | 类型 | 默认值 | 非必填 |
| --- | --- | --- | --- | --- | 
| ref | 需要绑定动画的元素 | RefObject<HTMLElement> | _ | 是 |
| open | 进入动画/退出动画 | boolean | _ | 是 |
| enter | 进入动画类名 | string | - | 否 |
| enterEnd | 进入动画结束后类名 | string | - | 否 |
| leave | 退出动画类名 | string | - | 否 |
| leaveEnd | 退出动画结束后类名 | string | - | 否 | 
| onEnterEnd | 监听进入动画结束事件 | (el:HTMLElement)=>void | - | 否 | 
| onLeaveEnd | 监听退出动画结束事件 | (el:HTMLElement)=>void | - | 否 | 


