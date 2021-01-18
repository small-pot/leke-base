import Component from '../component';
declare class PlayerControl extends Component {
    control: any;
    constructor(el: any, video: any, event: any);
    init(): void;
    render(): any;
    subscription(): void;
    update(): void;
}
export default PlayerControl;
