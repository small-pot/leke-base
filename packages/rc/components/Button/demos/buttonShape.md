## 图标按钮

```jsx
import React,{useState} from 'react';
import {Button} from '@leke/rc';
import {Upload} from '@leke/icons';

export default function(){
    const [size,setSize] = useState('middle');
    const sizes = ['large','middle','small'];

    const DownloadOutlined = () =>{
        return (
            <span className='leke-icon-content'>
                <Upload />
            </span>
        );
    };

    return  <div>
        <div>
            {
                sizes.map((item,index)=> {
                    return (
                        <div 
                            key={index} 
                            className={size === item ? 'leke-demo-active' : 'leke-demo-sx'} 
                            onClick={()=> setSize(item)}>
                            {item}
                        </div> 
                    );
                }) 
            }
        </div>
        <div>
            <Button type='primary' className='leke-demo-container' size={size} icon={<DownloadOutlined />} />
            <Button type='primary' className='leke-demo-container' size={size} shape='circle' icon={<DownloadOutlined />} />
            <Button type='primary' className='leke-demo-container' size={size} icon={<DownloadOutlined />} >下载</Button>
        </div>
        <div>
            <Button className='leke-demo-container' size={size} icon={<DownloadOutlined />} />
            <Button className='leke-demo-container' size={size} shape='circle' icon={<DownloadOutlined />} />
            <Button className='leke-demo-container' size={size} icon={<DownloadOutlined />}>下载</Button>
        </div>
        <div>
            <Button type='dashed' className='leke-demo-container' size={size} icon={<DownloadOutlined />} />
            <Button type='dashed' className='leke-demo-container' size={size} shape='circle' icon={<DownloadOutlined />} />
            <Button type='dashed' className='leke-demo-container' size={size} icon={<DownloadOutlined />} >下载</Button>
        </div>
    </div>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
.leke-icon-content i{
    vertical-align: middle;
}
.leke-demo-sx{
    display:inline-block;
    width:64px;
    height:30px;
    border:1px solid #d9d9d9;
    cursor: pointer;
    text-align:center;
    line-height:30px;
    margin-bottom:8px;
}
.leke-demo-active{
    display:inline-block;
    width:64px;
    height:30px;
    border:1px solid #1FB5AB;
    color:#1FB5AB;
    cursor: pointer;
    text-align:center;
    line-height:30px;
    margin-bottom:8px;
}
```