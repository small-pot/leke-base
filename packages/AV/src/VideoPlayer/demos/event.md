---    
title: 事件
---
#### 支持原有Video Element的原生事件。之外，提供额外的事件

| 事件 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| ready | 视频挂载完成 | function | - |
| click | 单击视频 | function | - |
| dblclick | 双击击视频 | function | - |
| startPlay | 开始播放 | function | - |
| timeChange | 播放事件变更 | function | - |
| volumeChange | 音量变更 | function | - |
| entryFullscreen | 进入全屏 | function | - |
| exitFullscreen | 退出全屏 | function | - |

```html
<script>
	const player=new VideoPlayer('root',{
		width:400,
		height:200,
		src='...'
		autoPlay:true,
		...
	});
	player.addEventListener('click',()=>{
        console.log('click')
    });
	player.addEventListener('timeupdate',()=>{
        console.log('timeupdate')
    });
</script>
```