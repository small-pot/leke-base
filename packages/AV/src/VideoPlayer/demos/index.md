# H5 视频播放器
通用的H5视频播放器

## 兼容环境
- 现代浏览器和IE11

## 代码演示

```html
<script src='https://static.leke.cn/scripts/AV/VideoPlayer.min.js'></script>
<script>
	const player=new VideoPlayer({
		el:document.querySelector('#root'),
		width:876,
		height:492,
		src='...'
		autoplay:true,
		...
	});
	// video Element对象
	player.video.pause();
	// 属性
	console.log(player.video.duration);
	// 事件
	player.addEventListener('error',()=>{});
	player.addEventListener('ended',()=>{});
	player.addEventListener('timeupdate',()=>{});
</script>
```

## 引入样式

```css
<link rel="stylesheet" type="text/css" href='https://static.leke.cn/scripts/AV/VideoPlayer.css' />
```

## API
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| el | 挂载实例 | element | - |
| src | 资源路径 | string | - |
| width | 宽度 | number | 638 |
| height | 高度 | number | 358 |
| autoplay | 自动播放 | boolean | false |
| loop | 循环播放 | boolean | false |
| poster | 视频封面 | string | - |
| muted | 静音 | boolean | false |

## 属性

#### 实列会暴露挂载的Video Element，可以取到所有的原生属性。之外，提供额外的属性
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| video | Video Element | element | - |
| isFullscreen | 是否处于全屏 | boolean | false |


## 事件

#### 支持原有Video Element的原生事件。之外，提供额外的事件

| 事件 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| click | 点击视频 | function | - |
| dblclick | 双击视频 | function | - |
| start | 视频开始播放触发 | function | - |
| timeChange | 播放时间变更 | function | - |
| volumeChange | 音量变更 | function | - |
| entryFullscreen | 进入全屏 | function | - |
| exitFullscreen | 退出全屏 | function | - |

```html
<script>
	const player=new VideoPlayer({
		el:document.querySelector('#root'),
		width:400,
		height:200,
		src='...'
		autoplay:true,
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