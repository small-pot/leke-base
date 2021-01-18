import Component from '../component';
declare class Mask extends Component {
    mask: any;
    constructor(el: any, video: any, event: any);
    init(): any;
    subscription(): void;
    render(): any;
}
export default Mask;
