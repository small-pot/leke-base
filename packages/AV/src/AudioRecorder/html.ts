export const RecordHtml = `
<div class="record-wrap">
    <div id='recordContainer' class='record-container'>
        <div class='record-micro'>
            <img class='record-recording' src="http://static.leke.cn/scripts/AV/images/recording.gif" />
            <div id="record" class='record-content'>
                <img class='record-microImg' src="http://static.leke.cn/scripts/AV/images/icon-microphone.png" />
            </div>
        </div>   
    </div>
    <div class='record-title'>点击图标开始录音</div>
    <div><audio id='audio' /></div>
    <div class='record-time'>
        <span id='recordUsetime' class='record-usedTime'>0'00"</span>/限<span id='recordDuration'>5'00"</span>
    </div>
</div>
`;

export const AudioHtml = `
<div class='record-audio-wrap'>
    <audio id='audio'></audio>
    <div class='record-audio-container'>
    </div>
    <div class='record-reRecord'>重录</div>
</div>
`;

export const NoData = `<div class='recorder-nodata'>
    <div class='recorder-top'>
        <div class='recorder-nodata-img'></div>
    </div>
    <div class='recorder-title'>
        <div>当前浏览器不支持录音</div>
        <div>请安装360浏览器并设置极速模式或安装谷歌浏览器</div>
    </div>
</div>`;
