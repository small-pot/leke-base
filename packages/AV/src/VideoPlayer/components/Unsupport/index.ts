import Component from '../component';

class Unsupport extends Component {
    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        return this.render();
    }
    render() {
        const unsupport = this.createEl('div', {
            innerHTML: `<img src='https://static.leke.cn/images/h5video/upgrade.png'/><p>视频播放暂不支持ie10及以下版本，请升级或用其他浏览器打开</p>`
        }, { class: 'video-unsupport' });
        this.el.appendChild(unsupport);
        return unsupport;
    }
}

export default Unsupport;