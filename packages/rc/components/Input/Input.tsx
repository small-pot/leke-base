import React from 'react';
import classNames from "classnames";
import {omit} from './utils';
type SizeType = 'small' | 'middle' | 'large' | undefined;

export interface InputProps {
    className?:string,
    disabled?:boolean,
    size?: SizeType,
    type?:'text' | 'number' | 'password',
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}

function noop() {}

const Input:React.FC<InputProps> = (props) => {
    const {className,disabled,size,type,onChange} = props;

    const onBlur:React.FocusEventHandler  = e => {
        console.log(e);
    };

    const onFocus:React.FocusEventHandler = e => {
        console.log(e);
    };

    const getInputClassName = (prefix,disabled) => {
        const inputClassName = classNames(className,`${prefix}`,{
            [`${prefix}-sm`]:size==="small",
            [`${prefix}-lg`]:size==="large",
            [`${prefix}-disabled`]:disabled
        });
        return inputClassName;
    };
    return (
        <input
            {...omit(props,['className','type','onChange','onFocus','onBlur'])}
            className={getInputClassName('leke-input',disabled)}
            type={type}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};

Input.defaultProps = {
    disabled:false,
    size:'middle',
    type:'text',
    onChange:noop,
};

export default Input;
