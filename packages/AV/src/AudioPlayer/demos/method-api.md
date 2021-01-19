## 静态方法

### AudioPlayer.canplay(types)

type有以下几种类型
+ 'Mp3' - AudioPlayer.canPlay('mp3')
+ 'Aac' - AudioPlayer.canPlay('aac')
+ 'Wav' - AudioPlayer.canPlay('wav')
+ 'Flac' - AudioPlayer.canPlay('flac')
+ 'Ogg' -  AudioPlayer.canPlay('ogg')

返回是否可以播放该音频的结果



## 实例方法

### audioPlayer.load(url)
载入音频，返回 **Promise**，将在音频可播放时 **resolve()**

### audioPlayer.play()
播放音频

### audioPlayer.pause()
播放音频

### audioPlayer.togglePlay()
切换音频播放状态

### audioPlayer.seek()
跳转到指定的时间开始播放

## 事件
### audioPlayer.on(event,callback)

参考[audio事件-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E4%BA%8B%E4%BB%B6)