<!--
 * @Description:
 * @Author: linchaoting
 * @Date: 2021-01-18 20:38:36
 * @LastEditTime: 2021-02-07 13:44:08
-->

## 代码演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://static.leke.cn/scripts/common/player/Recorder.min.js"></script>
</head>
<body>
    <div id="wrap"></div>
</body>
<script>
    window.onload = function(){
        new Recorder({
            el:document.getElementById('wrap'),
            duration:300
        })
    }
</script>
</html>
```
