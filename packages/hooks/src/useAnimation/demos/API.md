# API
```
const countRef = useRef(null)

useAnimation({
    ref:countRef,
    visible:visible,
    timeout:2000,
    enterClass: 'show-box',
    onAfterEnter(){
        //结束后执行
    }
})

```
## params
| 属性 | 说明 | 类型 | 默认值 | 非必填 |
| --- | --- | --- | --- | --- | 
| ref | 需要绑定动画的元素 | RefObject<HTMLElement> | _ | 是 |
| open | 进入动画/退出动画 | boolean | _ | 是 |
| enterClassName | 进入动画类名 | string | - | 否 |
| afterEnterClassName | 进入动画结束后类名 | string | - | 否 |
| leaveClassName | 退出动画类名 | string | - | 否 |
| afterLeaveClassName | 退出动画结束后类名 | string | - | 否 | 


