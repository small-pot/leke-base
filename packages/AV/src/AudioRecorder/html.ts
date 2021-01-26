export const RecordHtml = `
<div class="record-wrap">
    <div id='recordContainer' class='record-container'>
        <div class='record-micro'>
            <div class='record-recording'></div>
            <div id="record" class='record-content'>
                <div class='record-microImg'>
                    <svg t="1611625851633" class="icon" viewBox="0 0 1024 1024"
                    width="1em"
                    height= "1em"
                    fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6472" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512.11377778 681.52888889c136.192 0 247.01155555-110.592 247.01155555-247.12533334V249.40088889C759.12533333 112.86755555 648.53333333 2.27555555 512.11377778 2.27555555 375.92177778 2.16177778 265.10222222 112.75377778 265.10222222 249.40088889v185.00266666c0 136.53333333 110.592 247.12533333 247.01155556 247.12533334zM326.88355555 249.62844445c0-102.28622222 83.05777778-185.344 185.23022223-185.344 102.28622222 0 185.23022222 83.05777778 185.23022222 185.344V434.63111111c0 102.28622222-83.05777778 185.344-185.23022222 185.344-102.28622222 0-185.23022222-83.05777778-185.23022223-185.344V249.62844445z m0 0" p-id="6473" fill="#ffffff"></path><path d="M542.94755555 803.72622222v-3.75466667C728.97422222 784.27022222 874.95111111 628.62222222 874.95111111 438.49955555a30.83377778 30.83377778 0 0 0-30.94755556-30.94755555 30.83377778 30.83377778 0 0 0-30.94755555 30.94755555C813.056 604.84266667 678.22933333 739.55555555 512 739.55555555c-166.34311111 0-301.056-134.82666667-301.056-301.056a30.83377778 30.83377778 0 0 0-30.94755555-30.94755555 30.83377778 30.83377778 0 0 0-30.94755556 30.94755555c0 189.89511111 145.97688889 345.77066667 332.00355556 361.472v159.40266667H339.62666667c-17.06666667 0-30.94755555 13.76711111-30.94755556 30.94755556 0 17.06666667 13.76711111 30.94755555 30.94755556 30.94755555h344.74666666c17.06666667 0 30.94755555-13.76711111 30.94755556-30.94755555a30.83377778 30.83377778 0 0 0-30.94755556-30.94755556H542.94755555V803.72622222z m0 0" p-id="6474" fill="#ffffff"></path></svg>
                </div>
            </div>
        </div>   
    </div>
    <div class='record-title'>点击图标开始录音</div>
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
