import React from 'react';
import {omit} from './utils';
type SizeType = 'small' | 'middle' | 'large' | undefined;

export interface InputProps {
    className?:string,
    type?:'text' | 'number' | 'password',
    size?: SizeType,
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}


const Input = (props:InputProps) => {
    const {className,type,size,onChange} = props;

    React.useEffect(() => {
        const o = omit(props,['className','type','onChange','onFocus','onBlur']);
    }, [props]);

    const onBlur:React.FocusEventHandler  = e => {
        console.log(e);
    };

    const onFocus:React.FocusEventHandler = e => {
        console.log(e);
    };

    const getInputClassName = (prefix) => {
        const defaultCls = [className,`${prefix}`];
        if (size==="small") {
            defaultCls.push(`${prefix}-sm`);
        }else if (size==="large") {
            defaultCls.push(`${prefix}-lg`);
        }
        return defaultCls.join(' ');
    };
    return (
        <input
            {...omit(props,['className','type','onChange','onFocus','onBlur'])}
            className={getInputClassName('leke-input')}
            type={type}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};

Input.defaultProps = {
    type:'text',
    size:'middle'
};

export default Input;
