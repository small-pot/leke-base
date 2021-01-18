import Component from '../component';

class Error extends Component {
    button: any; 

    constructor(el,video,event){
        super(el,video,event);
    }

    init() {
        return this.render();
    }
    render() {
        const error = this.createEl('div', {
            innerHTML: `<div class="failed-container">
              <img class="failed-icon" src="${require('assets/failed.png')}" />
              <p>抱歉，您访问的视频无法播放，您可以尝试以下方式</p>
              <button class='error-btn'>刷新一下</button>
            </div>`
        }, { class: 'failed-wrap' });
        this.button = error.querySelector('.error-btn');
        this.button.addEventListener('click', () => {
            window.location.reload();
        });
        this.el.appendChild(error);
        return error;
    }
}

export default Error;