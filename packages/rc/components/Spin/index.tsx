/**
 * @author zhoujunda
 * @description Spin加载中
 * @updated ###### Fri Jan 15 09:38:39 PHT 2021
 */
import React, { FC, memo, ReactNode } from "react";
import DefaultSpin from './DefaultSpin';
interface SwitchProps {
    delay?: number
    indicator?: ReactNode
    size?: "small" | "default" | "large"
    spinning?: true
    tip?: string
    wrapperClassName?: string
}

const Switch: FC<SwitchProps> = memo(({ size }) => {
    return (
        <div className="spin-bg">
            <DefaultSpin size={size} />
        </div>
    );
});

Switch.defaultProps = {
};

export default Switch;
