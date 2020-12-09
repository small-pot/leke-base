import React, { FC, memo, ReactNode, useCallback } from "react";
import classNames from "classnames";
import { useControl } from "@leke/hooks";
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
  onChange?:(isChecked, e?) =>void;
  onClick?:(isChecked, e) =>void;
}

const Switch: FC<SwitchProps> = memo(({ autoFocus, size, checked, defaultChecked, disabled, className, loading, checkedChildren, unCheckedChildren, onChange, onClick, onKeyDown }) => {
    const [isChecked = defaultChecked, setIsChecked] = useControl(checked,onChange);
    disabled = loading || disabled;
  
    const onToggle = useCallback((
        newChecked: boolean,
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
    ) => {
        let mergedChecked = isChecked;

        if (!disabled) {
            mergedChecked = newChecked;
            setIsChecked?.(mergedChecked, event);
        }
  
        return mergedChecked;
    }, [isChecked, disabled, setIsChecked]);
    
    const onHandler = useCallback((e) => {
        const ret = onToggle(!isChecked, e);
        onClick?.(ret, e);
    }, [isChecked,onToggle,onClick]);

    const onInternalKeyDown = (e) => {
        if (e.keyCode === 37) {
            // 左箭头控制
            onToggle(false, e);
        } else if (e.keyCode === 39) {
            // 右箭头控制
            onToggle(true, e);
        }
        onKeyDown?.(e);
    };
    
    const switchProps = {
        autoFocus,
        onClick: onHandler,
        onKeyDown: onInternalKeyDown,
        className: classNames("leke-switch", {
            ['leke-switch-small']: size === 'small',
            ['leke-switch-checked']: isChecked,
            ['leke-switch-disabled']: disabled,
        }, className),
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
    defaultChecked:false,
    disabled:false,
    loading:false,
    size: 'default',
};

export default Switch;
