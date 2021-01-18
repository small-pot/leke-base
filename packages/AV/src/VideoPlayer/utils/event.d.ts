export default class EventBase {
    events: {};
    constructor();
    getListener: (type: any) => any;
    addListener: (type: any, listener: any) => void;
    removeListener: (type: any, listener: any) => void;
    on: (type: any, listener: any) => void;
    off: (type: any, listener: any) => void;
    trigger: (...args: any[]) => void;
}
