/**
 * @author zhoujunda
 * @description Spin加载中
 * @updated ###### Fri Jan 15 09:38:39 PHT 2021
 */
// import { useControl } from "@leke/hooks";
import React, { CSSProperties, FC, memo, ReactNode, useEffect, useRef, useState } from "react";
import DefaultIndicator from "./DefaultIndicator";
import classNames from "classnames";
interface SpinProps {
  delay?: number;
  indicator?: ReactNode;
  size?: "small" | "default";
  spinning?: boolean;
  tip?: string;
  wrapperClassName?: string;
    children?: ReactNode;
    style: CSSProperties;
}

const Switch: FC<SpinProps> = memo(
    ({ size, spinning, wrapperClassName, tip, indicator, children, delay, style, ...props }) => {
        const [loading, setLoading] = useState(spinning);
        const timer = useRef<any>();

        /**渲染默认指示器样式 */
        const renderSpin = () =>
            loading && (
                <div className="leke-spin-bg" style={style} {...props}>
                    {!!indicator ? indicator : <DefaultIndicator size={size} />}
                    {!!tip && <p className="leke-spin-tip">{tip}</p>}
                </div>
            );
        
        /**监听开关延迟 */ 
        useEffect(() => {
            if (delay) {
                timer.current = setTimeout(() => {
                    setLoading(spinning);
                }, delay);
                return () => {
                    clearTimeout(timer.current);
                    timer.current = null;
                };
            } 
            setLoading(spinning);
        },[delay,spinning]);
            
        return children ? (
            <div className={classNames("leke-spin-wrapper",wrapperClassName)} {...props}>
                {renderSpin()}
                <div
                    className={classNames("leke-spin-container", {
                        ["leke-spin-blur"]: loading,
                    })}
                >
                    {children}
                </div>
            </div>
        ) : (
            renderSpin()
        );
    }
);

Switch.defaultProps = {
    spinning: true,
    size: "default"
};

export default Switch;
