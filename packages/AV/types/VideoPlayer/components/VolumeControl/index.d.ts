import Component from '../component';
import Slider from '../Slider';
declare class Control extends Component {
    control: any;
    container: any;
    iconWrap: any;
    icon: any;
    volumeNum: any;
    sliderContainer: any;
    slider: any;
    preVolume: number;
    constructor(el: any, video: any, event: any);
    init(): any;
    render(): any;
    getSlider(): Slider;
    subscription(): void;
    updateSlider(step: any): void;
}
export default Control;
