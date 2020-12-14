import {useCallback, useState} from 'react';
function defaultCb(params:any) {}
export default function useControl<T=any>(value?:T,onChange?:(v:T)=>void) {
    const [val,setVal]=useState(value);
    const callback=useCallback((newVal)=>{
        setVal(newVal);
        if(typeof onChange==='function'){
            onChange(newVal);
        }
    },[setVal,onChange]);
    if(value===undefined){
        return [val,callback];
    }
    return [value,onChange||defaultCb];
}