import React, {useRef} from "react";
//import {http} from '../configure';
import http from '@leke/http';

export interface UploadProps {
    children:React.ReactElement,
    headers:object,
    name:string,
    multiple:boolean,
    action:string,
    onSuccess?:(res:any)=>void,
    onFail?:(err:any)=>void
    accept?:string
}

export default function Upload(props:UploadProps) {
    const {children,headers,name,multiple,action,accept,onSuccess,onFail}=props;
    const child=React.Children.only(children);
    const inputRef=useRef<HTMLInputElement>(null);

    const onClick=(e)=>{
        child.props.onClick?.(e);
        inputRef.current?.click();
    };
    function onChange(e) {
        const input:HTMLInputElement=e.target;
        const files=input.files;
        if(files&&files.length){
            const formData=new FormData();
            Array.from(input.files).forEach(file=>{
                formData.append(name,file);
            });
            http({
                headers,
                method:'post',
                url:action,
                data:formData
            }).then(onSuccess).catch(onFail);
        }
    }
    return (
        <>
            <input
                ref={inputRef}
                type="file"
                multiple={multiple}
                accept={accept}
                style={{display:'none'}}
                onChange={onChange}
            />
            {React.cloneElement(child,{onClick})}
        </>
    );
}

Upload.defaultProps={
    headers:{"Content-Type": "multipart/form-data"},
    name:'file',
    multiple:false
};