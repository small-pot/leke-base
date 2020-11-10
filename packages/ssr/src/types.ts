import {ComponentClass, FunctionComponent, ReactNode} from "react";
import {Request, Response} from "express";
import {AxiosInstance} from 'axios';

type headContentType=ReactNode|((req:Request)=>ReactNode)

type dataType<T>={
    [k in keyof T]:T[k]
}
interface baseData{
    router:{
        href:string,
        path:string,
        origin:string,
        query:object,
        type:"page"|"module"
    }
}

export interface getInitialDataType<T> {
    (http:AxiosInstance,req:Request,res:Response):Promise<T>
}
export interface pageFC<T> extends FunctionComponent<dataType<T>&baseData>{
    getInitialData:getInitialDataType<T>,
    headContent?:headContentType,
}
export interface pageCC<T> extends ComponentClass<dataType<T>&baseData>{
    getInitialData:getInitialDataType<T>,
    headContent?:headContentType,
}
export type SSRPage<T=any>=pageFC<T>|pageCC<T>
export interface routeType{
    path:string,
    getComponent:()=>Promise<{default:SSRPage,__webpack_chunkname_?:string}>
}
export interface configType {
    publicPath?:string,
    headContent?:headContentType,
    routes:routeType[]
}