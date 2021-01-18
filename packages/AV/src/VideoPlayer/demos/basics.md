## 代码演示

```html
<script src='../AV/lib/VideoPlayer'></script>
<script>
	const player=new VideoPlayer('root',{
		width:400,
		height:200,
		src='...'
		autoPlay:true,
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
<link rel="stylesheet" type="text/css" href='../AV/style/VideoPlayer/index.css' />
```
