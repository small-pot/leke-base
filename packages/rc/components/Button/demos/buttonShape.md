## 图标按钮

```jsx
import React,{useState} from 'react';
import {Button} from '@leke/rc';
import './index.less';
import DownloadOutlined from '../downloadOutlined';

export default function(){
    const [size,setSize] = useState('middle');

    return  <div>
        <div>
            <Button className='leke-demo-container' onClick={()=> setSize('large')}>large</Button>
            <Button className='leke-demo-container' onClick={()=> setSize('middle')}>middle</Button>
            <Button className='leke-demo-container' onClick={()=> setSize('small')}>small</Button>
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
