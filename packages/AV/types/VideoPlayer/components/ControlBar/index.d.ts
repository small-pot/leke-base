import Component from '../component';
declare class Control extends Component {
    control: any;
    constructor(el: any, video: any, event: any);
    init(): any;
    render(): any;
    subscription(): void;
}
export default Control;
