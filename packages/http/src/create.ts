import axios from 'axios';
import {httpRequest,createOption} from './types';
import qs from 'qs';

function validateStatus(){
    return true;
}
export default function createHttp (opt?:createOption) {
    const headers=Object.assign({'X-Requested-With':'XMLHttpRequest'},opt&&opt.headers);
    const option=Object.assign({timeout: 30000},opt);
    option.headers=headers;
    const {requestInterceptor,responseInterceptor}=option;
    const http = axios.create(option);
    http.interceptors.request.use(function (config:httpRequest) {
        if(config.reset){
            config.headers['Content-Type']='application/x-www-form-urlencoded';
            config.data=qs.stringify(config.data);
        }
        if(typeof window==='undefined'){
            config.validateStatus=validateStatus;
        }
        if(typeof requestInterceptor==='function'){
            return requestInterceptor(config);
        }
        return config;
    });
    http.interceptors.response.use((response) => {
        const result=response.data||{};
        if(typeof responseInterceptor==='function'){
            return requestInterceptor(response);
        }
        if(response.status===200&&result.success){
            return result.hasOwnProperty('data')?result.data:result.hasOwnProperty('datas')?result.datas:result;
        }
        return Promise.reject(response);
    }, err => {
        return Promise.reject(err);
    });
    return http;
};
