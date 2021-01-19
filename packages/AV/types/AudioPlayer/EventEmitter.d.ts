export default class EventEmitter {
    private _events;
    /**
     * @description: 注册事件函数
     * @param {String} event 需要注册的事件名称
     * @param {Function} fn 事件回调函数
     * @param {Boolean} isOnce 是否只执行一次
     * @return {EventEmitter} eventEmitter 实例对象
     */
    addListener(event: string, fn: Function, isOnce?: boolean): this;
    /**
     * @description: 取消注册事件函数
     * @param {string} event 需要需取消的事件名称
     * @param {Function} fn 需要需取消的函数回调，空则清除所有
     * @return {EventEmitter} eventEmitter 实例对象
     */
    removeListener(event: string, fn?: Function): this;
    /**
     * @description: 事件触发
     * @param {string} event 需要触发的事件名称
     * @param {argument} args 触发参数
     * @return {EventEmitter} eventEmitter 实例对象
     */
    emit(event: string, ...args: any[]): this;
    /**
     * @description: 获取所有监听的事件
     */
    getListener(): {};
}
