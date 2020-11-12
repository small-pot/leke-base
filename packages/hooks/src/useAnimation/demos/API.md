# API
```
const countRef = useRef(null)

useAnimation({//加入资料袋动画
    ref:countRef,
    visible:visible,
    timeout:2000,
    enterClass: 'show-box',
    onAfterEnter(){
        //动画结束后执行
    }
})

```
## params
| 属性 | 说明 | 类型 | 默认值 | 非必填 |
| --- | --- | --- | --- | --- | 
| ref | 需要绑定动画的元素 | RefObject<HTMLElement> | _ | 是 |
| visible | 动画开始/结束 | boolean | _ | 是 |
| timeout | 动画持续时间，单位ms | number | 200 | 否 |
| beforeEnterClass | visible=true，开始之前className（useLayoutEffect中执行） | string | - | 否 |
| enterClass | visible=true，开始时className | string | - | 否 |
| afterEnterClass | visible=true，结束之后className | string | - | 否 |
| beforeLeaveClass | visible=false，结束之前className（useLayoutEffect中执行） | string | - | 否 |
| leaveClass | visible=false，结束时className | string | - | 否 |
|afterLeaveClass| visible=false，结束之后className | string | - | 否 |
|onBeforeEnter| visible=true，开始之前调用（useLayoutEffect中调用） | function(node) | - | 否 |
|onEnter| visible=true，开始时调用 | function(node) | - | 否 |
|onAfterEnter| visible=true，结束之后调用 | function(node) | - | 否 | 
|onBeforeLeave|visible=false，结束之前调用（useLayoutEffect中执行）| function(node) | - | 否 | 
|onLeave|visible=false，结束时调用| function(node) | - | 否 |
|onAfterLeave|visible=false，结束之后调用| function(node) | - | 否 |  


