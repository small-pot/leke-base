<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-18 20:38:36
 * @LastEditTime: 2021-01-19 15:09:41
-->

## 代码演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="player"></div>
</body>


<!-- import js and css -->
<link rel="stylesheet" type="text/css" href="https://static.leke.cn/scripts/AV/AudioPlayer.css">
<script src='https://static.leke.cn/scripts/AV/AudioPlayer.min.js'></script>

<script>
  window.onload=function(){
    const audioPlayer = new AudioPlayer({
      el:'#player',
      source:'http://music.163.com/song/media/outer/url?id=493735012.mp3',
    })
    audioPlayer.play().then(()=>{
      // do something
    })
  }
</script>
</html>
```