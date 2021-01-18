import Component from '../component';
declare class TimeControl extends Component {
    control: any;
    current: any;
    duration: any;
    constructor(el: any, video: any, event: any);
    init(): void;
    render(): any;
    subscription(): void;
    updateCurrent(): void;
    update(): void;
}
export default TimeControl;
