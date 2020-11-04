/* eslint-disable react-hooks/exhaustive-deps,react-hooks/rules-of-hooks */
import {useEffect, useState} from 'react';

interface stateType<T> {
    data?:T,
    error?:any,
    loading:boolean
}
export default function useResolve<T>(arg, dep:any[]=[]):stateType<T> {
    const loading=typeof arg==='function';
    if(!loading){
        return {
            data:arg,
            loading
        };
    }
    const [state,setState]=useState<stateType<T>>({
        loading
    });
    useEffect(()=>{
        setState({loading:true});
        arg.apply(null,dep).then(res=>{
            setState({data:res,loading:false});
        }).catch(error=>{
            setState({error,loading:false});
        });
    },[...dep,setState]);
    return state;
}