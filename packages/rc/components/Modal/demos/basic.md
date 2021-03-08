# Modal对话框
模态对话框。

## 何时使用
需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
另外当需要一个简洁的确认框询问用户时，可以使用 Modal.confirm() 等语法糖方法。

## 基本对话框
```jsx
import React,{useState} from 'react';
import cx from 'classnames';
import {Button,Modal} from '@leke/rc';

export default function(){
    const [current,setCurrent]=useState(null);
    const [visible,setV]=useState(false);
    const [size,setSize]=useState('medium');
    const data=['mini','small','medium','large','xLarge'];
    return  <div>
        <div>
            {data.map(item=><div key={item} className={cx('leke-demo',{active:current===item})} onClick={()=>{
                setCurrent(item);
                setSize(item);
                setV(true);
            }}>{item}</div>)}
        </div>
        <Modal title='基础弹框' visible={visible} size={size} onCancel={()=>{setV(false);}} destroyOnClose={true}>
            <div>基础弹框</div>
        </Modal>
    </div>;
}
```
```css
.leke-demo{
    display:inline-block;
    padding:0 8px;
    min-width:64px;
    width:auto;
    height:30px;
    border:1px solid #d9d9d9;
    cursor: pointer;
    text-align:center;
    line-height:30px;
    margin-bottom:8px;
}
.leke-demo.active{
    color:#1FB5AB;
    border-color:#1FB5AB;
}
```