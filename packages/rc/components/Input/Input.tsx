import React from 'react';
import classNames from "classnames";
import {omit} from './utils';
import { SizeType } from "./interface";

export interface InputProps {
    className?:string,
    disabled?:boolean,
    prefix?:React.ReactElement,
    suffix?:React.ReactElement,
    size?: SizeType,
    type?:'text' | 'number' | 'password',
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}

function noop() {}

const baseCls = 'leke-input';
const Input:React.FC<InputProps> = (props) => {
    const {className,disabled,prefix,size,suffix,type,onChange} = props;
    
    const getInputClassName:()=>string = () => {
        const inputClassName = classNames(`${baseCls}`,{
            [`${baseCls}-sm`]:size==="small",
            [`${baseCls}-lg`]:size==="large",
            [`${baseCls}-disabled`]:disabled
        },className);
        return inputClassName;
    };

    const getDefaultInput = (className=baseCls)=>{
        return (<input
            {...omit(props,['className','type','onChange','prefix','suffix'])}
            className={className}
            type={type}
            onChange={onChange}
        />);
    };

    if (suffix || prefix) {
        return(
            <span className={classNames(`${baseCls}-outer-wrap`,getInputClassName())}>
                {prefix&&<span className="leke-input-prefix">{prefix}</span>}
                {getDefaultInput()}
                {suffix&&<span className="leke-input-suffix">{suffix}</span>}
            </span>
        );
    }
    

    return getDefaultInput(getInputClassName());
};

Input.defaultProps = {
    disabled:false,
    size:'middle',
    type:'text',
    onChange:noop,
};

export default Input;
