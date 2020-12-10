import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ButtonShape, ButtonSize, ButtonType } from './type';

export type Props = {
    children?: ReactNode;
    type?: ButtonType;
    ghost?: boolean;
    disabled?: boolean;
    className?: string;
    size?:ButtonSize;
    shape?:ButtonShape;
    icon?:ReactNode;
    loading?:boolean;
    lekeDisabled?:boolean;
    block?:boolean;
    danger?:boolean;
    warning?:boolean;
    onClick?: () => any;
};

const Button = (props: Props) => {
    const { type, ghost, disabled, className,size,shape,icon,children,loading,block,lekeDisabled,danger,warning, onClick: fn } = props;

    const classes = classNames(className, {
        'leke-btn': true,
        'leke-btn-danger':danger,
        'leke-btn-warning':warning,
        [type ? `leke-btn-${type}` : 'leke-btn-default']: true,
        [shape ? `leke-btn-${shape}`:'' ]:true,
        [size ? `leke-btn-${size}`:'leke-btn-middle']:true,
        'leke-btn-loading':loading,
        'leke-btn-icon-only':icon,
        'leke-btn-block':block,
        'leke-btnBackgroundGhost': ghost,
        'leke-btnDisabled':lekeDisabled,
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
        <button disabled={disabled || lekeDisabled} onClick={() => fn && fn()} className={classes}>
            {iconNode}
            {kids}
        </button>
    );
};

export default Button;
