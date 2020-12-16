# API
```
const countRef = useRef(null)

useAnimation({
    ref,
    open,
    type,
    enter,
    entering,
    entered,
    exit,
    exiting,
    exited,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
})

```
## params
| 属性 | 说明 | 类型 | 默认值 | 非必填 |
| --- | --- | --- | --- | --- | 
| ref | 需要绑定动画的元素 | RefObject<HTMLElement> | _ | 是 |
| open | 进入动画/退出动画 | boolean | _ | 是 |
| enter | 进入动画的类名 | string | - | 否 |
| entering | 进入动画过程中的类名 | string | - | 否 |
| entered | 进入动画结束的类名 | string | - | 否 |
| exit | 退出动画的类名 | string | - | 否 |
| exiting | 退出动画过程中的类名 | string | - | 否 |
| exited | 退出动画结束后的类名 | string | - | 否 | 
| on\[event\]| 监听事件 | ()=>void | - | 否 |


