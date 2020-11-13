/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:33:54
 * @LastEditTime: 2020-11-13 16:45:03
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