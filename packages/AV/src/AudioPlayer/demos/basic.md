<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-18 20:38:36
 * @LastEditTime: 2021-01-18 20:52:07
-->

---
title: 使用方式
---

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
<link rel="stylesheet" href="./lib/AudioPlayer.css">
<script src="./lib/AudioPlayer.min.js"></script>
<script>
  window.onload=function(){
    const audioPlayer = new AudioPlayer({
      el:'#player',
      source:'http://music.163.com/song/media/outer/url?id=493735012.mp3',
    })
    audioPlayer.play()
  }
</script>
</html>
```