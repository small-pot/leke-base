import React, {InputHTMLAttributes, useCallback, useState} from "react";

function useProxy(value,onChange,defaultValue) {
    const [val,setVal]=useState(defaultValue||'');
    const change=useCallback((e)=>{
        if(onChange){
            onChange(e);
        }
        if(value===undefined){
            setVal(e.target.value);
        }
    },[onChange,setVal,value]);
    return [value||val,change];
}
export default function Input (props:InputHTMLAttributes<HTMLInputElement>) {
    const [value,onChange]=useProxy(props.value,props.onChange,props.defaultValue);
    return <input {...props} defaultValue={undefined} value={value} onChange={onChange}/>;
}
Input.defaultProps={
    type:'text'
};
