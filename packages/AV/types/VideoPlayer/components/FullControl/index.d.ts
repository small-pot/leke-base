import Component from '../component';
declare class FullControl extends Component {
    control: any;
    icon: any;
    isFullscreen: boolean;
    constructor(el: any, video: any, event: any);
    init(): void;
    render(): any;
    subscription(): void;
    update(): void;
}
export default FullControl;
