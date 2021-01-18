export default class EventBase {
    events: {};
    constructor() {
        this.events = {};
    }
    getListener = (type) => {
        if (!this.events[type]) this.events[type] = [];
        return this.events[type];
    }
    addListener = (type, listener) => {
        this.getListener(type).push(listener);
    }
    removeListener = (type, listener) => {
        this.getListener(type).filter(item => item !== listener);
    }
    on = (type, listener) => {
        return this.addListener(type, listener);
    }
    off = (type, listener) => {
        return this.removeListener(type, listener);
    }
    trigger = (...args) => {
        const [type, ...params] = args;
        this.getListener(type).forEach(fn => { fn(...params); });
    }
}