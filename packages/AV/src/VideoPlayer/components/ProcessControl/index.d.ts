import Component from '../component';
declare class PlayerControl extends Component {
    tooltip: any;
    slider: any;
    control: any;
    isDrag: boolean;
    constructor(el: any, video: any, event: any);
    init(): void;
    render(): any;
    subscription(): void;
    update(): void;
    updateSlider(step: any): void;
}
export default PlayerControl;
