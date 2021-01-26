# H5 视频播放器
通用的H5视频播放器

## 兼容环境
- 现代浏览器和IE11

## 升级提示
![提示](https://static.leke.cn/scripts/common/player/images/upgrade_tip.png)

## 支持的视频格式
| 格式 | IE | Firefox | Opera | Chrome | Safari | 
| --- | --- | --- | --- | --- | --- | 
| MP4 | 9.0+ | 35.0+ | 25.0+ | 4.0+  | 3.2+ |
| WebM | No | 28.0+ | 16.0+| 16.0+  | 12.0+ |
| Ogg | No | 3.5+ | 11.5+ | 4.0+  | No |
| M3U8 | 11.0+(IE 11部分支持) | 42.0+ | 15.0+ | 23.0+  | 8.0+ |

## 代码演示

```html
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

## 静态资源

```
<link rel="stylesheet" type="text/css" href='https://static.leke.cn/scripts/common/player/VideoPlayer.css' />
<script src='https://static.leke.cn/scripts/common/player/VideoPlayer.min.js'></script>
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
| onPausedChange | 暂停/播放变更 | function | - |
| onVolumeChange | 音量变更 | function | - |
| onFullscreenChange | 进入/退出全屏 | function | - |

```html
<script>
	const player=new VideoPlayer({
		el:document.querySelector('#root'),
		width:400,
		height:200,
		src='...'
		autoplay:true,
		onPausedChange:(paused)=>{
			console.log(paused)
		}
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