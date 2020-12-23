import React, { ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonShape, ButtonSize, ButtonType,ButtonHTMLType } from './type';

type BaseButtonProps = {
    children?: ReactNode;
    type?: ButtonType;
    disabled?: boolean;
    className?: string;
    size?:ButtonSize;
    shape?:ButtonShape;
    icon?:ReactNode;
    loading?:boolean;
}

export type ButtonProps = {
    htmlType?:ButtonHTMLType;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'type'>


const Button = (props: ButtonProps,ref) => {
    const { type = 'default', disabled, className,size = 'middle',shape,icon,children,loading,htmlType, ...otherProps} = props;

    const classes = classNames(className, {
        'leke-btn': true,
        [`leke-btn-${type}`]: type,
        [`leke-btn-${shape}`]:shape,
        [`leke-btn-${size}`]:size,
        'leke-btn-loading':loading,
        'leke-btn-icon-only':icon,
    });

    const LoadingIcon = () => {
        return <div className="leke-btn-loading-icon"></div>;
    };

    const iconNode = loading ? <LoadingIcon /> : icon  ? icon : null;

    const kids = children ? 
        <span className='leke-btn-content'>{children}</span>
        : 
        null;

    return (
        <button ref={ref} type={htmlType} disabled={disabled} className={classes} {...otherProps}>
            {iconNode}
            {kids}
        </button>
    );
};

const WrappedButton = forwardRef(Button);

export default WrappedButton;
