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
    ghost?:boolean;
    loading?:boolean;
}

export type ButtonProps = {
    htmlType?:ButtonHTMLType;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'type'>


const Button = (props: ButtonProps,ref) => {
    const { type, disabled, className,size,shape,icon,children,loading,ghost,htmlType, ...otherProps} = props;

    const classes = classNames(className, {
        'leke-btn': true,
        [type ? `leke-btn-${type}` : 'leke-btn-default']: true,
        [shape ? `leke-btn-${shape}`:'' ]:true,
        [size ? `leke-btn-${size}`:'leke-btn-middle']:true,
        'leke-btn-loading':loading,
        'leke-btn-icon-only':icon,
        'leke-btnBackgroundGhost': ghost,
    });

    const LoadingIcon = () => {
        return <div className="leke-btn-loading-icon" />;
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
