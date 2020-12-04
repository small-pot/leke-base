import React, { FC, forwardRef, memo, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useAnimation, useControl } from "@leke/hooks";
import { Loading } from "@leke/icons";

interface SwitchProps {
  autoFocus?:boolean;
  checked?:boolean;
  checkedChildren?:ReactNode;
  className?:string;
  defaultChecked?:boolean;
  disabled?:boolean;
  loading?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  size?:'default' | 'small';
  unCheckedChildren?:string;
  onChange?:(isChecked, e) =>void;
  onClick?:(isChecked, e) =>void;
}

const Switch: FC<SwitchProps> = memo(({ autoFocus, checked, defaultChecked, disabled, className, loading,checkedChildren, unCheckedChildren, onChange, onClick, onKeyDown }) => {
    // const [isChecked, setIsChecked] = useControl<any>(checked);
    const [isChecked, setIsChecked] = useState(defaultChecked);
    disabled = loading || disabled;
  
    const onToggle = useCallback((
        newChecked: boolean,
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
    ) => {
        let mergedChecked = isChecked;

        if (!disabled) {
            mergedChecked = newChecked;
            setIsChecked(mergedChecked);
            onChange?.(mergedChecked, event);
        }
  
        return mergedChecked;
    }, [isChecked, disabled, onChange]);
    
    const onHandler = useCallback((e) => {
        const ret = onToggle(!isChecked, e);
        onClick?.(ret, e);
    }, [isChecked,onToggle,onClick]);

    const onInternalKeyDown = (e) => {
        if (e.keyCode === 37) {
            // 左箭头控制
            onToggle(false, e);
        } else if (e.which === 39) {
            // 右箭头控制
            onToggle(true, e);
        }
        onKeyDown?.(e);
    };

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    
    const switchProps = {
        autoFocus,
        onClick: onHandler,
        onKeyDown: onInternalKeyDown,
        className: classNames("leke-switch", className, isChecked && "leke-switch-chceked", disabled && "leke-switch-disabled"),
    };

    return (
        <button {...switchProps}>
            <div className="leke-switch-handle">
                {
                    loading ?
                        <Loading className="leke-switch-loading" />
                        : null
                }
            </div>
            <span className="leke-switch-inner">
                {isChecked ? checkedChildren : unCheckedChildren}
            </span>
        </button>
    );
});

Switch.defaultProps = {
    autoFocus: false,
    checked:false,
    defaultChecked:false,
    disabled:false,
    loading:false,
    size:'default',
};

export default Switch;
