/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:33:54
 * @LastEditTime: 2020-11-30 16:14:16
 */
/**
 * @description: 去除对象上的指定属性
 * @param {Object} object
 * @param {string[]} fields
 * @return Object
 */
export function omit(object:Object,fields:string[]):Object {
    const shallowCopy = Object.assign({},object);
    for (const key of fields) {
        if (Object.prototype.hasOwnProperty.call(shallowCopy, key)) {
            delete shallowCopy[key];
        }
    }
    return shallowCopy;
}