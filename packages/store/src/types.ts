export type paramsType<K>={
    [p in keyof K]: any
}
export type getDataType<T=object>=()=>T
export type setDataType<T=object>=(newData:paramsType<T> | ((data:T)=>paramsType<T>))=>void
export interface storeType<T=object> {
    getData:getDataType<T>,
    setData:setDataType<T>
}
