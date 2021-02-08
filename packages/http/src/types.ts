import {AxiosRequestConfig, AxiosResponse} from "axios";

export interface httpRequest extends AxiosRequestConfig{
    reset?:boolean,
}
export interface createOption extends AxiosRequestConfig{
    requestInterceptor?:(config:httpRequest)=>httpRequest,
    responseInterceptor?:<T=any>(res:AxiosResponse)=>T
}