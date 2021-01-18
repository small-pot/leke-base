import Component from '../component';

class Loading extends Component {
    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        return this.render();
    }
    render() {
        const loading = this.createEl('div', {
            innerHTML: `<img class="loading-icon" src='https://static.leke.cn/images/h5video/loading.gif'/><p>视频加载中</p>`
        }, { class: 'loading-container' });
        this.el.appendChild(loading);
        return loading;
    }
}

export default Loading;