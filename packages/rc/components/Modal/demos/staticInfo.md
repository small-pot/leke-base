## 信息提示框
```jsx
import React,{useState} from 'react';
import cx from 'classnames';
import {Button,Modal} from '@leke/rc';

export default function(){
    const [current,setCurrent]=useState(null);
    const data=['info','miniInfo'];
    return  <div>
        <div>
            {data.map(item=><div key={item} className={cx('leke-demo',{active:current===item})} onClick={()=>{
                setCurrent(item);
                if(item==='info'){
                    Modal.info({
                        content:<div>
                            <p>一些简单的信息提示</p>
                            <p>一些简单的信息提示</p>
                        </div>
                    });
                }else{
                    Modal.miniInfo({
                        content:<div>
                            <p>一些简单的信息提示</p>
                            <p>一些简单的信息提示</p>
                        </div>
                    });
                }
            }}>{item}</div>)}
        </div>
    </div>;
}
```