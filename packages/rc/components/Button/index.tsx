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
    onClick?: () => any;
};

const Button = (props: Props) => {
    const { type, ghost, disabled, className,size,shape,icon,children, onClick: fn } = props;

    const classes = classNames(className, {
        'leke-btn': true,
        [type ? `leke-${type}` : 'leke-default']: true,
        [shape ? `leke-btn-${shape}`:'' ]:true,
        'leke-btn-icon-only':icon,
        [size ? `leke-btn-${size}`:'leke-btn-middle']:true,
        'leke-btnBackgroundGhost': ghost,
    });

    const iconNode = icon  ? icon : null;

    const kids = children ? 
        <span>{children}</span>
        : 
        null;

    return (
        <button disabled={disabled} onClick={() => fn && fn()} className={classes}>
            {iconNode}
            {kids}
            <img src='./assets/loading.svg' />
        </button>
    );
};

export default Button;
